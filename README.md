# CSC 307 Project

React + Express monorepo for the CSC 307 users app. The backend uses MongoDB through Mongoose and exposes a small REST API for creating, reading, filtering, and deleting users.

## Project Structure

```text
packages/
  express-backend/
    backend.js
    models/user.js
    services/user-service.js
  react-frontend/
    src/
```

## Requirements

- Node.js
- npm
- MongoDB Atlas connection string with access to database `csc307`

## Environment

Create a `.env` file at the repo root, or in `packages/express-backend/`. The backend reads both locations, and the backend package `.env` overrides the root value.

```text
MONGO_CONNECTION_STRING=mongodb+srv://<username>:<password>@<cluster-host>/
```

Do not commit `.env`; it is ignored by git.

## Install

```sh
npm install
```

## Run

Start the backend:

```sh
npm --workspace packages/express-backend run start
```

Start the frontend in another terminal:

```sh
npm start
```

The backend runs on `http://localhost:8000`. The Vite frontend prints its local URL when it starts.

## API

```text
GET    /users
GET    /users?name=<name>
GET    /users?job=<job>
GET    /users?name=<name>&job=<job>
GET    /users/:id
POST   /users
DELETE /users/:id
```

MongoDB creates `_id` values for users. The frontend uses `_id` for row keys, display, and delete requests.

## Verify

```sh
node --check packages/express-backend/backend.js
node --check packages/express-backend/models/user.js
node --check packages/express-backend/services/user-service.js
npm --prefix packages/react-frontend run lint
npm --prefix packages/react-frontend run build
```
