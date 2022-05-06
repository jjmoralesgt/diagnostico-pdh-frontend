import React from 'react';

const Button = (props) => {
  return (
    <button
      type={props.type || 'button'}      
      className={props.class}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
