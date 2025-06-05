using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLAppointmentService
    {
        Task AddHolidayAsync(DateTime date);
        Task<bool> IsHolidayAsync(DateTime date);
        Task FillAppointmentsForUpcomingYearAsync();
    }

}
