
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartContext = useContext(CartContext);
  const { cart, deleteCart, removeItemById } = cartContext;

  return (
    <div className='cart'>Cart</div>
  )
}

export default Cart