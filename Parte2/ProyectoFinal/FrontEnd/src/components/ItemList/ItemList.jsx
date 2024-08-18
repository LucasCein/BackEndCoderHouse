import { Col, Container, Row } from "react-bootstrap"
import Item from "../Item/Item"

const ItemList = ({ productos }) => {
    productos.forEach((producto) => {
        console.log(producto._id);
      })
    return (
        <div className="mb-5">
            <Row xs={1} md={4} className="ms-2 me-2 mt-2">
            {
                productos.map(({_id, price, thumbnail, category, title}) => 
                    
                    <Col key={_id} className="mb-2">
                        <Item key={_id} _id={_id} price={price} thumbnail={thumbnail} category={category} title={title}   />
                    </Col>
                )
                
            }
            </Row>

        </div>
    )
}

export default ItemList