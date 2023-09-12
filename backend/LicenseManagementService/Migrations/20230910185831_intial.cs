using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LicenseManagementService.Migrations
{
    /// <inheritdoc />
    public partial class intial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "products",
                columns: table => new
                {
                    product_license = table.Column<string>(type: "varchar(255)", nullable: false),
                    product_name = table.Column<string>(type: "longtext", nullable: true),
                    product_status = table.Column<string>(type: "longtext", nullable: true),
                    user_id = table.Column<string>(type: "longtext", nullable: false),
                    expired_date = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.product_license);
                })
                .Annotation("MySQL:Charset", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "products");
        }
    }
}
