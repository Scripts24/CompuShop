import { Link } from "react-router-dom";
import React, { useState } from "react";
import logo from "../assets/img/logo.jpg";
import CartWidget from "./CartWidget";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
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
                    <Link to={`/category/${"Notebook"}`} className="link-nav">
                        Notebooks
                    </Link>
                </li>
                <li>
                    <Link to={`/category/${"Gamer"}`} className="link-nav">
                        Gamers
                    </Link>
                </li>
                <li>
                    <Link to={`/category/${"Ofimatica"}`} className="link-nav">
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
            <CartWidget />
        </div>
    );
};

export default NavBar;
