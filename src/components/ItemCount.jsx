import React, { useState } from "react";

const ItemCount = ({ onAdd, initial, stock }) => {

    const [qty, setQty] = useState(initial);
    

    const addProduct = (num) => {
        setQty(qty + num);
    };




    return (
        <>
            <div className="container-contador">
                <div className="contador">
                    <button className="btn-contador" onClick={() => addProduct(-1)} disabled={qty === initial} >-</button>
                    <h3>{qty}</h3>
                    <button className="btn-contador" onClick={() => addProduct(+1)} disabled={qty === stock}>+ </button>
                    <button className="btn-contador" onClick={() => setQty(1)}>Reset</button>
                </div>
                <p>Stock restante: {stock - qty}</p>
                <button className="btn-contador" 
                onClick={() => {onAdd(qty);
                    Toastify({text: `Se ha agregado ${id} al carrito ✔`,
                    duration: 3000

                    }).showToast();}} disabled={stock === 0 ? true : null}>Agregar</button>
            </div>
        </>
    );
}

export default ItemCount;
