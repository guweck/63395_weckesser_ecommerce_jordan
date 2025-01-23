import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const handleFinishPurchase = () => {
    // Aquí podrías realizar la lógica de compra (enviar datos a un backend, etc.)
    // Simularemos el success redirigiendo al Brief
    clearCart()
    navigate('/brief')
  }

  if (cart.length === 0) {
    return <h2 style={{ textAlign: 'center' }}>Tu carrito está vacío</h2>
  }

  return (
    <div style={styles.container}>
      <h2>Finalizar Compra</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio (Unidad)</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>$ {item.price}</td>
              <td>$ {item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: $ {totalPrice}</h3>
      <button style={styles.button} onClick={handleFinishPurchase}>
        Confirmar Compra
      </button>
    </div>
  )
}

export default Checkout

const styles = {
  container: {
    padding: '1rem'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1rem'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
}
