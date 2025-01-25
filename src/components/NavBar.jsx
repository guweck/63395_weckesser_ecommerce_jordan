import "./navbar.css"
import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget'
import brandLogo from '../assets/logo.png'

const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <div>
        <img src={brandLogo} alt="Jordan Sports" style={styles.logo} />
        <h2 style={styles.brand}>Jordan Sports</h2>
      </div>
      <div style={styles.links}>
      <Link to="/" style={styles.linkText}>Inicio</Link>
        <Link to="/category/zapatillas" style={styles.linkText}>Zapatillas</Link>
        <Link to="/category/remeras" style={styles.linkText}>Remeras</Link>
        <Link to="/category/pantalones" style={styles.linkText}>Pantalones</Link>
      </div>
      <CartWidget />
    </nav>
  )
}

export default NavBar

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    background: '#333',
    color: 'red',
  },
  logo: {
    height: '100px', 
    marginRight: '1rem'
  },
  brand: {
    margin: '0',
    padding: '0'
  },
  links: {
    display: 'flex',
    gap: '1rem',
    background: '#333',
    color: 'red'
  },
  linkText: {
    color: 'yellow',
    textDecoration: 'none'
  }
}
