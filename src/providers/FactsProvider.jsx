import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FactsContext = createContext();

export const FactsProvider = ({ children }) => {
    const [facts, setFacts] = useState([]);

    return (
        <FactsContext.Provider value={{ facts, setFacts }}>
            {children}
        </FactsContext.Provider>
    );
};

FactsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
