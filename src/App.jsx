
import React from 'react'
import ItemListContainer from './components/ItemListContainer';
import NavBar from "./components/NavBar";
import "./Style.css";


const App = () => {
  return (
    <>
      <NavBar/>
      <ItemListContainer greeting ={"¡Bienvenidos a CompuShop!"}/>
    </>
  )
}


export default App;
