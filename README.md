Descripción General:
En esta fase, se desarrolló el registro e inicio de sesión del aplicativo web, implementado con conexión a la base de datos MongoDB, utilizando JavaScript con Node.js. Actualmente, todas las funcionalidades se realizan a través de la consola. Se ha avanzado con el registro y login, aunque aún faltan algunas validaciones.
Puedes clonar el repositorio y probar la aplicación siguiendo las instrucciones a continuación.

Clonar el Proyecto desde GitHub:
Repositorio de GitHub:
https://github.com/JhonRivera00/ComprasIbero.git
Pasos para clonar e instalar el proyecto:
1.	Clonar el repositorio:
git clone https://github.com/JhonRivera00/ComprasIbero.git
2.	Acceder a la carpeta del proyecto
cd ComprasIbero
3.	Instalar las dependencias necesarias (asegúrate de tener Node.js instalado previamente):
npm install
4.	Ejecutar el proyecto en modo desarrollo:
npm run dev




Funcionalidades Actuales del Proyecto:
Una vez que corras la aplicación, aparecerá un menú interactivo con las siguientes opciones:
Menú Principal:
1.	Iniciar Sesión
2.	Registrarme
Opción 1: Iniciar Sesión
•	Se te solicitará:
1.	Ingresar el Usuario (Número de cédula).
	Hay un usuario de prueba registrado:
	Cédula: 1002819808
	Contraseña: 12345678
2.	Ingresar Contraseña
Una vez que hayas iniciado sesión correctamente, verás un menú con las siguientes opciones:
1.	Consultar Usuarios: Permite visualizar los usuarios registrados en la base de datos.
2.	Agregar Facturas: (Esta opción está en desarrollo).
3.	Cerrar Sesión: Te devolverá al menú principal.
Opción 2: Registrarme
Se te pedirá que ingreses la siguiente información:
1.	Nombre: Ingresa tu nombre completo.
2.	Cédula: Solo se permiten números.
3.	Eres Asociado: Selecciona una opción:
1.	Sí
2.	No
4.	Municipio: Ingresa el municipio al que perteneces.
5.	Contraseña: Crea una contraseña.
6.	Grupo Productor: Especifica de qué grupo de productores vienes.
7.	Rol: Selecciona el rol que tienes en el sistema:
1.	Administrador
2.	Productor
3.	Acopiador
8.	Nombre del Acopiador: Ingresar el nombre de tu acopiador (en futuras versiones se integrará un menú de selección según municipio).
9.	Estado: Indica si estás activo o no.




Próximas Funcionalidades:
•	Agregar Facturas: La funcionalidad está en desarrollo.
•	Validaciones adicionales: Se agregarán más validaciones para los campos ingresados, mejorando la seguridad y experiencia del usuario.

Este proyecto sigue en evolución y está orientado a optimizar la gestión de compras en los puntos de acopio, facilitando el trabajo tanto de acopiadores como de administradores.
