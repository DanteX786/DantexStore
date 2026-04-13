import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const juegos = [
  { id: 1, nombre: "Elden Ring", precio: 250000, imagen: "img/elden.jpg" },
  { id: 2, nombre: "Minecraft", precio: 80000, imagen: "img/minecraft.jpg" },
  { id: 3, nombre: "Terraria", precio: 45000, imagen: "img/terraria.jpg" },
  { id: 4, nombre: "God of War 4", precio: 180000, imagen: "img/gow4.jpg" }
];

app.get('/api/juegos', (req, res) => {
  res.json(juegos);
});

app.get('/api/juegos/presupuesto/:maximo', (req, res) => {
  const precioMaximo = parseInt(req.params.maximo);
  const filtrados = juegos.filter(juego => juego.precio <= precioMaximo);
  res.json(filtrados);
});

app.get('/api/status', (req, res) => {
  res.json({ status: "Servidor Node.js Activo", version: "1.0.0" });
});

app.use(cors()); 
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor activo en http://localhost:${PORT}`);
  
  setInterval(() => {
    console.log("Servidor latiendo...");
  }, 3600000); 
});