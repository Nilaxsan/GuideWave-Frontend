import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginModal from "./Auth/LoginModal";
import SignupModal from "./Auth/SignupModal";
import "../css/navbar.css";
const Navbar: React.FC = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const handleLoginOpen = () => setOpenLogin(true);
  const handleLoginClose = () => setOpenLogin(false);

  const handleSignupOpen = () => setOpenSignup(true);
  const handleSignupClose = () => setOpenSignup(false);
  return (
    <AppBar position="absolute" className="navbar">
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 20px" }}>
        <Typography variant="h6">GuideWave</Typography>
        <div>
          <Button color="secondary" sx={{ borderRadius: "50px" }}>
            Home
          </Button>
          <Button color="secondary" sx={{ borderRadius: "50px" }}>
            Products
          </Button>
          <Button color="secondary" sx={{ borderRadius: "50px" }}>
            Resources
          </Button>
          <Button color="secondary" sx={{ borderRadius: "50px" }}>
            Contact
          </Button>
          <Button color="secondary" sx={{ borderRadius: "50px" }}>
            Blog
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ marginLeft: "8px", borderRadius: "50px" }}
            onClick={handleLoginOpen}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginLeft: "8px", borderRadius: "50px" }}
            onClick={handleSignupOpen}
          >
            Sign Up
          </Button>
          <LoginModal open={openLogin} onClose={handleLoginClose} />
          <SignupModal open={openSignup} onClose={handleSignupClose} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
