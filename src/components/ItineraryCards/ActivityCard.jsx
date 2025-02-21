import PropTypes from 'prop-types';
import './ActivityCard.css';

function ActivityCard({ title, start, end, description, price, theme, image }) {
    const priceTag = price > 0 ? `£${price}` : 'FREE';

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
                <div className="tags">
                    <p className="tag">{priceTag}</p>
                    <p className="tag">{theme}</p>
                </div>
                <div className="activity-card-details">
                    <p className="activity-card-description">{description}</p>
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
