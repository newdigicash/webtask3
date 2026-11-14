using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace CrudClienteApi.Migrations
{
    /// <inheritdoc />
    public partial class CreateClientesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "clientes",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    identificacion = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    nombre = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    apellido = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    correo = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    telefono = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    celular = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    direccion = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    genero = table.Column<string>(type: "varchar(1)", maxLength: 1, nullable: false),
                    fechaRegistro = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    estado = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_clientes", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "clientes");
        }
    }
}
