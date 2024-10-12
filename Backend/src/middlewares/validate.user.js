import { JWT_SECRET } from "../config.js";
import Usuarios from "../models/usuario.model.js";
import jwt from "jsonwebtoken";

export const userExist = async (req, res, next) => {
    try {
        const { cedula } = req.body;
        const usuario = await Usuarios.findOne({ cedula: cedula });
        if (usuario) {
            console.log("Usuario existe")
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

export const verificarToken = async(req, res, next) => {
    try {
        console.log("Verificando token...");
        const token = req.headers["token"];
        if (!token) {
            console.log("Token no encontrado");
            return res.status(400).json({ message: "Se requiere el token" });
        }

        const decodificacion = jwt.verify(token, JWT_SECRET);
        req.usuarioId = decodificacion.id;
        console.log("Token decodificado, usuarioId:", req.usuarioId);

        const usuario = await Usuarios.findById({ _id: req.usuarioId });
        if (!usuario) {
            console.log("Usuario no existente");
            return res.status(400).json({ message: "Usuario no existente" });
        }

        console.log("Token verificado, usuario encontrado");

    } catch (error) {
        console.log("Error al verificar token:", error.message);
        return res.status(400).json({ message: "No autorizado" });
    }
};
