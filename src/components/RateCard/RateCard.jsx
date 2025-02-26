import PropTypes from 'prop-types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import RingedIcon from '../RingedIcon';
import './RateCard.css';

function RateCard({ title, description, price, theme, url, onCardClick }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const numImages = url.length;

    const onLike = () => onCardClick(title, true);
    const onDislike = () => onCardClick(title, false);

    const priceTag = price > 0 ? `£${price}` : 'FREE';

    const handleImageError = () => {
        if (currentImageIndex < url.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    return (
        <div className="rate-card">
            <img
                src={
                    currentImageIndex < numImages ? url[currentImageIndex] : '#'
                }
                onError={handleImageError}
                alt={title}
                className="rate-card-image"
            />
            <div className="rate-card-content">
                <h3 className="rate-card-title">{title}</h3>
                <div className="tags">
                    <p className="tag">{priceTag}</p>
                    <p className="tag">{theme}</p>
                </div>
                <p className="rate-card-description">{description}</p>
            </div>
            <div className="rate-card-icons">
                <RingedIcon Icon={CloseIcon} color="red" onClick={onDislike} />
                <RingedIcon
                    Icon={FavoriteIcon}
                    color="green"
                    onClick={onLike}
                />
            </div>
        </div>
    );
}

RateCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    theme: PropTypes.string.isRequired,
    onCardClick: PropTypes.func.isRequired,
};

export default RateCard;
