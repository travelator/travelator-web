import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import PropTypes from 'prop-types';

function valuetext(value) {
    const labels = [
        'First time to the city',
        'Exploring popular spots',
        'Off-the-beaten-path',
        'Hidden gems',
        'Living like a local',
    ];
    return labels[value];
}

export default function UniqueTripSlider({ value, onChange }) {
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                aria-label="Uniqueness of Trip"
                value={value}
                onChange={onChange}
                getAriaValueText={valuetext}
                valueLabelDisplay="on"
                step={1}
                marks
                min={0}
                max={4}
                valueLabelFormat={valuetext}
                sx={{
                    '& .MuiSlider-valueLabel': {
                        visibility: 'visible', // Ensures the label is always visible
                    },
                }}
            />
        </Box>
    );
}

UniqueTripSlider.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};
