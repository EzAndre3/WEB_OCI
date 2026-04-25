import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const initial = (user.name || user.username || "U").charAt(0).toUpperCase();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const navBtn = (label, path) => (
    <Button
      color="inherit"
      onClick={() => navigate(path)}
      sx={{
        fontWeight: location.pathname === path ? 700 : 400,
        color: location.pathname === path ? "primary.main" : "text.secondary",
        borderBottom: location.pathname === path ? "2px solid" : "2px solid transparent",
        borderRadius: 0,
        px: 2,
        pb: "2px",
        "&:hover": { color: "text.primary", background: "transparent" },
      }}
    >
      {label}
    </Button>
  );

  return (
    <AppBar position="static" elevation={0} sx={{ background: "#1c1b19", borderBottom: "1px solid #262523" }}>
      <Toolbar sx={{ gap: 1 }}>
        <Box sx={{ width: 28, height: 28, borderRadius: "8px", background: "linear-gradient(135deg,#4f98a3,#227f8b)", display: "flex", alignItems: "center", justifyContent: "center", mr: 1 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </Box>
        <Typography variant="subtitle1" fontWeight={700} color="text.primary" sx={{ flexGrow: 1, letterSpacing: "-0.3px" }}>
          App React
        </Typography>

        {navBtn("Home", "/home")}
        {navBtn("Usuarios", "/users")}
        {navBtn("Perfil", "/profile")}

        <Box sx={{ width: 1, height: 24, background: "#393836", mx: 1 }} />

        <Avatar sx={{ width: 30, height: 30, fontSize: "0.8rem", background: "linear-gradient(135deg,#4f98a3,#227f8b)", fontWeight: 700 }}>
          {initial}
        </Avatar>

        <Button size="small" onClick={logout} sx={{ color: "text.secondary", fontWeight: 500, "&:hover": { color: "#d163a7" } }}>
          Salir
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
