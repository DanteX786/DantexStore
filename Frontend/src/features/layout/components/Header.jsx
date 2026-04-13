import React from "react";
import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';

function Header({ carrito = [], favoritos = [] }) {
  const navigate = useNavigate();
  const [nodeStatus, setNodeStatus] = useState("Desconectado");
  const [juegos, setJuegos] = useState([]);
useEffect(() => {
    fetch('http://localhost:4000/api/status')
      .then(res => res.json())
      .then(data => setNodeStatus(data.status))
      .catch(() => setNodeStatus("Node Off"));
  }, []);

  const totalCarrito = carrito.reduce((acc, item) => acc + item.cant, 0);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#121212" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography 
            component={Link} 
            to="/" 
            variant="h6" 
            sx={{ 
              textDecoration: 'none', 
              color: 'white', 
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}
          >
            DanteXStore
          </Typography>
          <Box sx={{ ml: 'auto', mr: 2, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: nodeStatus === "Servidor Node.js Activo" ? "#4caf50" : "#f44336",mr: 1 }} />
          <Typography variant="caption" sx={{ color: 'white' }}>
            {nodeStatus}
          </Typography>
        </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Typography component={Link} to="/Tienda" sx={{ textDecoration: 'none', color: 'white', '&:hover': { color: '#3f51b5' } }}>
              Tienda
            </Typography>
            <Typography component={Link} to="/Ofertas" sx={{ textDecoration: 'none', color: 'white', '&:hover': { color: '#ff5722' } }}>
              Ofertas
            </Typography>
            <Typography component={Link} to="/ApiRyC" sx={{ textDecoration: 'none', color: 'white', '&:hover': { opacity: 0.7 } }}>
              Rick & Morty
            </Typography>
            <Typography component={Link} to="/ApiRycAxius" sx={{ textDecoration: 'none', color: 'white', '&:hover': { opacity: 0.7 } }}>
              Axius API
            </Typography>
          </Box>
        </Box>

        {/* LADO DERECHO: ICONOS CON CONTADORES */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          
          <IconButton color="inherit" onClick={() => navigate("/MisFavoritos")}>
            <Badge badgeContent={favoritos.length} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={() => navigate("/Carrito")}>
            <Badge badgeContent={totalCarrito} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={() => navigate("/MiCuenta")}>
            <PersonIcon />
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Header;