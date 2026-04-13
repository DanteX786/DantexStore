import React from "react";
import { Box, Typography, Grid, Card, CardMedia, IconButton, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

export default function MisFavoritos({ favoritos = [], setFavoritos }) {
  const navigate = useNavigate();

  const eliminarFavorito = (id) => {
    const nuevaLista = favoritos.filter(item => item.id !== id);
    setFavoritos(nuevaLista);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800 }}>Mis Favoritos ❤️</Typography>

      {favoritos.length > 0 ? (
        <Grid container spacing={3}>
          {favoritos.map((p) => (
            <Grid item xs={12} sm={6} md={3} key={p.id}>
              <Card sx={{ position: 'relative', borderRadius: 3, backgroundColor: '#1a2027', p: 1 }}>
                
                <IconButton 
                  onClick={() => eliminarFavorito(p.id)}
                  sx={{ position: 'absolute', top: 10, right: 10, color: '#ff1744', backgroundColor: 'rgba(0,0,0,0.5)', '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' } }}
                >
                  <DeleteIcon />
                </IconButton>

                <CardMedia component="img"height="200"image={p.imagen}sx={{ borderRadius: 2, objectFit: 'cover' }}/>

                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>{p.nombre}</Typography>
                  <Typography sx={{ color: '#4fc3f7', mb: 1 }}>${p.precio.toLocaleString()}</Typography>
                  
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    onClick={() => navigate('/Tienda')}
                    sx={{ textTransform: 'none', color: 'white', borderColor: 'white' }}
                  >
                    Ver en tienda
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography variant="h6" color="textSecondary">Aún no tienes juegos favoritos.</Typography>
          <Button onClick={() => navigate('/Tienda')} sx={{ mt: 2 }}>Ir a la tienda</Button>
        </Box>
      )}
    </Box>
  );
}