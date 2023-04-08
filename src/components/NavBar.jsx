import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import logo from "../assets/img/logo.jpg";
import CartWidget from "./CartWidget";
import { useAuth } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const NavBar = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const cartContext = useContext(CartContext);
    const { emptyCart } = cartContext;
    const { user, logout } = useAuth();

    const onClickLogOut = () => {
        logout();
        emptyCart();
        navigate("/login");
    };

    return (
        <div className="navbar">

            <div className="nav-logo">
                <img src={logo}></img>
                <h1>
                    <Link to={"/"} className="link-title">
                        CompuShop
                    </Link>
                </h1>
            </div>
            <ul className={`nav-items ${isOpen && "open"}`}>
                <li>
                    <Link to={"/catalogue"} className="link-nav">
                        Catálogo
                    </Link>
                </li>
                <li>
                    <Link to={`/category/${"notebook"}`} className="link-nav">
                        Notebooks
                    </Link>
                </li>
                <li>
                    <Link to={`/category/${"gamer"}`} className="link-nav">
                        Gamers
                    </Link>
                </li>
                <li>
                    <Link to={`/category/${"ofimatica"}`} className="link-nav">
                        Ofimáticas
                    </Link>
                </li>
            </ul>
            <div
                className={`nav-toggle ${isOpen && "open"}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="container-carrito-user">
                {!user && (<Link to={`/login`} className="user">
                    <h5 className="user"> Log In</h5> </Link>)}

                {!user && (<Link to={`/register`} className="user" >
                    <h5 className="user">Register</h5></Link>)}

                {user && (
                <>  
                    <CartWidget /> 
                    <i className="bi bi-file-person-fill user"></i>
                        <span onClick={onClickLogOut} >
                            <i className="bi bi-box-arrow-right user logout"></i>
                        </span>
                </>
                )}
            </div>

        </div>

    );
};

export default NavBar;
