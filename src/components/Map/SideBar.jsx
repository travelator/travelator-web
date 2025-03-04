import PropTypes from 'prop-types';
import './SideBar.css';

const SideBar = ({ itinerary, onSelectItem, selectedItem, selectedRoute }) => {
    const getColor = (index) => {
        const colors = [
            'red',
            'blue',
            'green',
            'orange',
            'purple',
            'brown',
            'pink',
            'cyan',
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Itinerary</h2>
            {itinerary.map((item, index) => (
                <div
                    key={`item-${index}`}
                    className={`sidebar-item ${selectedItem === item ? 'selected' : ''}`}
                    style={{ borderLeft: `4px solid ${getColor(index)}` }}
                    onClick={() => onSelectItem(item)}
                >
                    {item.transport ? (
                        <div className="transport-item">
                            <span className="transport-icon">🚍</span>
                            <span>{item.transportMode}</span>
                        </div>
                    ) : (
                        <div className="location-title">{item.title}</div>
                    )}
                    <div className="time-slot">
                        {item.start} - {item.end}
                    </div>
                </div>
            ))}
            {selectedRoute && (
                <div className="selected-route-details">
                    <h3>Selected Route</h3>
                    <div>
                        <strong>Mode: </strong>
                        {selectedRoute.transportMode}
                    </div>
                    <div>
                        <strong>From: </strong>
                        {selectedRoute.start}
                    </div>
                    <div>
                        <strong>To: </strong>
                        {selectedRoute.end}
                    </div>
                </div>
            )}
        </div>
    );
};

SideBar.propTypes = {
    itinerary: PropTypes.array.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    selectedItem: PropTypes.object,
    selectedRoute: PropTypes.object,
};

export default SideBar;
