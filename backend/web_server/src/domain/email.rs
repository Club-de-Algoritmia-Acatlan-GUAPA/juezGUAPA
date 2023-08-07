use anyhow::{anyhow, Result};
use validator::validate_email;

use sqlx::PgPool;
use std::str::FromStr;
use uuid::Uuid;

#[derive(Clone)]
pub struct Email(String);

impl FromStr for Email {
    type Err = anyhow::Error;

    fn from_str(maybe_email: &str) -> Result<Self, Self::Err> {
        if validate_email(maybe_email) {
            return Ok(Self(maybe_email.to_string()));
        }

        Err(anyhow!("Invalid email"))
    }
}

impl Email {
    pub async fn get_user_id_with_email(
        &self,
        pool: &PgPool,
    ) -> Result<Option<Uuid>, anyhow::Error> {
        let user_id = sqlx::query!(
            r#"
            SELECT user_id
            FROM users
            WHERE email = $1
            "#,
            self.0
        )
        .fetch_optional(pool)
        .await?
        .map(|row| row.user_id);
        Ok(user_id)
    }
}

impl AsRef<str> for Email {
    fn as_ref(&self) -> &str {
        &self.0
    }
}
