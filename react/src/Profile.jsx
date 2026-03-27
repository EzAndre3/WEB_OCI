import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const Profile = () => {
  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 3, maxWidth: 400 }}>
        <Typography variant="h4" gutterBottom>
          Perfil
        </Typography>
        <Typography variant="body1">
          Hola, este es tu perfil de usuario.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Aquí van datos como nombre, correo, etc.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Profile;