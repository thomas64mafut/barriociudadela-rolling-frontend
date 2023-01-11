import React from 'react'
import { Button } from 'react-bootstrap'
import './counter.css'

const Counter = ({count, setCount}) => {
    
  return (
    <div className='counter_Container'>
            <Button variant="success" onClick={() => setCount(count-1)} disabled={count===1} >{'<'}</Button>
            <div className='countShower'>{count}</div>
            <Button variant='success' onClick={() => setCount(count+1)} disabled={count===10}>{'>'}</Button>
        </div>  
    )
}

export default Counter
