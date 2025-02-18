import PropTypes from 'prop-types';
import { Favorite, Close } from '@mui/icons-material';
import RingedIcon from '../RingedIcon';
import './RateCard.css';

function RateCard({ title, description, price, theme, url, onCardClick }) {
    const onLike = () => onCardClick(title, true);
    const onDislike = () => onCardClick(title, false);

    const priceTag = price > 0 ? `£${price}` : 'FREE';

    return (
        <div className="rate-card">
            <img src={url} alt={title} className="rate-card-image" />
            <div className="rate-card-content">
                <h3 className="rate-card-title">{title}</h3>
                <div className="tags">
                    <p className="tag">{priceTag}</p>
                    <p className="tag">{theme}</p>
                </div>
                <p className="rate-card-description">{description}</p>
            </div>
            <div className="rate-card-icons">
                <RingedIcon Icon={Close} color="red" onClick={onDislike} />
                <RingedIcon Icon={Favorite} color="green" onClick={onLike} />
            </div>
        </div>
    );
}

RateCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    onCardClick: PropTypes.func.isRequired,
};

export default RateCard;
