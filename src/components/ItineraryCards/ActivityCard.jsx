import PropTypes from 'prop-types';
import './ActivityCard.css';

function ActivityCard({ title, start, end, description, price, theme, image }) {
    return (
        <div className="activity-card">
            {image && (
                <img src={image} alt={theme} className="activity-card-image" />
            )}
            <div className="activity-card-content">
                <h3 className="activity-card-title">{title}</h3>
                <div className="activity-card-time">
                    <span>{start}</span> - <span>{end}</span>
                </div>
                <div className="activity-card-details">
                    <p className="activity-card-description">{description}</p>
                    <p className="activity-card-theme">{theme}</p>
                    <p className="activity-card-price">£{price}</p>
                </div>
            </div>
        </div>
    );
}

ActivityCard.propTypes = {
    title: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    theme: PropTypes.string.isRequired,
    image: PropTypes.string,
};

export default ActivityCard;
