import './counter.css';
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

import { Button } from 'react-bootstrap';

import Plus from '../../assets/icons/Plus';
import Minus from '../../assets/icons/Minus';

const Counter = ({ count, setCount }) => {
  const { darkMode } = useContext(ThemeContext);
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
      <div className={darkMode ? 'count-shower-dark' : 'count-shower'}>{count}</div>
      <Button
        variant='success'
        onClick={() => setCount(count + 1)}
        disabled={count === 10}
        className='btn-counter'
      >
        <Plus />
      </Button>
    </div>
  );
};

export default Counter;
