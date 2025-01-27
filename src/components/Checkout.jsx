import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../src/firebaseconfig'
import * as yup from 'yup'

const checkoutSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  phone: yup
    .string()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9]+$/, 'Sólo números'),
  email: yup
    .string()
    .email('Email inválido')
    .required('El email es obligatorio')
})

const Checkout = () => {
  const {
    cart,
    totalPrice,
    clearCart,
    removeItem,
    incrementItem,
    decrementItem
  } = useCart()

  const navigate = useNavigate()

  // Campos del formulario
  const [buyerData, setBuyerData] = useState({
    name: '',
    phone: '',
    email: ''
  })

  // Manejo de errores de validación
  const [errors, setErrors] = useState({})

  // Orden generada (ID) tras confirmar compra
  const [orderId, setOrderId] = useState(null)

  // Cambio en los campos de texto
  const handleChange = (e) => {
    setBuyerData({
      ...buyerData,
      [e.target.name]: e.target.value
    })
  }

  const handleFinishPurchase = async (e) => {
    e.preventDefault()

    // 1) Validar con Yup
    try {
      await checkoutSchema.validate(buyerData, { abortEarly: false })

      // Si pasó la validación, crear la orden
      const order = {
        buyer: {
          name: buyerData.name,
          phone: buyerData.phone,
          email: buyerData.email
        },
        items: cart.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity
        })),
        total: totalPrice,
        date: serverTimestamp()
      }

      const ordersRef = collection(db, 'orders')
      const docRef = await addDoc(ordersRef, order)

      // Guardamos la ID de la orden
      setOrderId(docRef.id)

      // Limpiamos el carrito
      clearCart()
    } catch (validationError) {
      // Si no pasa la validación, collectamos los mensajes
      if (validationError.inner) {
        const errorMessages = {}
        validationError.inner.forEach((err) => {
          errorMessages[err.path] = err.message
        })
        setErrors(errorMessages)
      } else {
        console.error('Error al crear la orden:', validationError)
      }
    }
  }

  if (orderId) {
    // Una vez creada la orden, mostramos la "confirmación"
    return (
      <div style={styles.container}>
        <h2>¡Compra realizada con éxito!</h2>
        <p>Tu número de seguimiento es: <strong>{orderId}</strong></p>
        <button style={styles.button} onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    )
  }

  if (cart.length === 0) {
    return <h2 style={{ textAlign: 'center' }}>Tu carrito está vacío</h2>
  }

  return (
    <div style={styles.container}>
      <h2>Finalizar Compra</h2>

      {/* TABLA DE PRODUCTOS */}
      <table style={styles.table}>
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
                <button onClick={() => decrementItem(item.id)} style={styles.btnSmall}>-</button>
                <span style={{ margin: '0 0.5rem' }}>{item.quantity}</span>
                <button onClick={() => incrementItem(item.id)} style={styles.btnSmall}>+</button>
              </td>

              <td>$ {item.price}</td>
              <td>$ {item.price * item.quantity}</td>

              {/* BOTÓN PAPELERA para eliminar SOLO este producto */}
              <td>
                <button onClick={() => removeItem(item.id)} style={styles.trashBtn}>
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: $ {totalPrice}</h3>

      {/* FORMULARIO de DATOS del COMPRADOR */}
      <form onSubmit={handleFinishPurchase} style={styles.form}>
        <div style={styles.field}>
          <label htmlFor="name">Nombre completo</label>
          <input
            id="name"
            name="name"
            type="text"
            value={buyerData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={styles.errorText}>{errors.name}</p>}
        </div>

        <div style={styles.field}>
          <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={buyerData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p style={styles.errorText}>{errors.phone}</p>}
        </div>

        <div style={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={buyerData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={styles.errorText}>{errors.email}</p>}
        </div>

        <button type="submit" style={styles.button}>
          Confirmar Compra
        </button>
      </form>
    </div>
  )
}

export default Checkout

const styles = {
  container: {
    padding: '1rem',
    maxWidth: '800px',
    margin: '0 auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1rem'
  },
  btnSmall: {
    width: '30px',
    height: '30px',
    backgroundColor: '#888',
    border: 'none',
    color: '#fff',
    cursor: 'pointer'
  },
  trashBtn: {
    width: '30px',
    height: '30px',
    backgroundColor: 'red',
    border: 'none',
    color: '#fff',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '2rem'
  },
  field: {
    display: 'flex',
    flexDirection: 'column'
  },
  errorText: {
    color: 'red',
    margin: 0
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
}
