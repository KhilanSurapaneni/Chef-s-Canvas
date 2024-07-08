import React from 'react';

const FormTextArea = ({ label, id, name, value, onChange, required }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-lg font-medium mb-2">{label}</label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="border border-gray-300 rounded px-4 py-2 w-full"
    ></textarea>
  </div>
);

export default FormTextArea;



