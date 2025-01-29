import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './CartWidget.css' 

const CartWidget = () => {
  const { totalItems } = useCart()

  return (
    <Link to="/checkout" className='cart'>
      <span className='icon'>🛒</span>
      {totalItems > 0 && <span className='badge'>{totalItems}</span>}
    </Link>
  )
}

export default CartWidget




