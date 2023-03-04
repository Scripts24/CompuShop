import React from 'react'

import ItemCount from "./ItemCount";

const ItemDetail = ({ computers }) => {


    return (
        <div className='container-card-details'>

            {computers?.map((computer) => (
                <div key={computer.id} className="card-details">
                    <img src={computer.image} alt={computer.title} />
                    <h4 className="card-titulo ">{computer.title}</h4>
                    <h5 className="card-category">{computer.category}</h5>
                    <h5 className="card-precio">${computer.price}</h5>
                    <p>{computer.description}</p>
                    <ItemCount
                        stock={computer.stock}
                        id={computer.id}
                        price={computer.price}
                        name={computer.name}
                    />
                </div>
            ))}
        </div>
    )
}


export default ItemDetail;