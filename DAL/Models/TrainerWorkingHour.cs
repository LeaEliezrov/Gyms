using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TrainerWorkingHour
{
    public int Id { get; set; }

    public int CouchId { get; set; }

    public string DayOfTheWeek { get; set; } = null!;

    public string StartTime { get; set; } = null!;

    public string EndTime { get; set; } = null!;

    public virtual Coach Couch { get; set; } = null!;
}
