import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CartWidget = () => {
  const { totalItems } = useCart()

  return (
    <Link to="/checkout" style={styles.cart}>
      <span style={styles.icon}>🛒</span>
      {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
    </Link>
  )
}

export default CartWidget

const styles = {
  cart: {
    position: 'relative',
    textDecoration: 'none',
    color: '#fff'
  },
  icon: {
    fontSize: '1.5rem',
  },
  badge: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    backgroundColor: 'red',
    borderRadius: '50%',
    padding: '0.2rem 0.5rem',
    color: '#fff',
    fontSize: '0.8rem'
  }
}
