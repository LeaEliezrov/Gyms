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
    public class DalService : IDalService
    {
        dbClass _data;
        public DalService(dbClass data)
        {
            _data = data;
        }
        public Gymnast FindGymnast(string username, int password)
        {
            return _data.Gymnasts.FirstOrDefault(g => g.FirstName == username && g.Id == password);
        }
        public void AddGymnast(Gymnast gymnast)
        {
            _data.Gymnasts.Add(gymnast);
            _data.SaveChanges(); // שמירה של השינויים
            foreach (var item in _data.Gymnasts)
            {
                Console.WriteLine(item.LastName);
            }


        }
    }
}
