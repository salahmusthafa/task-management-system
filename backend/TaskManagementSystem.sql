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

-- Insert 30 sample tasks with diverse content and mixed due dates (past, present, future)
INSERT INTO TaskCard (Title, Description, Status, DueDate) VALUES
('Design user interface mockups', 'Create wireframes and mockups for the new dashboard interface using Figma. Focus on user experience and accessibility standards.', 'In Progress', DATEADD(day, 5, GETDATE())),
('Implement user authentication system', 'Develop secure login and registration functionality with JWT tokens and password hashing. Include password reset capabilities.', 'To Do', DATEADD(day, 12, GETDATE())),
('Write API documentation', 'Create comprehensive API documentation using Swagger/OpenAPI. Include examples, error codes, and authentication details.', 'Done', DATEADD(day, -3, GETDATE())),
('Set up automated testing pipeline', 'Configure unit tests, integration tests, and end-to-end tests. Set up CI/CD pipeline to run tests automatically.', 'In Progress', DATEADD(day, 8, GETDATE())),
('Optimize database performance', 'Analyze slow queries and implement database indexing. Consider query optimization and connection pooling.', 'To Do', DATEADD(day, 15, GETDATE())),
('Create mobile responsive design', 'Ensure all pages work seamlessly on mobile devices. Test on various screen sizes and implement touch-friendly interactions.', 'Done', DATEADD(day, -7, GETDATE())),
('Implement real-time notifications', 'Add WebSocket functionality for real-time task updates and notifications. Include push notifications for mobile.', 'To Do', DATEADD(day, 20, GETDATE())),
('Conduct security audit', 'Perform comprehensive security review of the application. Check for vulnerabilities, SQL injection, and XSS attacks.', 'In Progress', DATEADD(day, 3, GETDATE())),
('Deploy to production environment', 'Set up production server and deploy the application. Configure SSL certificates and domain settings.', 'To Do', DATEADD(day, 25, GETDATE())),
('Create user onboarding flow', 'Design and implement a smooth onboarding experience for new users. Include tutorials and guided tours.', 'Done', DATEADD(day, -5, GETDATE())),
('Implement search functionality', 'Add advanced search with filters, sorting, and pagination. Include full-text search capabilities.', 'In Progress', DATEADD(day, 10, GETDATE())),
('Set up monitoring and logging', 'Configure application monitoring, error tracking, and performance logging. Set up alerts for critical issues.', 'To Do', DATEADD(day, 18, GETDATE())),
('Create backup and recovery system', 'Implement automated database backups and disaster recovery procedures. Test restore functionality.', 'Done', DATEADD(day, -2, GETDATE())),
('Design data visualization charts', 'Create interactive charts and graphs for task analytics. Include progress tracking and performance metrics.', 'In Progress', DATEADD(day, 7, GETDATE())),
('Implement file upload feature', 'Add secure file upload functionality with size limits and file type validation. Include image preview capabilities.', 'To Do', DATEADD(day, 14, GETDATE())),
('Create user role management', 'Implement role-based access control with different permission levels. Include admin, manager, and user roles.', 'Done', DATEADD(day, -10, GETDATE())),
('Optimize frontend performance', 'Implement code splitting, lazy loading, and bundle optimization. Reduce initial load time and improve user experience.', 'In Progress', DATEADD(day, 6, GETDATE())),
('Set up email integration', 'Configure email service for notifications and alerts. Include email templates and delivery tracking.', 'To Do', DATEADD(day, 22, GETDATE())),
('Create API rate limiting', 'Implement rate limiting to prevent abuse and ensure fair usage. Include IP-based and user-based limits.', 'Done', DATEADD(day, -8, GETDATE())),
('Design dark mode theme', 'Create a dark mode theme option with proper color contrast and accessibility compliance.', 'In Progress', DATEADD(day, 9, GETDATE())),
('Implement task dependencies', 'Add support for task dependencies and prerequisites. Include dependency visualization and validation.', 'To Do', DATEADD(day, 16, GETDATE())),
('Create automated reporting system', 'Generate automated reports for project progress, team performance, and task completion metrics.', 'Done', DATEADD(day, -4, GETDATE())),
('Set up multi-language support', 'Implement internationalization (i18n) for multiple languages. Include language selection and translation management.', 'In Progress', DATEADD(day, 11, GETDATE())),
('Implement task templates', 'Create reusable task templates for common workflows. Include template management and customization options.', 'To Do', DATEADD(day, 19, GETDATE())),
('Create user feedback system', 'Add feedback collection and rating system. Include feedback analysis and improvement tracking.', 'Done', DATEADD(day, -6, GETDATE())),
('Optimize database queries', 'Review and optimize slow database queries. Add proper indexing and query caching strategies.', 'In Progress', DATEADD(day, 4, GETDATE())),
('Implement task time tracking', 'Add time tracking functionality for tasks. Include time logging, reporting, and productivity analytics.', 'To Do', DATEADD(day, 17, GETDATE())),
('Create data export functionality', 'Implement data export in various formats (CSV, Excel, PDF). Include custom report generation.', 'Done', DATEADD(day, -9, GETDATE())),
('Set up automated backups', 'Configure automated database and file backups. Include backup verification and restore testing procedures.', 'In Progress', DATEADD(day, 13, GETDATE())),
('Implement task comments system', 'Add commenting functionality for tasks. Include threaded comments and notification system.', 'To Do', DATEADD(day, 21, GETDATE())),
('Create user activity dashboard', 'Design dashboard showing user activity, task completion rates, and productivity metrics.', 'Done', DATEADD(day, -1, GETDATE())),
('Set up error monitoring', 'Configure error tracking and alerting system. Include error categorization and resolution tracking.', 'In Progress', DATEADD(day, 5, GETDATE())),
('Implement task archiving', 'Add functionality to archive completed tasks. Include archive search and restoration capabilities.', 'To Do', DATEADD(day, 23, GETDATE()));
GO 