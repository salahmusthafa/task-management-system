using backend.Models;

namespace backend.Data
{
    public interface ITaskRepository
    {
        Task<IEnumerable<Task>> GetTasksAsync(int page, int pageSize, string? status);
        Task<int> GetTasksCountAsync(string? status);
        Task<Task?> GetTaskByIdAsync(int id);
        Task<int> CreateTaskAsync(Task task);
        Task<bool> UpdateTaskAsync(int id, Task task);
        Task<bool> DeleteTaskAsync(int id);
    }
} 