import { useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom'; 
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';
import axios from 'axios';

export const ProtectRoutesAdmin = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        ( async () => {
            try {
                const tokenUser = localStorage.getItem("token");
            const token = {
                headers: {
                    "token": tokenUser,
                    "Authorization": `Bearer ${tokenUser}`
                },
            };
            const autoriza = await axios.get("/acceso-pagina",token);
            if(!autoriza){
                Swal.fire({
                    title: "No tienes permisos para acceder a esta ruta",
                    icon: "error",
                    timer: 2000,
                }).then(() => {
                    setTimeout(() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }, 2000);
                });
            }
            } catch (error) {
                Swal.fire({
                    title: "Tiempo de conexion expirado",
                    icon: "error",
                    timer: 2000,
                }).then(() => {
                        localStorage.removeItem("token");
                        navigate("/"); 
                        window.location.reload();
                    
                });
            }
            
        })();
        if (token) {
            const { rol } = jwtDecode(token);
            
            if (rol !== "Admin") {
                Swal.fire({
                    title: "No tienes permisos para acceder a esta ruta",
                    icon: "error",
                    timer: 2000,
                }).then(() => {
                    setTimeout(() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }, 2000);
                });
            }
        } else {
            navigate("/"); 
            window.location.reload(); 
        }

    }, [navigate]);

    return children ? children : <Outlet />;
};

export const ProtectRoutesAcopio = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        ( async () => {
            try {
                const tokenUser = localStorage.getItem("token");
            const token = {
                headers: {
                    "token": tokenUser,
                    "Authorization": `Bearer ${tokenUser}`
                },
            };
            const autoriza = await axios.get("/acceso-pagina",token);
            if(!autoriza){
                Swal.fire({
                    title: "No tienes permisos para acceder a esta ruta",
                    icon: "error",
                    timer: 2000,
                }).then(() => {
                    setTimeout(() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }, 2000);
                });
            }
            } catch (error) {
                Swal.fire({
                    title: "Tiempo de conexion expirado",
                    icon: "error",
                    timer: 2000,
                }).then(() => {
                    setTimeout(()=>{
                        localStorage.removeItem("token");
                        navigate("/"); 
                        window.location.reload();
                    
                    },2000);
                });
            }
            
        })();
        if (token) {
            const { rol } = jwtDecode(token);
            if (rol !== "Acopiador") {
                Swal.fire({
                    title: "No tienes permisos para acceder a esta ruta",
                    icon: "error",
                    timer: 2000,
                }).then(() => {
                    setTimeout(() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }, 2000);
                });
            }
        } else {
            navigate("/");
            window.location.reload();

        }
    }, [navigate]);

    return children ? children : <Outlet />;
};
