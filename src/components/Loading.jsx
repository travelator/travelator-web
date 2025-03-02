import PropTypes from 'prop-types';
import { FactsContext } from '../providers/FactsProvider';
import { useContext, useEffect, useState } from 'react';
import './Loading.css';

function Loading({ text, factId }) {
    const { facts } = useContext(FactsContext);
    const [showFacts, setShowFacts] = useState(false);

    const factIdx = factId ? (factId < facts.length ? factId : 0) : 0;

    useEffect(() => {
        if (facts && facts.length > 0) {
            setShowFacts(true);
        }
    }, [facts]);

    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">{text}</p>
            {facts && facts.length > 0 && (
                <div
                    className={`facts-container ${showFacts ? 'visible' : ''}`}
                >
                    <h3>Did you know?</h3>
                    <p className="fact">{facts[factIdx]}</p>
                </div>
            )}
        </div>
    );
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    factId: PropTypes.number,
};

export default Loading;
