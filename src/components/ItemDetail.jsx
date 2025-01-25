import React, { useState } from 'react'
import ItemQuantitySelector from './ItemQuantitySelector'
import AddItemButton from './AddItemButton'
import Description from './Description'

const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (value) => {
    setQuantity(value)
  }

  return (
    <div style={styles.detailContainer}>
      <div style={styles.imageContainer}>
        <img src={product.image} alt={product.title} style={styles.image} />
      </div>
      <div style={styles.infoContainer}>
        <h1>{product.title}</h1>
        <p style={styles.price}>$ {product.price}</p>
        <ItemQuantitySelector
          stock={product.stock}
          initial={1}
          onQuantityChange={handleQuantityChange}
        />
        <AddItemButton product={product} quantity={quantity} />
        <Description text={product.description} />
      </div>
    </div>
  )
}

export default ItemDetail

const styles = {
  detailContainer: {
    display: 'flex',
    gap: '1rem'
  },
  imageContainer: {
    flex: '1'
  },
  infoContainer: {
    flex: '1'
  },
  image: {
    width: '600px',
    height: 'auto'
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  }
}
