import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const defaultIcon = new L.Icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg', // Replace with a valid URL for default pin
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
});

const Map = ({ itinerary }) => {
    const [validItinerary, setValidItinerary] = useState([]);

    useEffect(() => {
        console.log('Received itinerary:', itinerary);
        const filteredItinerary = itinerary.filter(
            (item) => item.latitude && item.longitude
        );
        setValidItinerary(filteredItinerary);
        console.log('Valid itinerary:', filteredItinerary);
    }, [itinerary]);

    if (!itinerary || itinerary.length === 0) {
        return <p>No itinerary data available.</p>;
    }

    if (validItinerary.length === 0) {
        return <p>No valid itinerary data available.</p>;
    }

    const firstItem = validItinerary[0]; // Focus on first item
    const center = [firstItem.latitude, firstItem.longitude];

    return (
        <MapContainer center={center} zoom={13} className="map-container">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {validItinerary.map((item) => (
                <Marker
                    key={item.id}
                    position={[item.latitude, item.longitude]}
                    icon={defaultIcon} // Use default icon for all markers
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
            id: PropTypes.string.isRequired,
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            price: PropTypes.number,
            duration: PropTypes.number,
        })
    ).isRequired,
};

export default Map;
