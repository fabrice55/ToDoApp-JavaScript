# ToDo-App

This is a fullstack javaScript todo app with a mongoDB database.

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
- **Key:** Authorization, **Value:** Bearer "token" (paste in your token without the double quotation marks)

### Create Token

- **URL:** /api/authenticate
- **Method:** POST
- **Response {JSON}:** {message: "Token successfully created", "token": "string"}


### Create/Add a Todo(Item)

- **URL:** /api/create-item
- **Method:** POST
- **Request Body:** {"item":"string"}
- **Response {JSON}:** {"message": "Todo sucessfully added", createdItem:{"id": "string", "item": "string"}}


### Update an Existing Todo(Item)

- **URL:** /api/update-item
- **Method:** POST
- **Request Body:** {"id":"string", "text":"string"}
- **Response {JSON}:** {"message": "Todo successful updated", updatedItem:{"id": "string", "text": "string"}}


### Delete a Todo(Item)

- **URL:** /api/delete-item
- **Method:** POST
- **Request Body:** {"id":"string"}
- **Response {JSON}:** {"message": "Todo successfully deleted", "deletedId":"string"}


### Get all Todos(Items)

- **URL:** /api/view-items
- **Method:** POST
- **Response {JSON}:** [{"id":"string", "text":"string"}, {"id":"string", "text":"string"}]