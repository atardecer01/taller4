import React, { useState } from "react";

import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { useEffect } from 'react';
import { FaHome } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { MdCampaign } from "react-icons/md";
import { SlLogin } from "react-icons/sl";
import "./sidebar.css";
import { DataGrid } from '@mui/x-data-grid';
import { ImExit } from "react-icons/im";


const Sidebar = ({children}) => {

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [cards, setcards] = useState([])

  useEffect(() => {
    const fetchData = async () => { // Marca la función como async
      const nombre = localStorage.getItem('correo');
      console.log(nombre);
      if (nombre !== null) { 
        try {
          console.log('hh')
          const response = await fetch('http://localhost:4000/api/alertRes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email :nombre })
          });
      
          const data = await response.json();
          console.log(data);
          const res = data.t
          
          if(res != []){
            setcards(res)
           
          }        
         
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          alert('Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo más tarde.');
        }
      } else {
        
      }
    };
  
    fetchData();
  }, []);
  

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

    },,
    {
      path: "/salir",
      name: "Cerrar sesion",
      icon:<ImExit/>

    }
  ]

  const columns = [
    
    { field: 'Alertas', headerName: 'Alertas', width: 130 },
    { field: 'Estado', headerName: 'Estado', width: 130 },
   
    
  ];
  
  const rows = cards.map((card, index) => ({
    id: index + 1,
    Alertas: card,
    Estado: 'activado' // Esto asegura que el estado siempre sea 'activado'
  }));
  
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
      {cards.length > 0 ? (
        <table>
          <thead>
            <tr>
            <div style={{ height: 400, width: '100%' }}>
            <h3 style={{ fontSize: '90px', color: '#0D0D0D' }}>Alertas disponibles</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
            </tr>
          </thead>
          
           
        </table>
      ) : (
        <h3 style={{ fontSize: '90px', color: '#0D0D0D' }}>No hay alertas disponibles</h3>
      )}
    </div>
    
 
          

      <main>{children} </main>
    </div>
  );
}

export default Sidebar;