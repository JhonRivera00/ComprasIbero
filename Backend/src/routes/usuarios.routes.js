import { Router } from 'express'
import { asignarContrasena, estadoAcopiador, getAcopiadores, getUsuario, getUsuarios, getUsuariosAcopiador, loginUsuario, postUsuarios, searchUsers } from '../controllers/usuarios.controllers.js';
import { loginUsuarioSchema, registerSchema } from '../schema/register.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { userExist, verificarToken } from '../middlewares/validate.user.js';
import passport from 'passport';

const route = Router();

route.post('/login',validateSchema(loginUsuarioSchema), loginUsuario)

route.get('/usuarios',passport.authenticate('jwt',{session:false}), getUsuarios);
route.get('/usuario/:id', getUsuario);
route.patch('/setPassword', asignarContrasena);
route.post('/usuarios', validateSchema(registerSchema), userExist, postUsuarios)
route.get("/usuarios-acopiadores/:id",passport.authenticate('jwt',{session:false}),getUsuariosAcopiador );
route.get("/acopiadores",passport.authenticate('jwt',{session:false}),getAcopiadores );
route.get("/acceso-pagina",passport.authenticate('jwt',{session:false}), verificarToken);
route.put("/estado-acopiador/:id",passport.authenticate('jwt',{session:false}), verificarToken, estadoAcopiador);


route.get('/buscar/:cedula', searchUsers)

export default route