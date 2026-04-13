import React from "react";
import { Box, Typography, Button, Container, Grid, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

function Content() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Grid container spacing={10} alignItems="center" sx={{ mb: 15 }}>
        <Grid item xs={12} md={6}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <LocalFireDepartmentIcon sx={{ color: '#ff5722' }} />
              <Typography variant="overline" sx={{ fontWeight: 'bold', letterSpacing: 1.5 }}>Nueva Colección 2026</Typography>
            </Box>

            <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 3 }}>Consigue tus juegos favoritos al mejor precio en <span style={{ color: '#3f51b5' }}> 
              DanteX</span>.</Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', mb: 5 }}>Tu tienda global de claves digitales y tarjetas de regalo.</Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" sx={{ bgcolor: '#3f51b5', color: 'white', borderRadius: '12px', px: 4, py: 1.5, textTransform: 'none', '&:hover': 
                { bgcolor: '#303f9f' } }} onClick={() => navigate("/tienda")}>Explorar Catálogo</Button>
              <Button variant="text" sx={{ color: '#3f51b5', fontWeight: 'bold', textTransform: 'none' }} onClick={() => navigate("/micuenta")}>Iniciar sesión →</Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar src="/img/logo_dante.jpeg" alt="Logo DanteX" sx={{ width: { xs: 280, md: 350 }, height: { xs: 280, md: 350 }, boxShadow: 
            '0 10px 30px rgba(0,0,0,0.5)', bgcolor: 'white' }} />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 15, pt: 5, borderTop: '1px solid #f0f0f0' }}>
        <Typography variant="h6" sx={{ mb: 5, fontWeight: 'bold' }}>Lo más buscado por gamers:</Typography>
        <Grid container spacing={2}>
          {['Juegos PC'].map((cat) => (
            <Grid item xs={12} sm={4} key={cat}>
              <Box onClick={() => navigate("/tienda")} sx={{ p: 4, textAlign: 'center', borderRadius: '16px', border: '1px solid #eee', 
                cursor: 'pointer', transition: '0.3s', '&:hover': { bgcolor: '#f5f5f5', transform: 'translateY(-5px)' } }}>
                <SportsEsportsIcon sx={{ mb: 1, color: '#3f51b5' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{cat}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Content;