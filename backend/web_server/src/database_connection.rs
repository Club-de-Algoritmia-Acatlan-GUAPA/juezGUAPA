use sqlx::postgres::PgPoolOptions;
use crate::configuration::DatabaseSettings;

pub fn pool(db_config : &DatabaseSettings) -> sqlx::PgPool {

    PgPoolOptions::new()
        .max_connections(5)
        .acquire_timeout(std::time::Duration::from_secs(2))
        .connect_lazy_with(db_config.with_db())
}
