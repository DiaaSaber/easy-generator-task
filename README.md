# Easy Generator Full-Stack Task

This is a **full-stack** application (NestJS + MongoDB + React) demonstrating user authentication (sign-up, sign-in), protected routes, and Docker-based deployment.

## Overview

- **Backend**: NestJS (TypeScript) with Mongoose for MongoDB.
- **Frontend**: React + Vite (TypeScript) served by nginx.
- **Database**: MongoDB container.

We use **Docker Compose** to orchestrate everything. No need to install Node or Mongo locally — Docker takes care of that.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

---

## Getting Started

1. **Clone** this repository:
2. **Build and run** all services with Docker Compose:
   ```
   docker-compose up --build
   ```
   This will:

    - Pull the `mongo` image
    - Build the **backend** (NestJS) image
    - Build the **frontend** (React) image
    - Start all containers (Mongo, backend on port 3000, frontend on port 80 inside the container → mapped to host port 5173)

3. **Access the application**:

   - **Frontend**: [http://localhost:5173](http://localhost:5173/)
   - **Sign In**: [http://localhost:5173/signin](http://localhost:5173/signin)
   - **Sign Up**: http://localhost:5173/signup
   - **Welcome Page**: http://localhost:5173/welcome (this is a protected route, you have to be logged in to access it)
   - **Swagger Docs**: [http://localhost:3000/api](http://localhost:3000/api)

---
### Backend Endpoints

-   **`POST /auth/signup`**
-   **`POST /auth/signin`**

#### Protected Endpoints

-   **`GET /users/profile`**
    -   Requires `Authorization: Bearer <token>` header.
    -   Returns the user profile (id, name, email).
-   **`PATCH /users/profile`**
    -   Requires `Authorization: Bearer <token>`.
    -   Body: `{ name: string }`
    -   Returns the updated user.


