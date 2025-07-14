using backend.Data;
using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public class TaskCardService : ITaskCardService
    {
        private readonly ITaskCardRepository _repository;

        public TaskCardService(ITaskCardRepository repository)
        {
            _repository = repository;
        }

        public async System.Threading.Tasks.Task<(IEnumerable<TaskCardDto> tasks, int total)> GetTasksAsync(int page, int pageSize, string? status)
        {
            var tasks = await _repository.GetTasksAsync(page, pageSize, status);
            var total = await _repository.GetTasksCountAsync(status);
            var taskDtos = tasks.Select(t => new TaskCardDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                Status = t.Status,
                DueDate = t.DueDate
            });
            return (tasks: taskDtos, total: total);
        }

        public async System.Threading.Tasks.Task<TaskCardDto?> GetTaskByIdAsync(int id)
        {
            var task = await _repository.GetTaskByIdAsync(id);
            if (task == null) return null;
            return new TaskCardDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Status = task.Status,
                DueDate = task.DueDate
            };
        }

        public async System.Threading.Tasks.Task<TaskCardDto> CreateTaskAsync(CreateTaskCardDto dto)
        {
            var task = new TaskCard
            {
                Title = dto.Title,
                Description = dto.Description,
                Status = dto.Status,
                DueDate = dto.DueDate
            };
            var id = await _repository.CreateTaskAsync(task);
            task.Id = id;
            return new TaskCardDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Status = task.Status,
                DueDate = task.DueDate
            };
        }

        public async System.Threading.Tasks.Task<bool> UpdateTaskAsync(int id, UpdateTaskCardDto dto)
        {
            var task = new TaskCard
            {
                Title = dto.Title,
                Description = dto.Description,
                Status = dto.Status,
                DueDate = dto.DueDate
            };
            return await _repository.UpdateTaskAsync(id, task);
        }

        public async System.Threading.Tasks.Task<bool> DeleteTaskAsync(int id)
        {
            return await _repository.DeleteTaskAsync(id);
        }
    }
} 