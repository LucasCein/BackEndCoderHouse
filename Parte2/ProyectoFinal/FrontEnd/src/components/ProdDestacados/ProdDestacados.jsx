import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Item from '../Item/Item'


const ProdDestacados = ({ productosDest }) => {
    
    return (
        <div>
            <Row xs={1} md={3} className="ms-2 me-2 mt-2">

                {
                    productosDest.slice(0, 3).map(({ _id, title, price, thumbnail, category }) =>
                        <Col key={_id} className="mb-2">
                            <Item key={_id} _id={_id} price={price} thumbnail={thumbnail} category={category} title={title} />
                        </Col>
                    )

                }
            </Row>
        </div>
    )
}

export default ProdDestacados
