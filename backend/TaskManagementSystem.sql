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

-- Insert 100 sample tasks with diverse content and mixed due dates (past, present, future)
INSERT INTO TaskCard (Title, Description, Status, DueDate) VALUES
-- UI/UX Design Tasks (20 tasks)
('Design user interface mockups', 'Create wireframes and mockups for the new dashboard interface using Figma. Focus on user experience and accessibility standards.', 'In Progress', DATEADD(day, 5, GETDATE())),
('Create mobile responsive design', 'Ensure all pages work seamlessly on mobile devices. Test on various screen sizes and implement touch-friendly interactions.', 'Done', DATEADD(day, -7, GETDATE())),
('Design dark mode theme', 'Create a dark mode theme option with proper color contrast and accessibility compliance.', 'In Progress', DATEADD(day, 9, GETDATE())),
('Design user onboarding flow', 'Design and implement a smooth onboarding experience for new users. Include tutorials and guided tours.', 'Done', DATEADD(day, -5, GETDATE())),
('Create user activity dashboard', 'Design dashboard showing user activity, task completion rates, and productivity metrics.', 'Done', DATEADD(day, -1, GETDATE())),
('Design data visualization charts', 'Create interactive charts and graphs for task analytics. Include progress tracking and performance metrics.', 'In Progress', DATEADD(day, 7, GETDATE())),
('Design user feedback system', 'Add feedback collection and rating system. Include feedback analysis and improvement tracking.', 'Done', DATEADD(day, -6, GETDATE())),
('Design task templates interface', 'Create reusable task templates for common workflows. Include template management and customization options.', 'To Do', DATEADD(day, 19, GETDATE())),
('Design task dependencies UI', 'Add support for task dependencies and prerequisites. Include dependency visualization and validation.', 'To Do', DATEADD(day, 16, GETDATE())),
('Design multi-language interface', 'Implement internationalization (i18n) for multiple languages. Include language selection and translation management.', 'In Progress', DATEADD(day, 11, GETDATE())),
('Design file upload interface', 'Add secure file upload functionality with size limits and file type validation. Include image preview capabilities.', 'To Do', DATEADD(day, 14, GETDATE())),
('Design search interface', 'Add advanced search with filters, sorting, and pagination. Include full-text search capabilities.', 'In Progress', DATEADD(day, 10, GETDATE())),
('Design notification center', 'Create a centralized notification system for task updates, reminders, and system alerts.', 'To Do', DATEADD(day, 12, GETDATE())),
('Design user profile pages', 'Create comprehensive user profile pages with avatar upload, preferences, and activity history.', 'In Progress', DATEADD(day, 8, GETDATE())),
('Design task calendar view', 'Implement calendar view for tasks with drag-and-drop functionality and date-based filtering.', 'To Do', DATEADD(day, 15, GETDATE())),
('Design kanban board interface', 'Create a kanban board view with drag-and-drop task management and column customization.', 'In Progress', DATEADD(day, 6, GETDATE())),
('Design task comments UI', 'Add commenting functionality for tasks. Include threaded comments and notification system.', 'To Do', DATEADD(day, 21, GETDATE())),
('Design task time tracking UI', 'Add time tracking functionality for tasks. Include time logging, reporting, and productivity analytics.', 'To Do', DATEADD(day, 17, GETDATE())),
('Design task export interface', 'Implement data export in various formats (CSV, Excel, PDF). Include custom report generation.', 'Done', DATEADD(day, -9, GETDATE())),
('Design task archiving interface', 'Add functionality to archive completed tasks. Include archive search and restoration capabilities.', 'To Do', DATEADD(day, 23, GETDATE())),

