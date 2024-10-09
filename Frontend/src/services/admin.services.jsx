import axios from "axios";
import Swal from "sweetalert2";

export const obtenerFacturas = async () => {
  try {
    const tokenAdmin = localStorage.getItem("token");
    const token = {
      headers: {
        "token": tokenAdmin,
        "Authorization": `Bearer ${tokenAdmin}`
      },
    };
    const { data } = await axios.get('/facturas', token);
    return data;
  } catch (error) {
    console.error(error);
    const messageError = error.response.data.message || error.response.data.error[0].message;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: messageError,
    });
  };
}
export const obtenerAcopiadores = async () => {
  try {
    const tokenUser = localStorage.getItem("token");
    const token = {
      headers: {
        "token": tokenUser,
        "Authorization": `Bearer ${tokenUser}`
      },
    };
    const { data } = await axios.get('/acopiadores', token);
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

}
export const obtenerProductores = async () => {
  try {
    const tokenUser = localStorage.getItem("token");
    const token = {
      headers: {
        "token": tokenUser,
        "Authorization": `Bearer ${tokenUser}`
      },
    };
    const { data } = await axios.get('/usuarios', token);
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

}
export const usuariosAcopiadores =async (e) => { 
  try {
      const tokenUser = localStorage.getItem("token");
      const token = {
        headers: {
          "token": tokenUser,
          "Authorization": `Bearer ${tokenUser}`
        },
      };
      

      const {data} = await axios.get(`/usuarios-acopiadores/${e}`, token);
      return data;
  } catch (error) {
      console.error(error);
      const messageError =  error.response.data.message || error.response.data.error[0].message ;
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: messageError,
      });
  }
  
  };