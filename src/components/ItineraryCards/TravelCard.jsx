import PropTypes from 'prop-types';
import './TravelCard_simple.css';
import {
    DirectionsSubway,
    DirectionsWalk,
    DirectionsBus,
    LocalTaxi,
    DirectionsTransitFilled,
    DirectionsBoat,
} from '@mui/icons-material';

const transportIcons = {
    Tube: <DirectionsSubway />,
    Walking: <DirectionsWalk />,
    Bus: <DirectionsBus />,
    Taxi: <LocalTaxi />,
    Train: <DirectionsTransitFilled />,
    Ferry: <DirectionsBoat />,
};

function TravelCard({ start, end, title, description, price, theme }) {
    const IconComponent = transportIcons[theme] || null;

    return (
        <div className="travel-card">
            <div className="travel-card-content">
                <h3 className="travel-card-title">{title}</h3>
                <div className="travel-subheader">
                    {IconComponent && (
                        <span className="theme-icon">{IconComponent}</span>
                    )}
                    <span>{`Mode: ${theme}`}</span>
                    <div className="travel-card-time">
                        <span>{start}</span> - <span>{end}</span>
                    </div>
                    <p className="travel-card-price">Price: ${price}</p>
                </div>
                <p className="travel-card-description">{description}</p>
            </div>
        </div>
    );
}

TravelCard.propTypes = {
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    theme: PropTypes.string.isRequired,
};

export default TravelCard;
