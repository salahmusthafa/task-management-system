using Microsoft.Data.SqlClient;
using Dapper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection")!;

app.MapGet("/api/tasks", async (int? page, int? pageSize) =>
{
    using var connection = new SqlConnection(connectionString);
    int p = page ?? 1;
    int ps = pageSize ?? 10;
    int offset = (p - 1) * ps;
    var tasks = await connection.QueryAsync<Task>(
        "SELECT * FROM Tasks ORDER BY Id OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY",
        new { Offset = offset, PageSize = ps });
    var total = await connection.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM Tasks");
    return Results.Ok(new { tasks, total });
});

app.MapGet("/api/tasks/{id}", async (int id) =>
{
    using var connection = new SqlConnection(connectionString);
    var task = await connection.QuerySingleOrDefaultAsync<Task>("SELECT * FROM Tasks WHERE Id = @Id", new { Id = id });
    return task is not null ? Results.Ok(task) : Results.NotFound();
});

app.MapPost("/api/tasks", async (Task task) =>
{
    using var connection = new SqlConnection(connectionString);
    var sql = "INSERT INTO Tasks (Title, Description, Status, DueDate) VALUES (@Title, @Description, @Status, @DueDate); SELECT CAST(SCOPE_IDENTITY() as int);";
    var id = await connection.ExecuteScalarAsync<int>(sql, task);
    task.Id = id;
    return Results.Created($"/api/tasks/{id}", task);
});

app.MapPut("/api/tasks/{id}", async (int id, Task task) =>
{
    using var connection = new SqlConnection(connectionString);
    var sql = "UPDATE Tasks SET Title = @Title, Description = @Description, Status = @Status, DueDate = @DueDate WHERE Id = @Id";
    var affected = await connection.ExecuteAsync(sql, new { task.Title, task.Description, task.Status, task.DueDate, Id = id });
    return affected > 0 ? Results.NoContent() : Results.NotFound();
});

app.MapDelete("/api/tasks/{id}", async (int id) =>
{
    using var connection = new SqlConnection(connectionString);
    var sql = "DELETE FROM Tasks WHERE Id = @Id";
    var affected = await connection.ExecuteAsync(sql, new { Id = id });
    return affected > 0 ? Results.NoContent() : Results.NotFound();
});

app.Run();
