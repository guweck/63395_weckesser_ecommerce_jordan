import React from 'react'
import { Link } from 'react-router-dom'
import './ItemList.css' 

const ItemList = ({ items }) => {
  return (
    <div className="itemListGrid">
      {items.map(item => (
        <div key={item.id} className="itemListCard">
          <img src={item.image} alt={item.title} className="itemListImage" />
          <h3>{item.title}</h3>
          <p>$ {item.price}</p>
          <Link to={`/product/${item.id}`} className="itemListButton">
            Ver Detalle
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ItemList
