
const CartList = ({totalPrice,handleRemoveItem,cartList}) => {
    console.log('CARTLIST', cartList)
    return (
        
            <ul>
                {cartList.map((item) => (
                    <div key={item.product} className="d-flex align-items-center justify-content-between mb-3">
                        <img src={item.product.thumbnail} alt={item.product.title} width="100" height="100" className="mr-3" />
                        <div>
                            <h5>{item.product.title}</h5>
                            <p>Precio: ${item.product.price}</p>
                            <p>Cantidad: {item.quantity}</p>
                        </div>
                        <button className="btn btn-danger" onClick={() => handleRemoveItem(item.product._id)}>Eliminar</button>
                    </div>
                ))}
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                    <h4>Total: ${totalPrice}</h4>
                </div>
            </ul>
        
    )
}

export default CartList