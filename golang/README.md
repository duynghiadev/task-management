All APIs are called in this folder `task-management`

---

# Task Management API

This is a task management API built using Go (Golang), Gin framework, and MySQL. The API allows users to perform CRUD operations on tasks, including creating, retrieving, updating, and deleting tasks. The project also uses environment variables to store sensitive information such as database credentials.

## Project Structure

```
task-management-api/
│
├── .env                   # Environment variables for database connection
├── main.go                # Main Go application entry point
├── go.mod                 # Go modules dependencies
├── go.sum                 # Go modules checksums
└── README.md              # Project documentation
```

## Environment Setup

To set up the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/task-management-api.git
   cd task-management-api
   ```

2. **Install Go dependencies**:

   Make sure Go is installed and run the following command to install the required dependencies:

   ```bash
   go mod tidy
   ```

3. **Set up `.env` file**:

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   DB_USER=root
   DB_PASSWORD=duynghia123
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=task_management
   DB_CHARSET=utf8mb4
   DB_LOC=Local
   ```

4. **Run the application**:

   To start the server, run:

   ```bash
   go run main.go
   ```

   The API will be accessible at `http://localhost:8080`.

## API Endpoints

### 1. **GET /tasks**

Fetches a list of all tasks.

**Request:**

```http
GET http://localhost:8080/tasks
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "Task 1",
    "description": "Description of Task 1",
    "status": "pending",
    "created_at": "2025-01-01T12:00:00Z",
    "updated_at": "2025-01-01T12:00:00Z"
  },
  {
    "id": 2,
    "title": "Task 2",
    "description": "Description of Task 2",
    "status": "in-progress",
    "created_at": "2025-01-02T12:00:00Z",
    "updated_at": "2025-01-02T12:00:00Z"
  }
]
```

### 2. **GET /tasks/:id**

Fetches a specific task by ID.

**Request:**

```http
GET http://localhost:8080/tasks/{id}
```

**Response:**

```json
{
  "id": 1,
  "title": "Task 1",
  "description": "Description of Task 1",
  "status": "pending",
  "created_at": "2025-01-01T12:00:00Z",
  "updated_at": "2025-01-01T12:00:00Z"
}
```

### 3. **POST /tasks**

Creates a new task.

**Request:**

```http
POST http://localhost:8080/tasks
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "New Task",
  "description": "Description of new task",
  "status": "pending"
}
```

**Response:**

```json
{
  "id": 3,
  "title": "New Task",
  "description": "Description of new task",
  "status": "pending",
  "created_at": "2025-01-03T12:00:00Z",
  "updated_at": "2025-01-03T12:00:00Z"
}
```

### 4. **PATCH /tasks/:id**

Updates an existing task.

**Request:**

```http
PATCH http://localhost:8080/tasks/{id}
Content-Type: application/json
```

**Request Body:**

```json
{
  "status": "completed"
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Task 1",
  "description": "Description of Task 1",
  "status": "completed",
  "created_at": "2025-01-01T12:00:00Z",
  "updated_at": "2025-01-03T12:00:00Z"
}
```

### 5. **DELETE /tasks/:id**

Deletes a specific task by ID.

**Request:**

```http
DELETE http://localhost:8080/tasks/{id}
```

**Response:**

```json
{
  "message": "Task deleted successfully"
}
```

## Testing with Postman

You can test the API using [Postman](https://www.postman.com/). Here’s how to do it:

1. **Start the server** by running `go run main.go`.
2. **Open Postman** and make requests to the API endpoints.
   - Set the method to `GET`, `POST`, `PATCH`, or `DELETE` depending on the operation you want to test.
   - For `POST` and `PATCH`, make sure to set the `Content-Type` to `application/json` and provide a valid JSON body.

### Example Postman Request for Creating a Task:

- **URL**: `http://localhost:8080/tasks`
- **Method**: `POST`
- **Body** (raw, JSON):
  ```json
  {
    "title": "New Task",
    "description": "This is a new task",
    "status": "pending"
  }
  ```
