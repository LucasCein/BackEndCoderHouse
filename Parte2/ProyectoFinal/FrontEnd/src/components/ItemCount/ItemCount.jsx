import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import useCounter from '../../hooks/useCounter'
import { Link } from 'react-router-dom'
const ItemCount = ({clickAddToCart}) => {

    const { counter, sumCount, resCount } = useCounter()
    
    
    return (
        <div>
            <section className="d-flex">

                <button className="btn btn-primary px-3 me-2"
                    onClick={resCount}
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>

                <div className="form-outline">

                    <input id="form1" min="0" name="quantity" value={counter} type="number" className="form-control" readOnly={true} />
                </div>

                <button className="btn btn-primary px-3 ms-2"
                    onClick={sumCount}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>

            </section>
            <div className="action mt-5">
                <Link to='/productos'>
                    <button className="add-to-cart btn btn-default" type="button" onClick={() =>{clickAddToCart(counter)} } >Añadir al Carrito</button>
                </Link >
                <Link to='/productos'>
                    <button className="like btn btn-default ms-5" type="button">Volver</button>
                </Link>
            </div>
        </div>
    )
}

export default ItemCount