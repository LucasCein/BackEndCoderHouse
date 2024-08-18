import { useEffect, useState } from "react"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import CustomSpinner from "../CustomSpinner/CustomSpinner"
export const ItemListContainer = () => {
  const [productos, setProductos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { category } = useParams()
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
        setProductos(data)
        setIsLoading(false)
      })
      .catch(error => console.error('Error:', error));
  }, [])


  return (
    <section >
      {isLoading ?
        <CustomSpinner />
        : < >
          <h2 className="text-center mt-3 mb-5">Nuestros productos</h2>
          <ItemList productos={productos} />
        </>
      }

    </section>


  )

}

