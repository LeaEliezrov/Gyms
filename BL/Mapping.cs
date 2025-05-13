using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;
using BL.Models;
using DAL.models;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace Bl
{
    public class Mapping : Profile

    {
        public Mapping()
        {

            CreateMap<BLappointment, Appointment>();
            CreateMap<Appointment, BLappointment>();
            CreateMap<BLAvailableHour, AvailableHour>();
            CreateMap<AvailableHour, BLAvailableHour>();
            CreateMap<BLCoach, Coach>();
            CreateMap<Coach, BLCoach>();
            CreateMap<BlGymnast, Gymnast>();
            CreateMap<Gymnast, BlGymnast>();
            CreateMap<BLTrainerWorkingHour, TrainerWorkingHour>();
            CreateMap<TrainerWorkingHour, BLTrainerWorkingHour>();
            CreateMap<BLTrainingType, TrainingType>();
            CreateMap<TrainingType, BLTrainingType>();
            





        }

    }


}
