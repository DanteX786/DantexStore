import React from "react";
import { Box, Typography, Grid, Card, CardMedia, IconButton, Button, TextField } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Tienda({ carrito = [], setCarrito, favoritos = [], setFavoritos }) {
  const [presupuesto, setPresupuesto] = useState("");
  const [resultados, setResultados] = useState([]);

  const toggleFav = (p) => {
    const esFavorito = favoritos && favoritos.find(f => f.id === p.id);
    if (esFavorito) {
      setFavoritos(favoritos.filter(f => f.id !== p.id));
    } else {
      setFavoritos([...favoritos, p]);
    }
  };

  const addCart = (p) => {
    const exist = carrito && carrito.find(i => i.id === p.id);
    if (exist) {
      setCarrito(carrito.map(i => i.id === p.id ? { ...i, cant: i.cant + 1 } : i));
    } else {
      setCarrito([...carrito, { ...p, cant: 1 }]);
    }
  };

  const manejarBusqueda = () => {
    if (!presupuesto) return;
    fetch(`http://localhost:4000/api/juegos/presupuesto/${presupuesto}`)
      .then(res => res.json())
      .then(data => setResultados(data))
      .catch(err => console.error("Error:", err));
  };

  const juegos = [
    { id: 1, nombre: "Elden Ring", precio: 250000, imagen: "/img/elden.jpg" },
    { id: 2, nombre: "Minecraft", precio: 80000, imagen: "/img/minecraft.jpg" },
    { id: 3, nombre: "Terraria", precio: 45000, imagen: "/img/Terraria.jpg" },
    { id: 4, nombre: "God of War 4", precio: 180000, imagen: "/img/gow4.jpg" },
    { id: 5, nombre: "HADES 2", precio: 120000, imagen: "/img/hades.jpg" },
    { id: 6, nombre: "Hollow Knight", precio: 50000, imagen: "/img/hollow.jpg" },
    { id: 7, nombre: "GTA 5", precio: 100000, imagen: "/img/gta.jpg" },
    { id: 8, nombre: "Overwatch", precio: 140000, imagen: "/img/over.jpg" }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 6, p: 3, bgcolor: '#3f0091', borderRadius: 4, boxShadow: 1 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#ffffff' }}>
          ¿Qué juegos me alcanzan? 
        </Typography>
        <Box sx={{ display:  'flex', gap: 2, alignItems: 'center', mb: 2 , color:"white"}}>
          <TextField
            label="Tu presupuesto"
            type="number"
            size="small"
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
            sx={{ bgcolor: 'black' }}
          />
          <Button variant="contained" color="success" onClick={manejarBusqueda}>
            Consultar al Servidor
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          {resultados.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {resultados.map(r => (
                <Typography key={r.id} sx={{ bgcolor: '#000000', p: 1, borderRadius: 2, fontSize: '0.9rem', border: '1px solid #ffffff' }}>
                  🎮 {r.nombre} (${r.precio.toLocaleString()})
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: '#000000', fontStyle: 'italic' }}>
              Ingresa un monto para filtrar por la API de Node.js
            </Typography>
          )}
        </Box>
      </Box>

      <hr style={{ opacity: 0.2, marginBottom: '30px' }} />

      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800 }}>Tienda Principal</Typography>
      <Grid container spacing={3}>
        {juegos.map(p => (
          <Grid item xs={12} sm={6} md={3} key={p.id}>
            <Card sx={{ p: 2, borderRadius: 4, position: 'relative', boxShadow: 3 }}>
              <IconButton onClick={() => toggleFav(p)} sx={{ position: 'absolute', top: 10, right: 10, color: 'red', zIndex: 1 }}>
                {favoritos && favoritos.find(f => f.id === p.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <CardMedia 
                component="img"
                image={p.imagen}
                alt={p.nombre}
                sx={{height: 250, width: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', borderRadius: 2, mb: 1}}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{p.nombre}</Typography>
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                ${p.precio.toLocaleString()}
              </Typography>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={() => addCart(p)} 
                sx={{ bgcolor: '#3f51b5', borderRadius: 2, textTransform: 'none' }}
              >
                Añadir al carrito
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}