-- Backend Development Tasks (20 tasks)
('Implement user authentication system', 'Develop secure login and registration functionality with JWT tokens and password hashing. Include password reset capabilities.', 'To Do', DATEADD(day, 12, GETDATE())),
('Write API documentation', 'Create comprehensive API documentation using Swagger/OpenAPI. Include examples, error codes, and authentication details.', 'Done', DATEADD(day, -3, GETDATE())),
('Optimize database performance', 'Analyze slow queries and implement database indexing. Consider query optimization and connection pooling.', 'To Do', DATEADD(day, 15, GETDATE())),
('Implement real-time notifications', 'Add WebSocket functionality for real-time task updates and notifications. Include push notifications for mobile.', 'To Do', DATEADD(day, 20, GETDATE())),
('Conduct security audit', 'Perform comprehensive security review of the application. Check for vulnerabilities, SQL injection, and XSS attacks.', 'In Progress', DATEADD(day, 3, GETDATE())),
('Deploy to production environment', 'Set up production server and deploy the application. Configure SSL certificates and domain settings.', 'To Do', DATEADD(day, 25, GETDATE())),
('Implement search functionality', 'Add advanced search with filters, sorting, and pagination. Include full-text search capabilities.', 'In Progress', DATEADD(day, 10, GETDATE())),
('Set up monitoring and logging', 'Configure application monitoring, error tracking, and performance logging. Set up alerts for critical issues.', 'To Do', DATEADD(day, 18, GETDATE())),
('Create backup and recovery system', 'Implement automated database backups and disaster recovery procedures. Test restore functionality.', 'Done', DATEADD(day, -2, GETDATE())),
('Create user role management', 'Implement role-based access control with different permission levels. Include admin, manager, and user roles.', 'Done', DATEADD(day, -10, GETDATE())),
('Set up email integration', 'Configure email service for notifications and alerts. Include email templates and delivery tracking.', 'To Do', DATEADD(day, 22, GETDATE())),
('Create API rate limiting', 'Implement rate limiting to prevent abuse and ensure fair usage. Include IP-based and user-based limits.', 'Done', DATEADD(day, -8, GETDATE())),
('Optimize database queries', 'Review and optimize slow database queries. Add proper indexing and query caching strategies.', 'In Progress', DATEADD(day, 4, GETDATE())),
('Set up automated backups', 'Configure automated database and file backups. Include backup verification and restore testing procedures.', 'In Progress', DATEADD(day, 13, GETDATE())),
('Set up error monitoring', 'Configure error tracking and alerting system. Include error categorization and resolution tracking.', 'In Progress', DATEADD(day, 5, GETDATE())),
('Implement task archiving', 'Add functionality to archive completed tasks. Include archive search and restoration capabilities.', 'To Do', DATEADD(day, 23, GETDATE())),
('Implement task dependencies', 'Add support for task dependencies and prerequisites. Include dependency visualization and validation.', 'To Do', DATEADD(day, 16, GETDATE())),
('Create automated reporting system', 'Generate automated reports for project progress, team performance, and task completion metrics.', 'Done', DATEADD(day, -4, GETDATE())),
('Implement task templates', 'Create reusable task templates for common workflows. Include template management and customization options.', 'To Do', DATEADD(day, 19, GETDATE())),
('Implement task comments system', 'Add commenting functionality for tasks. Include threaded comments and notification system.', 'To Do', DATEADD(day, 21, GETDATE())),
('Implement task time tracking', 'Add time tracking functionality for tasks. Include time logging, reporting, and productivity analytics.', 'To Do', DATEADD(day, 17, GETDATE())),

