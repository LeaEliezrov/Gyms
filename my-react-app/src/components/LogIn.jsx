import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Fade,
  Divider,
  AppBar,
  Toolbar,
} from '@mui/material';
import { useNavigate } from "react-router-dom";

const green = "#36b37e";
const greenDark = "#23885a";
const textMain = "#222"; // כהה עדין, לא שחור
const textLight = "#888";
const lightGray = "#f7f7f7";
const borderGray = "#e5e5e5";

const LoginComponent = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shouldRegister, setShouldRegister] = useState(false);

  // Registration state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const validateLogin = () => {
    if (!name || !password) {
      setError("Username and password are required.");
      return false;
    }
    return true;
  };

  const validateRegistration = () => {
    if (!firstName || !lastName || !phone || !email) {
      setError("First name, last name, phone, and email are required.");
      return false;
    }
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber) || idNumber <= 0) {
      setError("ID must be a positive number.");
      return false;
    }
    return true;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validateLogin()) return;

    try {
      const response = await fetch('https://localhost:7240/api/Values/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        setError('');
        // TODO: handle login success
      } else {
        const text = await response.text();
        const data = text ? JSON.parse(text) : { message: "No content returned." };
        setError(data.message);
        if (response.status === 401) setShouldRegister(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegistration = async () => {
    if (!validateRegistration()) return;
    try {
      const registrationData = {
        Id: parseInt(id, 10),
        FirstName: firstName,
        LastName: lastName,
        Phone: phone,
        Email: email,
      };
      const response = await fetch('https://localhost:7240/api/Values/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(registrationData),
      });
      if (response.ok) {
        setError('');
        // TODO: handle registration success
      } else {
        const text = await response.text();
        const data = text ? JSON.parse(text) : { message: "Registration failed." };
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleIdChange = (e) => {
    const value = e.target.value;
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue) && intValue > 0) {
      setId(value);
      setError('');
    } else {
      setId(value);
      setError("ID must be a positive number.");
    }
  };

  // סטייל שדות הטופס (outline ירוק בפוקוס)
  const fieldSX = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: borderGray,
      },
      '&:hover fieldset': {
        borderColor: green,
      },
      '&.Mui-focused fieldset': {
        borderColor: green,
        boxShadow: '0 0 0 1px #36b37e22',
      },
    },
    '& label.Mui-focused': {
      color: green,
    },
    background: "#fcfcfc",
    borderRadius: 2,
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        fontFamily: 'Montserrat, Arial, sans-serif',
        background: lightGray,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "#fff",
          color: textMain,
          boxShadow: "0 2px 18px #00000010",
          px: 2,
        }}
      >
        <Toolbar sx={{ minHeight: 60, display: "flex", justifyContent: "space-between" }}>
          <Typography
            onClick={() => navigate("/")}
            sx={{
              fontFamily: "Montserrat, Arial, sans-serif",
              fontWeight: 400, // רגיל
              fontSize: "1.3rem",
              letterSpacing: 2,
              color: textMain,
              cursor: "pointer",
              "& span": { color: green }
            }}
          >
            Gym <span>System</span>
          </Typography>
          <Box>
            <Button
              onClick={() => navigate("/")}
              sx={{
                color: textMain,
                fontWeight: 400,
                mx: 1,
                fontFamily: "Montserrat, Arial, sans-serif",
                fontSize: "1.01rem",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": { color: green, bgcolor: "#e2f7ee" }
              }}
            >Home</Button>
            <Button
              onClick={() => navigate("/about")}
              sx={{
                color: textMain,
                fontWeight: 400,
                mx: 1,
                fontFamily: "Montserrat, Arial, sans-serif",
                fontSize: "1.01rem",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": { color: green, bgcolor: "#e2f7ee" }
              }}
            >About</Button>
            <Button
              onClick={() => navigate("/register")}
              sx={{
                color: textMain,
                fontWeight: 400,
                mx: 1,
                fontFamily: "Montserrat, Arial, sans-serif",
                fontSize: "1.01rem",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": { color: green, bgcolor: "#e2f7ee" }
              }}
            >Register</Button>
            <Button
              onClick={() => navigate("/contact")}
              sx={{
                color: textMain,
                fontWeight: 400,
                mx: 1,
                fontFamily: "Montserrat, Arial, sans-serif",
                fontSize: "1.01rem",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": { color: green, bgcolor: "#e2f7ee" }
              }}
            >Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer for AppBar */}
      <Box sx={{ height: 60 }} />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 5 },
            borderRadius: 5,
            width: "100%",
            maxWidth: 410,
            bgcolor: "#fff",
            border: `1.5px solid ${borderGray}`,
            boxShadow: "0 6px 34px 0 #1818180c",
            transition: "box-shadow 0.19s",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: textMain,
              fontWeight: 400, // לא מודגש
              mb: 3,
              fontFamily: 'Montserrat, Arial, sans-serif',
              letterSpacing: 1.5,
              "& span": { color: green }
            }}
            gutterBottom
          >
            Gym <span>System</span>
          </Typography>

          <Fade in={!!error}>
            <Box>{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}</Box>
          </Fade>

          {!shouldRegister ? (
            <form onSubmit={handleLogin}>
              <TextField
                label="Username"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                required
                autoFocus
                sx={fieldSX}
                InputProps={{
                  style: { fontFamily: 'Montserrat, Arial, sans-serif', color: textMain }
                }}
                InputLabelProps={{
                  style: { fontFamily: 'Montserrat, Arial, sans-serif', color: textLight }
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                margin="normal"
                required
                sx={fieldSX}
                InputProps={{
                  style: { fontFamily: 'Montserrat, Arial, sans-serif', color: textMain }
                }}
                InputLabelProps={{
                  style: { fontFamily: 'Montserrat, Arial, sans-serif', color: textLight }
                }}
              />
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  borderRadius: 3,
                  fontWeight: 600,
                  background: green,
                  color: "#fff",
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  boxShadow: "0 3px 10px 0 #36b37e22",
                  transition: "0.14s",
                  fontSize: "1.06rem",
                  "&:hover": {
                    background: greenDark,
                    color: "#fff",
                  }
                }}
                type="submit"
              >
                Login
              </Button>
              <Divider sx={{
                my: 3, fontFamily: 'Montserrat, Arial, sans-serif', color: "#bbb",
                "&::before, &::after": { borderColor: borderGray }
              }}>or</Divider>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  fontWeight: 600,
                  borderRadius: 3,
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  color: green,
                  borderColor: green,
                  transition: "0.13s",
                  background: "#fbfbfb",
                  fontSize: "1.03rem",
                  "&:hover": {
                    background: greenDark,
                    borderColor: greenDark,
                    color: "#fff",
                  }
                }}
                onClick={() => setShouldRegister(true)}
              >
                No account? Register
              </Button>
            </form>
          ) : (
            <Box component="form" autoComplete="off">
              <Typography
                variant="h5"
                align="center"
                sx={{
                  fontWeight: 400, mb: 2,
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  color: green
                }}
              >
                Register
              </Typography>
              <TextField
                label="ID"
                variant="outlined"
                value={id}
                onChange={handleIdChange}
                fullWidth
                margin="normal"
                required
                sx={fieldSX}
                InputProps={{
                  style: { fontFamily: 'Montserrat, Arial, sans-serif', color: textMain }
                }}
                InputLabelProps={{
                  style: { fontFamily: 'Montserrat, Arial, sans-serif', color: textLight }
                }}
              />
              <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                margin="normal"
                required
                sx={fieldSX}
                InputProps={{
                  style: { fontFamily: 'Montserrat, Arial, sans-serif', color: textMain }
                }}
                InputLabelProps={{
                  style: { fontFamily: 'Montserrat, Arial, sans-serif', color: textLight }
                }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                margin="normal"
                required
                sx={fieldSX}
                InputProps={{
                  style: { fontFamily: 'Montserrat, Arial, sans-serif', color: textMain }
                }}
                InputLabelProps={{
                  style: { fontFamily: 'Montserrat, Arial, sans-serif', color: textLight }
                }}
              />
              <TextField
                label="Phone"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                margin="normal"
                required
                sx={fieldSX}
                InputProps={{
                  style: { fontFamily: 'Montserrat, Arial, sans-serif', color: textMain }
                }}
                InputLabelProps={{
                  style: { fontFamily: 'Montserrat, Arial, sans-serif', color: textLight }
                }}
              />
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                required
                sx={fieldSX}
                InputProps={{
                  style: { fontFamily: 'Montserrat, Arial, sans-serif', color: textMain }
                }}
                InputLabelProps={{
                  style: { fontFamily: 'Montserrat, Arial, sans-serif', color: textLight }
                }}
              />
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  background: green,
                  color: "#fff",
                  boxShadow: "0 3px 10px 0 #36b37e22",
                  transition: "0.14s",
                  fontSize: "1.06rem",
                  "&:hover": {
                    background: greenDark,
                    color: "#fff",
                  }
                }}
                onClick={handleRegistration}
              >
                Register
              </Button>
              <Button
                color="secondary"
                variant="text"
                fullWidth
                sx={{
                  mt: 1,
                  fontWeight: 400,
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  color: green,
                  "&:hover": { color: greenDark, textDecoration: "underline" }
                }}
                onClick={() => setShouldRegister(false)}
              >
                Already have an account? Back to login
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginComponent;