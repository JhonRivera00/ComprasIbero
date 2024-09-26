import conectarDb from "./src/database/db.js"
import readline from 'readline';

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
async function main() {

    await conectarDb();
    console.log("¿ Que deseas hacer ?")
    console.log("1. Iniciar Sesion")
    console.log("2. Registrarte")
    const login = await preguntar("__")

    if(login == 1){
        console.log("Inicia Sesion")
        //Iniciar sesion
        const usuario = await preguntar("Ingresa el usuario: ");
        const contrasena = await preguntar("Ingresa la contraseña: ");

        
    }


    rl.close();
  }

  main();

  export default main;