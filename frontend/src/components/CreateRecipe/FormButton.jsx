import React from 'react';

const FormButton = ({ type, label, onClick, className }) => (
  <button type={type} onClick={onClick} className={className}>
    {label}
  </button>
);

export default FormButton;
