import Navbar from "../components/Navbar";
import { Container, Typography, Paper, Avatar, Box, Chip } from "@mui/material";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const initial = (user.name || user.username || "U").charAt(0).toUpperCase();
  const since = user.createdAt ? new Date(user.createdAt).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" }) : null;

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Paper sx={{ borderRadius: "16px", overflow: "hidden" }}>
          {/* Header con gradiente */}
          <Box sx={{ height: 80, background: "linear-gradient(135deg, rgba(79,152,163,0.3) 0%, rgba(34,127,139,0.15) 100%)", borderBottom: "1px solid #262523" }} />

          <Box sx={{ px: 4, pb: 4, mt: -4 }}>
            <Avatar sx={{ width: 72, height: 72, fontSize: "1.8rem", fontWeight: 700, background: "linear-gradient(135deg,#4f98a3,#227f8b)", border: "3px solid #1c1b19", mb: 2 }}>
              {initial}
            </Avatar>

            <Typography variant="h5" color="text.primary" fontWeight={700}>{user.name || "Usuario"}</Typography>
            <Typography color="text.secondary" mb={2}>@{user.username}</Typography>

            <Chip label="Activo" size="small" sx={{ background: "rgba(109,170,69,0.15)", color: "#6daa45", border: "1px solid rgba(109,170,69,0.3)", fontWeight: 600 }} />

            {since && (
              <Typography variant="body2" color="text.secondary" mt={3}>
                Miembro desde {since}
              </Typography>
            )}

            <Typography variant="body2" color="text.secondary" mt={1}>
              Esta información viene del usuario que inició sesión por medio de la API.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Profile;