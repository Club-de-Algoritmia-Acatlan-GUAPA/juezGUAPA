use anyhow::{anyhow, Context, Result};
use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::{IntoResponse, Redirect, Response},
};
use uuid::Uuid;

use serde::Deserialize;
use sqlx::{PgPool, Postgres, Transaction};

use crate::startup::AppState;

#[derive(Deserialize, Debug)]
pub struct UrlQuery {
    confirmation_token: String,
}
pub struct ConfirmationError(anyhow::Error);

impl IntoResponse for ConfirmationError {
    fn into_response(self) -> Response {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Something went wrong: {}", self.0),
        )
            .into_response()
    }
}
impl<E> From<E> for ConfirmationError
where
    E: Into<anyhow::Error>,
{
    fn from(err: E) -> Self {
        Self(err.into())
    }
}

#[axum_macros::debug_handler]
pub async fn confirm(
    State(state): State<AppState>,
    url_query: Query<UrlQuery>,
) -> Result<Redirect, ConfirmationError> {
    let UrlQuery { confirmation_token } = url_query.0;

    let user_id = match get_user_id_from_confirmation_token(&state.pool, &confirmation_token).await
    {
        Ok(Some(user_id)) => user_id,
        Ok(None) => return Err(anyhow!("Confirmation token doesn't exist").into()),
        Err(e) => return Err(anyhow!("The following problem occur {}", e).into()),
    };

    update_user_validation_status(&user_id, &state.pool)
        .await
        .context("Unable to update status")?;

    println!("{user_id}");
    Ok(Redirect::to("/login.html"))
    //Ok("Succesful Validation".to_string())
}

pub async fn get_user_id_from_confirmation_token(
    pool: &PgPool,
    confirmation_token: &String,
) -> Result<Option<Uuid>> {
    Ok(sqlx::query!(
        r#"
            SELECT user_id
            FROM confirmation_tokens
            WHERE confirmation_token = $1
        "#,
        confirmation_token
    )
    .fetch_optional(pool)
    .await
    .map(|row| row.map(|r| r.user_id))?)
}

pub async fn delete_user_and_confirmation_token(
    confirmation_token: &String,
    user_id: &Uuid,
    transaction: &mut Transaction<'_, Postgres>,
) -> Result<()> {
    sqlx::query!(
        r#"
            DELETE FROM confirmation_tokens
            WHERE confirmation_token = $1
            AND user_id = $2
        "#,
        confirmation_token,
        user_id
    )
    .execute(transaction)
    .await?;

    Ok(())
}

pub async fn update_user_validation_status(user_id: &Uuid, pool: &PgPool) -> Result<()> {
    sqlx::query!(
        r#"
            UPDATE users 
            SET is_validated = true
            WHERE user_id = $1
        "#,
        user_id
    )
    .execute(pool)
    .await?;

    Ok(())
}
