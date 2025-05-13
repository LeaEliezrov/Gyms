using System;
using System.Collections.Generic;

namespace DAL.models;

public partial class Coach
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string? Email { get; set; }

    public int TrainingTypeId { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<AvailableHour> AvailableHours { get; set; } = new List<AvailableHour>();

    public virtual ICollection<TrainerWorkingHour> TrainerWorkingHours { get; set; } = new List<TrainerWorkingHour>();

    public virtual TrainingType TrainingType { get; set; } = null!;
}
