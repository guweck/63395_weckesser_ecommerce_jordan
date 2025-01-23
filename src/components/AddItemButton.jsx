import React from 'react'
import { useCart } from '../context/CartContext'

const AddItemButton = ({ product, quantity }) => {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  return (
    <button onClick={handleAddToCart} style={styles.button}>
      Agregar {quantity} al carrito
    </button>
  )
}

export default AddItemButton

const styles = {
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#E53935',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
}
