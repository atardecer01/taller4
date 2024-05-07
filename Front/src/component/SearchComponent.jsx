import React, { useState} from 'react';
import "./App5.css";
import Card from "./tarjeta";
import { Grid } from '@mui/material';



const SearchComponent = () => {
  // Set up state for users and search term
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [cards, setcards] = useState([
    {
     
    
      id: 3,
      title: "Sin Informacion",
      content :" ",
      url: "",
    },
    {
    id: 4,
    title: "Sin Informacion",
    content :" ",
      url: "",
  },
  {
    id: 3,
    title: "Sin Informacion",
    content :" ",
    url: "",
  },{
    id: 4,
    title: "Sin Informacion",
    content :" ",
    url: "",
  }
  ]);
  
  
  const handleAlert = async (e) => {
    const nombre = localStorage.getItem('correo');
    
    if (nombre !== null) { 
      http://localhost:4000/api/alert
      try {
        const response = await fetch('http://localhost:4000/api/alert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ search,search2 })
        });
    
        const data = await response.json();        
        localStorage.setItem('correo', email); // Corregido aquí
        navigate('/');
        
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo más tarde.');
      }
     
    } else {
      window.location.href = "/login";
    }
  };
  

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setSearch2(e.target.value);
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    if( search === "")
    {
      alert("Debes poner un criterio a buscar")
    }
    else
    {
    try {
      const response = await fetch('http://localhost:4000/api/webScaping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ search,search2 })
      });
  
      const data = await response.json(); 
      console.log(data);
      const res = data.resultados
      if(res != []){
        setcards(res)   
      }
        

      
    } catch (error) {
      console.error('Error en la busqueda:', error);
      alert('Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo más tarde.');
    }
  }
  };
  // Render the component
  return (
    <div >
     
       
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  width="80" height="30" onClick={handleAlert}>
        <path fill="#7ED957" d="M224 512c35.3 0 64-28.7 64-64H160c0 35.4 28.7 64 64 64zm215.4-149.7c-19.3-20.8-55.5-52-55.5-154.3 0-77.7-54.5-139.9-127.9-155.2V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v20.8C118.6 68.1 64.1 130.3 64.1 208c0 102.3-36.2 133.5-55.5 154.3-6 6.5-8.7 14.2-8.6 21.7 .1 16.4 13 32 32.1 32h383.8c19.1 0 32-15.6 32.1-32 .1-7.6-2.6-15.3-8.6-21.7z"/>
        </svg>

    <input
    value={search}
    type="text"
    placeholder="Cargo"
    className="form-control rounded-pill" 
    onChange={handleInputChange}
    style={{ marginRight: '10px' }}
    />


    <input
    value={search2}
    type="text"
    placeholder="Lugar"
    className="form-control rounded-pill" 
    onChange={handleInputChange2}
    style={{ marginRight: '10px' }}
    />

    <button  className="boton2" type="submit"    style={{ margin: '50px', padding: 0 }} onClick={handleBuscar}>Buscar</button>

    <div className="d-flex justify-content-center align-items-center h-100">
    <Grid container spacing={3}>
    {cards.map(({ title, content, url, id }) => (
      <Grid item xs={12} sm={6} md={6} lg={6} key={id}> {/* Cambiado a 6 columnas para mostrar 2 en una fila */}
        <Card title={title} content={content} url={url} id={id} />
      </Grid>
    ))}
  </Grid>

    </div>
    </div>
  );
};

export default SearchComponent;
