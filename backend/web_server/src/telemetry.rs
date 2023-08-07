use axum::http::Request;
use axum::middleware::Next;
use axum::response::Response;
use tokio::task::{spawn_blocking, JoinHandle};

pub fn spawn_blocking_with_tracing<F, R>(f: F) -> JoinHandle<R>
where
    F: FnOnce() -> R + Send + 'static,
    R: Send + 'static,
{
    spawn_blocking(f)
}

pub async fn trace_headers<B>(request: Request<B>, next: Next<B>) -> Response {
    let header = request.headers();
    dbg!(header);

    next.run(request).await
}
