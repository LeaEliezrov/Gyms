using AutoMapper;
using BL.Api;
using BL.Service;
using DAL.Api;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class BLManager:IBLManager
    {
       public IBLService _blService { get; }
        public IBLAppointmentService _blappointmentService { get; }

        public BLManager(IBLService blService, IBLAppointmentService blappointmentService)
        {
            _blService = blService;
            _blappointmentService = blappointmentService;
        }
     
    }
}
