import { useEffect, useState } from "react"
import { collection, getDocs, getFirestore } from "firebase/firestore"
import './InitContainer.css'
import { Link } from "react-router-dom"
import CustomSpinner from "../CustomSpinner/CustomSpinner"
import ProdDestacados from "../ProdDestacados/ProdDestacados"
const InitContainer = () => {
    const [productosDest, setProductosDest] = useState([])
    const [loading, setIsLoading] = useState(true)
    useEffect(() => {
        fetch('http://localhost:8080/api/products', {
            method: 'GET',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setProductosDest(data)
                setIsLoading(false)
            })
            .catch(error => console.error('Error:', error));

    }, [])
    console.log(productosDest)
    return (
        <section>

            {loading ? <CustomSpinner /> :
                <div>
                    <section className="cont">
                        <img src="https://helpsnowboards.com/wp-content/uploads/2023/01/01122020101549F3240007P88__DSC0086-copia-scaled.jpeg" alt="" className="img-fluid" />
                        <Link to={'/productos'}>
                            <button className="button">Comprar</button>
                        </Link>
                    </section>
                    <section className="text-center">

                        <h2 className="mt-3">Productos Destacados</h2>
                    </section>
                    <ProdDestacados productosDest={productosDest} />
                </div>
            }
        </section>

    )
}

export default InitContainer
