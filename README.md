# Task Manager (MERN)

Full stack task manager where users can register, log in, and create, update, complete and delete their own tasks.

**Tech stack:** MongoDB, Express.js, React.js (Vite), Node.js, JWT, bcrypt

## Features
- User registration and login with JWT authentication
- Passwords hashed with bcrypt
- Create, read, update and delete tasks (only your own tasks)
- Mark tasks as completed
- Responsive React UI with reusable components

## Setup

### 1. Backend
```bash
cd server
npm install
cp .env.example .env     # then fill in your values
npm run dev
```

### 2. Frontend
```bash
cd client
npm install
npm run dev
```
Frontend runs on http://localhost:5173 and proxies `/api` to the backend on port 5000.

## API Endpoints
| Method | Route | Description | Auth |
|---|---|---|---|
| POST | /api/auth/register | Register user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/tasks | Get my tasks | Yes |
| POST | /api/tasks | Create task | Yes |
| PUT | /api/tasks/:id | Update task | Yes |
| DELETE | /api/tasks/:id | Delete task | Yes |
