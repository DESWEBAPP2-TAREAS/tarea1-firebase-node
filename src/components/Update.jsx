import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig/firebaseConfig';
import { Navbar } from './Navbar'
import Swal from 'sweetalert2';


const Home=()=>(
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home" width="45" height="45" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
</svg>
)

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
    <Navbar/>
    <div  onClick={() => navigate('/')} className="d-flex justify-content-center btn">
  <Home />
</div>

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
