import { useEffect, useState } from "react";
import { obtenerAcopiadores } from "../../services/admin.services"
import { facturaVista, facturasTotales, guardarCompra } from "../../services/acopiadores.services";


import ReactPaginate from 'react-paginate';

function Facturas() {
  const [data, setData] = useState([])
  const [totalKilos, setTotalKilos] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [acopiadores, setAcopiadores] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedAcopiador, setSelectedAcopiador] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [dataDescargar, setDataDescargar] = useState([])

  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(data.length / PER_PAGE);
  const currentData = data.slice(offset, offset + PER_PAGE);
  useEffect(() => {
    (async () => {
      const dataAcopiadores = await obtenerAcopiadores();
      setAcopiadores(dataAcopiadores);
      setIsLoading(true);
      const facturasT = await facturasTotales();
      let filteredData = facturasT;
      if (selectedAcopiador) {
        filteredData = facturasT.filter(factura => factura.acopiador._id === selectedAcopiador);
      }
      if(selectedAcopiador === "null"){
        filteredData = facturasT; 
      }
      
      if (startDate && endDate) {
        filteredData = filteredData.filter(factura => {
          const date = new Date(factura.fecha);
          return date >= startDate && date <= endDate;
        });
      }
      setData(filteredData.reverse());
      setIsLoading(false);
      let kilosTotal = 0;
      let valorTotal = 0;
      filteredData.forEach((factura) => {
        kilosTotal += Number(factura.cantidad);
        valorTotal += Number(factura.valor);
      });
      setTotalKilos(kilosTotal);
      setValorTotal(valorTotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }));
      
    })();
  }, [startDate, endDate, selectedAcopiador]);
  
  const verInformacion = async (factura) => {
    if(factura.visto === false ){
      await facturaVista(factura._id);
      window.location.reload();
      
    }
    
  };

  const guardarFactura = async (id) => {
     await guardarCompra(id);
  }
  
  // const exportToExcel = async () => {
  //   const workbook = new Exceljs.Workbook();
  //   const worksheet = workbook.addWorksheet('My Sheet');
  
  //   const excelData = dataDescargar.map(item => ({
  //     ...item,
  //     fecha: item.fecha.toString(),
  //   }));
  
  //   worksheet.columns = Object.keys(excelData[0]).map(key => ({ header: key, key }));
  //   worksheet.addRows(excelData);
  
    
  //   const buffer = await workbook.xlsx.writeBuffer();
  //   const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  //   // Download the file
  //   const link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = 'Documento Equivalente.xlsx';
  //   link.click();
  // }
  // useEffect(() => {
  //  (async()=>{
  //   const datosDescargar = data.map(item => ({
  //     fecha: item.fecha,
  //     Productor: item.usuario.nombre,
  //     Asociado : item.usuario.asociado === true ? "Si" : "No",
  //     Cedula : item.usuario.cedula,
  //     Grupo : item.usuario.grupoProductor.nombreGrupo,
  //     Municipio : item.usuario.municipio.nombreMunicipio,
  //     PuntoAcopio : item.puntoAcopio.nombrePunto,
  //     TipoCafe : item.tipoCafe,
  //     CantidadKilos : item.cantidad,
  //     ValorUnitario : item.valorUnitario,
  //     ValorTotal : item.valor,
  //     Calidad : item.calidad,
  //     Observacion : item.observacion,
  //     Acopiador : item.acopiador.nombre,


  //   }));

  //   setDataDescargar(datosDescargar);
  //  })()
   
  // }, [data]);
  return (
    <div >
      
    <div className="container-fluid container-facturas p-0 shadow-lg mt-3 border-5 ">
      {/* Title */}
      <div className="Header container-title p-0 mt-0">
        <div className="row w-100 p-0 m-0">

          <div className="col-5">
            <div className="container">
              <h3>Facturas</h3>
            </div>
          </div>
         
          {/* <div className="col-4">
            <div className="container d-flex justify-content-center mt-2">
            <button className="btn  btn-sm btn-success " onClick={exportToExcel}>Descargar</button>
            </div>
          </div> */}
          
          <div className="col-4">
            <div className="container container-selector">
              <select className="form-select selector form-select-sm w-75" aria-label="Small select example" defaultValue={selectedAcopiador} onChange={(e) => setSelectedAcopiador(e.target.value)}>
                <option value={"null"} >Todo...</option>
                {
                  acopiadores.map((acopiador) => (
                    <option key={acopiador._id} value={acopiador._id}>{acopiador.nombre} -- {acopiador.grupoProductor.nombreGrupo}</option >
                  ))
                }

              </select>
              
            </div>
          </div>
          <div className="col-3">
            <div className="container d-flex mt-3">            
              <input className="form-control-sm" type="date" onChange={e => setStartDate(new Date(e.target.value))} />
              <input className="form-control-sm ms-2" type="date" onChange={e => setEndDate(new Date(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="Header container-header">
        <div className="row w-100">

          <div className="col-1 content-table1 ">
            <div className="container content-table1 ">
              <h5>N°</h5>
            </div>
          </div>
          <div className="col-2 content-table1">
            <div className="container content-table1">
              <h5>Fecha</h5>
            </div>
          </div>
          <div className="col-2 content-table1">
            <div className="container content-table1">
              <h5>Nombre del Productor</h5>
            </div>
          </div>
          <div className="col-1 content-table1">
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
        <h5 className="text-center">No hay facturas</h5>
      </div>
    </div>
  </div>
  :
  currentData.map((factura, index) => (
    <div className={`row fila w-100 ${factura.visto === true ? "": "bg-dark-subtle"}`} key={factura._id}>
      <div className="col-1 content-table1">
        <div className="container content-table1">
          <h5>{currentPage * PER_PAGE + index + 1}</h5>
        </div>
      </div>
      <div className="col-2 content-table1">
        <div className="container content-table1 ">
          <h5>{factura.fecha}</h5>
        </div>
      </div>
      <div className="col-2 content-table1">
        <div className="container content-table1 ajustartexto">
          <h5 className="text-truncate" title={factura.usuario.nombre}>{factura.usuario.nombre}</h5>
        </div>
      </div>
      <div className="col-1 content-table1">
        <div className="container content-table1">
          <h5 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'clip' }} title={factura.usuario.cedula}>{factura.usuario.cedula}</h5>
        </div>
      </div>
      <div className="col-2 content-table1">
        <div className="container content-table1">
          <h5>{factura.tipoCafe}</h5>
        </div>
      </div>
      <div className="col-1 content-table1">
        <div className="container content-table1">
          <h5 className="text-truncate" title={factura.cantidad + " Kg"}>{factura.cantidad} Kg</h5>
        </div>
      </div>
      <div className="col-1 content-table1">
        <div className="container content-table1">
          <h5 className="text-truncate" title={factura.valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}>{factura.valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</h5>
        </div>
      </div>
      <div className="col-2 content-table1 container-opciones content-table1">
        <div className="container container-opciones content-table1">
          {/* <button className="btn"><i className="bi bi-geo-alt"></i></button> */}
          <button className="btn" title="Ver" onClick={()=>{verInformacion(factura)}} ><i className="bi bi-eye-fill"></i></button>
          <button className="btn" title="Editar"><i className="bi bi-pencil-square"></i></button>
          <button className="btn" title="Imprimir"><i className="bi bi-printer"></i></button>
          <button className="btn" title="Guardar" onClick={()=>guardarFactura(factura._id)}><i className="bi bi-floppy"></i></button>
        </div>
      </div>
    </div>

  ))

}


        
       
      </div>

      {/* Footer */}

      <div className="Header container-footer">
        <div className="row w-100">

          <div className="col-1 ">
            <div className="container">
              <h5>Total</h5>
            </div>
          </div>
         
          
          <div className="col-1 ">

          </div>
          <div className="col-2 ">

          </div>
          <div className="col-2 ">
            <div className="container">
            

            
          </div>
          </div>
          <div className="col-2 ">

          </div>
          
          <div className="col-1 ">
            <div className="container ">
              <h5 className="text-truncate" title={totalKilos + " Kg"}>{totalKilos} Kg</h5>
            </div>
          </div>
          <div className="col-2 ">
            <div className="container ">
              <h5 className="text-truncate" title={valorTotal}>{valorTotal}</h5>
            </div>
          </div>
          <div className="col-1">

          </div>
        </div>
      </div>

    </div>
    <div className="w-100 d-flex justify-content-center ">

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

export default Facturas