using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DAL.models;

public partial class dbClass : DbContext
{
    public dbClass()
    {
    }

    public dbClass(DbContextOptions<dbClass> options)
        : base(options)
    {
    }

    public virtual DbSet<Appointment> Appointments { get; set; }

    public virtual DbSet<AvailableHour> AvailableHours { get; set; }

    public virtual DbSet<Coach> Coaches { get; set; }

    public virtual DbSet<Gymnast> Gymnasts { get; set; }

    public virtual DbSet<Holiday> Tables { get; set; }

    public virtual DbSet<TrainerWorkingHour> TrainerWorkingHours { get; set; }

    public virtual DbSet<TrainingType> TrainingTypes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename='C:\\Gyms\\DAL\\Data\\database.mdf';Integrated Security=True;Connect Timeout=30");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC0792388AC7");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Time)
                .HasMaxLength(10)
                .IsFixedLength();

            entity.HasOne(d => d.Coach).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.CoachId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Appointme__Coach__4CA06362");

            entity.HasOne(d => d.Gymnast).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.GymnastId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Appointme__Gymna__4D94879B");
        });

        modelBuilder.Entity<AvailableHour>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Availabl__3214EC07D4A1F40A");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Time)
                .HasMaxLength(10)
                .IsFixedLength();

            entity.HasOne(d => d.Coach).WithMany(p => p.AvailableHours)
                .HasForeignKey(d => d.CoachId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Available__Coach__49C3F6B7");
        });

        modelBuilder.Entity<Coach>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__coaches__3214EC073A985C49");

            entity.ToTable("coaches");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsFixedLength();

            entity.HasOne(d => d.TrainingType).WithMany(p => p.Coaches)
                .HasForeignKey(d => d.TrainingTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__coaches__Trainin__3E52440B");
        });

        modelBuilder.Entity<Gymnast>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC078FBB7779");

            entity.ToTable("gymnasts");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        modelBuilder.Entity<Holiday>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Table__3214EC07ECEF896A");

            entity.ToTable("Table");

            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<TrainerWorkingHour>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC074A297D7F");

            entity.ToTable("trainerWorkingHours");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.DayOfTheWeek)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("Day of the week");
            entity.Property(e => e.EndTime)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("End time");
            entity.Property(e => e.StartTime)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("Start time");

            entity.HasOne(d => d.Couch).WithMany(p => p.TrainerWorkingHours)
                .HasForeignKey(d => d.CouchId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__trainerWo__Couch__48CFD27E");
        });

        modelBuilder.Entity<TrainingType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Training__3214EC07C207A5F0");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.RoomNumber).HasColumnName("Room number");
            entity.Property(e => e.TrainingType1)
                .HasMaxLength(50)
                .HasColumnName("TrainingType");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
