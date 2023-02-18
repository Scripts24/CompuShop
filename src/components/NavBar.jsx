import React, {useState} from "react";
import logo from "../assets/img/logo.jpg";
import CartWidget from "./CartWidget";


const NavBar = () => {
    const[isOpen, setIsOpen] = useState(false)
    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo}></img>
                <h1>CompuShop</h1>
            </div>
            <ul className={`nav-items ${isOpen && "open"}`}>
                <li>Catálogo</li>
                <li>Notebooks</li>
                <li>Gamers</li>
                <li>Ofimáticas</li>
            </ul>
            <div className={`nav-toggle ${isOpen && "open"}`} onClick={ () => setIsOpen(!isOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        <CartWidget />
    </div>
    );
};

export default NavBar;
