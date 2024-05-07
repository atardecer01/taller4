import React, { useState } from "react";

import {FaBars} from "react-icons/fa"
import { NavLink } from "react-router-dom";

import "./sidebar.css"
import { BiVideoRecording } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";

const Sidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  
  const menuItem = [
   
    {
      path: "/Login",
      name: "Iniciar sesion",
      icon:<BiVideoRecording />

    },
    {
      path: "/registro",
      name: "Registrarse",
      icon:<MdPeopleAlt />

    }
    ,
    {
      path: "/alerta",
      name: "Alerta",
      icon:<MdPeopleAlt />

    }
  ]
  return (
    <div className="container">
      <div style={{width: isOpen ? "300px" : "90px"}} className="sidebar">
        <div className="top_section">
          <h1 style={{display: isOpen ? "block" : "none"}} className="logo">  
          <img src={"/logo.png"} alt="imagen" style={{ width: '5vw', height: '10vh', marginLeft: '10px' }} />

           </h1>
          <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
            <FaBars onClick={toggle}/>
          </div>  
        </div>
        {
            menuItem.map((item,index) => (
              <NavLink to={item.path} key={index} 
              className="link" activeclassName="active">
                <div className="icon">{item.icon} </div>
                <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name} </div>
              </NavLink>
            ))
          }
      </div>
      <div style={{ width: isOpen ? "calc(100% - 300px)" : "calc(100% - 90px)" }} className="top_sectionp">
    <h3 style={{ fontSize: '90px', color: '#0D0D0D' }}>No hay alertas disponibles</h3>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  width="80" height="30">
        <path fill="#7ED957" d="M224 512c35.3 0 64-28.7 64-64H160c0 35.4 28.7 64 64 64zm215.4-149.7c-19.3-20.8-55.5-52-55.5-154.3 0-77.7-54.5-139.9-127.9-155.2V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v20.8C118.6 68.1 64.1 130.3 64.1 208c0 102.3-36.2 133.5-55.5 154.3-6 6.5-8.7 14.2-8.6 21.7 .1 16.4 13 32 32.1 32h383.8c19.1 0 32-15.6 32.1-32 .1-7.6-2.6-15.3-8.6-21.7z"/>
        </svg>
 
           </div> 
          

      <main>{children} </main>
    </div>
  );
}

export default Sidebar;