
import developed from "../assets/img/developed.png"

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div>
          <ul className="wrapper">
            <li className="icon whatsapp">
              <span className="tooltip">Whatsapp</span>
              <a href="https://api.whatsapp.com/send?phone=542215657734&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20CompuShop"
                target="_blank"><span><i className="bi bi-whatsapp"></i></span></a>
            </li>
            <li className="icon instagram">
              <span className="tooltip">Instagram</span>
              <a href="https://www.instagram.com/" target="_blank"><span><i className="bi bi-instagram"></i></span></a>
            </li>
            <li className="icon mail">
              <span className="tooltip">Correo</span>
              <a href="mailto:compu_shop@gmail.com" target="_blank"><span><i className="bi bi-envelope-at"></i></span></a>
            </li>
          </ul>
        </div>
        <p>Avenida CoderHouse <br />
          Buenos Aires - Argentina<br />
          Todos los derechos reservados &copy;
          {new Date().getFullYear()}- CompuShop
        </p>
        <img className="developed" src={developed} />
      </div>
    </>
  )
}

export default Footer
