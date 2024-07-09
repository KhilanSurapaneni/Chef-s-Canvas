import React from 'react';

const ErrorMessage = ({ message }) => {
    return message ? <div className="text-red-600">{message}</div> : null;
};

export default ErrorMessage;
