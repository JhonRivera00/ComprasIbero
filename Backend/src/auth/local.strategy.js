import { Strategy } from "passport-local";
import Usuarios from "../models/usuario.model.js";

export const LocalStrategy = new Strategy({
    usernameField: 'cedula',
    passwordField: 'contrasena'
  },
  async (cedula, contrasena, done) => {
    try {
      const usuario = await Usuarios.findOne({ cedula: cedula });
      if (!usuario) {
        return done(null, false, { message: 'El usuario no existe' });
      }
      const contrasenaValida = await Usuarios.validatePassword(contrasena, usuario.contrasena);
      if (!contrasenaValida) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }
      return done(null, usuario);
    } catch (error) {
      console.log(error);
      return done(error, false);
    }
  }
);



