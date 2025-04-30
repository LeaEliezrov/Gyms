using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    public interface IDalService
    {
        Gymnast FindGymnast(string username, int password);
        public void AddGymnast(Gymnast gymnast);
    }
}
