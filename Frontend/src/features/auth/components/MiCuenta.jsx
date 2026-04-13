import React, { useState, useEffect } from "react";
import { IconButton, InputAdornment, Box, TextField, Typography, Button, Paper, Divider } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Esta constante detecta automáticamente si estás en producción o local
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function MiCuenta() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [userActive, setUserActive] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [modo, setModo] = useState("login");

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    const savedUser = localStorage.getItem("usuarioDante");
    if (savedUser) {
      setUserActive(JSON.parse(savedUser));
    }
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegistro = async () => {
    const regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!form.nombre || !form.email || !form.password) {
      alert("Por favor, llena todos los campos.");
      return;
    }
    if (!regexPassword.test(form.password)) {
      alert("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número 🛡️");
      return;
    }

    try {
      // Usamos la URL dinámica aquí
      const res = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          password: form.password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.mensaje);
        setModo("login");
      } else {
        alert(data.mensaje);
      }
    } catch (error) {
      alert("Error al conectar con el servidor de Render.");
    }
  };

  const handleLogin = async () => {
    try {
      // Usamos la URL dinámica aquí
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();
      if (res.ok) {
        setUserActive(data.user);
        localStorage.setItem("usuarioDante", JSON.stringify(data.user));
        alert(`¡Hola de nuevo, ${data.user.nombre}!`);
      } else {
        alert(data.mensaje);
      }
    } catch (error) {
      alert("Error: El servidor en Render está despertando o apagado.");
    }
  };

  const handleLogout = () => {
    setUserActive(null);
    localStorage.removeItem("usuarioDante");
    alert("Sesión cerrada");
  };

  // VISTA CUANDO EL USUARIO ESTÁ LOGUEADO
  if (userActive) {
    return (
      <Box sx={{ maxWidth: 450, mx: "auto", mt: 8, p: 2 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: 'center', bgcolor: '#1a1a1a', color: 'white' }}>
          <Typography variant="h4" gutterBottom>Mi Perfil 👤</Typography>
          <Divider sx={{ my: 2, bgcolor: 'gray' }} />
          <Box sx={{ textAlign: 'left', mb: 4 }}>
            <Typography variant="h6"><strong>Nombre:</strong> {userActive.nombre}</Typography>
            <Typography variant="h6"><strong>Email:</strong> {userActive.email}</Typography>
          </Box>
          <Button variant="contained" color="error" fullWidth size="large" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Paper>
      </Box>
    );
  }

  // VISTA DE LOGIN / REGISTRO
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 2 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: 'bold' }}>
          {modo === "login" ? "INICIAR SESIÓN" : "CREAR CUENTA"}
        </Typography>

        {modo === "registro" && (
          <TextField fullWidth label="Nombre Completo" name="nombre" margin="normal" variant="outlined" onChange={handleChange} />
        )}

        <TextField fullWidth label="Correo Electrónico" name="email" margin="normal" variant="outlined" onChange={handleChange} />

        <TextField
          fullWidth
          label="Contraseña"
          name="password"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          helperText={modo === "registro" ? "Mínimo 8 caracteres, una mayúscula y un número" : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {modo === "login" ? (
          <Button variant="contained" fullWidth size="large" sx={{ mt: 3, bgcolor: '#00b7ff' }} onClick={handleLogin}>
            Entrar
          </Button>
        ) : (
          <Button variant="contained" color="success" fullWidth size="large" sx={{ mt: 3 }} onClick={handleRegistro}>
            Registrarme ahora
          </Button>
        )}

        <Button
          fullWidth
          sx={{ mt: 3, textTransform: 'none', color: 'gray' }}
          onClick={() => setModo(modo === "login" ? "registro" : "login")}
        >
          {modo === "login" ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia sesión"}
        </Button>
      </Paper>
    </Box>
  );
}

export default MiCuenta;