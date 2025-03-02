import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateRangeComponent.css';
import PropTypes from 'prop-types';

const DateRangeComponent = ({ value = null, onChange }) => {
    const [selectedDate, setSelectedDate] = useState(value);
    const [isOpen, setIsOpen] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onChange(date);
        setIsOpen(false);
    };

    return (
        <div className="date-range-container">
            {/* Clickable Input */}
            <div className="date-input-container">
                <div className="date-box" onClick={() => setIsOpen(true)}>
                    <label className="date-label" htmlFor="date-input">
                        Select Date
                    </label>
                    <input
                        id="date-input"
                        type="text"
                        className="date-input"
                        value={
                            selectedDate
                                ? selectedDate.toLocaleDateString()
                                : ''
                        }
                        readOnly
                    />
                </div>
            </div>

            {/* Calendar appears only when isOpen is true */}
            {isOpen && (
                <div className="calendar-popup">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                        minDate={new Date()}
                    />
                </div>
            )}
        </div>
    );
};

DateRangeComponent.propTypes = {
    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
};

export default DateRangeComponent;
