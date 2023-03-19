import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
        <p>Avenida sin Nombre <br/>
          Buenos Aires - Argentina<br/>
          Todos los derechos reservados &copy;
            {new Date().getFullYear()}- CompuShop
        </p>
    </div>
  )
}

export default Footer
