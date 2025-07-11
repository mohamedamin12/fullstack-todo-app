# Fullstack Todo App

A fullstack MERN (MongoDB, Express, React, Node.js) application for managing your daily tasks. The app allows users to add, edit, complete, and delete tasks with a modern, responsive UI and a robust backend API.

## Features

- Add new tasks with a title and optional description
- Edit task title and description
- Mark tasks as completed or pending
- Delete tasks with confirmation
- Filter tasks by all, completed, or pending
- Responsive and modern UI (Material UI)
- Real-time updates (no page reloads)

## Tech Stack

- **Frontend:** React, Vite, Material UI, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, Zod (validation)

## Folder Structure

```
todo-app/
  client/      # React frontend
  server/      # Express backend
  README.md    # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### 1. Clone the repository

```bash
git clone <repo-url>
cd todo-app
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder with the following:

```
MONGO_URI=<your-mongodb-connection-string>
NODE_ENV=development
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

The backend will run on [http://localhost:5000](http://localhost:5000)

### 3. Setup the Frontend

```bash
cd ../client
npm install
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173) (default Vite port)

## API Endpoints

All endpoints are prefixed with `/api/tasks`.

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /api/tasks     | Get all tasks     |
| POST   | /api/tasks     | Create a new task |
| PUT    | /api/tasks/:id | Update a task     |
| DELETE | /api/tasks/:id | Delete a task     |

### Task Object Structure

```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "isCompleted": "boolean",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Example: Create Task

```http
POST /api/tasks
Content-Type: application/json
{
  "title": "Buy groceries",
  "description": "Milk, Bread, Eggs"
}
```

### Example: Update Task

```http
PUT /api/tasks/:id
Content-Type: application/json
{
  "title": "Buy groceries and fruits",
  "isCompleted": true
}
```

## Validation

- **Create Task:** `title` (required, string), `description` (optional, string)
- **Update Task:** `title` (optional, string), `description` (optional, string), `isCompleted` (optional, boolean)

## License

This project is open source and available under the [MIT License](LICENSE).

---

Feel free to contribute or open issues for suggestions and improvements!
