
import ItemCount from "./ItemCount";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";


const ItemDetail = ({ computer }) => {

    const cartContext = useContext(CartContext);
    const [goToCart, setGoToCart] = useState(false)

    const { addToCart } = cartContext;

    // Agregar al carrito
    const onAdd = (quantity) => {
        setGoToCart(true)
        addToCart({ ...computer, quantity: quantity })

        if ((quantity !== undefined) && (quantity > 1)) {
            setGoToCart(quantity)
            Toastify({
                text: (`Se han agregado ${quantity} unidades de  ${computer.title} al carrito`),
                position: "center",
                gravity: "bottom",
                duration: 3000,
                style: {
                    background: "#548C1C",
                    marginBottom: "70px",
                },
            }).showToast();

        }
        else if (quantity === 1) {
            setGoToCart(quantity)
            Toastify({
                text: (`Se ha agregado ${quantity} unidad de  ${computer.title} al carrito`),
                position: "center",
                gravity: "bottom",
                duration: 3000,
                style: {
                    background: "#548C1C",
                    marginBottom: "70px",
                },
            }).showToast();
        }
    }
    
    return (
        <div >
            <div key={computer.id} className="container-details">
                <img src={computer.image} alt={computer.title} className="img-details" />
                <div className="card-details">
                    <h4 className="card-titulo ">{computer.title}</h4>
                    <h5 className="card-category">{computer.category}</h5>
                    <h5 className="card-precio">${computer.price}</h5>
                    <h5>Stock: {computer.stock}</h5>
                    <p className="card-descripcion">{computer.description}</p>
                    <div className="cart">
                        {!goToCart
                            ?
                            <ItemCount id={computer.id} initial={1} max={computer.stock} stock={computer.stock} onAdd={onAdd} />
                            :
                            <div>
                                <NavLink to="/cart"><button >Ir al Carrito</button></NavLink>

                                <NavLink to='/catalogue'><button> Volver  </button> </NavLink>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
