import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { API_URL } from "../config";
import { Alert, Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Chip } from "@mui/material";

function Users() {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Error al obtener usuarios");
      setUsers(data);
    } catch (error) { setError(error.message); }
  };

  useEffect(() => { getUsers(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Error al crear usuario");
      setUsers([...users, data]);
      setForm({ name: "", username: "", password: "" });
      setSuccess("Usuario agregado correctamente");
    } catch (error) { setError(error.message); }
  };

  const handleDelete = async (id) => {
    setError(""); setSuccess("");
    try {
      const response = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Error al eliminar usuario");
      setUsers(users.filter((u) => u._id !== id));
      setSuccess("Usuario eliminado correctamente");
    } catch (error) { setError(error.message); }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h5" color="text.primary" fontWeight={700}>Usuarios</Typography>
            <Typography variant="body2" color="text.secondary">{users.length} usuario{users.length !== 1 ? "s" : ""} registrado{users.length !== 1 ? "s" : ""}</Typography>
          </Box>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}

        {/* Formulario */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: "14px" }}>
          <Typography variant="subtitle1" fontWeight={600} color="text.primary" mb={2}>Agregar usuario</Typography>
          <Box component="form" onSubmit={handleSubmit} display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr 1fr auto" }} gap={2} alignItems="flex-start">
            <TextField label="Nombre" name="name" value={form.name} onChange={handleChange} required size="small" />
            <TextField label="Usuario" name="username" value={form.username} onChange={handleChange} required size="small" />
            <TextField label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} required size="small" />
            <Button type="submit" variant="contained" sx={{ height: 40, whiteSpace: "nowrap" }}>Guardar</Button>
          </Box>
        </Paper>

        {/* Tabla */}
        <TableContainer component={Paper} sx={{ borderRadius: "14px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Box sx={{ width: 32, height: 32, borderRadius: "8px", background: "linear-gradient(135deg,#4f98a3,#227f8b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
                        {(user.name || user.username || "U").charAt(0).toUpperCase()}
                      </Box>
                      <Typography variant="body2" color="text.primary" fontWeight={500}>{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell><Typography variant="body2" color="text.secondary">@{user.username}</Typography></TableCell>
                  <TableCell>
                    {loggedUser?._id === user._id
                      ? <Chip label="Sesión actual" size="small" sx={{ background: "rgba(79,152,163,0.15)", color: "primary.main", border: "1px solid rgba(79,152,163,0.3)", fontWeight: 600 }} />
                      : <Chip label="Activo" size="small" sx={{ background: "rgba(109,170,69,0.1)", color: "#6daa45", border: "1px solid rgba(109,170,69,0.25)", fontWeight: 500 }} />
                    }
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      disabled={loggedUser?._id === user._id}
                      onClick={() => handleDelete(user._id)}
                      sx={{ borderRadius: "8px", fontSize: "0.75rem" }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6, color: "text.secondary" }}>
                    No hay usuarios registrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Users;