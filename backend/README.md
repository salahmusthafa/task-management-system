# Task Management System Backend (.NET 8 Minimal API)

## Prerequisites
- .NET 8 SDK
- SQL Server (local or remote)

## Setup

1. **Configure the database connection string**
   - Edit `appsettings.json` and update `DefaultConnection` under `ConnectionStrings` with your SQL Server details.

2. **Install dependencies**
   - Run:
     ```sh
     dotnet restore
     ```

3. **Create the database and Tasks table**
   - Run the SQL script below in your SQL Server:

```sql
CREATE TABLE Tasks (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    DueDate DATETIME2 NOT NULL
);
```

4. **Run the API**
   - From the `backend` directory, run:
     ```sh
     dotnet run
     ```
   - The API will be available at `http://localhost:5000` (or the port shown in the console).

5. **API Endpoints**
   - `GET    /api/tasks`         - List all tasks
   - `GET    /api/tasks/{id}`    - Get a specific task
   - `POST   /api/tasks`         - Create a new task
   - `PUT    /api/tasks/{id}`    - Update a task
   - `DELETE /api/tasks/{id}`    - Delete a task

## Notes
- The API uses Dapper for data access.
- Make sure your SQL Server is running and accessible from your machine.
- For development, you can use [SQL Server Developer Edition](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or [SQL Server Docker image](https://hub.docker.com/_/microsoft-mssql-server). 