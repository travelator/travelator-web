import PropTypes from 'prop-types';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import cities from '../assets/cities';

export default function CitySearchBar({ selectedCity, setSelectedCity }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event, newInputValue) => {
        console.log('Raw Input:', newInputValue);

        // Allow only letters, spaces, hyphens, apostrophes, and periods
        const validInput = newInputValue.replace(/[^a-zA-Z\s'-.]/g, '');
        console.log('Filtered Input:', validInput);

        setInputValue(validInput);

        // Update selectedCity state immediately when user types
        if (validInput !== '') {
            const customCity = {
                city: validInput,
                country: 'Custom Location',
                code: 'XX',
            };
            setSelectedCity(customCity);
        } else {
            setSelectedCity(null);
        }
    };

    const handleChange = (event, newValue) => {
        // If newValue is null (cleared input)
        if (newValue === null) {
            setSelectedCity(null);
        }
        // If newValue is an object (selected from list)
        else if (typeof newValue === 'object') {
            setSelectedCity(newValue);
        }
        // If newValue is a string (custom input)
        else if (typeof newValue === 'string' && newValue.trim() !== '') {
            // Allow only letters, spaces, hyphens, apostrophes, and periods
            const validInput = newValue.replace(/[^a-zA-Z\s'-.]/g, '');
            // Create a custom city object with the same structure as cities from the list
            const customCity = {
                city: validInput, // This is what will be extracted as selectedCity
                country: 'Custom Location',
                code: 'XX',
            };
            setSelectedCity(customCity);
        }
    };

    return (
        <Box>
            <Autocomplete
                id="city-search-bar"
                sx={{ width: 300 }}
                options={cities}
                autoHighlight
                freeSolo
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.country === 'Custom Location') {
                        return option.city;
                    }
                    // 3) Otherwise (a city from the list)
                    return `${option.city} (${option.country})`;
                }}
                value={selectedCity}
                onChange={handleChange}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                renderOption={(props, option) => (
                    <Box
                        component="li"
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...props}
                        key={`${option.city}-${option.country}`}
                    >
                        <img
                            loading="lazy"
                            width="20"
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            alt=""
                        />
                        {option.city} ({option.country})
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search for a city"
                        InputProps={{
                            ...params.InputProps,
                            autoComplete: 'new-password', // disable autocomplete
                        }}
                    />
                )}
            />
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Select a city or type your own.
            </Typography>
        </Box>
    );
}

CitySearchBar.propTypes = {
    selectedCity: PropTypes.object,
    setSelectedCity: PropTypes.func.isRequired,
};
