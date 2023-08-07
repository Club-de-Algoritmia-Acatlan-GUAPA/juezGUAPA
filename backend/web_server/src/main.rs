use std::net::TcpListener;
use web_server::configuration::get_configuration;
use web_server::database_connection::pool;
use web_server::startup;
use anyhow::Result;
#[tokio::main]
async fn main() -> Result<()> {
    println!("LLOL");
    let configuration = get_configuration().expect("Failed to read configuration");
    println!("{}", &configuration.app.application_port);

    let email_client = configuration.email_client.client()?;
    let listener = TcpListener::bind(
        //format!("127.0.0.1:{}", configuration.app.application_port)
        format!("0.0.0.0:{}", configuration.app.application_port)
    )?;

    let pool = pool(&configuration.database);
    sqlx::migrate!("./migrations").run(&pool)
        .await?;

    startup::axum_start_server(
        listener, 
        email_client,
        configuration.redis,
        configuration.app,
        pool
    ).await?;
    Ok(())
}
