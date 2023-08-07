use crate::configuration::DatabaseSettings;

fn spawn_app() -> String {
    let listener = TcpListener::bind("127.0.0.1:0")
        .expect("Failed to bind random port");

    let port = listener.local_addr().unwrap().port();
    let server = zero2prod::run(listener).expect("Failed to bind address"); 
    let _ = tokio::spawn(server);

    format!("http://127.0.0.1:{}", port)
}

#[test]
fn test_generate_connection_url() {
    let config = DatabaseSettings {
        username: "yollotlfe".to_string(),
        password: "".to_string(),
        port: 8000,
        host: "localhost".to_string(),
        database_name: "juezguapa".to_string(),
    };
    assert_eq!(
        config.connection_url(),
        "postgres://yollotlfe@localhost:8000/juezguapa".to_string()
        );

    let config = DatabaseSettings {
        username: "yollotlfe".to_string(),
        password: "lolo".to_string(),
        port: 8000,
        host: "127.0.0.1".to_string(),
        database_name: "juezguapa".to_string(),
    };

    assert_eq!(
        config.connection_url(),
        "postgres://yollotlfe:lolo@127.0.0.1:8000/juezguapa".to_string()
        );
}
