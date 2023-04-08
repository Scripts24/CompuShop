import { useAuth } from "../context/AuthContext";
import ItemCount from "./ItemCount";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const ItemDetail = ({ computer }) => {

    const { user } = useAuth();

    const cartContext = useContext(CartContext);

    const [goToCart, setGoToCart] = useState(false)

    const categoryUpperFirstLetter = computer.category ? computer.category.charAt(0).toUpperCase() + computer.category.slice(1) : ''

    const { addToCart } = cartContext;

    const onAdd = (quantity) => {
        if (user) {
            addToCart({ ...computer, quantity: quantity })
            setGoToCart(true)
            if ((quantity !== undefined) && (quantity > 1)) {
                setGoToCart(quantity)
                Toastify({
                    text: (`Se han agregado ${quantity} unidades de  ${computer.title} al carrito`),
                    position: "center",
                    gravity: "bottom",
                    duration: 3000,
                    style: {
                        background: "#548C1C",
                        marginBottom: "50px",
                        padding: "20px",
                        fontSize: "20px"
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
                        marginBottom: "50px",
                        padding: "20px",
                        fontSize: "20px"
                    },
                }).showToast();
            }

        } else {
            Toastify({
                text: ("Para comprar, inicia sesión o regístrate❗❗"),
                position: "center",
                gravity: "top",
                duration: 3000,
                style: {
                    background: "#BF0B3B",
                    marginTop: "70px",
                    padding: "30px",
                    fontSize: "30px"
                },
            }).showToast();
        }
    }

    return (
        <div>
            <div key={computer.id} className="container-details">
                <div className="card-details">
                    <img src={computer.image} alt={computer.title} className="img-details" />
                    <h4 className="card-titulo ">{computer.title}</h4>
                    <h5 className="card-category"> Categoría: {categoryUpperFirstLetter}</h5>
                    <h5 className="card-precio">${computer.price}</h5>
                    <h4 className="card-stock">Stock: {computer.stock}</h4>
                    <p className="card-description">{computer.description}</p>
                    <div >
                        {!goToCart
                            ?
                            <ItemCount id={computer.id} initial={1} max={computer.stock} stock={computer.stock} onAdd={onAdd} />
                            :
                            <div className="agregado buttons">
                                <NavLink to="/cart"><button >Ir al Carrito</button></NavLink>

                                <NavLink to='/catalogue'><button> Volver </button> </NavLink>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
