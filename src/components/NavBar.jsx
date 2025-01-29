import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget'
import './NavBar.css' // Importa la hoja de estilos

const NavBar = () => {
  return (
    <nav className="nav">
    
      <Link to="/" className="logoLink">
        <img src="/jordansports.png" alt="Jordan Sports Logo" className="logo" />
      </Link>

      {/* Enlaces de navegación */}
      <div className="links">
        <Link to="/category/zapatillas">Zapatillas</Link>
        <Link to="/category/remeras">Remeras</Link>
        <Link to="/category/pantalones">Pantalones</Link>
      </div>

      <CartWidget />
    </nav>
  )
}

export default NavBar
