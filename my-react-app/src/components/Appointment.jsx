import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Fade,
  Alert,
  Paper
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Navbar from "../components/Navbar";

const green = "#36b37e";
const greenDark = "#23885a";
const textMain = "#222";
const textLight = "#888";
const bgGray = "#f7f7f7";
const borderGray = "#e5e5e5";

const AppointmentsCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayAppointments, setDayAppointments] = useState([]);
  const [bookDialog, setBookDialog] = useState({ open: false, appt: null });
  const [status, setStatus] = useState('');

  const SERVER_URL = 'https://your-server/api/appointments';

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setLoading(true);
    fetch(`${SERVER_URL}?startDate=${today}`)
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const dayStr = selectedDate.toISOString().split('T')[0];
    setDayAppointments(appointments.filter(appt => appt.date === dayStr));
  }, [selectedDate, appointments]);

  const handleBook = (appt) => {
    setBookDialog({ open: true, appt });
  };

  const confirmBooking = () => {
    setStatus('');
    fetch(`${SERVER_URL}/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appointmentId: bookDialog.appt.id,
        userId: 123 // לשנות למזהה משתמש אמיתי
      }),
    })
      .then(res => {
        if (res.ok) setStatus('Appointment booked successfully!');
        else setStatus('Error booking appointment.');
        setBookDialog({ open: false, appt: null });
      })
      .catch(() => {
        setStatus('Error booking appointment.');
        setBookDialog({ open: false, appt: null });
      });
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      bgcolor: bgGray,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: "Montserrat, Arial, sans-serif",
      p: 0,
    }}>
      <Navbar />

      {/* כותרות למעלה */}
      <Box sx={{ mt: { xs: 4, md: 8 }, mb: 2, textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            color: textMain,
            fontWeight: 500,
            letterSpacing: 1.8,
            fontFamily: "Montserrat, Arial, sans-serif",
            "& span": { color: green }
          }}
        >
          Gym <span>Appointments</span>
        </Typography>
        <Typography
          sx={{
            color: textLight,
            fontSize: "1.13rem",
            mt: 1,
            fontWeight: 400,
            fontFamily: "Montserrat, Arial, sans-serif"
          }}
        >
          Book your gym appointment easily and quickly
        </Typography>
      </Box>

      {/* הודעות סטטוס */}
      <Fade in={!!status}>
        <Box sx={{ width: "100%", maxWidth: 600, mb: 2 }}>
          {status && (
            <Alert
              severity={status.includes('Error') ? "error" : "success"}
              sx={{ fontFamily: "Montserrat, Arial, sans-serif" }}
            >
              {status}
            </Alert>
          )}
        </Box>
      </Fade>

      {/* לוח שנה - ישירות על הרקע */}
      <Box
        sx={{
          bgcolor: "transparent",
          borderRadius: 4,
          p: { xs: 1, md: 3 },
          mb: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: { xs: 320, md: 370 },
          width: { xs: "95%", sm: 400, md: 440 },
          maxWidth: 540,
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress sx={{ color: green }} />
          </Box>
        ) : (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar
              value={selectedDate}
              onChange={setSelectedDate}
              sx={{
                bgcolor: "#fff", // אפשר להחליף ל-transparent אם רוצים גם את הלוח בלי לבן בכלל
                borderRadius: 3,
                border: `1.5px solid ${borderGray}`,
                boxShadow: "0 2px 16px 0 #36b37e19",
                width: { xs: 300, sm: 370, md: 410 },
                minHeight: { xs: 300, sm: 360, md: 390 },
                mx: "auto",
                "& .MuiPickersDay-root": {
                  fontFamily: "Montserrat, Arial, sans-serif",
                  color: textMain,
                  fontSize: { xs: "1rem", sm: "1.13rem", md: "1.22rem" },
                  width: { xs: 36, sm: 40, md: 44 },
                  height: { xs: 36, sm: 40, md: 44 },
                  '&.Mui-selected': {
                    background: green,
                    color: "#fff",
                    fontWeight: 700,
                  },
                  '&.MuiPickersDay-today': {
                    borderColor: greenDark,
                  }
                },
                "& .MuiPickersCalendarHeader-label": {
                  fontFamily: "Montserrat, Arial, sans-serif",
                  color: greenDark,
                  fontWeight: 700,
                  fontSize: { xs: "1.08rem", sm: "1.15rem", md: "1.22rem" },
                },
                "& .MuiPickersDay-root.Mui-disabled": {
                  color: "#bbb"
                },
                "& .MuiPickersArrowSwitcher-root": {
                  "& button": {
                    color: greenDark,
                    fontSize: { xs: "1.2rem", sm: "1.32rem", md: "1.42rem" },
                  }
                },
                "& .MuiPickersCalendarHeader-switchViewButton": {
                  color: greenDark,
                  fontSize: { xs: "1.1rem", sm: "1.17rem", md: "1.20rem" },
                },
                "& .MuiPickersWeekDays-root span": {
                  fontFamily: "Montserrat, Arial, sans-serif",
                  fontSize: { xs: "0.95rem", sm: "1.04rem", md: "1.11rem" },
                  color: textLight,
                  fontWeight: 500
                }
              }}
            />
          </LocalizationProvider>
        )}
      </Box>

      {/* רשימת תורים בתוך ריבוע לבן */}
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: 700,
          px: 2,
          py: 3,
          mb: 5,
          bgcolor: "#fff",
          borderRadius: 4,
          boxShadow: "0 6px 34px 0 #18181812",
        }}
      >
        <Typography variant="h5" sx={{
          color: greenDark,
          fontWeight: 600,
          fontFamily: "Montserrat, Arial, sans-serif",
          mb: 1.5,
          textAlign: "center"
        }}>
          Appointments for {selectedDate.toLocaleDateString()}
        </Typography>

        {dayAppointments.length === 0 ? (
          <Typography color="text.secondary" sx={{ textAlign: "center", fontFamily: "Montserrat, Arial, sans-serif" }}>No appointments for this day</Typography>
        ) : (
          <List sx={{ bgcolor: "#f9fcfa", borderRadius: 3, p: 0, maxWidth: "900px", mx: "auto" }}>
            {dayAppointments.map(appt => (
              <ListItem
                key={appt.id}
                sx={{
                  borderBottom: `1px solid ${borderGray}`,
                  ":last-child": { borderBottom: "none" },
                  py: 1.8,
                  px: 2,
                  display: "flex",
                  alignItems: "center"
                }}
                disablePadding
              >
                <ListItemText
                  primary={
                    <span style={{
                      fontFamily: "Montserrat, Arial, sans-serif",
                      color: textMain,
                      fontWeight: 500,
                      fontSize: "1.14rem"
                    }}>
                      {appt.time} <span style={{ color: green, fontWeight: 700 }}>•</span> {appt.description}
                    </span>
                  }
                />
                <Button
                  variant="contained"
                  sx={{
                    ml: 2,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    fontFamily: "Montserrat, Arial, sans-serif",
                    background: green,
                    color: "#fff",
                    px: 3,
                    py: 1.2,
                    minWidth: 150,
                    boxShadow: "0 2px 10px 0 #36b37e16",
                    transition: "0.13s",
                    fontSize: "1.12rem",
                    "&:hover": {
                      background: greenDark,
                      color: "#fff",
                      boxShadow: "0 2px 18px 0 #36b37e22"
                    }
                  }}
                  onClick={() => handleBook(appt)}
                >
                  Book
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* Dialog */}
      <Dialog
        open={bookDialog.open}
        onClose={() => setBookDialog({ open: false, appt: null })}
        PaperProps={{
          sx: { borderRadius: 3, p: 1, fontFamily: "Montserrat, Arial, sans-serif", minWidth: 340 }
        }}
      >
        <DialogTitle sx={{ fontFamily: "Montserrat, Arial, sans-serif", fontWeight: 600, color: greenDark }}>
          Book appointment for {bookDialog.appt?.time}?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => setBookDialog({ open: false, appt: null })}
            sx={{
              color: greenDark,
              fontWeight: 500,
              fontFamily: "Montserrat, Arial, sans-serif",
              borderRadius: 2,
              px: 2,
              "&:hover": { textDecoration: "underline", background: "#f3faf6" }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmBooking}
            variant="contained"
            sx={{
              background: green,
              color: "#fff",
              borderRadius: 2,
              fontWeight: 600,
              fontFamily: "Montserrat, Arial, sans-serif",
              px: 3,
              "&:hover": { background: greenDark }
            }}
          >
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentsCalendar;