using DAL.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    internal class BLCoach
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
}
