# Proyecto en Desarrollo de ComprasIbero

## Problematica Identificada
La problemática principal en el proyecto de Coomepcafé es la falta de visibilidad en tiempo real sobre el café comprado en las zonas de acopio, lo que impide tomar decisiones oportunas cuando el café llega a la bodega central. Además, se utiliza un sistema de facturas físicas que deben ser reingresadas al sistema por los administradores, generando un doble trabajo y aumentando el riesgo de pérdida de facturas o errores de transcripción.

## Solución Propuesta para ComprasIbero
Este proyecto digitaliza y optimiza el proceso de registro de compras en las zonas de acopio para mejorar la visibilidad en tiempo real y reducir el doble trabajo. Los acopiadores podrán registrar las compras a través de una aplicación móvil/web, eliminando el uso de facturas físicas.

### Principales funcionalidades:

- **Registro de compras en tiempo real:** Los acopiadores ingresan kilos, precio por kilo y total, sincronizando automáticamente con la bodega central.<br>
- **Validación de compras:** Los administradores pueden revisar y verificar los registros sin volver a ingresarlos, eliminando errores y duplicaciones.<br>
- **Panel de control:** Los administradores tendrán acceso a un panel con datos en tiempo real, facilitando la gestión de inventarios y la toma de decisiones.<br>
- **Reportes automáticos:** Generación de reportes y análisis de compras y disponibilidad de café.<br>

### Estructura del Proyecto 
```` bash
ComprasIbero
|__ src
|	|__controller
|	|	    |__usuarios.controller.js #Codigo de la aplicacion (Consultas a la Bd)
|	|__database
|	|	    |__db.js #Conexion a la Bd       
|	|__middlewares
|	|	    |__validator.middleware.js #Manejo de errores del Schema
|	|__models
|	|	    |__usuarios.model.js #Modelo de la base de datos en MongoDB
|	|__opciones
|	|	    |__menu.acopiador.js 
|	|__schema
|	|	    |__register.schema.js #Validacion de formulario de registro 
|	|	    
|	|__config.js #Configuraciones para el .env 
|
|__ .env
|__ .gitignore
|__ index.js      #Ejecutable
|__ package.json  #Configuraciones y librerias
`````
### Codigo
**Aqui es donde se crean las consultas en la Base de datos o logica del aplicativo usuario.conttroller.js**
``` javascript
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
```
**Aqui es donde creamos la conexion a la base de datos db.js**
``` javascript
import mongoose from 'mongoose'
import {MONGO_URL} from '../config.js'

const conectarDb = (async()=>{
try {
    mongoose.set("strictQuery", false);
    const db = await mongoose.connect(MONGO_URL)
    console.log("Conectado a la base de datos ", db.connection.name)
} catch (error) {
    console.log(error)
}
})

export default conectarDb;
```

**Aqui manejasmo los errores que nos envia el schema validator.middleware.js**
``` javascript
export const validateSchema = (schema) => async (data) => {
    try {
      
      schema.parse(data);
      return null; 
    } catch (error) {
      
      throw error;
    }
  };
```

**Aqui manejamos el modelo de la base de datos en MongoDB y algunas funciones para validar contraseña usuarios.model.js**
``` javascript
import { model, Schema } from 'mongoose'
import bcryptjs from 'bcryptjs'

const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: true
    },
    cedula: {
        type: Number,
        unique: true,
        required: true
    },
    contrasena: {
        type: String,
       required: true
    },
    asociado: {
        type: Boolean,
        required: true,
        default: false
    },
    municipio: {
        type: String,
        required: true
    },
    grupoProductor: {
        type:String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        default: 'Productor',
        enum: ['Admin', 'Acopiador', 'Productor']
    },
    acopiador: {
        type: String,
        default:""
    },
    estado: {
        type: Boolean,
        default: false
    }

},
    {
        versionKey: false,
        timestamps: true
    });

usuarioSchema.statics.hasPassword = async (contrasena) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(contrasena, salt);
}

usuarioSchema.statics.validatePassword = async (contrasena, passwordUser) => {
    return await bcryptjs.compare(contrasena, passwordUser);
}

export default model("Usuarios", usuarioSchema);
```
### Descripción General:
En esta fase, se desarrolló el registro e inicio de sesión del aplicativo web, implementado con conexión a la base de datos MongoDB, utilizando JavaScript con Node.js. Actualmente, todas las funcionalidades se realizan a través de la consola. Se ha avanzado con el registro y login, aunque aún faltan algunas validaciones.
Puedes clonar el repositorio y probar la aplicación siguiendo las instrucciones a continuación.

## Clonar el Proyecto desde GitHub:
### Repositorio de GitHub:
[GitHub Jhon Rivera](https://github.com/JhonRivera00/ComprasIbero.git)

**Pasos para clonar e instalar el proyecto:**
```bash
git clone https://github.com/JhonRivera00/ComprasIbero.git
````
- 2.	Acceder a la carpeta del proyecto
```bash
cd ComprasIbero
```
- 3.	Instalar las dependencias necesarias (asegúrate de tener Node.js instalado previamente):
```bash
npm install
```
- 4.	Ejecutar el proyecto en modo desarrollo:
```bash
npm run dev
```



## Funcionalidades Actuales del Proyecto

Una vez que corras la aplicación, aparecerá un menú interactivo con las siguientes opciones:

### Menú Principal
- 1. Iniciar Sesión
- 2. Registrarme

### Opción 1: Iniciar Sesión
**Se te solicitará:**
- **Ingresar el Usuario** (Número de cédula)
- **Ingresar Contraseña**

Hay un usuario de prueba registrado: 
- *Cédula: 1002819808*
- *Contraseña: 12345678*

**Una vez que hayas iniciado sesión correctamente, verás un menú con las siguientes opciones:**
- Consultar Usuarios: Permite visualizar los usuarios registrados en la base de datos.
- Agregar Facturas: (Esta opción está en desarrollo).
- Cerrar Sesión: Te devolverá al menú principal.

### Opción 2: Registrarme
**Se te pedirá que ingreses la siguiente información:**
1. **Nombre**: Ingresa tu nombre completo.
2. **Cédula**: Solo se permiten números.
3. **Eres Asociado**: Selecciona una opción:
   - Sí
   - No
4. **Municipio**: Ingresa el municipio al que perteneces.
5. **Contraseña**: Crea una contraseña.
6. **Grupo Productor**: Especifica de qué grupo de productores vienes.
7. **Rol**: Selecciona el rol que tienes en el sistema:
   - Administrador
   - Productor
   - Acopiador
8. **Nombre del Acopiador**: Ingresar el nombre de tu acopiador (en futuras versiones se integrará un menú de selección según municipio).
9. **Estado**: Indica si estás activo o no.



### Próximas Funcionalidades:
•	Agregar Facturas: La funcionalidad está en desarrollo. <br>
•	Validaciones adicionales: Se agregarán más validaciones para los campos ingresados, mejorando la seguridad y experiencia del usuario.

Este proyecto sigue en evolución y está orientado a optimizar la gestión de compras en los puntos de acopio, facilitando el trabajo tanto de acopiadores como de administradores.
