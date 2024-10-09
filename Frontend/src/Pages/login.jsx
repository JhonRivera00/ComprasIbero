import logo from '../assets/imagenes/logo.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import {useForm} from 'react-hook-form';
import { loginRequest } from '../services/login.services';
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";
  

function Login() {
  
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit} = useForm();
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate(); 
  
  const onSubmit = handleSubmit(async(values) => {
    const response = await loginRequest(values)
    const token = response.data.token
    localStorage.setItem("token", token);
    const {rol} = jwtDecode(token)

    if (response.status === 200) {
      Swal.fire({
        title: response.data.message,
        icon: "success",
        timer: 2000,
      }).then(()=>{
        if(rol === 'Admin'){
          navigate('/home')
        }else{
          navigate('/acopio')
        }
      });
    }
  })

  return (
    <div className='container-fluid container-login'>
      <div className="row container-internal m-auto ">
        <div className='col-12 col-md-6'>
        </div>
        <div className='col-12 col-md-6 login'>
          <div className="centrar">


            <div className="container-formulario">
              <form onSubmit={onSubmit}>
                <h1 className='title'>COMEPCAFE</h1>
                <div className='logo'>
                  <img src={logo} alt="" />
                </div>
                <div className="container">
                  <div className="contenedor">
                    <label form="cedula"><b>Cedula</b></label>
                    <input type="number" placeholder="Cedula" {...register("cedula",{required:true})} required />
                  </div>
                  <label htmlFor="Contrasena"><b>Contraseña</b></label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Contraseña"
                      name="contrasena"
                      {...register("contrasena",{required:true})}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password-button"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </button>
                  </div>
                </div>
                <div className="contenerdor">
                  <div className="container signin">
                    <button type="submit" className="registerbtn">Iniciar Sesion</button>
                    {/* <p>Dont have an account? <a href="#">Register</a>.</p> */}
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default Login;


