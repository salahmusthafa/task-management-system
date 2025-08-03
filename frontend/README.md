# Task Management System Frontend

This is the frontend application for the Task Management System built with React, TypeScript, and Vite.

## Features

### Dynamic Pagination
The task list now features dynamic pagination that automatically adjusts the number of cards displayed based on the browser window size:

- **Responsive Design**: The page size automatically calculates how many task cards can fit in the current viewport
- **Real-time Updates**: When you resize the browser window, the page size updates automatically with a 150ms debounce
- **Responsive Breakpoints**: 
  - Mobile (≤480px): Single column layout
  - Tablet (≤768px): Smaller cards with multiple columns
  - Desktop (>768px): Full responsive grid
- **Smart Limits**: Page size is constrained between 6 and 24 cards for optimal performance
- **Visual Indicator**: Shows the current number of cards per page in the header

### How it Works
The system calculates the available space by:
1. Measuring the viewport dimensions
2. Accounting for header, pagination, and padding space
3. Calculating how many cards can fit in the available area
4. Applying responsive breakpoints for different screen sizes
5. Setting reasonable minimum and maximum limits

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Testing

The application includes comprehensive tests for:
- Task card components
- API services
- Utility functions
- Dynamic pagination functionality

Run tests with:
```bash
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
- To change, edit the `baseURL` in `src/services/taskApi.ts`.

## Assumptions & Limitations
- No authentication/authorization in MVP
- Minimal validation and error handling
- Date/times are in UTC (ISO 8601)

## Contact
For questions, contact salahmusthafa2@gmail.com
