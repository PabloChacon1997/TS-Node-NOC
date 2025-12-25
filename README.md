# Proyecto NOC
El objetivo es crear una serie de tareas usando Arquitectura Limpia con Typescript

# dev
1. Clonar el archivo ```.env.template``` y renombrarlo ```.env```
2. Conigurar las variables de entorno
```
PORT=3000

MAILER_SERVICE=
MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false

MONGO_URL=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=
```
3. Ejecutar el comando ```npm install``` para construir los paquetes de node_modules
4. Ejecutar el comando ```npm run dev``` para levantar la aplicación