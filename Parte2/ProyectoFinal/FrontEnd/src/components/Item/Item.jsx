import { Link } from "react-router-dom"

const Item = ({ _id, title, price, thumbnail, category }) => {
    return (
        <div key={_id} className="card h-100">
            <img 
                src={thumbnail} 
                className="card-img-top img-thumbnail" 
                alt="imagen-card" 
                style={{ objectFit: 'cover', height: '300px' }} // Estilos en línea
            />
            <div className="card-body">
                <h6>{title}</h6>
                <label>Precio: {price}</label>
                <br />
                <label>Categoria: {category}</label>
            </div>
            <div className="card-footer text-center">
                <Link to={`/detail/${_id}`}>
                    <button className="btn btn-outline-dark">Detalle</button>
                </Link>
            </div>
        </div>
    )
}


export default Item