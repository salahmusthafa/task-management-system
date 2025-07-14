using backend.Models;
using Dapper;

namespace backend.Data
{
    public class TaskCardRepository : ITaskCardRepository
    {
        private readonly DapperContext _context;

        public TaskCardRepository(DapperContext context)
        {
            _context = context;
        }

        public async System.Threading.Tasks.Task<IEnumerable<TaskCard>> GetTasksAsync(int page, int pageSize, string? status)
        {
            using var connection = _context.CreateConnection();
            string whereClause = string.IsNullOrEmpty(status) ? "" : "WHERE Status = @Status";
            string sql = $@"
                SELECT * FROM Tasks {whereClause}
                ORDER BY Id DESC
                OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";
            return await connection.QueryAsync<TaskCard>(sql, new { Offset = (page - 1) * pageSize, PageSize = pageSize, Status = status });
        }

        public async System.Threading.Tasks.Task<int> GetTasksCountAsync(string? status)
        {
            using var connection = _context.CreateConnection();
            string sql = string.IsNullOrEmpty(status)
                ? "SELECT COUNT(*) FROM Tasks"
                : "SELECT COUNT(*) FROM Tasks WHERE Status = @Status";
            return await connection.ExecuteScalarAsync<int>(sql, new { Status = status });
        }

        public async System.Threading.Tasks.Task<TaskCard?> GetTaskByIdAsync(int id)
        {
            using var connection = _context.CreateConnection();
            return await connection.QuerySingleOrDefaultAsync<TaskCard>("SELECT * FROM Tasks WHERE Id = @Id", new { Id = id });
        }

        public async System.Threading.Tasks.Task<int> CreateTaskAsync(TaskCard task)
        {
            using var connection = _context.CreateConnection();
            var sql = @"INSERT INTO Tasks (Title, Description, Status, DueDate)
                        VALUES (@Title, @Description, @Status, @DueDate);
                        SELECT CAST(SCOPE_IDENTITY() as int);";
            return await connection.ExecuteScalarAsync<int>(sql, task);
        }

        public async System.Threading.Tasks.Task<bool> UpdateTaskAsync(int id, TaskCard task)
        {
            using var connection = _context.CreateConnection();
            var sql = @"UPDATE Tasks SET Title = @Title, Description = @Description, Status = @Status, DueDate = @DueDate WHERE Id = @Id";
            var affected = await connection.ExecuteAsync(sql, new { task.Title, task.Description, task.Status, task.DueDate, Id = id });
            return affected > 0;
        }

        public async System.Threading.Tasks.Task<bool> DeleteTaskAsync(int id)
        {
            using var connection = _context.CreateConnection();
            var sql = "DELETE FROM Tasks WHERE Id = @Id";
            var affected = await connection.ExecuteAsync(sql, new { Id = id });
            return affected > 0;
        }
    }
} 