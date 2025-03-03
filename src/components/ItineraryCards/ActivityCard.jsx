import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useState } from 'react';
import './ActivityCard.css';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function ActivityCard({
    title,
    start,
    end,
    description,
    price,
    theme,
    id,
    handleSwapClick,
    link,
    url = [],
}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const numImages = url.length;
    const priceTag = price > 0 ? `£${price}` : 'FREE';

    const handleImageError = () => {
        if (currentImageIndex < url.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    return (
        <div className="activity-card">
            <img
                src={
                    currentImageIndex < numImages ? url[currentImageIndex] : '#'
                }
                onError={handleImageError}
                alt={title}
                className="activity-card-image"
            />
            <div className="activity-card-content">
                <div className="activity-card-header">
                    <h3 className="activity-card-title">{title}</h3>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Booking link"
                        >
                            <OpenInNewIcon />
                        </a>
                    )}
                </div>
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
                <div className="activity-card-buttons">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleSwapClick(id)}
                        startIcon={<SwapHorizIcon />}
                    >
                        Swap
                    </Button>
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
    url: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    handleSwapClick: PropTypes.func.isRequired,
};

ActivityCard.defaultProps = {
    url: [],
};

export default ActivityCard;
