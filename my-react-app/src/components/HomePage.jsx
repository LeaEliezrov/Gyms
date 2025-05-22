import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import img1 from "../Images/1.jpg";
import img2 from "../Images/2.jpg";
import img3 from "../Images/3.jpg";
import img4 from "../Images/4.jpg";
import img5 from "../Images/5.jpg";

const images = [img1, img2, img3, img4, img5];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* סרגל עליון */}
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
          <Typography
            onClick={() => navigate("/")}
            sx={{
              fontFamily: "'Montserrat', 'Barlow Condensed', Arial, sans-serif",
              fontWeight: 700,
              fontSize: "1.35rem",
              letterSpacing: 2,
              color: "#41a945",
              cursor: "pointer"
            }}
          >
            Gym System
          </Typography>
          <Box>
            <Button
              onClick={() => navigate("/")}
              sx={{
                color: "#181818",
                fontWeight: 500,
                mx: 1.1,
                fontFamily: "'Barlow Condensed', 'Montserrat', Arial, sans-serif",
                fontSize: "1.01rem",
                textTransform: "none",
                letterSpacing: 1,
                borderRadius: 2,
                "&:hover": { color: "#41a945", bgcolor: "#41a94511" }
              }}
            >
              Home
            </Button>
            <Button
              onClick={() => navigate("/about")}
              sx={{
                color: "#181818",
                fontWeight: 500,
                mx: 1.1,
                fontFamily: "'Barlow Condensed', 'Montserrat', Arial, sans-serif",
                fontSize: "1.01rem",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": { color: "#41a945", bgcolor: "#41a94511" }
              }}
            >
              About
            </Button>
            <Button
              onClick={() => navigate("/register")}
              sx={{
                color: "#181818",
                fontWeight: 500,
                mx: 1.1,
                fontFamily: "'Barlow Condensed', 'Montserrat', Arial, sans-serif",
                fontSize: "1.01rem",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": { color: "#41a945", bgcolor: "#41a94511" }
              }}
            >
              Register
            </Button>
            <Button
              onClick={() => navigate("/contact")}
              sx={{
                color: "#181818",
                fontWeight: 500,
                mx: 1.1,
                fontFamily: "'Barlow Condensed', 'Montserrat', Arial, sans-serif",
                fontSize: "1.01rem",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": { color: "#41a945", bgcolor: "#41a94511" }
              }}
            >
              Contact
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* רווח לסרגל קבוע */}
      <Box sx={{ height: 60 }} />

      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          background: "#fcfcfc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          pt: { xs: 6, md: 10 },
        }}
      >
        {/* כותרות */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 300,
              letterSpacing: 3,
              fontFamily: "'Montserrat', 'Barlow Condensed', Arial, sans-serif",
              fontSize: { xs: "2rem", md: "3.5rem" },
              color: "#1a1a1a",
              mb: 1,
              textAlign: "center",
            }}
          >
            Welcome to <span style={{ color: "#41a945", fontWeight: 500 }}>Gym System</span>
          </Typography>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#868686",
              fontWeight: 200,
              fontSize: { xs: "1rem", md: "1.25rem" },
              mb: 5,
              textAlign: "center",
              letterSpacing: 2,
            }}
          >
            Manage. Train. Achieve.
          </Typography>
        </motion.div>

        {/* שורת עיגולים */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: { xs: 2, md: 5 },
            justifyContent: "center",
            alignItems: "center",
            mb: 8,
            flexWrap: "wrap",
          }}
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.13, type: "spring", stiffness: 110 }}
              whileHover={{
                scale: 1.13,
                boxShadow: "0 8px 36px 0 #41a94530, 0 2px 10px #1a1a1a15",
                filter: "grayscale(0%) saturate(1.2)",
              }}
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                width: 104,
                height: 104,
                boxShadow: "0 2px 14px 0 #1a1a1a0b, 0 1px 4px #41a94515",
                border: "2.5px solid #fff",
                background: "#e9e9e9",
                transition: "all 0.18s",
                margin: 0,
                cursor: "pointer",
                filter: "grayscale(18%) saturate(0.8)",
              }}
            >
              <img
                src={img}
                alt={`gym-pic-${i}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                  display: "block",
                  userSelect: "none"
                }}
                draggable={false}
              />
            </motion.div>
          ))}
        </Box>

        {/* כפתור */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, type: "tween" }}
          whileHover={{
            scale: 1.06,
            boxShadow: "0 0 24px #41a94555",
          }}
          whileTap={{ scale: 0.96 }}
        >
          <Button
            onClick={() => navigate("/register")}
            sx={{
              background: "#41a945",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.17rem",
              borderRadius: "30px",
              px: 7,
              py: 1.4,
              textTransform: "none",
              letterSpacing: 2,
              boxShadow: "0 3px 14px #41a94533",
              border: "none",
              transition: "all 0.14s",
              "&:hover": {
                background: "#339b38",
                color: "#eaffed",
                boxShadow: "0 8px 32px #41a94577",
              }
            }}
          >
            Register Now
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
}