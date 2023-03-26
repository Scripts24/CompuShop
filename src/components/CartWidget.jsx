import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { Link } from 'react-router-dom';


const CartWidget = () => {

  const cartContext = useContext(CartContext);
  const { cartCounter } = cartContext;

  return (
    cartCounter() > 0) ?
    <Link to={"/cart"} className="carrito">
      <i className="bi bi-cart-check-fill "><span>{cartCounter()}</span></i>
    </Link> : "";

};

export default CartWidget;
