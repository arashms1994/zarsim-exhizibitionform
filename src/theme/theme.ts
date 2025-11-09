import { createTheme, type ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'system-ui, "Vazir", "sans-serif"',
  },
  palette: {
    mode: "light",
    primary: {
      main: "#0ead69",
    },
    secondary: {
      main: "#0ead69",
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
