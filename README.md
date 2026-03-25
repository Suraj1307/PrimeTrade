# PrimeTrade Task Manager

A backend-focused internship assignment built on the MERN stack. I kept it close to the kind of full-stack apps I actually build — a task management system with auth, role-based access, and a small React frontend to test the APIs end to end.

The backend architecture and API design are the main focus. The frontend is minimal, just enough to show the full flow working.

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- express-validator for request validation
- React.js with hooks
- Axios
- Basic CSS

## Features

- User registration and login
- Password hashing with bcryptjs
- JWT-based authentication
- Protected routes with auth middleware
- Role-based access (`user` and `admin`)
- Role selection during registration for easier RBAC testing
- Task CRUD APIs
- Admins can view all tasks and delete any task
- Users can view and update only their own tasks
- Centralized error handling
- Validation on auth and task routes
- Postman collection for API testing
- Simple React dashboard to test backend APIs

## Folder Structure
```text
PrimeTrade/
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

## Setup

### 1. Clone and move into the project
```bash
git clone https://github.com/Suraj1307/PrimeTrade.git
cd PrimeTrade
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
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
```

Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:5000`.

## API Overview

### Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Task Routes

- `POST /api/tasks`
- `GET /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id` — admin only

### Response Format
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {}
}
```

## Architecture Decisions

I kept the backend modular — controllers, routes, middleware, and models each have a clear job. It's easier to read and extend without logic piling up in one file.

JWT made sense here because it works well with a separate frontend and keeps protected routes straightforward. MongoDB fits naturally given the flexible document structure, and I'm already comfortable with Mongoose from other MERN projects.

## API Documentation

A Postman collection is included at:
```
postman/PrimeTrade-Task-Manager.postman_collection.json
```

Import it into Postman, set the `token` variable after login, and all auth and task routes are ready to test.

## If This Grew

The modular setup makes it easy to add features without touching unrelated parts. If the app scaled, I'd separate services by domain, add Redis for caching frequently requested data, put rate limiting on auth routes, and use Docker for consistent deployment.

## Future Improvements

- Redis caching for frequently accessed task data
- Service separation if the app expands to multiple domains
- Rate limiting on auth routes
- Docker setup for both frontend and backend

## Notes

- Admins can view all tasks and delete any task.
- Regular users can create tasks, view their own, and update their own.
- Role selection at registration is there to make RBAC testing straightforward during the assignment.
- The frontend stores JWT in `localStorage` — fine for this project, but worth revisiting in production.