-- Testing & Quality Tasks (20 tasks)
('Set up automated testing pipeline', 'Configure unit tests, integration tests, and end-to-end tests. Set up CI/CD pipeline to run tests automatically.', 'In Progress', DATEADD(day, 8, GETDATE())),
('Write unit tests for authentication', 'Create comprehensive unit tests for user authentication, registration, and password reset functionality.', 'To Do', DATEADD(day, 11, GETDATE())),
('Write integration tests for API', 'Develop integration tests for all API endpoints including error handling and edge cases.', 'In Progress', DATEADD(day, 7, GETDATE())),
('Create end-to-end test suite', 'Implement end-to-end tests using Cypress or Playwright for critical user workflows.', 'To Do', DATEADD(day, 14, GETDATE())),
('Set up performance testing', 'Configure load testing and performance monitoring for database queries and API endpoints.', 'In Progress', DATEADD(day, 6, GETDATE())),
('Implement security testing', 'Add automated security testing including SQL injection, XSS, and authentication bypass tests.', 'To Do', DATEADD(day, 16, GETDATE())),
('Create accessibility testing', 'Implement automated accessibility testing using tools like axe-core and manual testing procedures.', 'Done', DATEADD(day, -3, GETDATE())),
('Set up mobile testing', 'Configure mobile device testing for responsive design and touch interactions across different devices.', 'In Progress', DATEADD(day, 9, GETDATE())),
('Implement browser compatibility testing', 'Test application functionality across different browsers including Chrome, Firefox, Safari, and Edge.', 'To Do', DATEADD(day, 13, GETDATE())),
('Create test data management', 'Set up test data generation and management for consistent testing across environments.', 'Done', DATEADD(day, -5, GETDATE())),
('Implement visual regression testing', 'Add visual regression testing to detect UI changes and ensure design consistency.', 'In Progress', DATEADD(day, 5, GETDATE())),
('Set up code coverage reporting', 'Configure code coverage tools to track test coverage and identify untested code areas.', 'To Do', DATEADD(day, 18, GETDATE())),
('Create API contract testing', 'Implement contract testing for API endpoints to ensure backward compatibility.', 'In Progress', DATEADD(day, 4, GETDATE())),
('Set up database testing', 'Create database testing framework for data integrity and migration testing.', 'To Do', DATEADD(day, 20, GETDATE())),
('Implement error handling tests', 'Add comprehensive error handling tests for all error scenarios and edge cases.', 'Done', DATEADD(day, -7, GETDATE())),
('Create user acceptance testing', 'Develop user acceptance test scenarios for critical business workflows.', 'In Progress', DATEADD(day, 8, GETDATE())),
('Set up automated regression testing', 'Configure automated regression testing to run on every deployment.', 'To Do', DATEADD(day, 15, GETDATE())),
('Implement stress testing', 'Add stress testing for high-load scenarios and concurrent user access.', 'In Progress', DATEADD(day, 6, GETDATE())),
('Create test environment setup', 'Set up dedicated test environments for different testing scenarios.', 'To Do', DATEADD(day, 22, GETDATE())),
('Implement test reporting', 'Create comprehensive test reporting with detailed results and failure analysis.', 'Done', DATEADD(day, -2, GETDATE())),
('Set up continuous testing', 'Configure continuous testing pipeline that runs tests on every code change.', 'In Progress', DATEADD(day, 10, GETDATE())),

-- DevOps & Infrastructure Tasks (20 tasks)
('Set up CI/CD pipeline', 'Configure continuous integration and deployment pipeline using GitHub Actions or Azure DevOps.', 'In Progress', DATEADD(day, 12, GETDATE())),
('Configure Docker containers', 'Create Docker containers for application deployment and ensure consistent environments.', 'To Do', DATEADD(day, 16, GETDATE())),
('Set up Kubernetes cluster', 'Deploy application to Kubernetes cluster for scalable and reliable infrastructure.', 'In Progress', DATEADD(day, 8, GETDATE())),
('Configure load balancer', 'Set up load balancer for high availability and traffic distribution across multiple servers.', 'To Do', DATEADD(day, 20, GETDATE())),
('Implement auto-scaling', 'Configure auto-scaling policies to handle traffic spikes and optimize resource usage.', 'In Progress', DATEADD(day, 6, GETDATE())),
('Set up monitoring dashboard', 'Create comprehensive monitoring dashboard for application performance and health metrics.', 'To Do', DATEADD(day, 14, GETDATE())),
('Configure log aggregation', 'Set up centralized logging system using ELK stack or similar tools.', 'In Progress', DATEADD(day, 9, GETDATE())),
('Implement infrastructure as code', 'Use Terraform or CloudFormation to manage infrastructure as code for consistency.', 'To Do', DATEADD(day, 18, GETDATE())),
('Set up backup automation', 'Configure automated backup systems for databases and file storage with retention policies.', 'In Progress', DATEADD(day, 5, GETDATE())),
('Configure SSL certificates', 'Set up SSL certificates and configure HTTPS for secure communication.', 'To Do', DATEADD(day, 22, GETDATE())),
('Implement blue-green deployment', 'Set up blue-green deployment strategy for zero-downtime deployments.', 'In Progress', DATEADD(day, 7, GETDATE())),
('Configure database clustering', 'Set up database clustering for high availability and read replicas for performance.', 'To Do', DATEADD(day, 19, GETDATE())),
('Set up CDN configuration', 'Configure Content Delivery Network for static assets and improved global performance.', 'In Progress', DATEADD(day, 4, GETDATE())),
('Implement disaster recovery', 'Create disaster recovery plan and procedures for business continuity.', 'To Do', DATEADD(day, 25, GETDATE())),
('Configure security groups', 'Set up network security groups and firewall rules for application security.', 'In Progress', DATEADD(day, 11, GETDATE())),
('Set up performance monitoring', 'Configure application performance monitoring with APM tools like New Relic or DataDog.', 'To Do', DATEADD(day, 17, GETDATE())),
('Implement configuration management', 'Set up configuration management for environment-specific settings and secrets.', 'In Progress', DATEADD(day, 6, GETDATE())),
('Configure alerting system', 'Set up comprehensive alerting system for critical issues and performance degradation.', 'To Do', DATEADD(day, 21, GETDATE())),
('Set up development environments', 'Configure development, staging, and production environments with proper isolation.', 'In Progress', DATEADD(day, 8, GETDATE())),
('Implement infrastructure monitoring', 'Set up infrastructure monitoring for servers, databases, and network components.', 'To Do', DATEADD(day, 24, GETDATE())),

