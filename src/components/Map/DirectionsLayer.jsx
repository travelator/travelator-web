// DirectionsLayer.jsx
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import Directions from './Directions';

const DirectionsLayer = ({ itinerary, setSelectedRoute, getColor }) => {
    const directions = useMemo(() => {
        return itinerary.map((item, index) => {
            if (
                item &&
                item.transport &&
                index > 0 &&
                index < itinerary.length - 1
            ) {
                const prevItem = itinerary[index - 1];
                const nextItem = itinerary[index + 1];

                if (
                    prevItem &&
                    nextItem &&
                    prevItem.latitude &&
                    prevItem.longitude &&
                    nextItem.latitude &&
                    nextItem.longitude
                ) {
                    return (
                        <Directions
                            key={`direction-${index}`}
                            origin={[prevItem.latitude, prevItem.longitude]}
                            destination={[
                                nextItem.latitude,
                                nextItem.longitude,
                            ]}
                            mode={item.transportMode || 'walking'}
                            color={getColor(index)} // Use getColor from props
                            onClick={() => setSelectedRoute(item)}
                        />
                    );
                }
            }
            return null;
        });
    }, [itinerary, setSelectedRoute, getColor]);

    return <>{directions}</>;
};

DirectionsLayer.propTypes = {
    itinerary: PropTypes.array.isRequired,
    setSelectedRoute: PropTypes.func.isRequired,
    getColor: PropTypes.func.isRequired, // Add getColor to propTypes
};

export default DirectionsLayer;
