import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from './ItemList'

// Importar Firestore y métodos para consultas
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../src/firebaseconfig' // <-- nuestra instancia de Firestore

const ItemListContainer = ({ greeting }) => {
  const { catId } = useParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const productsRef = collection(db, 'products')
    let q = productsRef

    if (catId) {
      // Filtrar por categoría
      q = query(productsRef, where('category', '==', catId))
    }

    getDocs(q)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,          // ID de Firestore
            ...doc.data()        // resto de campos (title, price, category, etc.)
          }
        })
        setItems(data)
      })
      .finally(() => setLoading(false))
  }, [catId])

  if (loading) {
    return <h2>Cargando productos...</h2>
  }

  return (
    <div style={styles.container}>
      {greeting && <h2>{greeting}</h2>}
      <ItemList items={items} />
    </div>
  )
}

export default ItemListContainer

const styles = {
  container: {
    padding: '1rem'
  }
}
