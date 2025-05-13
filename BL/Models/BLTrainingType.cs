using DAL.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    internal class BLTrainingType
    {
        public int Id { get; set; }

        public string TrainingType1 { get; set; } = null!;

        public string? Description { get; set; }

        public int RoomNumber { get; set; }

        public virtual ICollection<Coach> Coaches { get; set; } = new List<Coach>();
    }
}
