using DAL.models;
using System.Collections.Generic;
using System.Threading.Tasks;

    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;

    namespace DAL.Api
    {
        public interface IdbClass
        {
            DbSet<Appointment> Appointments { get; }
            DbSet<AvailableHour> AvailableHours { get; }
            DbSet<Coach> Coaches { get; }
            DbSet<Gymnast> Gymnasts { get; }
            DbSet<TrainerWorkingHour> TrainerWorkingHours { get; }
            DbSet<TrainingType> TrainingTypes { get; }

            Task<int> SaveChangesAsync();
            // Add other methods you wish to expose, like:
            // Task<List<T>> GetEntitiesAsync<T>() where T : class;
        }
    }

