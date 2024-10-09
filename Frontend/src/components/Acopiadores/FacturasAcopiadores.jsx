import React, { useEffect, useState } from 'react'
import { facturasAcopiadores } from '../../services/acopiadores.services';
import ReactPaginate from 'react-paginate';

function FacturasAcopiadores() {
  const [data, setdata] = useState([])
  const [totalKilos, setTotalKilos] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(data.length / PER_PAGE);
  const currentData = data.slice(offset, offset + PER_PAGE);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await facturasAcopiadores();
      let filteredData = data;
      let kilosTotal = 0;
      let valorTotal = 0;
      filteredData.forEach((factura) => {
        kilosTotal += Number(factura.cantidad);
        valorTotal += Number(factura.valor);
      });
      setTotalKilos(kilosTotal);
      setValorTotal(valorTotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }));

      if (startDate && endDate) {
        filteredData = filteredData.filter(factura => {
          const date = new Date(factura.fecha);
          return date >= startDate && date <= endDate;
        });
      }
      setdata(filteredData.reverse());
      setIsLoading(false);
    })();
  }, [startDate, endDate]);
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
                <input type="text" className="" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar Productor" aria-label="Buscar Productor" aria-describedby="button-addon2" />
                <button className="btn btn-success bg-light text-dark border-0 h-100" type="button" id="button-addon2"><i className="bi bi-search"></i></button>
              </div>
            </div>
            <div className="col-4">
              <div className="container d-flex mt-2">
                <input className="form-control-sm" type="date" onChange={e => setStartDate(new Date(e.target.value))} />
                <input className="form-control-sm ms-2" type="date" onChange={e => setEndDate(new Date(e.target.value))} />
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
          {
            isLoading ? <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border text-body-emphasis " role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div> :
              data.length <= 0 ?
                <div className="row fila w-100">
                  <div className="col-12">
                    <div className="container">
                      <h5 className='text-center mt-2'>No hay facturas</h5>
                    </div>
                  </div>
                </div>
                :

                currentData.filter(usuario => usuario.usuario.nombre.toLowerCase().includes(search.toLowerCase())).map((factura, i) => (
                  // currentData.map((factura, i) => (
                  <div className="row fila w-100" key={i}>

                    <div className="col-1 content-table1">
                      <div className="container content-table1">
                        <h5>{currentPage * PER_PAGE + i + 1}</h5>
                      </div>
                    </div>
                    <div className="col-1 content-table1">
                      <div className="container content-table1">
                        <h5 title={factura.fecha}>{factura.fecha}</h5>
                      </div>
                    </div>
                    <div className="col-2 content-table1">
                      <div className="container content-table1">
                        <h5 title={factura.usuario.nombre}>{factura.usuario.nombre}</h5>
                      </div>
                    </div>
                    <div className="col-2 content-table1">
                      <div className="container content-table1">
                        <h5 title={factura.usuario.cedula}>{factura.usuario.cedula}</h5>
                      </div>
                    </div>
                    <div className="col-2 content-table1">
                      <div className="container content-table1">
                        <h5 title={factura.tipoCafe}>{factura.tipoCafe}</h5>
                      </div>
                    </div>
                    <div className="col-1 content-table1">
                      <div className="container content-table1">
                        <h5 title={factura.cantidad + " Kg"}>{factura.cantidad} Kg</h5>
                      </div>
                    </div>
                    <div className="col-1 content-table1">
                      <div className="container content-table1">
                        <h5 className="text-truncate" title={factura.valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}>{factura.valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</h5>
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

                ))}


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
                <h5 title={totalKilos + " Kg"}>{totalKilos} Kg</h5>
              </div>
            </div>
            <div className="col-1 ">
              <div className="container ">
                <h5 title={valorTotal}>{valorTotal}</h5>
              </div>
            </div>
            <div className="col-2 ">

            </div>
          </div>
        </div>

      </div>
      <div className='w-100 d-flex justify-content-center '>

        {
          data.length > PER_PAGE ?
            <ReactPaginate
              previousLabel={<span><i className="bi bi-caret-left-fill"></i>Anterior </span>}
              nextLabel={<span>Siguiente <i className="bi bi-caret-right-fill"></i></span>}
              pageCount={pageCount}
              pageClassName='m-2'
              onPageChange={({ selected }) => setCurrentPage(selected)}
              containerClassName={"pagination"}
              previousClassName={"pagination__link m-2"}
              nextClassName={"pagination__link m-2"}
              disabledClassName={"pagination__link--disabled "}
              activeClassName={"pagination__link--active font-weight-bold mt-3"}
            />
            : ""
        }
      </div>
    </div>

  )
}

export default FacturasAcopiadores