import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget'
import './NavBar.css' // Importamos los estilos

const NavBar = () => {
  return (
    <nav className="nav">
      <h2 className="nav__brand">Jordan Sports</h2>
      <div className="nav__links">
        <Link to="/" className="nav__link">Inicio</Link>
        <Link to="/category/zapatillas" className="nav__link">Zapatillas</Link>
        <Link to="/category/remeras" className="nav__link">Remeras</Link>
        <Link to="/category/pantalones" className="nav__link">Pantalones</Link>
      </div>
      <CartWidget />
    </nav>
  )
}

export default NavBar