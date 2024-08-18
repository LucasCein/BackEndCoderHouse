import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useLocation } from "react-router-dom"

const RegisterConfirmation = () => {
    return (
        <div className="confirmation-overlay">
            <div className="confirmation-box">
                <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
                <p className="success-message">El Registro se ha realizado con éxito</p>
                <Link to='/login'>
                    <button className="btn btn-primary">
                        Iniciar Sesion 
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default RegisterConfirmation