import React, { useState } from 'react'
import ItemQuantitySelector from './ItemQuantitySelector'
import AddItemButton from './AddItemButton'
import Description from './Description'
import './ItemDetail.css' 

const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (value) => {
    setQuantity(value)
  }

  return (
    <div className='detailContainer'>
      <div className='imageContainer'>
        <img src={product.image} alt={product.title} className='imageDetail' />
      </div>
      <div className='infoContainer' >
        <h1>{product.title}</h1>
        <p className='price'>$ {product.price}</p>
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




