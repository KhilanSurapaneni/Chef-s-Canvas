import React, { createContext, useState } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState('');

    const updateSearchResults = (query, results) => {
        setQuery(query);
        setResults(results);
    };

    return (
        <SearchContext.Provider value={{ query, results, updateSearchResults }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchProvider, SearchContext };
