import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext([])

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addItem = (item, quantity) => {
    // Si el producto ya existe en el carrito, actualizar la cantidad
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id)
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart]
      updatedCart[existingItemIndex].quantity += quantity
      setCart(updatedCart)
    } else {
      setCart([...cart, { ...item, quantity }])
    }
  }

  const removeItem = (itemId) => {
    setCart(cart.filter(product => product.id !== itemId))
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0)

  const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}
