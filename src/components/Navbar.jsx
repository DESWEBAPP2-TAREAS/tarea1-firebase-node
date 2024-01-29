import './css/show.css'
import logo from "./img/Studio_Ghibli_logo.webp"
export const Navbar = () => {
  return (
    <nav id='navbar' className='mb-3'>
    <img className='img-fluid' src={logo} alt="" />
  </nav>
  )
}
