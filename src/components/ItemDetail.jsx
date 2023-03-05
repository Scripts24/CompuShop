import React from "react";

import ItemCount from "./ItemCount";

const ItemDetail = ({ computers }) => {
    return (
        <div >
            {computers?.map((computer) => (
                <div key={computer.id} className="container-details">
                    <img src={computer.image} alt={computer.title} className="img-details"/>
                    <div className="card-details">
                        <h4 className="card-titulo ">{computer.title}</h4>
                        <h5 className="card-category">{computer.category}</h5>
                        <h5 className="card-precio">${computer.price}</h5>
                        <p className="card-descripcion">{computer.description}</p>
                        <ItemCount
                            stock={computer.stock}
                            id={computer.id}
                            price={computer.price}
                            name={computer.name}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemDetail;
