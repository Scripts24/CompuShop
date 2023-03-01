import React, { useState } from "react";

function ItemCount({ stock }) {
    const [cantidad, setCantidad] = useState(1);
    
const agregar = () =>
        cantidad >= stock ? alert ("Sin stock") : setCantidad(cantidad + 1);
const restar = () => (cantidad <= 0 ? setCantidad(0) : setCantidad (cantidad - 1))     
    

    return (
        <> 
            <div className="container-contador">
                <div className="contador">
                    <button className="btn-contador" onClick={restar}>-</button>
                    <h3>{cantidad}</h3>
                    <button className="btn-contador" onClick={agregar}>+</button>
                    <button className="btn-contador" onClick={() => setCantidad(1)}>Reset</button>
                </div>
            </div>
        </>
    );
}

export default ItemCount;
