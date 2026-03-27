import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido
      </Typography>
      <Typography>
        Hola!
      </Typography>
    </Box>
  );
};

export default Home;