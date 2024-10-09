import { Link, Outlet, useLocation } from "react-router-dom";
import logo from '../../assets/imagenes/logo.png';
import { useState } from 'react';
import "..//..//funciones/funciones"


function Nav() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const location = useLocation(); // Obtiene la ruta actual

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    const cerrarSesion = () => {
        console.log("Cerro sesion");
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <>
            <nav className={"w-100 container-nav navbar navbar-expand-lg navbar-light" + (isNavOpen ? " menu-open" : "")}>
                <Link className="navbar-brand logo" to="/home">
                    <img src={logo} alt="" />
                    <div className="texto">
                        <span>COMEPCAFE</span>                        
                        <p>{"Administrador"}</p>
                    </div>
                </Link>

                <button className="navbar-toggler " type="button" onClick={toggleNav}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={"collapse navbar-collapse container-links" + (isNavOpen ? " show" : "")}>
                    <ul className="navbar-nav mr-auto">
                     
                        <li className="nav-item">
                            <Link className={"nav-link links text-success" + (location.pathname === "/home" ? " active" : "")} to="/home" onClick={()=>setIsNavOpen(false)}><i className="bi bi-receipt" ></i>Facturas</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="navbar-brand log-out-2 mt-3" to="/" onClick={()=>cerrarSesion()}>
                                <button className="btn text-success" ><i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesion</button>
                            </Link>
                        </li>
                    </ul>
                </div>

                <Link className="navbar-brand log-out" to="/" onClick={()=>cerrarSesion()}>
                    <button className="btn text-success" ><i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesion</button>
                </Link>
            </nav>
            <div className={"container-content"}>
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default Nav;
