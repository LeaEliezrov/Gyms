using AutoMapper;
using BL.Api;
using DAL;
using DAL.models;
using DAL.Service;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Service
{
    public class BLAppointmentService: IBLAppointmentService
    {
       
        IDALManager _dalManager;
        public IMapper _mapper { get; }

      
        public BLAppointmentService(IDALManager dalManager, IMapper mapper)
        {
            _dalManager = dalManager;
            _mapper = mapper;
        }
        public async Task AddHolidayAsync(DateTime date)
        {
            // Check if the date is indeed a holiday
            if (await IsHolidayAsync(date))
            {
                var holiday = new Holiday
                {
                    HolidayDate = date
                };

                // Assuming your DAL has this method defined
                await _dalManager._dalService.AddHolidayAsync(holiday);
            }
        }

        public async Task<bool> IsHolidayAsync(DateTime date)
        {
            string year = date.Year.ToString();
            string month = date.Month.ToString("D2"); // Ensure two digits
            string day = date.Day.ToString("D2");

            var url = $"https://www.hebcal.com/hebcal?v=1&cfg=json&year={year}&month={month}&maj=on&min=off&mod=on&nx=off";

            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var jsonString = await response.Content.ReadAsStringAsync();
                    var json = JObject.Parse(jsonString);

                    var items = json["items"];
                    if (items != null)
                    {
                        foreach (var item in items)
                        {
                            var holidayDate = DateTime.Parse(item["date"].ToString());
                            if (holidayDate.Date == date.Date)
                            {
                                return true; // Return true if date matches any holiday
                            }
                        }
                    }

                    return false; // Not a holiday
                }
                else
                {
                    throw new Exception($"API Error: {response.StatusCode}");
                }
            }
        }
        public async Task FillAppointmentsForUpcomingYearAsync()
        {
            var upcomingYear = DateTime.Now.AddYears(1);
            var startDate = DateTime.Now.Date;

            // קבלת כל שעות העבודה של המאמן מה-Repository
            var trainersWorkingHours = await _dalManager._dalAppointment.GetTrainersWorkingHoursAsync();
            var holidays = await _dalManager._dalAppointment.GetHolidaysAsync();

            for (var date = startDate; date <= upcomingYear; date = date.AddDays(1))
            {
                var dayOfWeek = date.DayOfWeek.ToString();
                var workingHours = trainersWorkingHours.Where(t => t.DayOfTheWeek == dayOfWeek);

                // אם היום הוא חג, דלג על המילוי
                if (holidays.Any(h => h.Date == date))
                {
                    continue; // Skip filling appointments on holidays
                }

                foreach (var hour in workingHours)
                {
                    // הוספת תור
                    var appointment = new Appointment
                    {
                        Date = DateOnly.FromDateTime(date),
                        Time = $"{hour.StartTime} - {hour.EndTime}",
                        CoachId = hour.CouchId,
                        GymnastId = 0
                    };

                    _dalManager._dalAppointment.AddAppointment(appointment); // הוספת תור ב-Repository
                }
            }

            await _dalManager._dalAppointment.SaveChangesAsync(); // שמירה ב-Repository
        }

    }
}

