import React from 'react';

const FormSelect = ({ label, id, name, value, onChange, options }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-lg font-medium mb-2">{label}</label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded px-4 py-2 w-full"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default FormSelect;
