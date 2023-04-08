
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { Link } from 'react-router-dom';

const Cart = () => {
    const cartContext = useContext(CartContext);
    const { cartList, totalBuy, removeItem, emptyCart, } = cartContext;

    return (
        <>
            {cartList.length === 0
                ?
                <div className="cart">
                    <div className="cart-empty">
                        <h2>Tu carrito está vacío <i className="bi bi-emoji-frown-fill"></i></h2>
                        <h3>¿Deseas agregar algún producto? <i className="bi bi-emoji-smile-upside-down-fill"></i></h3>
                        <i className="bi bi-arrow-90deg-down flecha"></i>
                        <Link to="/catalogue" className='buttons'>
                            <button> Ver catálogo</button>
                        </Link>
                    </div>
                </div>
                :
                <div className="cart">
                    <div className='cart-header'>
                        <h4>Producto</h4>
                        <h4>Precio</h4>
                        <h4>Cantidad</h4>
                        <h4>Subtotal</h4>
                        <h4>Eliminar</h4>
                    </div>
                    <div>
                        {cartList.map(prod =>
                            <div key={prod.id} className='cart-detalles'>
                                <div>
                                    <img src={prod.image}></img>
                                    <h5>{prod.title}</h5>
                                </div>
                                <h5>${prod.price}</h5>
                                <h5>{prod.quantity}</h5>
                                <h5>${prod.quantity * prod.price}</h5>
                                <i className="bi bi-trash3-fill" onClick={() => removeItem(prod.id)}></i>
                            </div>
                        )}
                        <h4 className='cart-total'>Precio Total: ${totalBuy()} </h4>
                        <div className='options buttons'>
                            <Link to={"/catalogue"} >
                                <button className='options'>Seguir comprando</button>
                            </Link>
                            <Link to={"/checkout"}>
                                <button className='options'>Procesar Compra</button>
                            </Link>
                            <button onClick={emptyCart} className='options' >Vaciar Carrito</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}



export default Cart