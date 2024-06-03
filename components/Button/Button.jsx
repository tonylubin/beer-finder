import React from 'react';
import styles from './Button.module.scss';

const Button = ({ handleSearch }) => {
  return (
    <button onClick={handleSearch}>
      Search
    </button>
  )
}

export default Button;