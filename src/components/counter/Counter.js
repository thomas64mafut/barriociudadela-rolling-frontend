import React from 'react'
import { Button } from 'react-bootstrap'
import './counter.css'
import Plus from '../../assets/icons/dark/Plus';
import Minus from '../../assets/icons/dark/Minus';

const Counter = ({ count, setCount }) => {

  return (
    <div>
      <Button
        variant="success"
        onClick={() => setCount(count - 1)}
        disabled={count === 1}
        className='btn-counter'
      >
        <Minus />
      </Button>
      <div className='count-shower'>{count}</div>
      <Button
        variant='success'
        onClick={() => setCount(count + 1)}
        disabled={count === 10}
        className='btn-counter'
      >
        <Plus />
      </Button>
    </div>
  )
}

export default Counter
