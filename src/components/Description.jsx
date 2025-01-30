import React from 'react'
import './Description.css'

const Description = ({ text }) => {
  return (
    <div className='descContainer' >
      <h3>Descripción</h3>
      <p>{text}</p>
    </div>
  )
}

export default Description

