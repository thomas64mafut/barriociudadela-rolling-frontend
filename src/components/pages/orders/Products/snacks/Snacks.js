import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Spinner } from 'react-bootstrap'

import SnacksCard from './SnacksCard';


const Snacks = () => {
const [snacks, setSnacks] = useState();


useEffect(() => {
    handleGetSnacks();        
}, [])

const handleGetSnacks = async() => {
    try {
        const {data} = await axios('http://localhost:4000/api/products/snack')
        setSnacks(data.Snacks)
    } catch (error) {
        Alert('Snack not found')
    }
}


  return (
    <div>
        <h4 className='tittleSection'>Snacks</h4>
            <div className='cards_container'>
                {
                    snacks?.length ? (
                        snacks?.map((snack) => { 
                            return(
                                 <SnacksCard
                                    snack = {snack}
                                 />    
                        )})
                        ) : (
                            <Spinner className='spinnerLoading' animation="border" variant="success" />      
                            )
                        }
            </div>
    </div>
  )
}

export default Snacks