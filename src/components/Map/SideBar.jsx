import PropTypes from 'prop-types';
import './SideBar.css';

const SideBar = ({ itinerary, onSelectItem, selectedItem }) => {
    return (
        <div className="sidebar">
            <h3>Itinerary</h3>
            {itinerary.map((item) => (
                <div
                    key={item.id}
                    className={`sidebar-item ${
                        selectedItem && selectedItem.id === item.id
                            ? 'selected'
                            : ''
                    }`}
                    onClick={() => onSelectItem(item)}
                >
                    <strong>{item.title}</strong>
                    <p>
                        {item.start} - {item.end}
                    </p>
                </div>
            ))}
        </div>
    );
};

SideBar.propTypes = {
    itinerary: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            start: PropTypes.string,
            end: PropTypes.string,
        })
    ).isRequired,
    onSelectItem: PropTypes.func.isRequired,
    selectedItem: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
};

export default SideBar;
