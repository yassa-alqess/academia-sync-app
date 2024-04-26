﻿// <auto-generated />
using System;
using ExamService.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ExamService.Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240421190251_update question table points and duration to be decimal")]
    partial class updatequestiontablepointsanddurationtobedecimal
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ExamService.Data.Entities.Course", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("courses");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Instructor", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Instructors");
                });

            modelBuilder.Entity("ExamService.Data.Entities.InstructorCourses", b =>
                {
                    b.Property<Guid>("InstructorId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("CourseId")
                        .HasColumnType("uuid");

                    b.HasKey("InstructorId", "CourseId");

                    b.HasIndex("CourseId");

                    b.ToTable("InstructorCourses");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Module", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int?>("AssignedCapacity")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid?>("QuizId")
                        .HasColumnType("uuid");

                    b.Property<decimal>("TotalGrade")
                        .HasColumnType("numeric");

                    b.HasKey("Id");

                    b.HasIndex("QuizId");

                    b.ToTable("Modules");
                });

            modelBuilder.Entity("ExamService.Data.Entities.ModuleQuestion", b =>
                {
                    b.Property<Guid>("ModuleId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("QuestionId")
                        .HasColumnType("uuid");

                    b.HasKey("ModuleId", "QuestionId");

                    b.HasIndex("QuestionId");

                    b.ToTable("ModuleQuestion");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Option", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("boolean");

                    b.Property<Guid>("QuestionId")
                        .HasColumnType("uuid");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("Options");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Question", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("CourseId")
                        .HasColumnType("uuid");

                    b.Property<decimal>("Duration")
                        .HasColumnType("numeric");

                    b.Property<string>("ImageLink")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("Points")
                        .HasColumnType("numeric");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Quiz", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int?>("Capacity")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("ClosedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("CourseId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<double?>("Duration")
                        .HasColumnType("double precision");

                    b.Property<decimal?>("Grade")
                        .HasColumnType("numeric");

                    b.Property<Guid>("InstructorId")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("StartedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.HasIndex("InstructorId");

                    b.ToTable("Quizs");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Student", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("AcademicId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("ExamService.Data.Entities.StudentCourses", b =>
                {
                    b.Property<Guid>("StudentId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("CourseId")
                        .HasColumnType("uuid");

                    b.HasKey("StudentId", "CourseId");

                    b.HasIndex("CourseId");

                    b.ToTable("StudentCourses");
                });

            modelBuilder.Entity("ExamService.Data.Entities.StudentQuizzes", b =>
                {
                    b.Property<Guid>("StudentId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("QuizId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<Guid>("ModuleId")
                        .HasColumnType("uuid");

                    b.HasKey("StudentId", "QuizId");

                    b.HasIndex("ModuleId");

                    b.HasIndex("QuizId");

                    b.ToTable("StudentQuizzes");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Submission", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("IsLate")
                        .HasColumnType("boolean");

                    b.Property<Guid>("ModuleId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("StudentId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("SubmitAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<decimal>("TotalGrade")
                        .HasColumnType("numeric");

                    b.HasKey("Id");

                    b.HasIndex("ModuleId");

                    b.HasIndex("StudentId");

                    b.ToTable("Submissions");
                });

            modelBuilder.Entity("ExamService.Data.Entities.InstructorCourses", b =>
                {
                    b.HasOne("ExamService.Data.Entities.Course", "course")
                        .WithMany("InstructorCourses")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ExamService.Data.Entities.Instructor", "instructor")
                        .WithMany("InstructorCourses")
                        .HasForeignKey("InstructorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("course");

                    b.Navigation("instructor");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Module", b =>
                {
                    b.HasOne("ExamService.Data.Entities.Quiz", "Quiz")
                        .WithMany("Modules")
                        .HasForeignKey("QuizId");

                    b.Navigation("Quiz");
                });

            modelBuilder.Entity("ExamService.Data.Entities.ModuleQuestion", b =>
                {
                    b.HasOne("ExamService.Data.Entities.Module", "Module")
                        .WithMany("ModuleQuestions")
                        .HasForeignKey("ModuleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ExamService.Data.Entities.Question", "Question")
                        .WithMany("ModuleQuestions")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Module");

                    b.Navigation("Question");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Option", b =>
                {
                    b.HasOne("ExamService.Data.Entities.Question", "Question")
                        .WithMany("Options")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Question");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Question", b =>
                {
                    b.HasOne("ExamService.Data.Entities.Course", "Course")
                        .WithMany("Questions")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Quiz", b =>
                {
                    b.HasOne("ExamService.Data.Entities.Course", "Course")
                        .WithMany("Quizzes")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ExamService.Data.Entities.Instructor", "Instructor")
                        .WithMany("Quizs")
                        .HasForeignKey("InstructorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");

                    b.Navigation("Instructor");
                });

            modelBuilder.Entity("ExamService.Data.Entities.StudentCourses", b =>
                {
                    b.HasOne("ExamService.Data.Entities.Course", "course")
                        .WithMany("studentCourses")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ExamService.Data.Entities.Student", "student")
                        .WithMany("StudentCourses")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("course");

                    b.Navigation("student");
                });

            modelBuilder.Entity("ExamService.Data.Entities.StudentQuizzes", b =>
                {
                    b.HasOne("ExamService.Data.Entities.Module", "Module")
                        .WithMany("studentModuleQuizzes")
                        .HasForeignKey("ModuleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ExamService.Data.Entities.Quiz", "quiz")
                        .WithMany("StudentQuizzes")
                        .HasForeignKey("QuizId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ExamService.Data.Entities.Student", "Student")
                        .WithMany("StudentQuizzes")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Module");

                    b.Navigation("Student");

                    b.Navigation("quiz");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Submission", b =>
                {
                    b.HasOne("ExamService.Data.Entities.Module", "Module")
                        .WithMany("Submissions")
                        .HasForeignKey("ModuleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ExamService.Data.Entities.Student", "Student")
                        .WithMany("Submissions")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Module");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Course", b =>
                {
                    b.Navigation("InstructorCourses");

                    b.Navigation("Questions");

                    b.Navigation("Quizzes");

                    b.Navigation("studentCourses");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Instructor", b =>
                {
                    b.Navigation("InstructorCourses");

                    b.Navigation("Quizs");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Module", b =>
                {
                    b.Navigation("ModuleQuestions");

                    b.Navigation("Submissions");

                    b.Navigation("studentModuleQuizzes");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Question", b =>
                {
                    b.Navigation("ModuleQuestions");

                    b.Navigation("Options");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Quiz", b =>
                {
                    b.Navigation("Modules");

                    b.Navigation("StudentQuizzes");
                });

            modelBuilder.Entity("ExamService.Data.Entities.Student", b =>
                {
                    b.Navigation("StudentCourses");

                    b.Navigation("StudentQuizzes");

                    b.Navigation("Submissions");
                });
#pragma warning restore 612, 618
        }
    }
}
