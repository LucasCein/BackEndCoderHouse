import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './OrderConfirmation.css'
import { Link, useLocation } from 'react-router-dom'

const OrderConfirmation = () => {
    const location=useLocation()
    const orderId = location.state.id
    return (
        <div className="confirmation-overlay">
            <div className="confirmation-box">
                <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
                <p className="success-message">La compra se ha realizado con éxito</p>
                <p className="success-message">Id de la compra: "{orderId}"</p>
                <Link to='/'>
                    <button className="btn btn-primary">
                        Volver al inicio
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default OrderConfirmation