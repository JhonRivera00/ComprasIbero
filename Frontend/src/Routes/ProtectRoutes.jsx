import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import axios from 'axios';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';

export const ProtectRoutesAdmin = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        (async () => {
            try {
                const tokenUser = localStorage.getItem("token");
                const config = {
                    headers: {
                        "token": tokenUser,
                        "Authorization": `Bearer ${tokenUser}`
                    },
                };
                const autoriza = await axios.get("/acceso-pagina", config);
                if (!autoriza) {
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
                console.log(error.message);
                Swal.fire({
                    title: "Tiempo de conexión expirado",
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

// Agrega la validación de PropTypes
ProtectRoutesAdmin.propTypes = {
    children: PropTypes.node
};

export const ProtectRoutesAcopio = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        (async () => {
            try {
                const tokenUser = localStorage.getItem("token");
                const config = {
                    headers: {
                        "token": tokenUser,
                        "Authorization": `Bearer ${tokenUser}`
                    },
                };
                const autoriza = await axios.get("/acceso-pagina", config);
                if (!autoriza) {
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
                console.log(error)
                Swal.fire({
                    title: "Tiempo de conexión expirado",
                    icon: "error",
                    timer: 2000,
                }).then(() => {
                    setTimeout(() => {
                        localStorage.removeItem("token");
                        navigate("/"); 
                        window.location.reload();
                    }, 2000);
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

// Agrega la validación de PropTypes
ProtectRoutesAcopio.propTypes = {
    children: PropTypes.node
};
