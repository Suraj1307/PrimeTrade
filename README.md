# PrimeTrade Task Manager

This project is a backend-focused internship assignment built with the MERN stack mindset. I wanted it to feel like something I would actually build during practice: a simple but clean task management app with authentication, role-based access, and a lightweight frontend to test the APIs without needing Postman for every action.

The backend is the main focus here, but I added a small React frontend so the auth flow and task CRUD can be tested end to end.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- express-validator for request validation
- React.js with hooks
- Axios
- Basic CSS

## Features Implemented

- User registration and login
- Role selection during registration
- Password hashing with bcryptjs
- JWT-based authentication
- Protected routes with auth middleware
- Role-based access using `user` and `admin`
- Task CRUD APIs
- Admin-only task deletion
- Centralized error handling
- Validation for auth and task routes
- Postman collection for API testing
- Simple React dashboard for testing the backend

## Folder Structure

```text
Primetrade/
|-- backend/
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- middleware/
|   |   |-- models/
|   |   |-- routes/
|   |   |-- utils/
|   |   |-- validators/
|   |   |-- app.js
|   |   `-- server.js
|-- frontend/
|   |-- public/
|   `-- src/
|-- postman/
|-- backend/.env
|-- frontend/.env
`-- README.md
```

## Setup Steps

### 1. Clone and move into the project

```bash
git clone <your-repo-url>
cd Primetrade
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/primetrade
JWT_SECRET=your_jwt_secret_here
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Frontend runs on `http://localhost:3000` and backend runs on `http://localhost:5000`.

## API Overview

### Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Task Routes

- `POST /api/tasks`
- `GET /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id` - admin only

### Response Format

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {}
}
```

## Why I Chose This Architecture

I kept the backend modular because it makes the code easier to read and maintain when features grow. Separating controllers, routes, middleware, and models is a pattern I have used in my CRUD and chat app projects, and it helps keep business logic out of route files.

JWT authentication felt like the right choice here because it is simple to use in a frontend-backend project and works well for protected APIs. MongoDB also fits naturally because of its flexible document structure, and I am already comfortable using Mongoose from MERN projects.

## API Documentation

A ready-to-use Postman collection is available here:

- `postman/PrimeTrade-Task-Manager.postman_collection.json`

You can import it into Postman, update the `token` variable after login, and test all auth/task routes quickly.

## Future Improvements

- Add Redis caching for frequently accessed task data
- Split services if the app grows into multiple domains
- Add rate limiting for auth-heavy routes
- Dockerize both frontend and backend for easier setup

## Notes

- Admin users can view all tasks and delete tasks.
- Registration supports both `user` and `admin` roles for easier testing of RBAC flows.
- Normal users can create, view, and update only their own tasks.
- The frontend stores JWT in `localStorage` for simplicity in this assignment project.
