import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext([])

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addItem = (item, quantity) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id)
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart]
      updatedCart[existingItemIndex].quantity += quantity
      setCart(updatedCart)
    } else {
      setCart([...cart, { ...item, quantity }])
    }
  }

  // Botón de "papelera" elimina 1 item completo
  const removeItem = (itemId) => {
    setCart(cart.filter(product => product.id !== itemId))
  }

  const clearCart = () => {
    setCart([])
  }

  const incrementItem = (itemId) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 }
      }
      return item
    })
    setCart(updatedCart)
  }

  const decrementItem = (itemId) => {
    const updatedCart = cart
      .map(item => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 }
        }
        return item
      })
      .filter(item => item.quantity !== 0)
    setCart(updatedCart)
  }

  const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0)
  const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        incrementItem,
        decrementItem,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

