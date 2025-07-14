using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TaskCardController : ControllerBase
    {
        private readonly ITaskCardService _service;

        public TaskCardController(ITaskCardService service)
        {
            _service = service;
        }

        [HttpGet]
        public async System.Threading.Tasks.Task<IActionResult> GetTasks([FromQuery] int? page, [FromQuery] int? pageSize, [FromQuery] string? status)
        {
            int p = page ?? 1;
            int ps = pageSize ?? 10;
            var (tasks, total) = await _service.GetTasksAsync(p, ps, status);
            return Ok(new { tasks, total });
        }

        [HttpGet("{id}")]
        public async System.Threading.Tasks.Task<IActionResult> GetTask(int id)
        {
            var task = await _service.GetTaskByIdAsync(id);
            if (task == null) return NotFound();
            return Ok(task);
        }

        [HttpPost]
        public async System.Threading.Tasks.Task<IActionResult> CreateTask([FromBody] CreateTaskCardDto dto)
        {
            var task = await _service.CreateTaskAsync(dto);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async System.Threading.Tasks.Task<IActionResult> UpdateTask(int id, [FromBody] UpdateTaskCardDto dto)
        {
            var updated = await _service.UpdateTaskAsync(id, dto);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async System.Threading.Tasks.Task<IActionResult> DeleteTask(int id)
        {
            var deleted = await _service.DeleteTaskAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
} 