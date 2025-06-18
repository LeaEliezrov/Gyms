using DAL.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    internal class BLappointment
    {
      
    
    
        public int Id { get; set; }

        public DateOnly Date { get; set; }

        public int GymnastId { get; set; }

        public string Time { get; set; } = null!;

        public int CoachId { get; set; }

        public virtual Coach Coach { get; set; } = null!;

        public virtual Gymnast Gymnast { get; set; } = null!;
    }

}
