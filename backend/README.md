# Task Management System Backend

This is the backend API for the Task Management System built with ASP.NET Core, Dapper, and SQL Server.

## Features

- RESTful API for task management
- SQL Server database with Dapper ORM
- Comprehensive CRUD operations
- Pagination and filtering support
- Swagger/OpenAPI documentation

## Setup

### Prerequisites
- .NET 8.0 SDK
- SQL Server (LocalDB, Express, or Full)
- Visual Studio 2022 or VS Code

### Database Setup
1. Run the SQL script to create the database:
   ```sql
   sqlcmd -S localhost -i TaskManagementSystem.sql
   ```

### Sample Data
The `TaskManagementSystem.sql` script includes 30 sample tasks that are automatically created when you run the database setup script.

### Running the Application
```bash
dotnet run
```

The API will be available at `https://localhost:7001` (or the configured port).

## API Endpoints

- `GET /api/tasks` - Get all tasks with pagination and filtering
- `GET /api/tasks/{id}` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update an existing task
- `DELETE /api/tasks/{id}` - Delete a task

## Testing

Run the tests with:
```bash
dotnet test
``` 