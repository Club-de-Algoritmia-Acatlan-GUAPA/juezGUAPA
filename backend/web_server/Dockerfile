FROM messense/rust-musl-cross:x86_64-musl as chef
ENV SQLX_OFFLINE=true
RUN cargo install cargo-chef
RUN rustup target add x86_64-unknown-linux-musl
RUN apt-get update -y \
    && apt-get install -y openssl ca-certificates \
    && apt-get install -y lld clang pkg-config -y\
    && apt-get install -y ca-certificates libssl-dev musl-dev musl-tools
WORKDIR /app


FROM chef AS planner
# Copy source code from previous stage
COPY . .
# Generate info for caching dependencies
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder
COPY --from=planner /app/recipe.json recipe.json
# Build & cache dependencies
RUN apt-get update -y \
    && apt-get install -y openssl ca-certificates \
    && apt-get install -y lld clang pkg-config -y\
    && apt-get install -y ca-certificates libssl-dev musl-dev musl-tools

RUN cargo chef cook --release --target x86_64-unknown-linux-musl --recipe-path recipe.json
# Copy source code from previous stage
COPY . .
RUN rustup target add x86_64-unknown-linux-musl
# Build application
RUN cargo build --release --target x86_64-unknown-linux-musl


# Create a new stage with a minimal image
FROM scratch
COPY --from=builder /app/target/x86_64-unknown-linux-musl/release/web_server /web_server
COPY static static
ENTRYPOINT ["/web_server"]
EXPOSE 8000
