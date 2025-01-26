import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

// Importamos Firestore
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../src/firebaseconfig'

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const handleFinishPurchase = async () => {
    // Datos de la orden
    const order = {
      items: cart.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      total: totalPrice,
      date: serverTimestamp(), // marca de tiempo del servidor
      buyer: {
        name: 'Nombre del Cliente',
        email: 'email@cliente.com',
        phone: '123456789'
      }
    }

    try {
      // Guardamos la orden en la colección "orders"
      const ordersRef = collection(db, 'orders')
      const docRef = await addDoc(ordersRef, order)

      console.log('Orden creada con ID:', docRef.id)

      // Limpiamos el carrito
      clearCart()

      // Redirigimos a /brief (puedes pasar el ID por state o query si deseas mostrarlo)
      navigate('/brief')
    } catch (error) {
      console.error('Error al crear la orden:', error)
    }
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

