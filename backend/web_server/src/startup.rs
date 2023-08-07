use axum::middleware::from_fn;
use axum::{
    routing::{get, post},
    Router,
};
use futures::future::Future;
use http::Method;
use sqlx::PgPool;
use std::net::TcpListener;
use tower_http::cors::{Any, CorsLayer};
use tower_http::services::{ServeDir, ServeFile};

use crate::{
    configuration::{AppSettings, DatabaseSettings, RedisSettings},
    database_connection,
    email_client::EmailClient,
    routes::{
        confirm::confirm,
        health::health,
        login::{login_get, login_post},
        signup::signup_post,
    },
    session::session_middleware,
    telemetry::trace_headers,
};

#[derive(Clone)]
pub struct AppState {
    pub pool: PgPool,
    pub email_client: EmailClient,
    pub base_url: String,
}
pub fn axum_start_server(
    listener: TcpListener,
    email_client: EmailClient,
    redis_config: RedisSettings,
    app_config: AppSettings,
    pool: PgPool
) -> impl Future<Output = Result<(), std::io::Error>> {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::DEBUG)
        //with(tracing_subscriber::fmt::layer())
        .init();

    let _cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(Any);

    let serve_dir = ServeDir::new("static").not_found_service(ServeFile::new("static/index.html"));
    let session = session_middleware(&redis_config, &app_config);

    let _app = Router::new()
        .route("/health", get(health))
        .nest(
            "/",
            Router::new()
                .route("/login", post(login_post).get(login_get))
                .route("/signup", post(signup_post))
                .route("/confirm", get(confirm)),
        )
        .with_state(AppState {
            pool,
            email_client,
            base_url: app_config.base_url,
        })
        .layer(from_fn(trace_headers))
        .fallback_service(serve_dir)
        .layer(session);

    //.layer(cors);

    axum_server::from_tcp(listener).serve(_app.into_make_service())
}
