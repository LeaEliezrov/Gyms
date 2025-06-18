using BL.Models;
using DAL.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLService
    {
        Gymnast logIn(string name, int id);
        void signIn(BlGymnast blgymnast);
    }

}
