import { useEffect, useState } from 'react'
import {Create} from "./Create"
import {Link} from 'react-router-dom'
import {collection, getDocs, doc, deleteDoc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebaseConfig'
import './css/show.css'
import logo from "./img/Studio_Ghibli_logo.webp"
import Swal from 'sweetalert2'


const IconTablerEdit = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
      <path d="M16 5l3 3" />
  </svg>
);

const IconTablerDelete =() =>(
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-x-filled" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005h5zm-1.489 9.14a1 1 0 0 0 -1.301 1.473l.083 .094l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.403 1.403l.094 -.083l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.403 -1.403l-.094 .083l-1.293 1.292l-1.293 -1.292l-.094 -.083l-.102 -.07z" stroke-width="0" fill="currentColor" />
  <path d="M19 7h-4l-.001 -4.001z" strokeWidth="0" fill="currentColor" />
</svg>
); 

export const Show = () => {
   const [peliculas, setPeliculas] = useState([]);
  const ghibliCollection = collection(db,"ghibli");

  const getPeliculas = async()=>{
    const data = await getDocs(ghibliCollection);
    setPeliculas(
      data.docs.map((doc =>({...doc.data(),id:doc.id})))
    )
    console.log(peliculas)
  }

  const deletePeliculas = async (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const peliculasDoc = doc(db, "ghibli", id);
            deleteDoc(peliculasDoc).then(() => {
                Swal.fire(
                    '¡Eliminado!',
                    'El registro ha sido eliminado.',
                    'success'
                );
                getPeliculas();
            }).catch((error) => {
                Swal.fire(
                    'Error',
                    'Hubo un problema al eliminar el registro: ' + error.message,
                    'error'
                );
            });
        }
    });
}


  useEffect( ()=>{
    getPeliculas();
  },[])

  return (
   <>
    <nav id='navbar' className='mb-3'>
      <img className='img-fluid' src={logo} alt="" />
    </nav>
    <Create></Create>
    <section className='mt-4 p-3'>
      <h2 className='text-center mb-3'>Peliculas Ghibli</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Director</th>
            <th scope="col">Año</th>
            <th className='text-center' scope="col">Actualizar</th>
            <th className='text-center' scope="col">Borrar</th>
          </tr>
        </thead>
        <tbody>
          {peliculas.map((pelicula)=>(
            <tr key={pelicula.id}>
            <th scope="row">{pelicula.nombre}</th>
            <td>{pelicula.director}</td>
            <td>{pelicula.anio}</td>
            <td className='d-flex justify-content-center'>
              <Link to={`/update/${pelicula.id}`} className="btn btn-warning">
                <IconTablerEdit/>
              </Link>
            </td>
            <td> 
              <button onClick={()=>{deletePeliculas(pelicula.id)}} className='btn btn-danger'>
                <IconTablerDelete/>
              </button>
            </td>
          </tr>
      
          ))}
          </tbody>
      </table>
    </section>
   </>

  )
}
