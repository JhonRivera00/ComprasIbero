

function CrearFactura() {
   
    return (
        <div className='container container-crear-factura'>
            <div className="factura">
                <div className='container'>
                    <h3 className="title">Documento Equivalente</h3>
                </div>
                <div className="container-form">
                    <form >
                        {/* Primera Fila */}
                        <div className="container row">
                            <div className="col-12">
                                <input className="w-100 fs-6" type="date"  disabled />
                            </div>
                        </div>
                        {/* Segunda Fila */}
                        <div className="container row">
                            <div className="col-4">
                                <input className="w-100" type="number" required autoComplete="off" placeholder="Cedula" />
                            </div>
                            <div className="col-8">
                                <input className="w-100" type="text" autoComplete="off" required  placeholder="Nombre Completo" />
                            </div>
                        </div>
                        {/* Tercera Fila */}
                        <div className="container row">
                            <div className="col-6">
                                <select className="w-100 form-select select-form" required>
                                    <option value="" disabled>Municipio...</option>
                                   
                                </select>
                            </div>
                            <div className="col-6">
                                <select className="w-100 form-select select-form"  required>
                                    <option disabled value="">Grupo Productor...</option>
                                    
                                </select>
                            </div>
                        </div>
                        {/* Cuarta Fila */}
                        <div className="container row">
                            <div className="col-4">
                                <select className="w-100 form-select select-form" required>
                                    <option disabled value="">Punto Acopio...</option>
                                    
                                </select>
                            </div>
                            <div className="col-3">
                                <select className="w-100 form-select select-form" required name="asociado" id="asociado"   >
                                    <option value="" disabled>Asociado</option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="col-5">
                                <select className="w-100 form-select select-form" required name="calidad" id="calidad" >
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
                           
                                <div className="container body row" >
                                    <div className="col-4">
                                        <select className="w-100 form-select select-form" required name="tipoCafe" id="tipoCafe" >
                                            <option value="" disabled>Selecciona una opción...</option>
                                            <optgroup label="FT">
                                                <option value="Convencional Ft" disabled="true">Conv Ft</option>
                                                 <option value="Ecológico Ft" disabled="true">Ecol Ft</option>
                                                <option value="Natural Ft" disabled="true">Nat Ft</option>
                                                <option value="Organico Ft" disabled="true">Org Ft</option>
                                            </optgroup>
                                            <optgroup label="No FT">
                                                <option value="Convencional" disabled="false">Conv</option>
                                                <option value="Otros"        disabled="false">Otros</option> 
                                            </optgroup>
                                        </select>
                                    </div>
                                    <div className="col-2">
                                        <input type="text" required autoComplete="off" placeholder="0.0 Kg" name="cantidad" />
                                    </div>
                                    <div className="col-3">
                                        <input type="number" required placeholder="$ 0.00" autoComplete="off" name="valorUnitario"  />
                                    </div>
                                    <div className="col-3">
                                        <input type="text" required disabled placeholder="$ 0.00" name="valor"/>
                                    </div>                                    
                                </div>
                           
                            {/* Pie */}
                            <div className="container header footer row">
                               
                                    <div className="container-add">
                                    <button type="button" ><i className="bi bi-plus"></i></button>
                                </div>
                               
                              
                                <div className="container-remove">
                                <button type="button" ><i className="bi bi-dash"></i></button>
                                </div>
                               
                                <div className="col-4"></div>
                                <div className="col-2">
                                    <p> Kg</p>
                                </div>
                                <div className="col-3"></div>
                                <div className="col-3">
                                    <p></p>
                                </div>
                            </div>
                            {/* Observaciones */}
                            <div className="container row p-0">
                                <div className="col-12  p-0">
                                    <textarea className="w-100 observaciones" placeholder="Observaciones..." rows="3"></textarea>
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
