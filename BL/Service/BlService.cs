using BL.Api;
using DAL.Api;
using DAL.models;
using DAL.Service;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using BL.Models;
using AutoMapper;
using DAL;
namespace BL.Service
{
    public class BlService : IBLService
    {
        IDALManager _dalManager;
        public IMapper _mapper { get; }
        public BlService(IDALManager dalManager, IMapper mapper)
        {
            _dalManager = dalManager;
            _mapper = mapper;
        }
        public Gymnast logIn(string name, int id)
        {
            return _dalManager._dalService.FindGymnast(name, id);

        }


        public void signIn(BlGymnast blGymnast)
        {
            Gymnast gymnast = _mapper.Map<Gymnast>(blGymnast);
            _dalManager._dalService.AddGymnast(gymnast); 
        }


        public class Program
    {
        private static readonly string _baseUrl = "https://www.hebcal.com/hebcal";

        public static async Task Main(string[] args)
        {
            var program = new Program();
            DateTime date = new DateTime(2025, 5, 1); // לדוגמה: 24 במאי 2025
            bool isHoliday = await program.IsHolidayAsync(date);

            Console.WriteLine(isHoliday
                ? "is holiday!"
                : "is not holiday.");
        }

        public async Task<bool> IsHolidayAsync(DateTime date)
        {
            string year = date.Year.ToString();
            string month = date.Month.ToString("D2");
            string day = date.Day.ToString("D2");

            var url = $"{_baseUrl}?v=1&cfg=json&year={year}&month={month}&maj=on&min=off&mod=on&nx=off";

            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var jsonString = await response.Content.ReadAsStringAsync();
                    var json = JObject.Parse(jsonString);

                    // מחפשים את התאריך בתוך רשימת החגים
                    var items = json["items"];
                    Console.WriteLine(items);
                    if (items != null)
                    {
                        foreach (var item in items)
                        {
                            var holidayDate = DateTime.Parse(item["date"].ToString());
                            if (holidayDate.Date == date.Date)
                            {
                                if (item["title"].ToString().Equals("Yom HaAtzma'ut", StringComparison.OrdinalIgnoreCase))
                                {
                                    return true;
                                }
                                else if (item["subcat"].ToString().Equals("modern"))
                                {
                                    /* && item["subcat"].Equals("modern")*/

                                    Console.WriteLine(item["title"]);
                                    Console.WriteLine(item["subcat"]);

                                    return false;
                                }


                                return true;
                            }// זהו חג
                        }
                    }

                    return false; // לא נמצא חג
                }
                else
                {
                    throw new Exception($"API Error: {response.StatusCode}");
                }
            }
        }
    }


}
}

