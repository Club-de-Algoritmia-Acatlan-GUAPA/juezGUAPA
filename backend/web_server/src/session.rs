use crate::configuration::{AppSettings, RedisSettings};
use anyhow::Result;
use async_redis_session::RedisSessionStore;
use axum::{
    async_trait,
    extract::FromRequestParts,
    http::{request::Parts, Request},
    middleware::Next,
    response::Response,
    Extension,
};
//use axum_session::{SessionConfig, SessionLayer, SessionRedisPool, SessionStore};
use axum_sessions::PersistencePolicy;
use axum_sessions::SameSite;
use axum_sessions::{SessionHandle, SessionLayer};
use redis::ConnectionLike;
use secrecy::ExposeSecret;
use std::ops::{Deref, DerefMut};
use std::time::Duration;
use tokio::sync::OwnedRwLockWriteGuard;
use uuid::Uuid;

pub struct UserSession(OwnedRwLockWriteGuard<async_session::Session>);

pub fn session_middleware(
    config: &RedisSettings,
    app: &AppSettings,
) -> SessionLayer<RedisSessionStore> {
    let mut client = redis::Client::open(config.uri.expose_secret().as_ref())
        .expect("Error while trying to open the redis connection");
    //if !client.check_connection() {
    //    panic!("Unable to connect to Redis");
    //}

    let store = RedisSessionStore::new(config.uri.expose_secret().as_ref())
        .expect("Redis can't be reached");

    // safari https://stackoverflow.com/questions/58525719/safari-not-sending-cookie-even-after-setting-samesite-none-secure
    let session_layer = SessionLayer::new(store, config.secret.expose_secret().as_bytes())
        .with_cookie_name("en")
        .with_cookie_domain(&app.domain)
        .with_cookie_path("/")
        .with_session_ttl(Some(Duration::from_secs(24 * 60 * 60)))
        .with_http_only(true)
        .with_same_site_policy(SameSite::Lax)
        .with_persistence_policy(PersistencePolicy::ExistingOnly)
        .with_secure(app.is_prod);
    session_layer
}

impl UserSession {
    const USER_ID_KEY: &'static str = "user_id";

    pub fn renew(&mut self) {
        self.0.regenerate();
    }

    pub fn insert_user_id(&mut self, user_id: &Uuid) -> Result<()> {
        self.0
            .insert(Self::USER_ID_KEY, user_id)
            .map_err(anyhow::Error::msg)
    }

    pub fn get_user_id(&self) -> Option<Uuid> {
        self.0.get(Self::USER_ID_KEY)
    }

    pub fn log_out(&mut self) {
        self.0.destroy()
    }
}
impl Deref for UserSession {
    type Target = OwnedRwLockWriteGuard<async_session::Session>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for UserSession {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

#[async_trait]
impl<S> FromRequestParts<S> for UserSession
where
    S: Send + Sync,
{
    type Rejection = std::convert::Infallible;

    async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        let Extension(session_handle): Extension<SessionHandle> =
            Extension::from_request_parts(parts, state)
                .await
                .expect("Session extension missing. Is the session layer installed?");
        let session = session_handle.write_owned().await;

        Ok(Self(session))
    }
}

