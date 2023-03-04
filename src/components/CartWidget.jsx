import React from "react";
import { Link } from "react-router-dom";
const CartWidget = () => {
    return (
        <div className="carrito">
            {" "}
            <Link to={"/cart"} className="link-carrito">
                <i className="bi bi-cart-check-fill"></i>
                <span>3</span>
            </Link>
        </div>
    );
};

export default CartWidget;
