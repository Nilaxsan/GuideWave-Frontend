// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0b8d93", 
    },
    secondary: {
      main: "#f6d7a9", // Orange
    },
    warning: {
      main: "#f57c00", //
    },
    background: {
      default: "#f5f5f5", // Light Gray
    },
    text: {
      primary: "#0b8d93",
      secondary: "#0b8d93",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;
