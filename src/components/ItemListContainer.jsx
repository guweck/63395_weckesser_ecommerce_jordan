import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from './ItemList'
import { productsData } from '../data/products'

const ItemListContainer = ({ greeting }) => {
  const { catId } = useParams()
  const [items, setItems] = useState([])

  useEffect(() => {
    // Simulamos una llamada a la "base de datos"
    const getProducts = new Promise((resolve) => {
      setTimeout(() => {
        resolve(productsData)
      }, 500)
    })

    getProducts.then((res) => {
      if (catId) {
        setItems(res.filter(product => product.category === catId))
      } else {
        setItems(res)
      }
    })
  }, [catId])

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
