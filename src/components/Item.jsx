import { Link } from "react-router-dom";

const Item = ({ id, title, price, image }) => {
    return (
        <>
                <div className="card" key={id}>
                    <img src={image}  alt={title}/>
                    <h4 className="card-titulo ">{title}</h4>
                    <h5 className="card-precio">${price}</h5>
                    <button className="link-detalle"><Link to={`/item/${id}`} className="link-detalle">Ver detalles</Link></button>
                </div>
        </>
    );
};

export default Item;
