import { Route, Routes } from "react-router-dom"
import Login from "../Pages/login"
import Nav from "../components/Administrador/Nav"

import Facturas from "../components/Administrador/Facturas"

import NavAcopiadores from "../components/Acopiadores/NavAcopiadores"
import CrearFactura from "../components/Acopiadores/CrearFactura"
import FacturasAcopiadores from "../components/Acopiadores/FacturasAcopiadores"
import { ProtectRoutesAcopio, ProtectRoutesAdmin } from "./ProtectRoutes"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<h1 className="centrar">Pagina no encontrada</h1>} />
        <Route element={<ProtectRoutesAdmin/>}>

        <Route path="/home" element={<Nav />} >
          <Route index element={<Facturas />} />
        </Route>
        </Route>
        <Route element={<ProtectRoutesAcopio/>}>

        <Route path="/acopio" element={<NavAcopiadores/>} >
          <Route index element={<FacturasAcopiadores />} />
          <Route path="facturar" element={<CrearFactura />} />
        </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
