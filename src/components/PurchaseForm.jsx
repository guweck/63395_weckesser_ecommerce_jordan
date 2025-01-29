// src/components/PurchaseForm.jsx
import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebaseconfig'
import * as yup from 'yup'
import './PurchaseForm.css'

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

const PurchaseForm = ({ cart, totalPrice, onOrderCreated }) => {
  // Datos del formulario
const [buyerData, setBuyerData] = useState({
    name: '',
    phone: '',
    email: ''
})

  // Manejo de errores
const [errors, setErrors] = useState({})

  // Manejo del submit
const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Validar con Yup
await checkoutSchema.validate(buyerData, { abortEarly: false })

      // Crear la orden
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

      // Notificar al padre que se creó la orden
onOrderCreated(docRef.id)

    } catch (error) {
        if (error.inner) {
        // Manejo de errores de validación
        const errorMessages = {}
        error.inner.forEach(err => {
            errorMessages[err.path] = err.message
        })
        setErrors(errorMessages)
    } else {
        console.error('Error al crear la orden:', error)
}
    }
}

  // Manejo del input controlado
const handleChange = (e) => {
    setBuyerData({
        ...buyerData,
        [e.target.name]: e.target.value
    })
}

return (
    <div className="purchaseFormContainer">
        <h3>Completa tus datos para finalizar</h3>

        <form onSubmit={handleSubmit} className="purchaseForm">
        <div className="formGroup">
            <label htmlFor="name">Nombre completo</label>
            <input
            id="name"
            name="name"
            type="text"
            value={buyerData.name}
            onChange={handleChange}
        />
        {errors.name && <p className="errorText">{errors.name}</p>}
        </div>

        <div className="formGroup">
            <label htmlFor="phone">Teléfono</label>
            <input
            id="phone"
            name="phone"
            type="text"
            value={buyerData.phone}
            onChange={handleChange}
        />
        {errors.phone && <p className="errorText">{errors.phone}</p>}
        </div>

        <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
            id="email"
            name="email"
            type="email"
            value={buyerData.email}
            onChange={handleChange}
        />
        {errors.email && <p className="errorText">{errors.email}</p>}
        </div>

        <button type="submit" className="btnSubmit">
            Generar Orden
        </button>
    </form>
</div>
)
}

export default PurchaseForm
