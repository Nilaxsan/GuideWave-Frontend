import React from "react";
import Navbar from "../components/Navbar";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GuideHome: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Id");
    localStorage.removeItem("Role");
    navigate("/");
  };

  return (
    <Box>
      {/* <Navbar /> */}
      <Typography variant="h4">Guide Home</Typography>
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

export default GuideHome;
