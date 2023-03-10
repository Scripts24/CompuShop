import React, { useState } from "react";

function ItemCount({ stock }) {
    const [cantidad, setCantidad] = useState(1);

    const agregar = () =>
        cantidad >= stock
            ? Toastify({
                text: "Límite del stock",
                position: "center",
                duration: 3000,
                style: {
                    background: "#CB544B",
                    marginTop: "70px",
                },
            }).showToast()
            : setCantidad(cantidad + 1);
    const restar = () =>
        cantidad <= 0 ? setCantidad(0) : setCantidad(cantidad - 1);

    return (
        <>
            <div className="container-contador">
                <div className="contador">
                    <button className="btn-contador" onClick={restar}>
                        -
                    </button>
                    <h3>{cantidad}</h3>
                    <button className="btn-contador" onClick={agregar}>
                        +
                    </button>
                    <button className="btn-contador" onClick={() => setCantidad(1)}>
                        Reset
                    </button>
                </div>
            </div>
        </>
    );
}

export default ItemCount;
