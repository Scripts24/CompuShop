import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { useNavigate } from 'react-router-dom';


const CartWidget = () => {

    const cartContext = useContext(CartContext);
    const { cartList, cartCounter } = cartContext;
    const navigate = useNavigate();

    return (
        <button className='carrito' onClick={() => { navigate('/cart'); }} disabled={cartList.length > 0 ? false : true} >
            <i className="bi bi-cart-check-fill"></i>
            {cartList.length === 0
                ?
                <span></span>
                :
            <span> {cartCounter()} </span>
            }
        </button>
    );
};

export default CartWidget;
