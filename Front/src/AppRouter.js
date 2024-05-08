// AppRouter.js
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./login";
import Registro from "./registro";
import Principal from "./principal";
import Inicio from "./component/Inicio"
import BorrarLocalStorage from "./component/salir"
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/Login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />   
        <Route path="/alerta" element={<Principal/>} />
        <Route path="/salir" element={<BorrarLocalStorage/>} />
      

      </Routes>
    </BrowserRouter>
    
  );
};