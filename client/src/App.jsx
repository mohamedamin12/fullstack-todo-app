import React from "react";
import { Container, Typography } from "@mui/material";
import Home from "./pages/Home";

function App() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        📝 To-Do App
      </Typography>
      <Home />
    </Container>
  );
}

export default App;
