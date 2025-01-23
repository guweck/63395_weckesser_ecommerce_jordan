import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Componentes
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import Checkout from './components/Checkout'
import Brief from './components/Brief'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer greeting="Bienvenido a Jordan Sports" />} />
        <Route path="/category/:catId" element={<ItemListContainer />} />
        <Route path="/product/:id" element={<ItemDetailContainer />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/brief" element={<Brief />} />
        {/* Puedes agregar la ruta /cart si deseas una página adicional de carrito */}
      </Routes>
    </div>
  )
}

export default App
