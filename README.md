Here's a sample README for your project:

---

# Task Management API

This is a simple **Task Management API** built using **Node.js**, **Express**, and **MongoDB**. The API allows you to create, read, update, and delete tasks with basic functionality such as task status management.

## Features
- **Create a task** with a title and description.
- **Retrieve all tasks** or a specific task by its ID.
- **Update task status** (Pending, In-progress, or Completed).
- **Delete a task** by its ID.

## Requirements
- Node.js
- Express
- MongoDB

## Setup and Installation

### 1. Clone the repository
```bash
git clone https://github.com/YOGANAND2003/Bytiv-task.git
```

### 2. Navigate to the project directory
```bash
cd Backend
```

### 3. Install dependencies
```bash
npm install
```

### 4. Set up MongoDB
Ensure you have **MongoDB** installed and running locally. If you need help with this, refer to the [MongoDB installation guide](https://docs.mongodb.com/manual/installation/).

### 5. Run the server
```bash
node index.js
```
The server will start on `http://localhost:3000`.

## API Endpoints

### 1. **POST /addtask**: Create a new task
Create a new task with a title and description.

#### Request Body:
```json
{
    "title": "New Task",
    "description": "This is a new task"
}
```

#### Response:
```json
{
    "_id": "taskId",
    "title": "New Task",
    "description": "This is a new task",
    "status": "pending"
}
```

### 2. **GET /gettasks**: Fetch all tasks
Retrieve a list of all tasks.

#### Response:
```json
[
    {
        "_id": "taskId",
        "title": "New Task",
        "description": "This is a new task",
        "status": "pending"
    },
    {
        "_id": "anotherTaskId",
        "title": "Another Task",
        "description": "This is another task",
        "status": "in-progress"
    }
]
```

### 3. **GET /tasks/:id**: Fetch a task by its ID
Retrieve a task by its unique ID.

#### URL Parameter:
- `id` - The ID of the task.

#### Response:
```json
{
    "_id": "taskId",
    "title": "New Task",
    "description": "This is a new task",
    "status": "pending"
}
```

### 4. **PUT /task/update/:id**: Update the task status
Update the status of a task to one of the following: `pending`, `in-progress`, or `completed`.

#### URL Parameter:
- `id` - The ID of the task.

#### Request Body:
```json
{
    "status": "in-progress"
}
```

#### Response:
```json
{
    "_id": "taskId",
    "title": "New Task",
    "description": "This is a new task",
    "status": "in-progress"
}
```

### 5. **DELETE /deletetask/:id**: Delete a task by its ID
Delete a task by its unique ID.

#### URL Parameter:
- `id` - The ID of the task.

#### Response:
```json
{
    "message": "Task deleted successfully"
}
```

## Error Handling
- **400 Bad Request**: Returned when invalid data is provided.
- **404 Not Found**: Returned when a task with the given ID does not exist.
- **500 Internal Server Error**: Returned for server-side issues.

## Testing the API

You can test the API using **Postman** or **cURL**. Below are example commands for **cURL**:

### Create a Task (POST)
```bash
curl -X POST http://localhost:3000/addtask -H "Content-Type: application/json" -d '{"title": "New Task", "description": "This is a new task"}'
```

### Fetch All Tasks (GET)
```bash
curl http://localhost:3000/gettasks
```

### Fetch a Task by ID (GET)
```bash
curl http://localhost:3000/tasks/{taskId}
```

### Update Task Status (PUT)
```bash
curl -X PUT http://localhost:3000/task/update/{taskId} -H "Content-Type: application/json" -d '{"status": "in-progress"}'
```

### Delete a Task (DELETE)
```bash
curl -X DELETE http://localhost:3000/deletetask/{taskId}
```


---

Feel free to adjust the details (like the repository link) to fit your project.
