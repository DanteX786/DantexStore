import React from "react";
import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Header from "./features/layout/components/Header";
import Footer from "./features/layout/components/Footer";
import Content from "./features/layout/components/Content";

import Tienda from "./features/views/components/Tienda";
import Ofertas from "./features/views/components/Ofertas";
import Carrito from "./features/views/components/Carrito"
import MiCuenta from "./features/auth/components/MiCuenta";
import {ApiRyC} from "./features/api/components/ApiRyC";
import {ApiRycAxius} from "./features/api/components/ApiRycAxius";
import MisFavoritos from "./features/auth/components/MisFavoritos";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  return (

    <HashRouter>
      <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>  
        <Header carrito={carrito} favoritos={favoritos} />
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/MisFavoritos"element={<MisFavoritos favoritos={favoritos} setFavoritos={setFavoritos} />} />
            <Route path="/ApiRyC" element={<ApiRyC />} />
            <Route path="/ApiRycAxius" element={<ApiRycAxius />} />
            <Route path="/Tienda" element={<Tienda carrito={carrito} setCarrito={setCarrito} favoritos={favoritos} setFavoritos={setFavoritos} />} />
            <Route path="/Ofertas" element={<Ofertas carrito={carrito} setCarrito={setCarrito} favoritos={favoritos} setFavoritos={setFavoritos} />} />
            <Route path="/Carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
            <Route path="/MiCuenta" element={<MiCuenta />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </HashRouter>
  );
}


export default App;