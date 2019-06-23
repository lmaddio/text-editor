import React from 'react';

const Button = ({ label, children, ...restProps }) => (
  <button
    type="button"
    {...restProps}
  >
    { children }
  </button>
);

export default Button;
