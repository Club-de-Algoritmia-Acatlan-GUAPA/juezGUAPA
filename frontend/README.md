
Frontend of `JuezGUAPA`

# To run 

## Install dependencies
```
npm i
```

## Oauth Token github

Follow [this tutorial](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) to create the autentication oauth token (you need this to register the users), the url callback is `http://localhost:3000/api/auth/callback`

## File `.env`
Once you have your `GITHUB_ID` and your `GITHUB_SECRET` create a file called `.env` and paste   
```
GITHUB_SECRET="{your github secret key from the oauth application}"
GITHUB_ID="{your oauth application id}"
SECRET="say_lalisa_love_me_lalisa_love_me_hey" # it can be anything, 
HOST="http://localhost:3000"

```
## run the project 
```
npm run dev
```
## build the project
```
npm run build
```

## Test the build ( production version )
```
npm run start
```

