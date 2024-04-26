using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExamService.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateStudentQuizzestableandadditsrefreenceinModuletable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "StudentQuizzes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ModuleId",
                table: "StudentQuizzes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_StudentQuizzes_ModuleId",
                table: "StudentQuizzes",
                column: "ModuleId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentQuizzes_Modules_ModuleId",
                table: "StudentQuizzes",
                column: "ModuleId",
                principalTable: "Modules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentQuizzes_Modules_ModuleId",
                table: "StudentQuizzes");

            migrationBuilder.DropIndex(
                name: "IX_StudentQuizzes_ModuleId",
                table: "StudentQuizzes");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "StudentQuizzes");

            migrationBuilder.DropColumn(
                name: "ModuleId",
                table: "StudentQuizzes");
        }
    }
}
