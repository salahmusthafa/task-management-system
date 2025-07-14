# Backend (.NET API)

This is the backend API for the Task Management System, built with .NET 8, Dapper, and SQL Server.

## Prerequisites
- .NET 8 SDK
- SQL Server (local or cloud)

## Setup Instructions
1. Restore dependencies:
   ```sh
   dotnet restore
   ```
2. Build the project:
   ```sh
   dotnet build
   ```
3. Update the connection string in `appsettings.json` as needed.
4. Run the API:
   ```sh
   dotnet run
   ```
   The API will be available at `http://localhost:5168` (default).

## Database Setup
- Use the provided SQL script (`TaskManagementSystem.sql`) to create the database and `TaskCard` table.
- Example connection string in `appsettings.json`:
  ```json
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=TaskManagementSystem;User Id=sa;Password=your_password;TrustServerCertificate=True;"
  }
  ```

## API Endpoints

| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| GET    | /api/tasks              | List all tasks (with filter/pagination) |
| GET    | /api/tasks/{id}         | Get a specific task        |
| POST   | /api/tasks              | Create a new task          |
| PUT    | /api/tasks/{id}         | Update a task              |
| DELETE | /api/tasks/{id}         | Delete a task              |

### Example Task Object
```json
{
  "id": 1,
  "title": "Sample Task",
  "description": "Description here",
  "status": "To Do",
  "dueDate": "2024-12-31T23:59:59Z"
}
```

### Status Codes
- 200 OK: Success
- 201 Created: Resource created
- 400 Bad Request: Validation error
- 404 Not Found: Task not found
- 500 Internal Server Error: Server error

## Running Tests
```sh
dotnet test
```

## Assumptions & Limitations
- No authentication/authorization in MVP
- Minimal validation and error handling
- Date/times are in UTC (ISO 8601)

## Contact
For questions, contact your project lead or maintainer. 