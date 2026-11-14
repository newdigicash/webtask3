using Microsoft.EntityFrameworkCore;
using CrudClienteApi.Data;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://0.0.0.0:5080"); //evita puerto randomico

// registra mysql
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySQL(builder.Configuration.GetConnectionString("cn")!));
// configura cors
builder.Services.AddCors(options => { options.AddPolicy("AllowAll", policy => { policy.AllowAnyOrigin().AllowAnyMethod() .AllowAnyHeader(); }); });
builder.Services.AddControllers();
var app = builder.Build();

// endpoint de prueba
app.MapGet("/hola", () => new { Message = "Hola mundo", Timestamp = DateTime.UtcNow });

// endpoint para probar conexion a mysql
app.MapGet("/testdb", async (AppDbContext db) =>
{
    try
    {
        var canConnect = await db.Database.CanConnectAsync();
        return canConnect
            ? Results.Ok(new { Success = true, Message = "Conectado a MySQL" })
            : Results.BadRequest(new { Success = false, Message = "No se puede encontrar la base" });
    }
    catch (Exception ex)
    {
        return Results.Problem($"Fallo la conexion con la base : {ex.Message}");
    }
});

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();
app.Run();
