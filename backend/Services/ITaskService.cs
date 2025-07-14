using backend.DTOs;

namespace backend.Services
{
    public interface ITaskService
    {
        Task<(IEnumerable<TaskDto> tasks, int total)> GetTasksAsync(int page, int pageSize, string? status);
        Task<TaskDto?> GetTaskByIdAsync(int id);
        Task<TaskDto> CreateTaskAsync(CreateTaskDto dto);
        Task<bool> UpdateTaskAsync(int id, UpdateTaskDto dto);
        Task<bool> DeleteTaskAsync(int id);
    }
} 