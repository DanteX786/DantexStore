import React from "react";
import { Box, Typography, IconButton, Stack, Paper, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Carrito({ carrito, setCarrito }) {
  const updateCant = (id, val) => setCarrito(carrito.map(i => i.id === id ? { ...i, cant: Math.max(1, i.cant + val) } : i));
  const remove = (id) => setCarrito(carrito.filter(i => i.id !== id));
  const total = carrito.reduce((acc, i) => acc + (i.oferta || i.precio) * i.cant, 0);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800 }}>Mi Carrito 🛒</Typography>
      <Stack spacing={2}>
        {carrito.map(i => (
          <Paper key={i.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 3 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{i.nombre}</Typography>
              <Typography color="text.secondary">${(i.oferta || i.precio).toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton size="small" onClick={() => updateCant(i.id, -1)}><RemoveIcon /></IconButton>
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{i.cant}</Typography>
              <IconButton size="small" onClick={() => updateCant(i.id, 1)}><AddIcon /></IconButton>
              <IconButton color="error" onClick={() => remove(i.id)}><DeleteIcon /></IconButton>
            </Box>
          </Paper>
        ))}
      </Stack>
      {carrito.length > 0 && (
        <Box sx={{ mt: 4, textAlign: 'right' }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Total: ${total.toLocaleString()}</Typography>
          <Button variant="contained" size="large" sx={{ mt: 2, bgcolor: '#3f51b5', px: 6 }}>Pagar Ahora</Button>
        </Box>
      )}
    </Box>
  );
}