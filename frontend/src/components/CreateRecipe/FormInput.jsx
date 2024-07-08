import React from 'react';

const FormInput = ({ label, id, name, type, value, onChange, required, placeholder }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-lg font-medium mb-2">{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="border border-gray-300 rounded px-4 py-2 w-full"
    />
  </div>
);

export default FormInput;
