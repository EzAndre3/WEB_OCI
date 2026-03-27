import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mi App
        </Typography>
        <Button color="inherit" component={RouterLink} to="/home">
        Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/profile">
        Perfil
        </Button>
        <Button color="inherit" onClick={logout}>
        Cerrar sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;