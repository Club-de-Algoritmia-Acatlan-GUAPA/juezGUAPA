use async_global_executor;
use serde::{Deserialize, Serialize};
use std::default::Default;

use lapin::{options::*, types::FieldTable, BasicProperties, Connection, ConnectionProperties};
use serde_json::ser::to_string;

use axum::{
    Router,
    routing::post,
    extract::{State, Json}
};

#[derive(Clone)]
pub struct SubmitQueue(pub lapin::Channel);

#[derive(Default, Serialize, Deserialize, Debug, Clone)]
struct Submission {
    problem: String,
    user: String,
    contest_id: String,
    code_type: String,
}
#[derive(Clone)]
struct LapinState {
    channel : lapin::Channel
}

pub async fn axum_config() -> Router {
    let channel = axum_create_channel().unwrap();
    
    Router::new()
            .route("/submit", post(axum_submit_job))
            .with_state(LapinState{
                channel,
            })
}

#[axum_macros::debug_handler]
async fn axum_submit_job(
    State(queue) : State<LapinState>,
    Json(submission): Json<Submission>,
) -> String {
    //let queue = queue_mutex.lock().unwrap();
    println!("F");
    let _confirm = queue
        .channel
        .basic_publish(
            "",
            "hello",
            BasicPublishOptions::default(),
            to_string(&submission.clone()).unwrap().as_bytes(),
            BasicProperties::default(),
        )
        .await
        .expect("basic_publish")
        .await // Wait for this specific ack/nack
        .expect("publisher-confirms");

    "Hello, world!".to_string()
}

pub fn create_channel() -> Result<SubmitQueue, lapin::Error> {
    async_global_executor::block_on(async {
        let conn =
            Connection::connect("amqp://localhost:5672", ConnectionProperties::default()).await?;

        let channel = conn.create_channel().await?;

        let _queue = channel
            .queue_declare(
                "hello",
                QueueDeclareOptions::default(),
                FieldTable::default(),
            )
            .await?;

        Ok(SubmitQueue(channel))
    })
}

pub fn axum_create_channel() -> Result<lapin::Channel, lapin::Error> {
    async_global_executor::block_on(async {
        let conn =
            Connection::connect("amqp://localhost:5672", ConnectionProperties::default()).await?;

        let channel = conn.create_channel().await?;

        let _queue = channel
            .queue_declare(
                "hello",
                QueueDeclareOptions::default(),
                FieldTable::default(),
            )
            .await?;

        Ok(channel)
    })
}

