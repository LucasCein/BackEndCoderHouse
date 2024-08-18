import './detailItem.css'
import ItemCount from "../ItemCount/ItemCount"
import { cartContext } from "../ContextCart/ContextCart"
import { useContext } from "react"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DetailItem = ({product}) => {

    const { addToCart} = useContext(cartContext)
    const clickAddToCart = (quantity) => {
        addToCart(product._id, quantity)
        
    }
    
    return (
        <section>
            <div className="container">
                <div className="cardDetail">
                    <div className="container-fliud">
                        <div className="wrapper row">
                            <div className="preview col-md-6">

                                <div className="w-75">
                                    <img src={product.thumbnail} className="img-fluid" alt="" />

                                </div>

                            </div>
                            <div className="details col-md-6 ">
                                <h3 className="product-title">{product.title}</h3>
                                <h6 className="font-weight-bold">{product.category}</h6>

                                <p className="product-description mt-2">{product.description}</p>
                                <h4 className="price">Precio: <span>${product.price}</span></h4>
                                <p className="vote mb-5"><strong>91%</strong> de los compradores disfrutaron este producto! <strong>(87 votos)</strong></p>
                                {/* <h5 className="sizes mb-4">sizes: */}
                                    {/* <span className="size" data-toggle="tooltip" title="small">s</span> */}
                                    {/* <span className="size" data-toggle="tooltip" title="medium">m</span> */}
                                    {/* <span className="size" data-toggle="tooltip" title="large">l</span> */}
                                    {/* <span className="size" data-toggle="tooltip" title="xtra large">xl</span> */}
                                {/* </h5> */}
                                <ItemCount clickAddToCart={clickAddToCart} />
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DetailItem