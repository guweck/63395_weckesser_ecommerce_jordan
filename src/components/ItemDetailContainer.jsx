import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from './ItemDetail'
import { productsData } from '../data/products'

const ItemDetailContainer = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    // Simulamos una llamada asíncrona a la "base de datos"
    const getProductById = new Promise((resolve) => {
      setTimeout(() => {
        resolve(productsData.find(item => item.id === parseInt(id)))
      }, 500)
    })

    getProductById.then((res) => {
      setProduct(res)
    })
  }, [id])

  return (
    <div style={styles.container}>
      {product ? <ItemDetail product={product} /> : <p>Cargando producto...</p>}
    </div>
  )
}

export default ItemDetailContainer

const styles = {
  container: {
    padding: '1rem'
  }
}
