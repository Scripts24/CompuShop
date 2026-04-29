import { useState } from "react"
import { NavLink } from "react-router-dom";

const ItemCount = ({onAdd, max, initial }) => {

    const [value, setValue] = useState(initial)

    const add = () => {
        if (value < max) {
            setValue(value + 1);
        } else {
            Toastify({
                text: "No hay más stock disponible",
                position: "center",
                gravity: "bottom",
                duration: 2000,
                style: {
                    background: "#BF0B3B",
                    padding: "15px",
                    fontSize: "16px"
                }
            }).showToast();
        }
    }
    const subtract = () => {
        if (value > initial) {
            setValue(value - 1)
        }
    }

    return (
        <>
            <div className="container-contador">
                <div className="contador" >
                    <button className="btn-contador" onClick={subtract}>-</button>
                    <p>{value}</p>
                    <button 
  className={`btn-contador ${value >= max ? "btn-disabled" : ""}`}
  onClick={add}
>
  +
</button>
                    <button className="btn-contador" onClick={() => setValue(1)}>Reset</button>
                </div>
                <button 
  className={`btn-contador ${max === 0 ? "btn-disabled" : ""}`}
  onClick={() => {
    if (max === 0) {
      Toastify({
        text: "Producto sin stock",
        duration: 2000,
        gravity: "bottom",
        position: "center",
        style: {
          background: "#BF0B3B",
          padding: "15px"
        }
      }).showToast();
    } else {
      onAdd(value);
    }
  }}
>
  Añadir producto
</button>
                <NavLink to='/catalogue'><button className="btn-contador"> Volver al catálogo </button> </NavLink>
            </div>
        </>
    );
}

export default ItemCount;
