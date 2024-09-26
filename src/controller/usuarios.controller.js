import Usuarios from '../models/usuario.model.js'


export const getUsuarios = async (req,res,next)=>{
    try {
        const usuarios = await Usuarios.find();
        return res.status(200).json(usuarios);
    } catch (error) {
        console.log(error)
        res.status(400).json({message: error.message});
    }
}

export const postUsuarios = async (req,res,next)=>{
    try {
        const {nombre,cedula,contrasena,asociado,municipio,grupoProductor,rol} = req.body;	
        const hashClave = await Usuarios.hasPassword(contrasena);
        
        const userSave = {
            nombre: nombre,
            cedula: cedula,
            contrasena: hashClave,
            asociado: asociado,
            municipio: municipio,
            grupoProductor: grupoProductor,
            rol: rol
        }
        
        const usuario = new Usuarios(userSave);
        const usuarioSave = await usuario.save();
        return res.status(201).json({message:'Usuario agregado exitosamente',usuarioSave});
    } catch (error) {
        console.log(error)
        res.status(400).json({message: error.message});
    }
};