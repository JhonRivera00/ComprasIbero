import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";


export const buscarUsuario = async (cedula) => {

    const response = await axios.get(`/buscar/${cedula || 0}`);
    if (response) {
        return response.data;
    } else {

        return null;
    }
}

export const compraCafe = async (usuario, compra) => {
    try {
        const tokenUser = localStorage.getItem("token");
        const token = {
            headers: {
                "acceso-token": tokenUser,
                "Authorization": `Bearer ${tokenUser}`
            },
        };
        axios.defaults.headers.common = token.headers;
        const { id } = jwtDecode(tokenUser);

        Swal.fire({
            title: "Realizando compra",
            text: "Espere un momento por favor...",
            allowOutsideClick: false,
            showConfirmButton: false,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        const usuarioExiste = await buscarUsuario(usuario.cedula);
        if (usuarioExiste.length === 0) {
            usuario.acopiador = id;
            const { data } = await axios.post(`/usuarios`, usuario);
            compra.usuario = data.usuarioSave._id;
            compra.filas.forEach((fila) => {
                (async () => {
                    let dataCompra = {
                        valor: parseFloat(fila.valor),
                        cantidad: parseFloat(fila.cantidad),
                        valorUnitario: parseFloat(fila.valorUnitario),
                        tipoCafe: fila.tipoCafe,
                        usuario: data.usuarioSave._id,
                        acopiador: id,
                        fecha: compra.fecha,
                        calidad: compra.calidad,
                        observacion: compra.observacion,
                        puntoAcopio: compra.puntoAcopio,
                    };
                    const compraCreada = await axios.post(`/compras`, dataCompra);
                    if (compraCreada) {
                        Swal.fire({
                            icon: "success",
                            title: "Compra realizada",
                            timer: 2000,
                            text: "La compra se ha realizado con éxito",
                        }).then(() => {
                            (() => {
                                setTimeout(() => {
                                    window.location.reload();
                                }, 2000);
                            })()

                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            timer: 2000,
                            text: "No se ha podido realizar la compra",
                        });
                    }
                })()

            });
        } else if (usuarioExiste) {
            compra.usuario = usuarioExiste[0]._id;
            let allSuccess = true;

            compra.filas.forEach(async (fila) => {
                let dataCompra = {
                    valor: parseFloat(fila.valor),
                    cantidad: parseFloat(fila.cantidad),
                    valorUnitario: parseFloat(fila.valorUnitario),
                    tipoCafe: fila.tipoCafe,
                    usuario: usuarioExiste[0]._id,
                    fecha: compra.fecha,
                    calidad: compra.calidad,
                    acopiador: id,
                    observacion: compra.observacion,
                    puntoAcopio: compra.puntoAcopio,
                };

                const response = await axios.post(`/compras`, dataCompra);
                Swal.close();
                if (!response) {
                    allSuccess = false;
                }
            });

            if (allSuccess) {
                Swal.fire({
                    icon: "success",
                    title: "Compra realizada",
                    timer: 2000,
                    text: "La compra se ha realizado con éxito",
                }).then(() => {
                    setTimeout(() => {
                        window.location.reload();
                    },2000)
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    timer: 2000,
                    text: "No se ha podido realizar la compra",
                });
            }
        }
    } catch (error) {
        console.error(error);
        const messageError = error.response.data.message || error.response.data.error[0].message;
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: messageError,
        });
    }
};

export const facturasAcopiadores = async () => {
    try {
        const tokenUser = localStorage.getItem("token");
        const token = {
            headers: {
                "token": tokenUser,
                "Authorization": `Bearer ${tokenUser}`
            },
        };
        const { id } = jwtDecode(tokenUser);

        const { data } = await axios.get(`/facturas-acopiadores/${id}`, token);
        return data;
    } catch (error) {
        console.error(error);
        const messageError = error.response.data.message || error.response.data.error[0].message;
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: messageError,
        });
    }

};

export const usuariosAcopiadores = async () => {
    try {
        const tokenUser = localStorage.getItem("token");
        const token = {
            headers: {
                "token": tokenUser,
                "Authorization": `Bearer ${tokenUser}`
            },
        };
        const { id } = jwtDecode(tokenUser);

        const { data } = await axios.get(`/usuarios-acopiadores/${id}`, token);
        return data;
    } catch (error) {
        console.error(error);
        const messageError = error.response.data.message || error.response.data.error[0].message;
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: messageError,
        });
    }

};

