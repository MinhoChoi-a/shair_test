import { createTheme } from "@mui/material";

//#d6d6d6
//#b3b5b3

export const theme = createTheme({
  
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    }
  },
  palette: {
    primary: { main: "#000000" },
    secondary: { main: "#ffffff" },
    success: { main: "#4b4a4f" }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#d6d6d6'
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#b3b5b3',
          borderRadius: 0,
          border: "#000000"
        },
      },
    }
  },
});