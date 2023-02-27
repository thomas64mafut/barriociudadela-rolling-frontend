import './loading.css';
import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className='spinner-container'>
      <Spinner /> 
    </div>
  );
};

export default Loading;