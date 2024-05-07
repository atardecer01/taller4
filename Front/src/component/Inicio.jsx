
import { useState } from "react";

import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import SearchComponent from "./SearchComponent"
import { SlLogin } from "react-icons/sl";
import { FaUserPlus } from "react-icons/fa6";
import { MdCampaign } from "react-icons/md";
import { FaHome } from "react-icons/fa";

import React from 'react';

const Inicio= ({children}) => {
  
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

    }
  ]

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
    <h3 style={{ fontSize: '40px', color: '#0D0D0D' }}>Bienvenido a JOBSCOUT</h3>
    
    <div style={{ margin: '50px', padding: 0 }}><SearchComponent/></div>

    </div> 
  </div>
  
  );
}

export default Inicio;