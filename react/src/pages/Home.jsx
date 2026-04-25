import Navbar from "../components/Navbar";
import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Hola, <Box component="span" sx={{ color: "primary.main" }}>{user.name || user.username}</Box> 👋
        </Typography>
        <Typography color="text.secondary" mb={4}>
          La aplicación de React ya está conectada con la REST API de Express y MongoDB.
        </Typography>

        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={3}>
          <Paper sx={{ p: 3, borderRadius: "14px", cursor: "pointer", transition: "border-color 0.2s", "&:hover": { borderColor: "primary.main" } }} onClick={() => navigate("/users")}>
            <Box sx={{ width: 40, height: 40, borderRadius: "10px", background: "rgba(79,152,163,0.15)", display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f98a3" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </Box>
            <Typography variant="h6" color="text.primary" gutterBottom>Administrar usuarios</Typography>
            <Typography variant="body2" color="text.secondary">Agrega, consulta y elimina usuarios del sistema.</Typography>
            <Button variant="contained" size="small" sx={{ mt: 2 }} onClick={() => navigate("/users")}>Ir a usuarios</Button>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: "14px", cursor: "pointer", transition: "border-color 0.2s", "&:hover": { borderColor: "primary.main" } }} onClick={() => navigate("/profile")}>
            <Box sx={{ width: 40, height: 40, borderRadius: "10px", background: "rgba(79,152,163,0.15)", display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f98a3" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </Box>
            <Typography variant="h6" color="text.primary" gutterBottom>Mi perfil</Typography>
            <Typography variant="body2" color="text.secondary">Consulta la información de tu cuenta actual.</Typography>
            <Button variant="outlined" size="small" sx={{ mt: 2 }} onClick={() => navigate("/profile")}>Ver perfil</Button>
          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default Home;