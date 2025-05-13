using DAL.Api;
using DAL.models;
using DAL.Service;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DALManager:IDALManager
    {
       public IDalService _dalService {  get; }
        public DALManager(IDalService dalService)
        {
            _dalService = dalService;
        }
      
    }
}
