# ToDo-App

This a fullstack javaScript todo app with mongoDB database.

## Run App Locally

1. Clone the repository
2. Run `npm install` to install all the dependencies.
3. Create a .env file and give it the following variables:

- **CONNECTIONSTRING**: your mongoDB URI,
- **PORT:** viable port value,
- **JWT_SECRET:** your JSON web token secret.

4. Run `npm run watch` to start the server.

## Browser Authentication

- **Username:** learn
- **Password:** javascript

## Vercel URL

https://todo-app-nine-pi-93.vercel.app/

## APIs Documentation

### Headers

- **Key:** Content-Type, **Value:** application/json
- **Key:** Authorization, **Value:** Bearer <token>

### Create Token

- **URL:** /api/login
- **Method:** POST
- **Response {JSON}:** {"token": "string"}


### Create/Add a Todo(Item)

- **URL:** /api/create-item
- **Method:** POST
- **Request Body:** {"item":"string"}
- **Response {JSON}:** {"id": "string", "item": "string", "message": "Todo sucessfully added"}


### Update an Existing Todo(Item)

- **URL:** /api/update-item
- **Method:** POST
- **Request Body:** {"id":"string", "text":"string"}
- **Response {JSON}:** {"id": "string", "text": "string","message": "Todo successful updated"}


### Delete a Todo(Item)

- **URL:** /api/delete-item
- **Method:** POST
- **Request Body:** {"id":"string"}
- **Response {JSON}:** {"id":"string", "message": "Todo successfully deleted"}


### Get all Todos(Items)

- **URL:** /api/view-items
- **Method:** POST
- **Response {JSON}:** {"id":"string", "item":"string", "id":"string", "item":"string"}