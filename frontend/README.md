
Frontend de el `JuezGUAPA`

# Correr el 

## Instalar dependencias
```
npm i
```

## Oauth Token github

Sigan [este tutorial](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) para crear el token de oauth de autenticacion (con esto se registran los usuarios), el callback url es `http://localhost:3000/api/auth/callback`

## Archivo `.env`
Cuando tengan su `GITHUB_ID` y su `GITHUB_SECRET` crean un archivo llamado `.env` y pegan lo siguiente 
```
GITHUB_SECRET={su secret key de github del oauth}
GITHUB_ID={su id del oauth}
SECRET="say_lalisa_love_me_lalisa_love_me_hey" # puede ser cualquier cosa, 
HOST="http://localhost:3000"
```
## Correr el proyecto 
```
npm run dev
```
## Hacer build del proyecto
```
npm run build
```

## Probar el build ( la version de produccion )
```
npm run start
```

