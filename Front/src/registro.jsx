import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
        alert(data); 
      } else {
        
        alert(data);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Ocurrió un error al registrar. Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <div className="Inicio">
      <div className="container-login">
      <header className="Inicio-arriba">
      <div className="superior-izquierdo p">
        <div style={{ display: 'flex', alignItems: 'center',right: '30px' }}>
                    
                    <img src={"/logo.png"} alt="Placeholder" style={{ width: '5vw', height: '10vh', marginLeft: '10px' }} />
                    <p>JOBSCOUT</p>
                </div>
        </div>

     
            
      </header>
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleRegistro}>
            <span className="login-form-titl"> Registro </span>
          

            <span className="login-form-title">
             
            </span>

            <div className="wrap-input">
              <input
                className={nombre !== "" ? "has-val input" : "input"}
                type="text"
                value={nombre}
                style={{ color: nombre !== "" ? "black" : "black" }}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                required
              />
            </div>

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
              <button className="login-form-btn" type="submit">Registro</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registro;