-- Feature Development Tasks (20 tasks)
('Implement file upload feature', 'Add secure file upload functionality with size limits and file type validation. Include image preview capabilities.', 'To Do', DATEADD(day, 14, GETDATE())),
('Create task export functionality', 'Implement data export in various formats (CSV, Excel, PDF). Include custom report generation.', 'Done', DATEADD(day, -9, GETDATE())),
('Add task import feature', 'Create functionality to import tasks from CSV files with validation and error handling.', 'In Progress', DATEADD(day, 10, GETDATE())),
('Implement task sharing', 'Add functionality to share tasks with team members and external collaborators.', 'To Do', DATEADD(day, 16, GETDATE())),
('Create task reminders', 'Implement reminder system for upcoming and overdue tasks with email notifications.', 'In Progress', DATEADD(day, 7, GETDATE())),
('Add task labels and tags', 'Implement labeling and tagging system for better task organization and filtering.', 'To Do', DATEADD(day, 13, GETDATE())),
('Create task templates', 'Implement reusable task templates for common workflows and project types.', 'In Progress', DATEADD(day, 9, GETDATE())),
('Add task attachments', 'Implement file attachment system for tasks with preview and download capabilities.', 'To Do', DATEADD(day, 18, GETDATE())),
('Create task history tracking', 'Implement comprehensive audit trail for task changes and activity history.', 'In Progress', DATEADD(day, 5, GETDATE())),
('Add task priority levels', 'Implement priority system with visual indicators and sorting capabilities.', 'To Do', DATEADD(day, 15, GETDATE())),
('Create task categories', 'Implement category system for organizing tasks by project, department, or type.', 'In Progress', DATEADD(day, 8, GETDATE())),
('Add task deadlines', 'Implement deadline tracking with visual indicators and automated notifications.', 'To Do', DATEADD(day, 20, GETDATE())),
('Create task progress tracking', 'Implement progress tracking with percentage completion and milestone tracking.', 'In Progress', DATEADD(day, 6, GETDATE())),
('Add task assignments', 'Implement task assignment system with user roles and responsibility tracking.', 'To Do', DATEADD(day, 17, GETDATE())),
('Create task notifications', 'Implement comprehensive notification system for task updates and deadlines.', 'In Progress', DATEADD(day, 4, GETDATE())),
('Add task search filters', 'Implement advanced search and filtering with multiple criteria and saved filters.', 'To Do', DATEADD(day, 19, GETDATE())),
('Create task analytics', 'Implement analytics dashboard with task completion rates and productivity metrics.', 'In Progress', DATEADD(day, 11, GETDATE())),
('Add task collaboration', 'Implement real-time collaboration features with live updates and user presence.', 'To Do', DATEADD(day, 22, GETDATE())),
('Create task automation', 'Implement workflow automation for repetitive tasks and process optimization.', 'In Progress', DATEADD(day, 3, GETDATE())),
('Add task integrations', 'Implement third-party integrations with popular tools like Slack, Teams, and email.', 'To Do', DATEADD(day, 25, GETDATE()));
GO 