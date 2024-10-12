import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import Usuarios from '../models/usuario.model.js';


export const getUsuarios = async (req, res, next) => {
    try {
        const usuarios = await Usuarios.find({ rol: "Productor" }).select('-contrasena').populate({ path: 'acopiador', select: 'nombre' }).sort({ createdAt: -1 }).populate("grupoProductor municipio");
        return res.status(200).json(usuarios);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}

export const postUsuarios = async (req, res, next) => {
    try {
        let { nombre, cedula, asociado, municipio, contrasena, grupoProductor, rol, acopiador, estado } = req.body;
        if (contrasena) {
            const hashClave = await Usuarios.hasPassword(contrasena);
            contrasena = hashClave;

        } else {
            contrasena = "12345678"
        }

        const userSave = {
            nombre: nombre,
            cedula: cedula,
            asociado: asociado,
            municipio: municipio,
            contrasena: contrasena,
            grupoProductor: grupoProductor,
            rol: rol,
            acopiador: acopiador,
            estado
        }

        const usuario = new Usuarios(userSave);
        const usuarioSave = await usuario.save();
        return res.status(201).json({ message: 'Usuario agregado exitosamente', usuarioSave });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};

export const asignarContrasena = async (req, res, next) => {
    try {
        const { usuario, contrasena } = req.body;
        const hashClave = await Usuarios.hasPassword(contrasena);
        const usuarioUpdate = await Usuarios.findByIdAndUpdate({ _id: usuario, contrasena: hashClave });
        return res.status(200).json({ message: 'Contraseña asignada exitosamente', usuarioUpdate });
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};

export const loginUsuario = async (req, res) => {
    try {
        const { cedula, contrasena } = req.body;
        const usuario = await Usuarios.findOne({ cedula: cedula });
        if (!usuario) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
        if (usuario.rol === 'Productor') {
            return res.status(400).json({ message: 'No Autorizado' });
        }
        if (usuario.estado === false) {
            return res.status(400).json({ message: 'Usuario no autorizado' });
        }
        const validarContrasena = await Usuarios.validatePassword(contrasena, usuario.contrasena);
        if (!validarContrasena) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, JWT_SECRET, {
            expiresIn: "7h"
        });
        switch (usuario.rol) {
            case 'Admin':
                return res.status(200).json({ message: 'Bienvenido administrador', token });
            case 'Acopiador':
                if (usuario.state = false) {
                    return res.status(400).json({ message: 'Usuario no autorizado' });
                }
                return res.status(200).json({ message: 'Bienvenido acopiador', token });

            case 'Productor':
                return res.status(400).json({ message: 'No Autorizado' });
            default:
                return res.status(400).json({ message: 'Usuario no encontrado' });
        }


    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

export const searchUsers = async (req, res) => {
    try {
        const { cedula } = req.params;
        console.log(cedula);
        const users = await Usuarios.find({
            cedula: cedula
        }).select('-contrasena');

        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al buscar usuarios' });
    }
};
export const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Usuarios.findById(id).select('-contrasena');
        console.log(user);
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al buscar usuario' });
    }


};
export const getUsuariosAcopiador = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarios = await Usuarios.find({ acopiador: id }).populate("grupoProductor municipio").select('-contrasena -createdAt -updatedAt');
        if (usuarios) {
            return res.status(200).json(usuarios);
        } else {
            return res.status(400).json({ message: 'No se encontraron usuarios para este acopiador' });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error al buscar la usuarios', error: error.message });
    }
}
export const getAcopiadores = async (req, res) => {
    try {
        const usuarios = await Usuarios.find({ rol: "Acopiador" }).populate("grupoProductor municipio").select('-contrasena -createdAt -updatedAt');
        if (usuarios) {
            return res.status(200).json(usuarios);
        } else {
            return res.status(400).json({ message: 'No se encontraron acopiadores ' });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error al buscar la acopiadores', error: error.message });
    }
}
export const estadoAcopiador = async (req,res)=>{
    try {
        const {id} = req.params;
        const acopiador = await Usuarios.findById(id);
        if(!acopiador){
            return res.status(404).json({message:'Acopiador no encontrado'});
        }
        acopiador.estado = !acopiador.estado;
        const acopiadorActualizado = await Usuarios.findByIdAndUpdate(id, acopiador, { new: true });

        return res.status(200).json(acopiadorActualizado);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:'Error al buscar el acopiador',error:error.message});
    }
}