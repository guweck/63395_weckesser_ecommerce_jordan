import React from 'react'
import { Link } from 'react-router-dom'

const ItemList = ({ items }) => {
  return (
    <div style={styles.grid}>
      {items.map(item => (
        <div key={item.id} style={styles.card}>
          <img src={item.image} alt={item.title} style={styles.image} />
          <h3>{item.title}</h3>
          <p>$ {item.price}</p>
          <Link to={`/product/${item.id}`} style={styles.button}>
            Ver Detalle
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ItemList

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  },
  card: {
    border: '1px solid #ddd',
    padding: '1rem',
    textAlign: 'center'
  },
  image: {
    width: '300px',
    height: 'auto'
  },
  button: {
    display: 'inline-block',
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#333',
    color: '#fff',
    textDecoration: 'none'
  }
}
