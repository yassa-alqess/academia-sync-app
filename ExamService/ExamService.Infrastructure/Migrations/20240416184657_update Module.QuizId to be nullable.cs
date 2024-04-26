using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExamService.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateModuleQuizIdtobenullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Modules_Quizs_QuizId",
                table: "Modules");

            migrationBuilder.AlterColumn<Guid>(
                name: "QuizId",
                table: "Modules",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Modules_Quizs_QuizId",
                table: "Modules",
                column: "QuizId",
                principalTable: "Quizs",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Modules_Quizs_QuizId",
                table: "Modules");

            migrationBuilder.AlterColumn<Guid>(
                name: "QuizId",
                table: "Modules",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Modules_Quizs_QuizId",
                table: "Modules",
                column: "QuizId",
                principalTable: "Quizs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
