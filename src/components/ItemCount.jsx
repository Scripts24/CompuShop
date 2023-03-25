import {  useState} from "react"

const ItemCount = ({onAdd, max, initial, stock  }) => {

   

     const [value, setValue] = useState(initial)
    
    const add = () => {
        if (value < max) {
            setValue(value + 1);
        } 
    }

    const subtract = () => {
        if (value > initial)  {
            setValue(value - 1)
        }
    }

    return (
        <>
            <div >
                
                <span>Stock disponible: {stock - value}</span>
                    <div className="container-contador">
                        <div className="contador" >
                            <button className="btn-contador" onClick={subtract}>-</button>
                            <p>{value}</p>
                            <button className="btn-contador" onClick={add}>+</button>
                            <button className="btn-contador" onClick={() => setValue(1)}>Reset</button>
                        </div>
                            <button className="btn-contador"  onClick={()=> onAdd(value) } >Añadir producto </button>
                    </div>
            </div>
        </>
    );
}

export default ItemCount;
