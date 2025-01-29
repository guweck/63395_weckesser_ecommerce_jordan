import React from 'react'
import { useCart } from '../context/CartContext'
import './AddItemButton.css'

const AddItemButton = ({ product, quantity }) => {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  return (
    <button onClick={handleAddToCart} className='additembutton'>
      Agregar {quantity} al carrito
    </button>
  )
}

export default AddItemButton

