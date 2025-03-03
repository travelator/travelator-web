import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import createCustomPin from './CustomPin';

const MapPanner = ({ selectedItem }) => {
    const map = useMap();
    useEffect(() => {
        if (selectedItem && selectedItem.latitude && selectedItem.longitude) {
            // Pan the map to the selected item with a smooth animation
            map.flyTo([selectedItem.latitude, selectedItem.longitude], 15, {
                duration: 1.5,
            });
        }
    }, [selectedItem, map]);
    return null;
};

MapPanner.propTypes = {
    selectedItem: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        latitude: PropTypes.number,
        longitude: PropTypes.number,
    }),
};

const Map = ({ itinerary, selectedItem }) => {
    const [validItinerary, setValidItinerary] = useState([]);

    useEffect(() => {
        const filteredItinerary = itinerary.filter(
            (item) => item.latitude && item.longitude
        );
        setValidItinerary(filteredItinerary);
    }, [itinerary]);

    if (!itinerary || itinerary.length === 0) {
        return <p>No itinerary data available.</p>;
    }

    if (validItinerary.length === 0) {
        return <p>No valid itinerary data available.</p>;
    }

    const firstItem = validItinerary[0];
    const center = [firstItem.latitude, firstItem.longitude];

    return (
        <MapContainer
            center={center}
            zoom={13}
            className="map-container"
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* Pan to the selected marker */}
            <MapPanner selectedItem={selectedItem} />
            {validItinerary.map((item) => (
                <Marker
                    key={item.id}
                    position={[item.latitude, item.longitude]}
                    icon={
                        selectedItem && item.id === selectedItem.id
                            ? createCustomPin(true)
                            : createCustomPin(false)
                    }
                >
                    <Popup>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                        <p>
                            <strong>Price:</strong> £{item.price}
                        </p>
                        <p>
                            <strong>Duration:</strong> {item.duration} minutes
                        </p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

Map.propTypes = {
    itinerary: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            price: PropTypes.number,
            duration: PropTypes.number,
        })
    ).isRequired,
    selectedItem: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        latitude: PropTypes.number,
        longitude: PropTypes.number,
    }),
};

export default Map;
