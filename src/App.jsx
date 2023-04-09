import React from "react";
import CartProvider from "./context/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import Cart from "./components/Cart";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Footer from "./components/Footer";
import Checkout from "./components/Checkout";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import "./Style.css";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./components/NotFound"

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <ScrollToTop/>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
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
            <Route path='*' element={<NotFound/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
