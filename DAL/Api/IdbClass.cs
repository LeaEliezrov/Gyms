using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    
        public interface IdbClass
        {
            // Appointments
            Task<List<Appointment>> GetAppointmentsAsync();
            Task<Appointment> GetAppointmentByIdAsync(int id);
            Task AddAppointmentAsync(Appointment appointment);
            Task UpdateAppointmentAsync(Appointment appointment);
            Task DeleteAppointmentAsync(int id);

            // AvailableHours
            Task<List<AvailableHour>> GetAvailableHoursAsync();
            Task<AvailableHour> GetAvailableHourByIdAsync(int id);
            Task AddAvailableHourAsync(AvailableHour availableHour);
            Task UpdateAvailableHourAsync(AvailableHour availableHour);
            Task DeleteAvailableHourAsync(int id);

            // Coaches
            Task<List<Coach>> GetCoachesAsync();
            Task<Coach> GetCoachByIdAsync(int id);
            Task AddCoachAsync(Coach coach);
            Task UpdateCoachAsync(Coach coach);
            Task DeleteCoachAsync(int id);

            // Gymnasts
            Task<List<Gymnast>> GetGymnastsAsync();
            Task<Gymnast> GetGymnastByIdAsync(int id);
            Task AddGymnastAsync(Gymnast gymnast);
            Task UpdateGymnastAsync(Gymnast gymnast);
            Task DeleteGymnastAsync(int id);

            // Tables
            Task<List<Table>> GetTablesAsync();
            Task<Table> GetTableByIdAsync(int id);
            Task AddTableAsync(Table table);
            Task UpdateTableAsync(Table table);
            Task DeleteTableAsync(int id);

            // TrainerWorkingHours
            Task<List<TrainerWorkingHour>> GetTrainerWorkingHoursAsync();
            Task<TrainerWorkingHour> GetTrainerWorkingHourByIdAsync(int id);
            Task AddTrainerWorkingHourAsync(TrainerWorkingHour trainerWorkingHour);
            Task UpdateTrainerWorkingHourAsync(TrainerWorkingHour trainerWorkingHour);
            Task DeleteTrainerWorkingHourAsync(int id);

            // TrainingTypes
            Task<List<TrainingType>> GetTrainingTypesAsync();
            Task<TrainingType> GetTrainingTypeByIdAsync(int id);
            Task AddTrainingTypeAsync(TrainingType trainingType);
            Task UpdateTrainingTypeAsync(TrainingType trainingType);
            Task DeleteTrainingTypeAsync(int id);
        }
    }

