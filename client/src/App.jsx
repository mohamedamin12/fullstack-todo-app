import React from "react";
import { Container, CssBaseline } from "@mui/material";
import Home from "./pages/Home";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Cairo', sans-serif",
  },
});


function App() {
  return (
    <Container maxWidth="md">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </Container>
  );
}

export default App;
