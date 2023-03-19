import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { useNavigate } from 'react-router-dom';


const CartWidget = () => {

    const cartContext = useContext(CartContext);
    const {getTotalItems, cart } = cartContext;
    const navigate = useNavigate();

    return (
        <button className="carrito"  disabled={cart.length > 0 ? false : true}
        onClick={() => { navigate('/cart');}}>
            <i className="bi bi-cart-check-fill"></i>
            <span className="text-white text-lg">
        {cart.length > 0 ? getTotalItems(cart) : null}
      </span>   
        </button>
    );
};

export default CartWidget;
