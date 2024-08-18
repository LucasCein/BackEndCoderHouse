import { createContext, useContext, useEffect, useState } from "react"
import { ToastContainer, toast, useToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const cartContext = createContext([])
// export const useCartContext = () => {
//     useContext(cartContext)
// }
export const ProviderCartContext = ({ children }) => {

    const [cartID, setCartID] = useState('')
    const [cartList, setCartList] = useState([])

    useEffect(() => {
        // Fetch para obtener el carrito del usuario actual
        fetch('http://localhost:8080/api/auth/user', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.cart) {
                    setCartID(data.cart);
                    // Después de obtener el cartID, realiza otro fetch para obtener los productos
                    fetch(`http://localhost:8080/api/carts/${data.cart}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(cartData => {
                            setCartList(cartData.products);
                        })
                        .catch(error => console.error('Error al obtener los productos del carrito:', error));
                }
            })
            .catch(error => console.error('Error al verificar el carrito:', error));
    }, []);

    console.log(cartList)
    const showToastMessage = () => {
        toast.success('Se ha agregado al carrito', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    const addToCart = (product, quantity) => {
        const products = [
            { product: product, quantity: quantity }
        ];
        console.log(products);

        if (cartID) {
            fetch('http://localhost:8080/api/carts/' + cartID + '/product/' + product, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setCartList(Array.isArray(data.products) ? data.products : [])
                    showToastMessage();
                })
                .catch(error => console.error('Error:', error));
        } else {
            fetch('http://localhost:8080/api/carts', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ products })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('data', data);
                    setCartID(data._id);
                    setCartList(Array.isArray(data.products) ? data.products : [])
                    showToastMessage();
                })
                .catch(error => console.error('Error:', error));
        }
    };


    const handleRemoveItem = (itemId) => {
        fetch(`http://localhost:8080/api/carts/${cartID}/product/${itemId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    const updatedCartItems = cartList.filter((item) => item.product._id !== itemId);
                    setCartList(updatedCartItems);
                } else {
                    console.error('Error al eliminar el producto del carrito:', response.statusText);
                }
            })
            .catch(error => console.error('Error:', error));
    };


    const totalPrice = Array.isArray(cartList) ? parseFloat(cartList.reduce((total, item) => {
        const productPrice = parseFloat(item.product.price);
        return total + (productPrice * item.quantity);
    }, 0).toFixed(2)) : 0;
    

    const cartItemsCount = Array.isArray(cartList) ? cartList.reduce((totalQuantity, item) => {
        return totalQuantity + item.quantity;
    }, 0) : 0;

    console.log('cartList',cartList)
    

    return (
        <cartContext.Provider value={{ cartList, addToCart, handleRemoveItem, totalPrice, cartItemsCount, cartID, setCartList }}>
            {children}
            <ToastContainer />
        </cartContext.Provider>
    )
}