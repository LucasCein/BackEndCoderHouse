
//max es el stock del product

import { useState } from "react"

//le puse un valor default porque todavia no tengo la database para traer el stock del prod
const useCounter = (max=10) => {
    const [counter,setCounter]=useState(1)
    
    let sumCount=()=>{
        if(counter<max){
            setCounter(counter+1) 
        } 
    }
    let resCount=()=>{
        if(counter>1){
            setCounter(counter-1)
        }
    }
    

  return {counter,sumCount,resCount}
}

export default useCounter