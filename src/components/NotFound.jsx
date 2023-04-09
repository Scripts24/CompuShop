import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="not-found">
            <div className='content-notfound'>
                <h2>404</h2>
                <h4>Upps! Página no encontrada</h4>
                <p>Tal vez escribiste mal la dirección o la página ya no existe</p>
                <Link to='/'>
                    Ir a la página de Inicio
                </Link>
            </div>
        </div>
    )
}

export default NotFound;