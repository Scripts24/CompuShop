
import React from 'react'
import ItemDetailContainer from './components/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer';
import NavBar from "./components/NavBar";
import "./Style.css";


const App = () => {
  return (
    <>
      <NavBar/>
      <ItemListContainer greeting ={"¡Bienvenido a CompuShop!"}/>
      <ItemDetailContainer/>
    </>
  )
}


export default App;
