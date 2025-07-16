# Task Management System

A lightweight, intuitive web application for managing daily tasks and team assignments. Built with React.js (frontend), .NET (backend), and SQL Server (database).

## 📁 Repository
**GitHub:** [https://github.com/salahmusthafa/task-management-system](https://github.com/salahmusthafa/task-management-system)

## Features
- Create, assign, and manage tasks
- Track progress (To Do, In Progress, Done)
- Set due dates and priorities
- Filter and paginate tasks
- Responsive UI
- API and UI tests

## Folder Structure
```
task-management-system/
  README.md                # (this file)
  backend/                 # .NET backend API
    README.md
  frontend/                # React frontend
    README.md
  TaskManagementSystem.postman_collection.json # Postman API collection
```

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- .NET 8 SDK
- SQL Server (local or cloud)

### 1. Backend Setup
See [backend/README.md](./backend/README.md) for detailed instructions.

### 2. Frontend Setup
See [frontend/README.md](./frontend/README.md) for detailed instructions.

### 3. Database Setup
- Use the provided SQL script in `backend/` to create the database and tables.
- Update the connection string in `backend/appsettings.json` as needed.

### 4. API Testing
- Import `TaskManagementSystem.postman_collection.json` into Postman.
- Set the `baseUrl` variable to your backend URL (e.g., `http://localhost:5168`).

## API Documentation
- See [backend/README.md](./backend/README.md) for full API docs and endpoint details.

## Running Tests
- Backend: `dotnet test` in the `backend/` folder
- Frontend: `npm test` in the `frontend/` folder

## Assumptions & Limitations
- No authentication/authorization in MVP
- Designed for local/dev use; production hardening needed
- Date/times are in UTC (ISO 8601)
- Only basic validation and error handling in MVP

## Credits
Developed for TaskFlow Solutions by Salah Musthafa. For questions, contact salahmusthafa2@gmail.com.