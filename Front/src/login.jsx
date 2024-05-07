import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
//import Webcam from "react-webcam"; // Importa el componente de cámara
import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegistro = (e) => {
    e.preventDefault();
    navigate('/registro');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();        
  
      navigate('/home');
      
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo más tarde.');
    }
  };
  return (
    <div className="Inicio">
      <header className="Inicio-arriba">
        <div className="superior-izquierdo p">
        <div style={{ display: 'flex', alignItems: 'center',right: '30px' }}>
                    
                    <img src={"/logo.png"} alt="Placeholder" style={{ width: '5vw', height: '10vh', marginLeft: '10px' }} />
                    <p>AEVA</p>
                </div>
        </div>

        <div className="Superior-derecho">
                <div className=  "login-form-btn-menu-superior"><p>Home</p></div>
                <div className=  "login-form-btn-menu-superior">  <p>Sign up</p></div>
                <div className=  "login-form-btn-menu-superior">    <p>Otro</p></div>
                

               
              
            </div>
            
      </header>

      <div className='Contenido'>
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleLogin}> {/* Aquí se agrega onSubmit al formulario */}
            <span className="login-form-titl"> Sing in </span>

            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                style={{ color: email !== "" ? "black" : "black" }}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                style={{ color: password !== "" ? "black" : "black" }}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn" type="submit">Login</button>
            </div>
            <div className="text-center">
              <span className="txt1">No tienes cuenta? </span>
              <a className="txt2" href="/registro" onClick={handleRegistro}>
                Crear cuenta
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
