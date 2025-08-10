# @lp/server — Backend Server for Language Power

This package contains the backend server for the Language Power app, built using Apollo Server with Express middleware to handle CORS and rate limiting.

---

## Features

- **GraphQL API powered by Apollo Server** for serving language learning data and game logic.
- **Express middleware** integrated for:
  - CORS support, allowing frontend apps to communicate securely.
  - Rate limiting to protect the server from abuse and excessive requests.
- **Dictionary API integration** using [Merriam-Webster Dictionary API](https://dictionaryapi.com/) for authoritative definitions, audio pronunciations, and more.
- **Mock dictionary API calls** support for local development or testing without real API requests.
  - Enable mocks by setting the environment variable `USE_MOCKS=true`.
- **MongoDB data persistence** for user data, vocabulary, and other backend storage needs.

---

## Setup and Environment

### 1. MongoDB

- You need a running MongoDB instance locally or on the cloud to use this server.
- For local development or testing, run a MongoDB container:

```bash
docker run --name dev-db -d -v data:/data/dev-db -p 27017:27017 mongo:4.2
```

- For testing with a fresh DB, you can use:

```bash
docker run --name test-db --rm -d -v /data/test-db -p 27017:27017 mongo:4.2
```

### 2. Environment Variables

- Configure your environment variables in `.env` file for production or `nodemon.json` for development.
- Use the `.env.example` as a template.
- Critical variables include:
- `MONGODB_URI`: Your MongoDB connection string.
- `USE_MOCKS`: Set to `"true"` to enable dictionary API mocks.
- Any other API keys or server params as needed.

---

## Running the Server

- **Development mode:**

```bash
yarn dev
```

This runs the server with automatic rebuild and reload (via nodemon), reading env vars from `nodemon.json` or `.env`.

- **Production mode:**

```bash
yarn prod
```

Builds and runs the compiled server.

---

## Testing

- The test suite includes **unit** and **integration** tests using Jest.
- **MongoDB must be running** before running tests, as tests require database connectivity.
- Run tests with:

```bash
yarn test
```

or

```bash
yarn test:watch
```

- To check coverage:

```bash
yarn coverage
```

## API Integration Details

- We use the Merriam-Webster Dictionary API for dictionary data, such as definitions, audio pronunciations, and synonyms.
- Mocks for dictionary API calls are available to speed up development and testing without external requests.
- To enable mock data mode, set the environment variable:

```
USE_MOCKS=true
```

## Notes

- Always ensure MongoDB is running before starting the server or running tests.
- Use the `.env.example` as a guide to set up environment variables correctly.
- For further details on the GraphQL schema and generated types, see the `codegen` scripts and generated files.
