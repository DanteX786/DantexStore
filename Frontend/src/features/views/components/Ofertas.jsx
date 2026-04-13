import React from "react";
import { Box, Typography, Grid, Card, CardMedia, IconButton, Button } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const promociones = [
  { id: 9, nombre: "Elden Ring", precio: 250000, oferta: 190000, imagen: "/img/elden.jpg" },
  { id: 10, nombre: "GTA 5", precio: 100000, oferta: 45000, imagen: "/img/gta.jpg" }
];

export default function Ofertas({ carrito, setCarrito, favoritos, setFavoritos }) {
  const toggleFav = (p) => {
    favoritos.find(f => f.id === p.id) ? setFavoritos(favoritos.filter(f => f.id !== p.id)) : setFavoritos([...favoritos, p]);
  };

  const addCart = (p) => {
    const exist = carrito.find(i => i.id === p.id);
    exist ? setCarrito(carrito.map(i => i.id === p.id ? { ...i, cant: i.cant + 1 } : i)) : setCarrito([...carrito, { ...p, cant: 1 }]);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, color: '#ff5722' }}>Ofertas de Locura 🔥</Typography>
      <Grid container spacing={3}>
        {promociones.map(p => (
          <Grid item xs={12} sm={6} md={3} key={p.id}>
            <Card sx={{ p: 2, borderRadius: 4, position: 'relative', border: '2px solid #ff5722' }}>
              <IconButton onClick={() => toggleFav(p)} sx={{ position: 'absolute', top: 10, right: 10, color: 'red' }}>
                {favoritos.find(f => f.id === p.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <CardMedia component="img" height="220" image={p.imagen} sx={{ borderRadius: 2, mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{p.nombre}</Typography>
              <Typography sx={{ textDecoration: 'line-through', color: 'gray' }}>${p.precio.toLocaleString()}</Typography>
              <Typography variant="h5" sx={{ color: '#ff5722', fontWeight: 800, mb: 2 }}>${p.oferta.toLocaleString()}</Typography>
              <Button variant="contained" fullWidth onClick={() => addCart(p)} sx={{ bgcolor: '#ff5722', '&:hover': { bgcolor: '#e64a19' } }}>Aprovechar Oferta</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}