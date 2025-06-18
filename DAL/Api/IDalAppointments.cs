using DAL.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
 
        public interface IDalAppointment
        {
            Task<List<TrainerWorkingHour>> GetTrainersWorkingHoursAsync();
            Task<List<DateTime>> GetHolidaysAsync();
            void AddAppointment(Appointment appointment);
            Task SaveChangesAsync();
        }
    }

