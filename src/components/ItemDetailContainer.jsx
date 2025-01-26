import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from './ItemDetail'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../src/firebaseconfig'

const ItemDetailContainer = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const docRef = doc(db, 'products', id)
    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() })
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <p>Cargando producto...</p>
  }

  if (!product) {
    return <p>El producto no existe.</p>
  }

  return (
    <div style={styles.container}>
      <ItemDetail product={product} />
    </div>
  )
}

export default ItemDetailContainer

const styles = {
  container: {
    padding: '1rem'
  }
}

