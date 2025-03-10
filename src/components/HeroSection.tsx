import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import LoginModal from "./Auth/LoginModal";
import SignupModal from "./Auth/SignupModal";

const HeroSection: React.FC = () => {

   const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
  
    const handleLoginOpen = () => setOpenLogin(true);
    const handleLoginClose = () => setOpenLogin(false);
  
    const handleSignupOpen = () => setOpenSignup(true);
    const handleSignupClose = () => setOpenSignup(false);

  return (
    <Box
      sx={{
        height: "70vh",
        backgroundImage: "url('../assets/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "white",
      }}
    >
      <Typography variant="h3" fontWeight="bold" color="secondary">
        Plan Your Trip With GuideWave
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Travel to your favourite city while respecting the environment!
      </Typography>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
      <Button
        variant="outlined"
        color="primary"
        sx={{ borderRadius: 50 }}
        onClick={handleLoginOpen}
      >
        Login
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ borderRadius: 50 }}
        onClick={handleSignupOpen}
      >
        Sign Up
      </Button>
    </Box>
    <LoginModal open={openLogin} onClose={handleLoginClose} />
      <SignupModal open={openSignup} onClose={handleSignupClose} />
      
    </Box>
  );
};

export default HeroSection;
