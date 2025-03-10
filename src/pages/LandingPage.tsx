import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import { Box } from "@mui/material";

const LandingPage: React.FC = () => {
  return (
    <Box>
      <Navbar />
      <HeroSection />
      <SearchBar />
    </Box>
  );
};

export default LandingPage;
