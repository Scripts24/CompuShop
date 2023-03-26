
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { Link } from 'react-router-dom';


const Cart = () => {
    const cartContext = useContext(CartContext);
    const { cartList, totalBuy, removeItem, emptyCart } = cartContext;

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
                        <h3>Producto</h3>
                        <h3>Precio</h3>
                        <h3>Cantidad</h3>
                        <h3>Subtotal</h3>
                        <h3 >Eliminar</h3>
                    </div>
                    <div>
                        {cartList.map(prod =>
                            <div key={prod.id} className='cart-detalles'>
                                <div>
                                    <img src={prod.image}></img>
                                    <h4>{prod.title}</h4>
                                </div>
                                <h4>${prod.price}</h4>
                                <h4>{prod.quantity}</h4>
                                <h4>${prod.quantity * prod.price}</h4>
                                <i className="bi bi-trash3-fill" onClick={() => removeItem(prod.id)}></i>
                            </div>
                        )}
                        <h3 className='cart-total'>Precio Total: ${totalBuy()} </h3>
                        <div className='buttons'>
                            <Link to={"/catalogue"} >
                                <button>Seguir comprando</button>
                            </Link>
                            <Link to={"/checkout"}>
                                <button>Procesar Compra</button>
                            </Link>
                            <button onClick={emptyCart}>Vaciar Carrito</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}



export default Cart