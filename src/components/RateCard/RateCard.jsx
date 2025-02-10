import PropTypes from 'prop-types';
import { Favorite, Close } from '@mui/icons-material';
import RingedIcon from '../RingedIcon';
import './RateCard.css';

function RateCard({ title, description, url }) {
  return (
    <div className="rate-card">
      <img src={url} alt={title} className="rate-card-image" />
      <div className="rate-card-content">
        <h3 className="rate-card-title">{title}</h3>
        <p className="rate-card-description">{description}</p>
      </div>
      <div className="rate-card-icons">
        <RingedIcon 
          Icon={Close}
          color='red'
        />
        <RingedIcon 
          Icon={Favorite}
          color='green'
        />
      </div>
    </div>
  );
}

RateCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default RateCard