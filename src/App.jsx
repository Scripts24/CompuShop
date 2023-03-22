import React from "react";
import CartProvider from "./context/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import Cart from "./components/Cart";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Footer from "./components/Footer";
import "./Style.css";
import Checkout from "./components/Checkout";

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route
            exact
            path="/catalogue"
            element={<ItemListContainer greeting={"TU TIENDA ONLINE"} />}
          />
          <Route
            exact
            path="/category/:category"
            element={<ItemListContainer />}
          />
          <Route exact path="/item/:id" element={<ItemDetailContainer />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
