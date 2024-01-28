import { useEffect, useState } from 'react'
import {Create} from "./Create"
import {Link} from 'react-router-dom'
import {collection, getDocs, doc, deleteDoc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebaseConfig'
import './css/show.css'
import logo from "./img/Studio_Ghibli_logo.webp"
//import Swal from 'sweetalert2'
//import withReactContent from 'sweetalert2-react-content'
//const MySwal = withReactContent(Swal)

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

  const deletePeliculas = async(id) =>{
    const peliculasDoc = doc(db,"ghibli",id)
    await deleteDoc(peliculasDoc)
    getPeliculas()
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
            <th scope="col">Actualizar</th>
            <th scope="col">Borrar</th>
          </tr>
        </thead>
        <tbody>
          {peliculas.map((pelicula)=>(
            <tr key={pelicula.id}>
            <th scope="row">{pelicula.nombre}</th>
            <td>{pelicula.director}</td>
            <td>{pelicula.anio}</td>
            <td>
            <Link to={`/update/${pelicula.id}`}>Editar</Link>
            </td>
            <td>
              <button onClick={()=>{deletePeliculas(pelicula.id)}} className='btn btn-danger'></button>
            </td>
          </tr>
      
          ))}
          </tbody>
      </table>
    </section>
   </>

  )
}
