import PropTypes from 'prop-types';
import { Grid, Box, TextField, MenuItem } from '@mui/material';
import TripCard from './TripCard';
import { useState } from 'react';

function TripList({ trips }) {
    const [filterGroup, setFilterGroup] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTrips = trips.filter((trip) => {
        const matchesGroup =
            filterGroup === 'all' || trip.group === filterGroup;
        const matchesSearch = (trip.customName || trip.city)
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesGroup && matchesSearch;
    });

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    label="Search trips"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flexGrow: 1 }}
                />
                <TextField
                    select
                    label="Filter by group"
                    value={filterGroup}
                    onChange={(e) => setFilterGroup(e.target.value)}
                    size="small"
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="all">All Groups</MenuItem>
                    <MenuItem value="solo">Solo</MenuItem>
                    <MenuItem value="family">Family</MenuItem>
                    <MenuItem value="friends">Friends</MenuItem>
                    <MenuItem value="couples">Couples</MenuItem>
                </TextField>
            </Box>

            <Grid container spacing={2}>
                {filteredTrips.map((trip) => (
                    <Grid item xs={12} sm={6} md={4} key={trip.id}>
                        <TripCard trip={trip} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

TripList.propTypes = {
    trips: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            city: PropTypes.string.isRequired,
            customName: PropTypes.string,
            dateCreated: PropTypes.string.isRequired,
            timeOfDay: PropTypes.arrayOf(PropTypes.string).isRequired,
            group: PropTypes.string.isRequired,
            tag: PropTypes.string,
            itinerary: PropTypes.object.isRequired,
        })
    ).isRequired,
};

export default TripList;
