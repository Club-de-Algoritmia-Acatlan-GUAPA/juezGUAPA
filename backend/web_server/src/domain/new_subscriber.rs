use secrecy::Secret;
use crate::domain::{
  email::Email, 
  user::UserName
};

pub struct NewSubscriber {
    pub email: Email,
    pub username: UserName,
    pub password_hash: Secret<String>,
}

