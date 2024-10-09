import axios from "axios";
import Swal from "sweetalert2";




export const loginRequest = async (values) => {
    try {
        Swal.fire({
            title: 'Iniciando Sesion',
            text: 'Espere un momento por favor...',
            allowOutsideClick: false,
            showConfirmButton: false,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
            },
          });
        const response = await axios.post(`/login`, values);
        Swal.close();
   return response
    } catch (error) {
        console.log(error);
        const messageError =  error.response.data.message || error.response.data.error[0].message ;
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: messageError
        });
    }
}
export const getUsuarios = async () => {
    try {
        const response = await axios.get(`/usuarios`);
        console.log(getUsuarios);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}