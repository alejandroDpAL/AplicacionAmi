import React, { createContext, useState } from 'react';
import axiosClient from '../components/client/axiosClient'; // Asegúrate de que la ruta sea correcta

const MascotasContext = createContext();

export const MascotasProvider = ({ children }) => {
  const [mascotas, setMascotas] = useState([]);
  const [mascota, setMascota] = useState({});
  const [idMascota, setMascotaId] = useState(null);

  const getMascotas = async () => {
    try {
      const response = await axiosClient.get('/mascota/listar');
      console.log(response.data);
      setMascotas(response.data);
    } catch (error) {
      console.log('Error del servidor: ' + error);
    }
  };

  const getMascota = async (id_mascota) => {
    try {
      const response = await axiosClient.get(`/mascota/buscar/${id_mascota}`);
      console.log(response.data);
      setMascota(response.data);
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  return (
    <MascotasContext.Provider
      value={{
        mascotas,
        mascota,
        idMascota,
        setMascotas,
        setMascota,
        setMascotaId,
        getMascotas,
        getMascota,
      }}
    >
      {children}
    </MascotasContext.Provider>
  );
};

export default MascotasContext;
