import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig/firebaseConfig'; // Asegúrate de importar 'db' correctamente
import Swal from 'sweetalert2';

export const Update = () => {
  const [nombre, setNombre] = useState('');
  const [anio, setAnio] = useState(0);
  const [director, setDirector] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const peliculasDoc = doc(db, "ghibli", id);
    const data = { nombre: nombre, anio: Number(anio), director: director };
    try {
      await updateDoc(peliculasDoc, data);
      Swal.fire('Actualizado', 'La película ha sido actualizada correctamente', 'success');
      navigate('/');
    } catch (error) {
      Swal.fire('Error', 'Error al actualizar la película', 'error');
    }
  };

  const getProductById = async (id) => {
    const peliculasDoc = doc(db, "ghibli", id);
    const pelicula = await getDoc(peliculasDoc);
    if (pelicula.exists()) {
      const peliculaData = pelicula.data();
      setNombre(peliculaData.nombre);
      setAnio(peliculaData.anio);
      setDirector(peliculaData.director);
    } else {
      console.log('La película no está registrada');
    }
  };

  useEffect(() => {
    getProductById(id);
  }, [id]);

  return (
    <>
    <div className="w-100 d-flex justify-content-center mt-5">
    <form onSubmit={update} className="w-75">
        <h2 className="text-center mb-4">Actualizar película:</h2>
        <div>
          <label className="form-label">Nombre película</label>
          <input className="form-control" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <label className="form-label">Director</label>
          <input className="form-control" type="text" value={director} onChange={(e) => setDirector(e.target.value)} />
        </div>
        <div>
          <label className="form-label">Año de salida</label>
          <input className="form-control" type="number" value={anio} onChange={(e) => setAnio(e.target.value)} />
        </div>
        <div className="mt-4 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">Actualizar</button>
        </div>                     
      </form>
    </div>
    </>
  );
};
