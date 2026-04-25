import { useState } from "react";
import { TextField, Button, Box, Typography, Alert, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok || !data.login) throw new Error(data.msg || "Usuario o contraseña incorrectos");
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" sx={{ background: "radial-gradient(ellipse at 60% 20%, rgba(79,152,163,0.12) 0%, transparent 60%), #111312" }}>
      <Box sx={{ width: "100%", maxWidth: 400, px: 3 }}>

        {/* Logo / marca */}
        <Box textAlign="center" mb={4}>
          <Box sx={{ width: 48, height: 48, borderRadius: "12px", background: "linear-gradient(135deg,#4f98a3,#227f8b)", display: "inline-flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </Box>
          <Typography variant="h5" color="text.primary">Bienvenido de vuelta</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>Inicia sesión para continuar</Typography>
        </Box>

        {/* Card */}
        <Box sx={{ background: "#1c1b19", border: "1px solid #262523", borderRadius: "16px", p: 4 }}>
          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Usuario"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
            <TextField
              label="Contraseña"
              type={showPass ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)} edge="end" size="small" sx={{ color: "text.secondary" }}>
                      {showPass
                        ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      }
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" fullWidth size="large" disabled={loading} sx={{ mt: 1, py: 1.5 }}>
              {loading ? <CircularProgress size={22} color="inherit" /> : "Iniciar sesión"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;