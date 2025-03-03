import PropTypes from 'prop-types';
import CustomCarousel from '../../components/Carousel';
import ActivityCard from '../../components/ItineraryCards/ActivityCard';
import TravelCard from '../../components/ItineraryCards/TravelCard';

function ItineraryOverview({ itinerary, handleSwapClick }) {
    return (
        <div className="itinerary-main">
            <CustomCarousel deviceType={'desktop'}>
                {itinerary.map((i) =>
                    i.transport ? (
                        <TravelCard
                            start={i.start}
                            end={i.end}
                            title={i.title}
                            description={i.description}
                            price={i.price}
                            theme={i.transportMode}
                            key={i.id}
                        />
                    ) : (
                        <ActivityCard
                            start={i.start}
                            end={i.end}
                            title={i.title}
                            description={i.description}
                            price={i.price}
                            theme={i.theme}
                            url={i.image_link}
                            key={i.id}
                            handleSwapClick={handleSwapClick}
                            id={i.id}
                        />
                    )
                )}
            </CustomCarousel>
        </div>
    );
}

ItineraryOverview.propTypes = {
    itinerary: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            transport: PropTypes.bool.isRequired,
            start: PropTypes.string.isRequired,
            end: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            theme: PropTypes.string.isRequired,
            image: PropTypes.string,
        })
    ).isRequired,
    handleSwapClick: PropTypes.func.isRequired,
};

export default ItineraryOverview;
