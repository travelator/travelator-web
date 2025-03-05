import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import createCustomPin from './CustomPin';
import DirectionsLayer from './DirectionsLayer';

const getColor = (index) => {
    const colors = [
        'red',
        'blue',
        'green',
        'orange',
        'purple',
        'brown',
        'pink',
        'teal',
    ];
    return colors[index % colors.length]; // Rotate through colors
};

const MapPlanner = ({ selectedItem }) => {
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

MapPlanner.propTypes = {
    selectedItem: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }),
};

const Map = ({ itinerary, selectedItem, setSelectedRoute }) => {
    const [validItinerary, setValidItinerary] = useState([]);

    useEffect(() => {
        // Filter out items without latitude/longitude and those marked as transport
        if (itinerary && itinerary.length > 0) {
            setValidItinerary(
                itinerary.filter(
                    (item) =>
                        item &&
                        item.latitude &&
                        item.longitude &&
                        !item.transport
                )
            );
        }
    }, [itinerary]);

    if (!itinerary || itinerary.length === 0 || validItinerary.length === 0) {
        return <div>No itinerary data available.</div>;
    }

    const firstItem = validItinerary[0];
    const center = [firstItem.latitude, firstItem.longitude];

    return (
        <div data-testid="map-container">
            {' '}
            {/* Add this wrapper div */}
            <MapContainer
                center={center}
                zoom={13}
                className="map-container"
                style={{ height: '100vh', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* Pan to the selected marker */}
                {selectedItem && <MapPlanner selectedItem={selectedItem} />}
                {validItinerary.map((item, index) => (
                    <Marker
                        key={`marker-${index}`}
                        position={[item.latitude, item.longitude]}
                        icon={createCustomPin(getColor(index))}
                    >
                        <Popup>
                            <strong>{item.title}</strong>
                            <p>{item.description}</p>
                            <p>
                                <strong>Price:</strong> £{item.price}
                            </p>
                            <p>
                                <strong>Duration:</strong> {item.duration}{' '}
                                minutes
                            </p>
                        </Popup>
                    </Marker>
                ))}
                <DirectionsLayer
                    itinerary={itinerary}
                    setSelectedRoute={setSelectedRoute}
                    getColor={getColor}
                />
            </MapContainer>
        </div>
    );
};

Map.propTypes = {
    itinerary: PropTypes.arrayOf(
        PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            transport: PropTypes.bool,
            title: PropTypes.string,
            description: PropTypes.string,
            price: PropTypes.number,
            duration: PropTypes.number,
            transportMode: PropTypes.string,
            start: PropTypes.string,
            end: PropTypes.string,
        })
    ).isRequired,
    selectedItem: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }),
    setSelectedRoute: PropTypes.func.isRequired,
};

export default Map;
