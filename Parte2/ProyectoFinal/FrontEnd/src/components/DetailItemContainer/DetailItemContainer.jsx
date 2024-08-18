import { useParams } from "react-router-dom"
import DetailItem from "../DetailItem/DetailItem"
import { useEffect, useState } from "react"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import CustomSpinner from "../CustomSpinner/CustomSpinner"

const DetailItemContainer = () => {
  const { idpd } = useParams()
  const [filterProd, setFilterProd] = useState()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {

    fetch('http://localhost:8080/api/products/' + idpd  , {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setFilterProd(data)
        setIsLoading(false)
      })
      .catch(error => console.error('Error:', error));

   

  }, [idpd])
  return (
    <div>
      {isLoading ?
        <CustomSpinner/>
        :
        <DetailItem product={filterProd} />
      }
    </div>
  )
}

export default DetailItemContainer