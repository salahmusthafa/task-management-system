-- TaskManagementSystem.sql
-- SQL Server setup script for Task Management System

-- Create database
CREATE DATABASE TaskManagementSystem;
GO

USE TaskManagementSystem;
GO

-- Create TaskCard table
CREATE TABLE TaskCard (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    DueDate DATETIME2 NOT NULL
);
GO

-- Insert sample tasks with randomly mixed due dates (past, present, future)
INSERT INTO TaskCard (Title, Description, Status, DueDate) VALUES
('Implement authentication', 'Add authentication logic (optional for MVP, but planned).', 'In Progress', GETDATE()),
('Integrate email notifications', 'Add email notifications for task assignments and updates.', 'To Do', DATEADD(day, 14, GETDATE())),
('Prepare project kickoff', 'Organize the initial project kickoff meeting with all stakeholders.', 'To Do', DATEADD(day, -15, GETDATE())),
('Plan sprint tasks', 'Break down the next sprint into actionable tasks.', 'To Do', DATEADD(day, 7, GETDATE())),
('Design database schema', 'Draft and review the initial database schema for the MVP.', 'In Progress', DATEADD(day, -8, GETDATE())),
('Fix UI bugs', 'Resolve reported UI bugs from the last sprint.', 'Done', DATEADD(day, 1, GETDATE())),
('Archive completed tasks', 'Move completed tasks to the archive for record-keeping.', 'Done', DATEADD(day, 18, GETDATE())),
('Write user stories', 'Document user stories for all MVP features.', 'To Do', DATEADD(day, -5, GETDATE())),
('Refactor frontend components', 'Refactor React components for better reusability.', 'In Progress', DATEADD(day, 16, GETDATE())),
('Review codebase', 'Conduct a code review session with the development team.', 'In Progress', DATEADD(day, 2, GETDATE())),
('Set up CI/CD pipeline', 'Configure continuous integration and deployment for the project.', 'To Do', DATEADD(day, -3, GETDATE())),
('Conduct user testing', 'Organize a user testing session with pilot customers.', 'Done', DATEADD(day, 10, GETDATE())),
('Update documentation', 'Update the README and API documentation for the latest changes.', 'Done', DATEADD(day, 3, GETDATE())),
('Schedule team retrospective', 'Set up a meeting to review the last sprint and discuss improvements.', 'To Do', DATEADD(day, 21, GETDATE())),
('Deploy prototype to staging', 'Deploy the first working prototype to the staging environment for internal review.', 'Done', DATEADD(day, -1, GETDATE())),
('Optimize database queries', 'Improve the performance of slow SQL queries.', 'In Progress', DATEADD(day, 8, GETDATE())),
('Prepare quarterly review', 'Compile all project metrics and prepare presentation for quarterly review.', 'To Do', DATEADD(day, 30, GETDATE()));
GO 