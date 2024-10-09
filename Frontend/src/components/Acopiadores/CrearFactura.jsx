import React, { useEffect, useState } from "react";
import { buscarUsuario, compraCafe, grupoMunicipio } from "../../services/acopiadores.services";
import { jwtDecode } from "jwt-decode";

function CrearFactura() {
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
    const [nombre, setNombre] = useState("");
    const [cedula, setCedula] = useState("");

    const [grupoProductor, setGrupoProductor] = useState("");
    const [puntoAcopio, setPuntoAcopio] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [asociado, setAsociado] = useState("");
    const [calidad, setCalidad] = useState("");
    const [municipios, setMunicipios] = useState([]);
    const [selectGrupos, setSelectGrupos] = useState([]);
    const [selePuntoAcopio, setSelePuntoAcopio] = useState([]);
    const [valorTotal, setValorTotal] = useState({
        valorKilos: 0,
        valorPrecio: 0
    });
    const [observaciones, setObservaciones] = useState("");
    const [filas, setFilas] = useState([
        {
            tipoCafe: "",
            cantidad: 0,
            valorUnitario: 0,
            valor: 0
        }
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const usuario = {
                nombre: nombre,
                cedula: parseFloat(cedula),
                grupoProductor: grupoProductor,
                municipio: municipio,
                asociado: asociado === "true"
            };
            const compra = {
                fecha: fecha,
                observacion: observaciones,
                puntoAcopio: puntoAcopio,
                filas: filas,
                calidad: calidad
            };
            
            await compraCafe(usuario, compra);
        } catch (error) {
            console.error("Error al guardar la factura:", error);
        }
    };
    const buscarCedula = async () => {
        try {
            const datos = await buscarUsuario(cedula);
            if (datos.length > 0) {
                setNombre(datos[0].nombre || "");
            const token = localStorage.getItem("token");
            const {id}= jwtDecode(token);
                if(id === datos[0].acopiador){
                    setMunicipio(datos[0].municipio || "");
                    setAsociado(String(datos[0].asociado) || "");
                    const dataSelects = municipios.find((municipio) => municipio._id === datos[0].municipio);
                    const grupo = dataSelects.grupos.find((grupo) => grupo._id === datos[0].grupoProductor);
                    setGrupoProductor(datos[0].grupoProductor || "");
                    setSelectGrupos(dataSelects.grupos || []);
                    setSelePuntoAcopio(grupo.puntoAcopio || []);
                }               
            }
        } catch (error) {
            console.error("Error al buscar en la base de datos:", error);
        }
    };
    const sumarFilas = () => {
        setFilas([...filas, { tipoCafe: "", cantidad: 0, valorUnitario: 0, valor: 0 }]);
    };
    const quitarFila = () => {
        const nuevasFilas = [...filas];
        nuevasFilas.pop();
        setFilas(nuevasFilas);
      };
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newFilas = [...filas];
        newFilas[index][name] = value;
        let valorPrecio = 0;
        let valorKilos = 0;
        if (name === "cantidad" || name === "valorUnitario") {
            newFilas[index].valor = parseFloat(newFilas[index].cantidad) * parseFloat(newFilas[index].valorUnitario);
        }
        newFilas.forEach((fila, i) => {
            if (i === index) {
                fila.valor = parseFloat(fila.cantidad) * parseFloat(fila.valorUnitario);
            }
            valorPrecio += fila.valor;
            valorKilos += parseFloat(fila.cantidad);
        });
        setValorTotal({
            valorPrecio: valorPrecio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
            valorKilos: valorKilos.toFixed(2)
        });
        setFilas(newFilas);
    };

    const selectMunicipio = (id) => {
        const munici = municipios.find((municipio) => municipio._id === id);
        setMunicipio(munici._id);
        setSelectGrupos(munici.grupos);
    };
    const selectPuntoAcopio = (id) => {
        const punto = selectGrupos.find((grupo) => grupo._id === id);
        setGrupoProductor(punto._id);
        setSelePuntoAcopio(punto.puntoAcopio);
    };
    useEffect(() => {
        (async () => {
            const data = await grupoMunicipio();
            setMunicipios(data);
        })();
    }, []);
    return (
        <div className='container container-crear-factura'>
            <div className="factura">
                <div className='container'>
                    <h3 className="title">Documento Equivalente</h3>
                </div>
                <div className="container-form">
                    <form onSubmit={handleSubmit}>
                        {/* Primera Fila */}
                        <div className="container row">
                            <div className="col-12">
                                <input className="w-100 fs-6" type="date" defaultValue={fecha} disabled />
                            </div>
                        </div>
                        {/* Segunda Fila */}
                        <div className="container row">
                            <div className="col-4">
                                <input className="w-100" type="number" required autoComplete="off" placeholder="Cedula" onChange={(e) => setCedula(e.target.value)} onBlur={buscarCedula} />
                            </div>
                            <div className="col-8">
                                <input className="w-100" type="text" autoComplete="off" required value={nombre} placeholder="Nombre Completo" onChange={(e) => setNombre(e.target.value)} />
                            </div>
                        </div>
                        {/* Tercera Fila */}
                        <div className="container row">
                            <div className="col-6">
                                <select className="w-100 form-select select-form" value={municipio} onChange={(e) => selectMunicipio(e.target.value)} required>
                                    <option value="" disabled>Municipio...</option>
                                    {municipios.map((municipio) => (
                                        <option key={municipio._id} value={municipio._id}>{municipio.nombreMunicipio}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-6">
                                <select className="w-100 form-select select-form" value={grupoProductor} onChange={(e) => selectPuntoAcopio(e.target.value)} required>
                                    <option disabled value="">Grupo Productor...</option>
                                    {selectGrupos.map((grupo) => (
                                        <option key={grupo._id} value={grupo._id}>{grupo.nombreGrupo}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* Cuarta Fila */}
                        <div className="container row">
                            <div className="col-4">
                                <select className="w-100 form-select select-form" value={puntoAcopio} onChange={(e) => setPuntoAcopio(e.target.value)} required>
                                    <option disabled value="">Punto Acopio...</option>
                                    {selePuntoAcopio.map((grupo) => (
                                        <option key={grupo._id} value={grupo._id}>{grupo.nombrePunto}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-3">
                                <select className="w-100 form-select select-form" required name="asociado" id="asociado" value={asociado}  onChange={(e) => setAsociado(e.target.value)}>
                                    <option value="" disabled>Asociado</option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="col-5">
                                <select className="w-100 form-select select-form" required name="calidad" id="calidad" value={calidad} onChange={(e) => setCalidad(e.target.value)}>
                                    <option value="" disabled>Calidad según factor...</option>
                                    <option value="Muy bueno">Muy Bueno - 1000 a 2000 - 86 a 89</option>
                                    <option value="Bueno">Bueno - Base - 90 a 93</option>
                                    <option value="Muy Regular">Muy regular - 3000 a 4000- 98 a 100</option>
                                    <option value="Malo">Malo - 5000 a 6000- 101 a 105</option>
                                    <option value="muy malo">Muy malo - 7000 a 8000- 105 a 110</option>
                                    <option value="Otros">Otros</option>
                                </select>
                            </div>
                        </div>
                        {/* Tabla de Compra */}
                        <div className="tabla-compra">
                            {/* Encabezado */}
                            <div className="container header row">
                                <div className="col-4">
                                    <p>Tipo de Café</p>
                                </div>
                                <div className="col-2">
                                    <p>K Netos</p>
                                </div>
                                <div className="col-3">
                                    <p>Valor Kilo</p>
                                </div>
                                <div className="col-3">
                                    <p>Valor Compra</p>
                                </div>
                            </div>
                            {/* Cuerpo */}
                            {/* Filas de productos */}
                            {filas.map((fila, index) => (
                                <div className="container body row" key={index}>
                                    <div className="col-4">
                                        <select className="w-100 form-select select-form" required name="tipoCafe" id="tipoCafe" value={fila.tipoCafe} onChange={(e) => handleChange(index, e)}>
                                            <option value="" disabled>Selecciona una opción...</option>
                                            <optgroup label="FT">
                                                <option value="Convencional Ft" disabled={asociado ===  "false" ? true : false}>Conv Ft</option>
                                                 <option value="Ecológico Ft" disabled={asociado ===  "false" ? true : false}>Ecol Ft</option>
                                                <option value="Natural Ft" disabled={asociado ===  "false" ? true : false}>Nat Ft</option>
                                                <option value="Organico Ft" disabled={asociado ===  "false" ? true : false}>Org Ft</option>
                                            </optgroup>
                                            <optgroup label="No FT">
                                                <option value="Convencional" disabled={asociado === "false" ? false :true}>Conv</option>
                                                <option value="Otros"        disabled={asociado === "false" ? false :true}>Otros</option> 
                                            </optgroup>
                                        </select>
                                    </div>
                                    <div className="col-2">
                                        <input type="text" required autoComplete="off" placeholder="0.0 Kg" name="cantidad" onChange={(e) => handleChange(index, e)} />
                                    </div>
                                    <div className="col-3">
                                        <input type="number" required placeholder="$ 0.00" autoComplete="off" name="valorUnitario" onChange={(e) => handleChange(index, e)} />
                                    </div>
                                    <div className="col-3">
                                        <input type="text" required disabled placeholder="$ 0.00" name="valor" value={fila.valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} />
                                    </div>                                    
                                </div>
                            ))}
                            {/* Pie */}
                            <div className="container header footer row">
                                {
                                    filas.length < 5 ?
                                    <div className="container-add">
                                    <button type="button" onClick={() => sumarFilas()}><i className="bi bi-plus"></i></button>
                                </div>
                                : null
                                }
                                {   
                                filas.length > 1 ?
                                <div className="container-remove">
                                <button type="button" onClick={() => quitarFila()}><i className="bi bi-dash"></i></button>
                                </div>
                                : null
                                }
                                <div className="col-4"></div>
                                <div className="col-2">
                                    <p>{valorTotal.valorKilos} Kg</p>
                                </div>
                                <div className="col-3"></div>
                                <div className="col-3">
                                    <p>{valorTotal.valorPrecio}</p>
                                </div>
                            </div>
                            {/* Observaciones */}
                            <div className="container row p-0">
                                <div className="col-12  p-0">
                                    <textarea className="w-100 observaciones" placeholder="Observaciones..." rows="3" onChange={(e) => setObservaciones(e.target.value)}></textarea>
                                </div>
                            </div>
                            {/* Botón Guardar */}
                            <div className="container row">
                                <div className="col-12 container-button">
                                    <button type="submit" className="btn btn-success btn-guardar"><i className="bi bi-floppy me-3"></i>Registrar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CrearFactura;
