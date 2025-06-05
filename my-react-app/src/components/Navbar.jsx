import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const navBtnStyle = {
  color: "#181818",
  fontWeight: 500,
  mx: 1.1,
  fontFamily: "'Barlow Condensed', 'Montserrat', Arial, sans-serif",
  fontSize: "1.01rem",
  textTransform: "none",
  letterSpacing: 1,
  borderRadius: 2,
  "&:hover": { color: "#41a945", bgcolor: "#41a94511" }
};

export default function Navbar() {
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  const handlePersonalAreaClick = () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      navigate("/personal-area"); // Redirect to personal area if authenticated
    }
  };

>>>>>>> 23ed287 (update appointment func)
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "#fff",
          boxShadow: "0 2px 18px #41a94515",
          color: "#181818",
          px: 2,
        }}
      >
        <Toolbar sx={{ minHeight: 60, display: "flex", justifyContent: "space-between" }}>
          {/* הלוגו המעוצב בצד שמאל */}
          <Box
            onClick={() => navigate("/")}
            sx={{
              display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none"
            }}
          >
            <svg
              width="45"
              height="45"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: 8 }}
            >
              <circle cx="25" cy="25" r="25" fill="#36b37e"/>
              <rect x="16" y="19" width="18" height="12" rx="6" fill="#23885a" />
              <rect x="21" y="11" width="8" height="19" rx="4" fill="#fff"/>
              <circle cx="25" cy="25" r="3.5" fill="#36b37e" stroke="#fff" strokeWidth="2"/>
              <rect x="11" y="23" width="4" height="10" rx="2" fill="#36b37e"/>
              <rect x="35" y="23" width="4" height="10" rx="2" fill="#36b37e"/>
            </svg>
            <Typography
              sx={{
                fontFamily: "'Montserrat', 'Barlow Condensed', Arial, sans-serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                letterSpacing: 2,
                color: "#23885a"
              }}
            >
              My Gym
            </Typography>
          </Box>
          <Box>
            <Button onClick={() => navigate("/")} sx={navBtnStyle}>Home</Button>
            <Button onClick={() => navigate("/about")} sx={navBtnStyle}>About</Button>
            <Button onClick={() => navigate("/register")} sx={navBtnStyle}>Register</Button>
            <Button onClick={() => navigate("/contact")} sx={navBtnStyle}>Contact</Button>
            <Button onClick={() => navigate("/appointment")} sx={navBtnStyle}>Book Appointment</Button>
<<<<<<< HEAD
=======
            <Button onClick={handlePersonalAreaClick} sx={navBtnStyle}>Personal Area</Button>
>>>>>>> 23ed287 (update appointment func)
          </Box>
        </Toolbar>
      </AppBar>
      {/* רווח לסרגל קבוע */}
      <Box sx={{ height: 60 }} />
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 23ed287 (update appointment func)
