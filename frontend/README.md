# Frontend (React)

This is the frontend for the Task Management System, built with React, TypeScript, and Vite.

## Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

## Setup Instructions
1. Install dependencies:
   ```sh
   npm install
   ```
2. Run the app in development mode:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (default).
3. To build for production:
   ```sh
   npm run build
   ```

## Running Tests
```sh
npm test
```

## Project Structure
```
src/
  components/    # Reusable UI components
  pages/         # Page-level components (TaskList, TaskDetail, TaskForm)
  services/      # API service layer
  types/         # TypeScript types
```

## API URL Configuration
- The frontend expects the backend API at `http://localhost:5168` by default.
- To change, edit the `baseURL` in `src/services/api.ts`.

## Assumptions & Limitations
- No authentication/authorization in MVP
- Minimal validation and error handling
- Date/times are in UTC (ISO 8601)

## Contact
For questions, contact your project lead or maintainer.
