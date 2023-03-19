
import ItemCount from "./ItemCount";
import { Link } from "react-router-dom";
import {useState, useContext } from "react";
import { CartContext } from "../context/CartContext";


const ItemDetail = ({ computer }) => {

    const [addCart, setAddCart] = useState(false);
    const cartContext = useContext(CartContext);
    const { addToCart } = cartContext;

    const onAdd = (qty) => {
        addToCart(computer, qty);
        setAddCart(true);
    };


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
                        <div>
                            {addCart ? (<Link className="link-carrito" to="/cart">Terminar mi compra</Link>) :
                                (<ItemCount
                                    onAdd={onAdd}
                                    initial={1}
                                    stock={computer.stock}
                                    id={computer.id}
                                    price={computer.price}
                                    name={computer.name}
                                />)}
                            <div> <Link to='/catalogue'><button> Volver  </button> </Link></div>
                        </div>
                    </div>
                </div>
            )
        </div>
    );
};

export default ItemDetail;
