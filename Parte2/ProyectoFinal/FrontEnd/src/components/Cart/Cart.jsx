import { Modal, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { cartContext } from '../ContextCart/ContextCart';
import { Link } from 'react-router-dom';
import CartList from '../CartList/CartList';
const Cart = ({ onClose }) => {
    const { cartList, handleRemoveItem, totalPrice } = useContext(cartContext)
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Carrito de compras</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {cartList.length === 0 ? (
                    <p>Tu carrito de compras está vacío</p>
                ) : (
                    <CartList cartList={cartList} handleRemoveItem={handleRemoveItem} totalPrice={totalPrice}/>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Seguir comprando</Button>
                <Link to={'/checkout'} >
                    <Button variant="primary" disabled={cartList.length === 0} onClick={onClose}>Comprar</Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
}

export default Cart




