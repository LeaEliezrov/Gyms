using AutoMapper;
using BL.Api;
using DAL.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IBLManager
    {
        public IBLService _blService { get; }
        public  IBLAppointmentService _blappointmentService { get; }

      
    }
}
