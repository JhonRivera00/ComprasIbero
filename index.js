import { getUsuarios, loginUsuario, postUsuarios } from "./src/controller/usuarios.controller.js";
import conectarDb from "./src/database/db.js"
import readline from 'readline';
import { validateSchema } from "./src/middlewares/validator.middleware.js";
import { registerSchema } from "./src/schema/register.schema.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const preguntar=(question)=> {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  export const main = async () => {
    console.log("------------------------------------- \n");
    console.log("¿ Qué deseas hacer ? \n");
    console.log("1. Iniciar Sesion");
    console.log("2. Registrarte");
    const login = await preguntar(" ");
  
    if (login == 1) {
      console.log("Inicia Sesion");
      // Iniciar sesión
      const cedula = await preguntar("Ingresa el usuario: ");
      const contrasena = await preguntar("Ingresa la contraseña: ");
      await loginUsuario(cedula, contrasena);
    } else if (login == 2) {
      const nombre = await preguntar("Ingresa tu nombre: ");
      const cedula = await preguntar("Ingresa tu cédula: ");
      let opcionAsociado = await preguntar("¿ Eres Asociado ? \n 1. Si \n 2. No \n");
      let asociado = opcionAsociado === "1";
  
      const municipio = await preguntar("¿ De qué municipio eres? ");
      const contrasena = await preguntar("Escribe una contraseña: ");
      const grupoProductor = await preguntar("¿ De qué grupo de productores vienes? ");
      
      let rol = await preguntar("¿ Qué rol tienes? \n 1. Administrador \n 2. Productor \n 3. Acopiador \n");
      if (rol === "1") {
        rol = "Admin";
      } else if (rol === "2") {
        rol = "Productor";
      } else if (rol === "3") {
        rol = "Acopiador";
      } else {
        console.log("Error en el rol");
        return main();
      }
  
      const acopiador = await preguntar("¿ Cuál es tu nombre de acopiador? ");
      let estado = await preguntar("¿ Estás activo? \n 1. Si \n 2. No \n ");
      estado = estado === "1" ? true : false;
  
      try {
        await validateSchema(registerSchema)({
          nombre,
          cedula: Number(cedula),
          asociado,
          municipio,
          contrasena,
          grupoProductor,
          rol,
          acopiador,
          estado,
        });
      } catch (error) {
        console.log("Error en la validación: ", error.errors);
        return main(); 
      }
  
      await postUsuarios(nombre, cedula, asociado, municipio, contrasena, grupoProductor, rol, acopiador, estado);
    }
  
    rl.close(); 
  };
  
  export const menuAcopiador = async () => {
    console.log("------------------------------------- \n")
    console.log("¿ Que deseas hacer ? \n")
    console.log("1. Consultar usuarios")
    console.log("2. Agergar factura")
    console.log("3. Cerrar Sesion ")
    const consulta = await preguntar(" ")

    if(consulta == 1){
      await getUsuarios();
    }else if (consulta == 3){
      return main();
    }else {
      console.log("Todavia no disponible")
    }
    return menuAcopiador();
  }
  (async()=>{
    await conectarDb();
    main();

  })();


