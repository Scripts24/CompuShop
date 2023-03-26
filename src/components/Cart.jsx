
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { Link } from 'react-router-dom';


const Cart = () => {
    const cartContext = useContext(CartContext);
    const {  cartList, totalBuy, removeItem, emptyCart} = cartContext;

    return (
    <>
        {cartList.length === 0
            ? 
                <div className="cart">
                    <div >
                        <h2><strong>Tu carrito está vacío</strong></h2>
                        <h3>¿Deseas agregar algún producto?</h3>
                        <Link  to="/catalogue">
                            Ver catálogo
                        </Link>
                    </div>
                </div>
            :
            <div className="cart">
            <div>
                <div></div>
                <h5 >Producto:</h5>
                <h5 >Precio:</h5>
                <h5 >Cantidad:</h5>
                <h5 >Total:</h5>
                <div></div>
            </div>
            <hr></hr>
            <div >
                {cartList.map(prod => 
                    <div  key={prod.id}>
                        <div >
                            <img src={prod.image} style={{width:150}}></img>
                        </div>
                        <div >
                            <h5>{prod.title}</h5>
                        </div>
                        <div >
                            <h5>${prod.price}</h5>
                        </div>
                        <div >
                            <h5>{prod.quantity}</h5>
                        </div>
                        <div >
                            <h5>${prod.quantity * prod.price}</h5>
                        </div>
                        <div>
                            <button onClick={() => removeItem(prod.id)}>Eliminar</button>
                        </div>
                        <hr></hr>
                    </div>
                )}
                <h3><b>Precio Total:</b></h3>
                <h4><b>${totalBuy()}</b></h4>
                <div>
                    <button onClick={emptyCart}>Vaciar Carrito</button>
                    <Link to={"/checkout"}>
                        <button>Procesar Compra</button>
                    </Link>
                </div>
            </div>
        </div>
        }
    </>
    )
}



export default Cart