export const facturasAcopiadoresAdmin = async (id) => {
    try {
        const tokenUser = localStorage.getItem("token");
        const token = {
            headers: {
                "token": tokenUser,
                "Authorization": `Bearer ${tokenUser}`
            },
        };

        const { data } = await axios.get(`/facturas-acopiadores/${id}`, token);
        return data;
    } catch (error) {
        console.error(error);
        const messageError = error.response.data.message || error.response.data.error[0].message;
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: messageError,
        });
    }

};

export const facturaVista = async (id) => {
    try {
        const tokenUser = localStorage.getItem("token");
        const token = {
            headers: {
                "token": tokenUser,
                "Authorization": `Bearer ${tokenUser}`
            },
        };

        const { data } = await axios.put(`/factura-vista/${id}`,null, token);
        return data;
    } catch (error) {
        console.error(error);
        const messageError = error.response.data.message || error.response.data.error[0].message
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: messageError,
        });
    }
};
export const facturasTotales = async () => {
    try {
        const tokenUser = localStorage.getItem("token");
        const token = {
            headers: {
                "token": tokenUser, 
                "Authorization": `Bearer ${tokenUser}`  
            },
        };
        const { data } = await axios.get(`/facturas`, token);
        return data;
    }
    catch (error) {
        console.error(error);
        const messageError = error.response.data.message || error.response.data.error[0].message
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: messageError,
        });
    }   
}
export const facturasGuardadas = async () => {
    try {
        const tokenUser = localStorage.getItem("token");
        const token = {
            headers: {
                "token": tokenUser, 
                "Authorization": `Bearer ${tokenUser}`  
            },
        };
        const { data } = await axios.get(`/facturas-guardadas`, token);
        return data;
    }
    catch (error) {
        console.error(error);
        const messageError = error.response.data.message || error.response.data.error[0].message
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: messageError,
        });
    }   
}
export const guardarCompra = async (id) => {
    try {
        const tokenUser = localStorage.getItem("token");
        const token = {
            headers: {
                "token": tokenUser, 
                "Authorization": `Bearer ${tokenUser}`  
            },
        };
        const response = await axios.post(`/guardar-compra/${id}`,null ,token);
        const data = await axios.put(`/factura-vista/${id}`,null ,token);
if (response && data) {
        Swal.fire({
            
            icon: "success",
            title: "Compra guardada",
            text: "La compra se ha guardado con éxito",
            timer: 2000,
        }).then(() => {
            window.location.reload();
        });
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se ha podido guardar la compra",
            timer: 2000,
        });
    
    }
    }
    catch (error) {
        console.error(error);
        const messageError = error.response.data.message || error.response.data.error[0].message
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: messageError,
        });
    }   
}

export const grupoMunicipio = async () => {
  try {
    const tokenUser = localStorage.getItem("token");
    const {id} = jwtDecode(tokenUser);
    const { data } = await axios.get(`/municipios/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    const messageError = error.response.data.message || error.response.data.error[0].message
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: messageError,
    });
  }
                
}

export const estadoAcopiador = async (id)=>{
    try {
        const tokenUser = localStorage.getItem("token");
        const token = {
            headers: {
                "token": tokenUser, 
                "Authorization": `Bearer ${tokenUser}`  
            },
        };
        Swal.fire({
            title: "Actualizando estado",
            text: "Espere un momento por favor...",
            allowOutsideClick: false,
            showConfirmButton: false,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        const estado = await axios.put(`/estado-acopiador/${id}`, null, token);
        Swal.close();
        if(estado){
            Swal.fire({
                icon: "success",
                title: "Estado actualizado",
                text: "El estado del acopiador ha sido actualizado con éxito",
                timer: 2000,
            }).then(() => {
                window.location.reload();
            });
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se ha podido actualizar el estado del acopiador",
                timer: 2000,
            });
        }
       

    } catch (error) {
        console.error(error);
    const messageError = error.response.data.message || error.response.data.error[0].message
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: messageError,
    });
    }
}