import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import cities from "../assets/cities"

export default function CitySearchBar() {
  return (
    <Autocomplete
      id="city-search-bar"
      sx={{ width: 300 }}
      options={cities}
      autoHighlight
      getOptionLabel={(option) => `${option.city} (${option.country})`}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          //drop down box features
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
      //input box features
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