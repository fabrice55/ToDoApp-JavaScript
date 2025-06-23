# Todo App

A full-stack Todo application built with **TypeScript**, **Node.js**, **Express**, and **MongoDB** (via **Mongoose**). It features an interactive browser UI protected by HTTP Basic Authentication and a RESTful JSON API secured with JWT bearer tokens, complete with input sanitization and Zod schema validation.

🔗 **Live Deployment**: [https://todo-app-nine-pi-93.vercel.app/](https://todo-app-nine-pi-93.vercel.app/)

---

## Features

- **TypeScript Full-Stack**: End-to-end typed server and client-side scripts.
- **Dual Interface**:
  - **Browser UI**: Rendered with server-side templates and interactive client-side operations (Axios).
  - **RESTful API**: JSON API endpoints with JWT bearer token authentication.
- **Security & Data Integrity**:
  - Input sanitization with `sanitize-html` to prevent XSS.
  - Strict payload validation with `zod` (validates MongoDB ObjectIds and non-empty strings).
  - HTTP Basic Authentication for web access.
  - JWT Bearer Token authorization for API routes.
- **MongoDB & Mongoose**: Clean data model and schema management.
- **Deployment Ready**: Pre-configured for deployment with Vercel (`vercel.json`).

---

## Project Structure

```text
todo-app/
├── public/                 # Static assets and browser bundle
│   ├── browser.ts          # Client-side TypeScript for DOM & AJAX
│   └── browser.js          # Compiled browser script
├── src/
│   ├── controllers/        # Request handlers (web & API)
│   ├── middleware/         # Auth middlewares (Basic auth & JWT)
│   ├── models/             # Mongoose schemas and models
│   ├── routes/             # Express route definitions (web & API)
│   ├── services/           # Database service layer
│   ├── utils/              # Zod validation schemas and helpers
│   ├── views/              # HTML template views
│   ├── app.ts              # Express application entrypoint
│   └── db.ts               # Mongoose database connection
├── dist/                   # Compiled server JavaScript output
├── package.json
├── tsconfig.json           # Server TypeScript configuration
├── tsconfig.frontend.json  # Browser TypeScript configuration
└── vercel.json             # Vercel deployment configuration
```

---

## Prerequisites

- **Node.js**: v16+ recommended
- **npm**: v8+
- **MongoDB**: A local MongoDB instance or MongoDB Atlas cluster URI

---

## Getting Started

### 1. Clone the repository and install dependencies

```bash
git clone <repo-url>
cd todo-app
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```dotenv
CONNECTIONSTRING=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
JWT_SECRET=your-secure-random-jwt-secret
PORT=4000
```

| Variable | Required | Description |
| --- | --- | --- |
| `CONNECTIONSTRING` | Yes | MongoDB Atlas or local MongoDB connection URI |
| `JWT_SECRET` | Yes | Secret key used to sign and verify JSON Web Tokens |
| `PORT` | No | Server port (defaults to `4000` if omitted) |

> [!WARNING]
> Keep your `.env` private. Never commit connection strings or secrets to version control.

### 3. Run in Development Mode

Run the server with automatic restarts on file changes (`nodemon` + `ts-node`):

```bash
npm run dev
```

The application will be accessible at [http://localhost:4000](http://localhost:4000).

### 4. Build and Run in Production

Compile TypeScript for both the server and the browser:

```bash
npm run build
npm start
```

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts server in watch mode using `nodemon` and `ts-node` |
| `npm run build` | Compiles server (`tsc`) and frontend client (`tsc -p tsconfig.frontend.json`) |
| `npm start` | Runs the compiled server from `dist/app.js` |

---

## Web Interface

- **URL**: `http://localhost:4000/`
- **Authentication**: HTTP Basic Auth
  - **Username**: `learn`
  - **Password**: `javascript`

*(Configured in [`src/middleware/auth.middleware.ts`](src/middleware/auth.middleware.ts))*

---

## API Documentation

All REST API endpoints are prefixed with `/api` and exchange JSON.

### Security & Authentication

1. Obtain a token by calling `POST /api/authenticate`.
2. For all subsequent API requests, include the token in the `Authorization` HTTP header:
   ```http
   Authorization: Bearer <token>
   ```
3. Tokens expire after **30 days**.
4. Protected API endpoints return `401 Unauthorized` if the token is missing, and `403 Forbidden` if the token is invalid or expired.

> [!NOTE]
> `/api/authenticate` currently issues a token without validating user credentials. Ensure proper credential validation is implemented before deploying in public production environments.

---

### Endpoints

#### 1. Generate Authentication Token

Generates a JWT bearer token for accessing protected API endpoints.

- **URL**: `/api/authenticate`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**: None
- **Response** (`200 OK`):
  ```json
  {
    "message": "Token Successfully created",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

#### 2. View All Todos

Retrieves all todos from the database.

- **URL**: `/api/view-items`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- **Request Body**: None
- **Response** (`200 OK`):
  ```json
  [
    {
      "_id": "64df19f5a123456789abcdef",
      "text": "Buy groceries"
    }
  ]
  ```

---

#### 3. Create a Todo

Creates a new todo item.

- **URL**: `/api/create-item`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "item": "Buy groceries"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "message": "Todo sucessfully added",
    "createItem": {
      "id": "64df19f5a123456789abcdef",
      "item": "Buy groceries"
    }
  }
  ```

---

#### 4. Update a Todo

Updates the text of an existing todo by its MongoDB ObjectId.

- **URL**: `/api/update-item`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "id": "64df19f5a123456789abcdef",
    "text": "Buy oat milk"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "message": "Todo successful updated",
    "updatedId": {
      "id": "64df19f5a123456789abcdef",
      "text": "Buy oat milk"
    }
  }
  ```

---

#### 5. Delete a Todo

Deletes a todo item by its MongoDB ObjectId.

- **URL**: `/api/delete-item`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "id": "64df19f5a123456789abcdef"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "message": "Todo successfully deleted",
    "deleteId": "64df19f5a123456789abcdef"
  }
  ```

---

### Input Validation & Error Handling

All requests are validated with **Zod**:
- `id`: Must be a valid 24-character hexadecimal MongoDB ObjectId string (`/^[0-9a-fA-F]{24}$/`).
- `text` / `item`: Must be a non-empty string after trimming. Input is sanitized via `sanitize-html` to strip unsafe tags and attributes.

Validation failures return HTTP `400 Bad Request`:
```json
{
  "error": "Invalid MongoDB ObjectId"
}
```

---

## Deployment

- **Live URL**: [https://todo-app-nine-pi-93.vercel.app/](https://todo-app-nine-pi-93.vercel.app/)

The repository includes a [`vercel.json`](vercel.json) configuration for deploying to Vercel:
- Server routes (`/api/*` and `/*`) are routed to the compiled entrypoint (`dist/app.js`).
- Static assets (e.g. `browser.js`) are served directly from the `public/` directory.

### Deployment Checklist

1. Set the build command to `npm run build` in your deployment settings.
2. Configure `CONNECTIONSTRING` and `JWT_SECRET` in the environment variable settings of your deployment provider.
3. Ensure MongoDB network access allows connections from your hosting provider's IP range.
