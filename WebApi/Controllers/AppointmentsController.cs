using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly IBLManager _blManager;

        public AppointmentsController(IBLManager blManager)
        {
            _blManager = blManager;
        }

        [HttpPost("fill-appointments")]
        public async Task<IActionResult> FillAppointments()
        {
            await _blManager._blappointmentService.FillAppointmentsForUpcomingYearAsync();
            return Ok("Appointments filled successfully.");
        }
    }
}
