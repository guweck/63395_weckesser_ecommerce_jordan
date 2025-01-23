import React from 'react'

const Description = ({ text }) => {
  return (
    <div style={styles.descContainer}>
      <h3>Descripción</h3>
      <p>{text}</p>
    </div>
  )
}

export default Description

const styles = {
  descContainer: {
    marginTop: '1rem'
  }
}
