import dns from 'dns';
dns.setDefaultResultOrder('ipv4first'); 
dns.setServers(['1.1.1.1','8.8.8.8']); 

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'; 

const app = express();

app.use(express.json());
app.use(cors());

const connectDB = async () => {
    try {
        console.log("...");
        await mongoose.connect(process.env.MONGO_URI.trim(), {
            serverSelectionTimeoutMS: 5000 
        });

        console.log("Ya dio la conexion");
    } catch (error) {
        console.log("No dio la conexion", error.message);
    }
};

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

app.post('/registro', async (req, res) => {
    try {
        const { email, nombre, password } = req.body;
        
        const existe = await User.findOne({ email });
        if (existe) return res.status(400).json({ mensaje: "El correo ya existe" });

        const nuevoUsuario = new User({ nombre, email, password });
        await nuevoUsuario.save();
        
        res.status(201).json({ mensaje: "Registro exitoso Ya puedes entrar" });
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ mensaje: "Error en el servidor al registrar" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (user) {
            res.status(200).json({ 
                mensaje: "Bienvenido", 
                user: { nombre: user.nombre, email: user.email } 
            });
        } else {
            res.status(401).json({ mensaje: "Correo o contraseña incorrectos" });
        }
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ mensaje: "Error en el servidor al loguear" });
    }
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("No se pudo iniciar el servidor:", err);
});