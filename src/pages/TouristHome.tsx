import React from "react";
import Navbar from "../components/Navbar";
import { Box, Typography,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TouristHome: React.FC = () => {
    const navigate =useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("Id");
        localStorage.removeItem("Role");
        navigate("/");
      };
      
  return (
    <Box>
      {/* <Navbar /> */}
      <Typography variant="h4">Tourist Home</Typography>
    <Button
        variant="contained"
        color="secondary"
        sx={{ borderRadius: 50 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default TouristHome;
