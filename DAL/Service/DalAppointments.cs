using DAL.Api;
using DAL.models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Service
{
    public class DalAppointment :IDalAppointment
    {
        private readonly dbClass _context;

        public DalAppointment(dbClass context)
        {
            _context = context;
        }

        public async Task<List<TrainerWorkingHour>> GetTrainersWorkingHoursAsync()
        {
            // החזרת שעות העבודה של המאמן
            return await _context.TrainerWorkingHours.ToListAsync();
        }

        public async Task<List<DateTime>> GetHolidaysAsync()
        {
            // החזרת רשימת חגים
            return await _context.Holidays.Select(h => h.HolidayDate).ToListAsync();
        }

        public void AddAppointment(Appointment appointment)
        {
            // הוספת תור
            _context.Appointments.Add(appointment);
        }

        public async Task SaveChangesAsync()
        {
            // שמירה ב-DB
            await _context.SaveChangesAsync();
        }
    }


}
