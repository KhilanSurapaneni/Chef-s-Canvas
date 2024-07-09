import React from 'react';

const InputField = ({ id, label, type, value, onChange }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}:</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
    );
};

export default InputField;
