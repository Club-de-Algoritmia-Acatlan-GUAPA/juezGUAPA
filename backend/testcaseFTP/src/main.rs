use libunftp::Server;
use unftp_sbe_fs::ServerExt;

#[tokio::main]
pub async fn main() {
    let ftp_home = "/Users/yollotl/guapa/judge/juez_guapa/backend/testfile/resources/";
    let server = Server::with_fs(ftp_home)
        .greeting("Welcome to my FTP server")
        .passive_ports(50000..65535)
        .build()
        .unwrap();

    server.listen("127.0.0.1:2121").await;
}
