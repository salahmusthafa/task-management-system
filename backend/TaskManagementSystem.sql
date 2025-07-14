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

-- Insert sample tasks
INSERT INTO TaskCard (Title, Description, Status, DueDate) VALUES
('Prepare project kickoff', 'Organize the initial project kickoff meeting with all stakeholders.', 'To Do', '2024-07-10T10:00:00'),
('Design database schema', 'Draft and review the initial database schema for the MVP.', 'In Progress', '2024-07-05T17:00:00'),
('Deploy prototype to staging', 'Deploy the first working prototype to the staging environment for internal review.', 'Done', '2024-06-28T15:00:00'),
('Write user stories', 'Document user stories for all MVP features.', 'To Do', '2024-07-12T12:00:00'),
('Implement authentication', 'Add authentication logic (optional for MVP, but planned).', 'In Progress', '2024-07-08T09:00:00'),
('Fix UI bugs', 'Resolve reported UI bugs from the last sprint.', 'Done', '2024-06-30T18:00:00'),
('Set up CI/CD pipeline', 'Configure continuous integration and deployment for the project.', 'To Do', '2024-07-15T11:00:00'),
('Review codebase', 'Conduct a code review session with the development team.', 'In Progress', '2024-07-06T14:00:00'),
('Update documentation', 'Update the README and API documentation for the latest changes.', 'Done', '2024-07-01T16:00:00'),
('Plan sprint tasks', 'Break down the next sprint into actionable tasks.', 'To Do', '2024-07-13T10:30:00'),
('Optimize database queries', 'Improve the performance of slow SQL queries.', 'In Progress', '2024-07-09T13:00:00'),
('Conduct user testing', 'Organize a user testing session with pilot customers.', 'Done', '2024-07-02T15:30:00'),
('Integrate email notifications', 'Add email notifications for task assignments and updates.', 'To Do', '2024-07-16T09:00:00'),
('Refactor frontend components', 'Refactor React components for better reusability.', 'In Progress', '2024-07-07T12:00:00'),
('Archive completed tasks', 'Move completed tasks to the archive for record-keeping.', 'Done', '2024-07-03T17:00:00'),
('Schedule team retrospective', 'Set up a meeting to review the last sprint and discuss improvements.', 'To Do', '2024-07-14T11:30:00');
GO 