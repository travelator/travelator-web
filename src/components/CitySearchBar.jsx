import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import cities from "../assets/cities";

export default function CitySearchBar({ selectedCity, setSelectedCity }) {
  return (
    <Autocomplete
      id="city-search-bar"
      sx={{ width: 300 }}
      options={cities}
      autoHighlight
      getOptionLabel={(option) => `${option.city} (${option.country})`}
      value={selectedCity}
      onChange={(event, newValue) => {
        setSelectedCity(newValue);
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
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
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a city"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: "off", // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
  );
}

CitySearchBar.propTypes = {
  selectedCity: PropTypes.object,
  setSelectedCity: PropTypes.func.isRequired,
};
