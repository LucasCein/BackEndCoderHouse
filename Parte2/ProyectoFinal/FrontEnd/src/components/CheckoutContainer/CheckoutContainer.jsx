import { useContext, useState } from "react";
import { cartContext } from "../ContextCart/ContextCart";
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import CartList from "../CartList/CartList";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
const CheckoutContainer = () => {
    const { cartList, handleRemoveItem, totalPrice, emptyCart, setCartList } = useContext(cartContext)
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const data = {
        name: '',
        lastname: '',
        phone: '',
        email: '',
        remail: '',
        address: ''
    }
    const [dataForm, setDataForm] = useState(data)
    const { cartID } = useContext(cartContext)

    function generateUniqueCode() {
        return Math.random().toString(36).substring(2, 11).toUpperCase();
    }
    
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        if (isValidEmail(dataForm.email) && dataForm.email === dataForm.remail && dataForm.name !== '' && dataForm.lastname !== '' && dataForm.email !== '' && dataForm.address !== '' && dataForm.phone !== '') {
            try {
                const response = await fetch(`http://localhost:8080/api/carts/${cartID}/purchase`, {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                const result = await response.json();
    
                if (result.successfulProducts.length > 0) {
                    alert('Compra realizada con éxito');
                    console.log('succprods',result.successfulProducts);
                    // Crear el ticket en el backend
                    const ticketResponse = await fetch(`http://localhost:8080/api/tickets`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            code: generateUniqueCode(),
                            purchase_datetime: new Date(),
                            amount: totalPrice,
                            purchaser: result.user._id,
                            products: result.successfulProducts.map(product => ({
                                product: product.product._id,
                                quantity: product.quantity
                            }))
                        })
                    });
    
                    const ticketResult = await ticketResponse.json();
                    console.log('Ticket creado:', ticketResult);
    
                    // Vaciar el carrito en el frontend y eliminar el carrito en el backend si es necesario
                    if (result.failedProducts.length === 0) {
                        setCartList([]); // Vacía el carrito en el frontend
                        await fetch(`http://localhost:8080/api/carts/${cartID}`, {
                            method: 'DELETE',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                    } else {
                        // Si algunos productos no se compraron, actualiza el cartList con los productos restantes
                        setCartList(result.failedProducts);
                    }
    
                    navigate('/init');  
    
                } else {
                    alert('No se pudo realizar la compra: ' + result.message);
                }
            } catch (error) {
                console.error('Error al finalizar la compra:', error);
                alert('Hubo un problema al finalizar la compra.');
            }
        } else {
            setError('El email no es válido, hay algún campo vacío o los emails no coinciden');
        }
    };
    
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    const handleOnChange = (evt) => {
        setDataForm({
            ...dataForm,
            [evt.target.name]: evt.target.value
        })
    }


    return (
        <div style={{ display: 'flex' }}>
            <CheckoutForm dataForm={dataForm} handleFormSubmit={handleFormSubmit} handleOnChange={handleOnChange} error={error} />
            <div style={{ width: '50%', backgroundColor: 'lightgray', padding: '10px' }}>
                <h2>Resumen de la compra</h2>
                <CartList cartList={cartList} handleRemoveItem={handleRemoveItem} totalPrice={totalPrice} emptyCart={emptyCart} />
            </div>

        </div>
    );


}

export default CheckoutContainer
