import jwt from "jsonwebtoken";
import Usuarios from "../models/usuarios.model.js";
import { JWT_SECRET } from "../config.js";
import { main, menuAcopiador } from "../../index.js";



export const postUsuarios = async (nombre, cedula, asociado, municipio, contrasena, grupoProductor, rol, acopiador, estado) => {
    try {
        
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
        console.log('Usuario agregado exitosamente', usuarioSave );
        return main();
    } catch (error) {
        console.log(error)
    }
};

export const loginUsuario = async (cedula, contrasena) => {
    try {
        const usuario = await Usuarios.findOne({ cedula: cedula });
        if (!usuario) {
           console.log('Usuario no encontrado \n' );
           return main();
        }
        if (usuario.rol === 'Productor') {
           console.log('No Autorizado' );
           return main();
        }
        if (usuario.estado === false) {
           console.log('Usuario no autorizado' );
           return main(); 
        }
        const validarContrasena = await Usuarios.validatePassword(contrasena, usuario.contrasena);
        if (!validarContrasena) {
           console.log('Contraseña incorrecta' );
           return main();
        }
        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, JWT_SECRET, {
            expiresIn: "7h"
        });
        switch (usuario.rol) {
            case 'Admin':
                console.log( 'Bienvenido administrador', token );
                return main();
            case 'Acopiador':
                if (usuario.state = false) {
                    console.log( 'Usuario no autorizado' );
                    return main();
                }
               console.log( 'Bienvenido acopiador', "token: ",token );
               return menuAcopiador();

            case 'Productor':
               console.log( 'No Autorizado' );
               
               return main();
            default:
               console.log( 'Usuario no encontrado' );
               return main();
        }


    } catch (error) {
        console.log(error);
        return main();
    }
};

export const getUsuarios = async (req, res, next) => {
    try {
        const usuarios = await Usuarios.find().select('-contrasena');
        console.log("Usuarios: ", usuarios)
    } catch (error) {
        console.log(error)
    }
}