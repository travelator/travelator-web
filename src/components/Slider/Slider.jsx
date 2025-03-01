import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    const labels = [
        'First time to the city',
        'Exploring popular spots',
        'Off-the-beaten-path',
        'Hidden gems',
        'Living like a local',
    ];
    return labels[value / 25];
}

export default function UniqueTripSlider() {
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                aria-label="Uniqueness of Trip"
                defaultValue={0}
                getAriaValueText={valuetext}
                valueLabelDisplay="on"
                step={25}
                marks
                min={0}
                max={100}
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
