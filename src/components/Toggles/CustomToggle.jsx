import * as React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import '../../styles/Home.css'; 

function CustomToggle({ options, multiple = false, selected, setSelected }) {
  const handleChange = (event, newSelection) => {
    if (multiple) {
      setSelected(newSelection || []); 
    } else {
      setSelected(newSelection === selected ? null : newSelection);
    }
  };

  return (
    <ToggleButtonGroup
      value={selected}
      exclusive={!multiple}
      onChange={handleChange}
      aria-label="custom toggle"
      className="custom-toggle-group"
    >
      {options.map(({ value, label }) => (
        <ToggleButton key={value} value={value} aria-label={label} className="custom-toggle-button">
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

CustomToggle.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  multiple: PropTypes.bool,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default CustomToggle;
