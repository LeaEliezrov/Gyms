using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class AvailableHour
{
    public int Id { get; set; }

    public DateOnly Date { get; set; }

    public string Time { get; set; } = null!;

    public int CoachId { get; set; }

    public virtual Coach Coach { get; set; } = null!;
}
