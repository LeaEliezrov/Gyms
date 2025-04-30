using DAL.Api;
using DAL.Models;
using DAL.Service;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Service
{
    public class LogIn : ILogIn
    {
       IDalService _dalService;
        public LogIn(IDalService dalService)
        {
            _dalService=dalService; 
        }
        public Gymnast logIn(string name, int id) 
        {
            return _dalService.FindGymnast(name, id);
          
        }
        public void signIn(int id, string FirstName, string LastName, string Phone, string? Email)
        {
            Gymnast gymnast= new Gymnast() { Id=id, FirstName=FirstName, LastName=LastName, Phone=Phone, Email=Email};
            _dalService.AddGymnast(gymnast);
        }

    }
}
