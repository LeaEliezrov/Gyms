using DAL.Api;
using DAL.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IDALManager
    {
        public IDalService _dalService { get; }
    }
}
