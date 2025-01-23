import React, { useState } from 'react'

const ItemQuantitySelector = ({ stock, initial, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initial)

  const handleIncrement = () => {
    if (quantity < stock) {
      const newQty = quantity + 1
      setQuantity(newQty)
      onQuantityChange(newQty)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQty = quantity - 1
      setQuantity(newQty)
      onQuantityChange(newQty)
    }
  }

  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      <span style={{ margin: '0 1rem' }}>{quantity}</span>
      <button onClick={handleIncrement}>+</button>
      <p>Stock disponible: {stock}</p>
    </div>
  )
}

export default ItemQuantitySelector
