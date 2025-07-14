using backend.Models;

namespace backend.Data
{
    public interface ITaskCardRepository
    {
        System.Threading.Tasks.Task<IEnumerable<TaskCard>> GetTasksAsync(int page, int pageSize, string? status);
        System.Threading.Tasks.Task<int> GetTasksCountAsync(string? status);
        System.Threading.Tasks.Task<TaskCard?> GetTaskByIdAsync(int id);
        System.Threading.Tasks.Task<int> CreateTaskAsync(TaskCard task);
        System.Threading.Tasks.Task<bool> UpdateTaskAsync(int id, TaskCard task);
        System.Threading.Tasks.Task<bool> DeleteTaskAsync(int id);
    }
} 