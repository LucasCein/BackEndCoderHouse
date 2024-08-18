import { useContext, useState } from "react";
import Cart from "../Cart/Cart";
import { cartContext } from "../ContextCart/ContextCart";

export const CartWidget = () => {
  const [showCartModal, setShowCartModal] = useState(false);
  const { cartItemsCount } = useContext(cartContext)
    const handleCartModalClose = () => {
      setShowCartModal(false);
    }
  return (
    <div>
        <button className="btn btn-dark" onClick={() => setShowCartModal(true)}><img src="https://img.icons8.com/emoji/25/null/shopping-cart-emoji.png" alt="" />{cartItemsCount}</button>
        
        {showCartModal && <Cart onClose={handleCartModalClose} />}
        
    </div>
    
  )
}

