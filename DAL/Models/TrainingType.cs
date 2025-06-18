using System;
using System.Collections.Generic;

namespace DAL.models;

public partial class TrainingType
{
    public int Id { get; set; }

    public string TrainingType1 { get; set; } = null!;

    public string? Description { get; set; }

    public int RoomNumber { get; set; }

    public virtual ICollection<Coach> Coaches { get; set; } = new List<Coach>();
}
