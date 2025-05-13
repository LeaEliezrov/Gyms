using DAL.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    internal class BLTrainerWorkingHour
    {
        public int Id { get; set; }

        public int CouchId { get; set; }

        public string DayOfTheWeek { get; set; } = null!;

        public string StartTime { get; set; } = null!;

        public string EndTime { get; set; } = null!;

        public virtual Coach Couch { get; set; } = null!;
    }
}
