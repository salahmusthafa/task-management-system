using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Services;
using backend.Data;
using Moq;
using Xunit;
using System.Linq;
using TaskModel = backend.Models.TaskCard;

namespace backend.Tests
{
    public class TaskCardServiceTests
    {
        private readonly Mock<ITaskCardRepository> _mockRepository;
        private readonly TaskCardService _service;

        public TaskCardServiceTests()
        {
            _mockRepository = new Mock<ITaskCardRepository>();
            _service = new TaskCardService(_mockRepository.Object);
        }

        [Fact]
        public async System.Threading.Tasks.Task GetTasksAsync_ReturnsTasksAndTotal()
        {
            // Arrange
            var tasks = new List<TaskModel>
            {
                new TaskModel { Id = 1, Title = "Test 1", Description = "Desc 1", Status = "To Do", DueDate = System.DateTime.Now },
                new TaskModel { Id = 2, Title = "Test 2", Description = "Desc 2", Status = "Done", DueDate = System.DateTime.Now }
            };
            _mockRepository.Setup(r => r.GetTasksAsync(1, 10, null))
                .ReturnsAsync((IEnumerable<TaskModel>)tasks);
            _mockRepository.Setup(r => r.GetTasksCountAsync(null))
                .ReturnsAsync(tasks.Count);

            // Act
            var (result, total) = await _service.GetTasksAsync(1, 10, null);

            // Assert
            Assert.Equal(2, total);
            Assert.Equal(2, result.Count());
            Assert.Contains(result, t => t.Title == "Test 1");
            Assert.Contains(result, t => t.Title == "Test 2");
        }

        [Fact]
        public async System.Threading.Tasks.Task GetTasksAsync_WithStatusFilter_ReturnsFilteredTasks()
        {
            // Arrange
            var tasks = new List<TaskModel>
            {
                new TaskModel { Id = 1, Title = "Test 1", Description = "Desc 1", Status = "To Do", DueDate = System.DateTime.Now }
            };
            _mockRepository.Setup(r => r.GetTasksAsync(1, 10, "To Do"))
                .ReturnsAsync((IEnumerable<TaskModel>)tasks);
            _mockRepository.Setup(r => r.GetTasksCountAsync("To Do"))
                .ReturnsAsync(1);

            // Act
            var (result, total) = await _service.GetTasksAsync(1, 10, "To Do");

            // Assert
            Assert.Equal(1, total);
            Assert.Single(result);
            Assert.Equal("To Do", result.First().Status);
        }

        [Fact]
        public async System.Threading.Tasks.Task GetTaskByIdAsync_ExistingTask_ReturnsTask()
        {
            // Arrange
            var task = new TaskModel { Id = 1, Title = "Test Task", Description = "Test Description", Status = "To Do", DueDate = System.DateTime.Now };
            _mockRepository.Setup(r => r.GetTaskByIdAsync(1))
                .ReturnsAsync((TaskModel)task);

            // Act
            var result = await _service.GetTaskByIdAsync(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
            Assert.Equal("Test Task", result.Title);
        }

        [Fact]
        public async System.Threading.Tasks.Task GetTaskByIdAsync_NonExistingTask_ReturnsNull()
        {
            // Arrange
            _mockRepository.Setup(r => r.GetTaskByIdAsync(999))
                .ReturnsAsync((TaskModel?)null);

            // Act
            var result = await _service.GetTaskByIdAsync(999);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async System.Threading.Tasks.Task CreateTaskAsync_ValidTask_ReturnsCreatedTask()
        {
            // Arrange
            var createDto = new CreateTaskCardDto
            {
                Title = "New Task",
                Description = "New Description",
                Status = "To Do",
                DueDate = System.DateTime.Now
            };
            _mockRepository.Setup(r => r.CreateTaskAsync(It.IsAny<TaskModel>()))
                .ReturnsAsync(1);

            // Act
            var result = await _service.CreateTaskAsync(createDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
            Assert.Equal("New Task", result.Title);
            Assert.Equal("New Description", result.Description);
            Assert.Equal("To Do", result.Status);
        }

        [Fact]
        public async System.Threading.Tasks.Task UpdateTaskAsync_ExistingTask_ReturnsTrue()
        {
            // Arrange
            var updateDto = new UpdateTaskCardDto
            {
                Title = "Updated Task",
                Description = "Updated Description",
                Status = "In Progress",
                DueDate = System.DateTime.Now
            };
            _mockRepository.Setup(r => r.UpdateTaskAsync(1, It.IsAny<TaskModel>()))
                .ReturnsAsync(true);

            // Act
            var result = await _service.UpdateTaskAsync(1, updateDto);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public async System.Threading.Tasks.Task UpdateTaskAsync_NonExistingTask_ReturnsFalse()
        {
            // Arrange
            var updateDto = new UpdateTaskCardDto
            {
                Title = "Updated Task",
                Description = "Updated Description",
                Status = "In Progress",
                DueDate = System.DateTime.Now
            };
            _mockRepository.Setup(r => r.UpdateTaskAsync(999, It.IsAny<TaskModel>()))
                .ReturnsAsync(false);

            // Act
            var result = await _service.UpdateTaskAsync(999, updateDto);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public async System.Threading.Tasks.Task DeleteTaskAsync_ExistingTask_ReturnsTrue()
        {
            // Arrange
            _mockRepository.Setup(r => r.DeleteTaskAsync(1))
                .ReturnsAsync(true);

            // Act
            var result = await _service.DeleteTaskAsync(1);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public async System.Threading.Tasks.Task DeleteTaskAsync_NonExistingTask_ReturnsFalse()
        {
            // Arrange
            _mockRepository.Setup(r => r.DeleteTaskAsync(999))
                .ReturnsAsync(false);

            // Act
            var result = await _service.DeleteTaskAsync(999);

            // Assert
            Assert.False(result);
        }
    }
} 