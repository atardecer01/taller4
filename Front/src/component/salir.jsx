import React, { useEffect } from 'react';

const BorrarLocalStorage = () => {
  useEffect(() => {
    // Borra el valor almacenado en el localStorage con la clave 'correo'
    localStorage.removeItem('correo');
    window.location.href = "/";
  }, []);

  return (
    <div>
      <p></p>
    </div>
  );
};

export default BorrarLocalStorage;
