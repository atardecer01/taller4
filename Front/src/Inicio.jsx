import './page.css'
import Cards from "./component/Tarjetas";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './page.css'

function Inicio() {

  const navigate = useNavigate();
  const handleRegistro = (e) => {
    e.preventDefault();
    navigate('/registro');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };
    return (
      <div className="Inicio">
        <header className="Inicio-arriba">
            <div className="superior-izquierdo">
                <p>AEVA</p>
            </div>
            
            <div className="Superior-derecho"  style={{ textAlign: 'center',padding: '10hv' }} >
               
            <form className="login-form" onSubmit={handleLogin}>
           
            <button className="login-form-btn" type="submit">Sign in</button>
          </form>

          <form className="login-form" onSubmit={handleRegistro}>
          <button className="login-form-btn" type="submit">Sign up</button>
           
            </form>
               
            </div>
        </header>
        <div className='Contenido'>
            <h1 className='Titulo'>AEVA</h1> 
            <h3 className='Descripcion'>Analizador de Emociones Visuales </h3> 
            <h3 className='Conten'>Con AEVA podras reconocer las emociones<br></br>
             o expresiones faciales de los demás en <br></br>
             tiempo real. </h3> 
             <button className='MoreInf'>Mas informacion</button>
        </div>
      </div>
    );
  }
  
  export default Inicio;