import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Usuarios from './routes/usuarios.routes.js'

import passport from 'passport';
import { JwtStrategy } from './auth/jwt.strategy.js';
import { LocalStrategy } from './auth/local.strategy.js';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();



  const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


app.use("/api",Usuarios);

app.use("*", (req, res) => {
    res.send("Ruta no encontrada");
   return res.status(404).json({ message: "Ruta no encontrada" });
});
app.use("/", (req, res) => {
  res.send("Ruta no encontrada");
 return res.status(404).json({ message: "Home" });
});

passport.use(JwtStrategy)
passport.use(LocalStrategy)

export default app;