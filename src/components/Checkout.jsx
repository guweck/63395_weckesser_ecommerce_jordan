import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import './Checkout.css'

// importamos el formulario
import PurchaseForm from './PurchaseForm'

const Checkout = () => {
  const {
    cart,
    totalPrice,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart
  } = useCart()

  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)  // controla si mostramos el formulario
  const [orderId, setOrderId] = useState(null)     // guardamos la ID de la orden (si se crea)

  // handler para el botón verde
  const handleShowForm = () => {
    setShowForm(true)
  }

  // Si la orden ya fue generada en <PurchaseForm />, guardamos la ID acá:
  const handleOrderCreated = (newOrderId) => {
    setOrderId(newOrderId)
    // Podrías limpiar el carrito aquí o en el PurchaseForm
    clearCart()
  }

  if (orderId) {
    // Si ya tenemos un orderId, mostramos un mensaje final (o podrías usar <Brief />)
    return (
      <div className="checkoutContainer">
        <h2>¡Compra realizada con éxito!</h2>
        <p>Tu número de seguimiento es: <strong>{orderId}</strong></p>
        <button className="btnPrimary" onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    )
  }

  if (cart.length === 0) {
    return <h2 className="emptyCart">Tu carrito está vacío</h2>
  }

  return (
    <div className="checkoutContainer">
      <h2>Carrito de Compras</h2>

      {/* Tabla de productos */}
      <table className="checkoutTable">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio (Unidad)</th>
            <th>Subtotal</th>
            <th>Quitar</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                <button onClick={() => decrementItem(item.id)} className="btnSmall">-</button>
                <span style={{ margin: '0 0.5rem' }}>{item.quantity}</span>
                <button onClick={() => incrementItem(item.id)} className="btnSmall">+</button>
              </td>
              <td>$ {item.price}</td>
              <td>$ {item.price * item.quantity}</td>
              <td>
                <button onClick={() => removeItem(item.id)} className="btnRemove">🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: $ {totalPrice}</h3>

      {/* BOTÓN VERDE que MUESTRA el Formulario */}
      {!showForm && (
        <button className="btnPrimary" onClick={handleShowForm}>
          Confirmar Compra
        </button>
      )}

      {/* Formulario de datos: solo se ve si showForm es true */}
      {showForm && (
        <PurchaseForm
          cart={cart}
          totalPrice={totalPrice}
          onOrderCreated={handleOrderCreated}
        />
      )}
    </div>
  )
}

export default Checkout

