import { Link, Outlet, useLocation } from "react-router-dom";
import logo from '../../assets/imagenes/logo.png';
import { useState } from 'react';

function NavAcopiadores() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const location = useLocation(); // Obtiene la ruta actual

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <>
            <nav className={"nav-acopiadores w-100 container-nav navbar navbar-expand-lg navbar-light" + (isNavOpen ? " menu-open" : "")}>
                <Link className="navbar-brand logo" to="/acopio">
                    <img src={logo} alt="" />
                    <div className="texto">
                        <span>COMEPCAFE</span>
                        <p>{"Acopiodores"}</p>
                    </div>
                </Link>

                <button className="navbar-toggler " type="button" onClick={toggleNav}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={"collapse navbar-collapse container-links" + (isNavOpen ? " show" : "")}>
                    <ul className="navbar-nav mr-auto">
                        
                        <li className="nav-item">
                            <Link className={"nav-link links text-success" + (location.pathname === "/acopio" ? " active" : "")} to="/acopio" onClick={()=>setIsNavOpen(false)}><i className="bi bi-receipt"></i><p>Facturas</p></Link>
                        </li>
                        <li className="nav-item">
                            <Link className={"nav-link links text-success" + (location.pathname === "/acopio/facturar"  ? " active" : "")} to="facturar" onClick={()=>setIsNavOpen(false)}><i className="bi bi-shop-window"></i><p>Facturar</p></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="navbar-brand log-out-2 mt-3" to="/" onClick={()=>cerrarSesion()}>
                                <button className="btn btn-cerrar-sesion" onClick={()=>setIsNavOpen(false)}><i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesion</button>
                            </Link>
                        </li>
                    </ul>
                </div>

                <Link className="navbar-brand log-out" to="/" onClick={()=>cerrarSesion()}>
                    <button className="btn btn-cerrar-sesion"><i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesion</button>
                </Link>
            </nav>
            <div className={"container-content"}>
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default NavAcopiadores