import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./component/sidebar.css"
import { SlLogin } from "react-icons/sl";
import { FaUserPlus } from "react-icons/fa6";
import { MdCampaign } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { ImExit } from "react-icons/im";

function Registro() {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  
  const menuItem = [
    
    {
      path: "/",
      name: "Home",
      icon:<FaHome />

    },
   
    {
      path: "/Login",
      name: "Iniciar sesion",
      icon:<SlLogin />

    },
    {
      path: "/registro",
      name: "Registrarse",
      icon:<FaUserPlus />

    }
    ,
    {
      path: "/alerta",
      name: "Alerta",
      icon:<MdCampaign />

    },
    {
      path: "/salir",
      name: "Cerrar sesion",
      icon:<ImExit/>

    }
  ]
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
    <div className="container">
    <div style={{ width: isOpen ? "300px" : "90px" }} className="sidebar">
      <div className="top_section">
        <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">  
          <img src={"/logo.png"} alt="imagen" style={{ width: '5vw', height: '10vh', marginLeft: '10px' }} />
        </h1>
        <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
          <FaBars onClick={toggle}/>
        </div>  
      </div>
      {
        menuItem.map((item,index) => (
          <NavLink to={item.path} key={index} className="link" activeClassName="active">
            <div className="icon">{item.icon}</div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
          </NavLink>
        ))
      } 
    </div>
    <div style={{ width: isOpen ? "calc(100% - 300px)" : "calc(100% - 90px)" }} className="top_sectionp">
    <div className="Inicio">
      <header className="Inicio-arriba">
        <div className="superior-izquierdo p">
        <div style={{ display: 'flex', alignItems: 'center',right: '30px' }}>
                    
  
                </div>
        </div>

            
      </header>

      
        <div style={{ margin: '80px', padding: 0 }}>
        
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
    
   

    
  </div>
    
  );
}

export default Registro;