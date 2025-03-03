import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateRangeComponent.css';
import PropTypes from 'prop-types';
import { CalendarTodayOutlined } from '@mui/icons-material';

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const isFutureDate = (date) => {
        const today = new Date();
        const normalizedToday = new Date(today.setHours(0, 0, 0, 0));
        return date >= normalizedToday;
    };

    return (
        <>
            <label htmlFor="date-picker-input" className="date-label">
                Select date (optional)
            </label>
            <div className="mui-style-date-picker">
                <DatePicker
                    id="date-picker-input"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MM/dd/yyyy"
                    className="custom-date-picker"
                    popperPlacement="bottom"
                    showPopperArrow={false}
                    shouldCloseOnSelect={true}
                    filterDate={isFutureDate}
                />
                <CalendarTodayOutlined className="calendar-icon" />
            </div>
        </>
    );
};

CustomDatePicker.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    setSelectedDate: PropTypes.func.isRequired,
};

export default CustomDatePicker;
