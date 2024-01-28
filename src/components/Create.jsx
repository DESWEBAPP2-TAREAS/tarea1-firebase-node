import { useState } from "react"
import { collection,addDoc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebaseConfig"
import { useNavigate } from "react-router-dom"
export const Create = () => {
    const [nombre,setNombre]=useState('')
    const [anio,setAnio]=useState(0)
    const [director,setDirector]=useState('')
    const navegar=useNavigate()
    const collectionPeliculas=collection(db,'ghibli')

    const registrar = async(e)=>{
        e.preventDefault()
        await addDoc(collectionPeliculas,{nombre:nombre, anio:anio, director:director})
        navegar('/')
    }

  return (
   <>
    <section>
        <div className="d-flex justify-content-center mb-3">
            <button className="btn btn-success" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">Agregar registro</button>
        </div>
        <div className="accordion accordion-flush mb-3" id="accordionFlushExample">
            <div className="accordion-item">
                <div id="flush-collapseOne" className="accordion-collapse collapse " data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body d-flex justify-content-center">
                       <form onSubmit={registrar()} className="w-75">
                            <h2 className="text-center mb-4">Registro de peliculas:</h2>
                            <div>
                                <label className="form-label">Nombre pelicula</label>
                                <input className="form-control" type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
                            </div>
                            <div>
                                <label className="form-label">Director</label>
                                <input className="form-control" type="text"  value={director} onChange={(e)=>setDirector(e.target.value)} />
                            </div>
                            <div>
                                <label className="form-label">Año de salidad</label>
                                <input className="form-control" type="number"  value={anio} onChange={(e)=>setAnio(e.target.value)}/>
                            </div>
                            <div className="mt-4 d-flex justify-content-center">
                                <button className="btn btn-primary">Registrar</button>
                            </div>
                       </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
   </>
  )
}
