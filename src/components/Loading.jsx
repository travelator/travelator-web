import PropTypes from 'prop-types';
import './Loading.css';

function Loading({ text }) {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">{text}</p>
        </div>
    );
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Loading;
