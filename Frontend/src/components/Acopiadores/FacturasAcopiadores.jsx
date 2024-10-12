

function FacturasAcopiadores() {
  
  return (
    <div>

      <div className="container-fluid container-facturas p-0 shadow-lg mt-3 border-5">
        {/* Title */}
        <div className="Header container-title p-0 m-0">
          <div className="row w-100">

            <div className="col-5">
              <div className="container ">
                <h3 className='text-center'>Documentos Equivalentes</h3>
              </div>
            </div>
            <div className="col-3">
              <div className="container-search ">
                <input type="text" className=""  placeholder="Buscar Productor" aria-label="Buscar Productor" aria-describedby="button-addon2" />
                <button className="btn btn-success bg-light text-dark border-0 h-100" type="button" id="button-addon2"><i className="bi bi-search"></i></button>
              </div>
            </div>
            <div className="col-4">
              <div className="container d-flex mt-2">
                <input className="form-control-sm" type="date"  />
                <input className="form-control-sm ms-2" type="date"  />
              </div>
            </div>
            {/* <div className="col-4">
            <div className="container container-selector">
              <select className="form-select selector form-select-sm w-75" aria-label="Small select example">
                <option selected>Zona de factura...</option>
                <option value="1">Bodega Central</option>
                <option value="2">Bodega Norte</option>
                <option value="3">Bodega Sur</option>
              </select>
            </div>
          </div> */}
          </div>
        </div>
        {/* Header */}
        <div className="Header container-header">
          <div className="row w-100">

            <div className="col-1 content-table1">
              <div className="container content-table1">
                <h5>N°</h5>
              </div>
            </div>
            <div className="col-1 content-table1">
              <div className="container content-table1">
                <h5>Fecha</h5>
              </div>
            </div>
            <div className="col-2 content-table1">
              <div className="container  content-table1">
                <h5>Nombre del Productor</h5>
              </div>
            </div>
            <div className="col-2 content-table1">
              <div className="container content-table1">
                <h5>Cedula</h5>
              </div>
            </div>
            <div className="col-2 content-table1">
              <div className="container content-table1">
                <h5>Tipo de cafe</h5>
              </div>
            </div>
            <div className="col-1 content-table1">
              <div className="container content-table1">
                <h5>K Netos</h5>
              </div>
            </div>
            <div className="col-1 content-table1">
              <div className="container content-table1">
                <h5>$ Total</h5>
              </div>
            </div>
            <div className="col-2 content-table1">
              <div className="container content-table1">
                <h5>Opciones</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="Header conatiner-body table-responsive">
          {/* <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border text-body-emphasis " role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div> */}
                <div className="row fila w-100">
                  <div className="col-12">
                    <div className="container">
                      <h5 className='text-center mt-2'>No hay facturas</h5>
                    </div>
                  </div>
                </div>
               
                  <div className="row fila w-100" >

                    <div className="col-1 content-table1">
                      <div className="container content-table1">
                        <h5></h5>
                      </div>
                    </div>
                    <div className="col-1 content-table1">
                      <div className="container content-table1">
                        <h5></h5>
                      </div>
                    </div>
                    <div className="col-2 content-table1">
                      <div className="container content-table1">
                        <h5></h5>
                      </div>
                    </div>
                    <div className="col-2 content-table1">
                      <div className="container content-table1">
                        <h5 ></h5>
                      </div>
                    </div>
                    <div className="col-2 content-table1">
                      <div className="container content-table1">
                        <h5></h5>
                      </div>
                    </div>
                    <div className="col-1 content-table1">
                      <div className="container content-table1">
                        <h5 > Kg</h5>
                      </div>
                    </div>
                    <div className="col-1 content-table1">
                      <div className="container content-table1">
                        <h5 className="text-truncate" ></h5>
                      </div>
                    </div>
                    <div className="col-2 container-opciones content-table1">
                      <div className="container container-opciones content-table1">
                        <button className="btn"><i className="bi bi-geo-alt"></i></button>
                        <button className="btn"><i className="bi bi-pencil-square"></i></button>
                        <button className="btn"><i className="bi bi-printer"></i></button>
                      </div>
                    </div>
                  </div>


        </div>

        {/* Footer */}

        <div className="Header container-footer">
          <div className="row w-100">

            <div className="col-1 ">
              <div className="container content-table1">
                <h5>Total</h5>
              </div>
            </div>
            <div className="col-1">

            </div>
            <div className="col-2">

            </div>
            <div className="col-2">

            </div>
            <div className="col-2">

            </div>
            <div className="col-1 ">
              <div className="container ">
                <h5> Kg</h5>
              </div>
            </div>
            <div className="col-1 ">
              <div className="container ">
                <h5 ></h5>
              </div>
            </div>
            <div className="col-2 ">

            </div>
          </div>
        </div>

      </div>
      <div className='w-100 d-flex justify-content-center '>

     
      </div>
    </div>

  )
}

export default FacturasAcopiadores