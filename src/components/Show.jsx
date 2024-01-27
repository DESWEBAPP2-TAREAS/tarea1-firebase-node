import { useEffect, useState } from 'react'
//import {Link} from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebaseConfig'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//const MySwal = withReactContent(Swal)

export const Show = () => {
   //const [products, setProducts] = useState([]);
  //Conexion de la base de datos
  const productsCollection = collection(db,"products");
  const getProducts = async()=>{
    const data = await getDocs(productsCollection);
    console.log(data.docs)
  }

  useEffect( ()=>{
    getProducts();
  },[])

  return (
   <>
   <h2 className="text-center w-100">Show</h2>
   <div className="d-flex justify-content-center mt-5">
    <button className="btn btn-success">Hola</button>

   </div>
   </>

  )
}
