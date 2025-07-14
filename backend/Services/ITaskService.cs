using backend.DTOs;

namespace backend.Services
{
    public interface ITaskCardService
    {
        System.Threading.Tasks.Task<(IEnumerable<TaskCardDto> tasks, int total)> GetTasksAsync(int page, int pageSize, string? status);
        System.Threading.Tasks.Task<TaskCardDto?> GetTaskByIdAsync(int id);
        System.Threading.Tasks.Task<TaskCardDto> CreateTaskAsync(CreateTaskCardDto dto);
        System.Threading.Tasks.Task<bool> UpdateTaskAsync(int id, UpdateTaskCardDto dto);
        System.Threading.Tasks.Task<bool> DeleteTaskAsync(int id);
    }
} 