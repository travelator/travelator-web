import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Box,
    IconButton,
    TextField,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import useApi from '../../hooks/FetchApi';

function TripCard({ trip, updateTrips }) {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [customName, setCustomName] = useState(trip.custom_name || trip.city);
    const { deleteData } = useApi('trips', false);

    const handleViewTrip = () => {
        navigate(`/itinerary/${trip.city}`, {
            state: { itinerary: trip.itinerary, tripId: trip.trip_id },
        });
    };

    const handleDeleteClick = () => {
        deleteData(trip.trip_id);
        updateTrips();
    };

    const handleNameChange = (event) => {
        setCustomName(event.target.value);
    };

    const handleNameSubmit = (event) => {
        if (event.key === 'Enter') {
            setIsEditing(false);
            // Here you would typically update the name in your backend
        }
    };

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <Card sx={{ minWidth: 275, margin: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {isEditing ? (
                        <TextField
                            value={customName}
                            onChange={handleNameChange}
                            onKeyPress={handleNameSubmit}
                            onBlur={() => setIsEditing(false)}
                            autoFocus
                            fullWidth
                            size="small"
                            placeholder="Enter custom name"
                        />
                    ) : (
                        <>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                {customName}
                            </Typography>
                            <IconButton
                                onClick={handleDeleteClick}
                                size="small"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </>
                    )}
                </Box>

                <Typography color="text.secondary" gutterBottom>
                    {trip.date_created && `Created: ${trip.date_created}`}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    {trip.date_of_trip && `Trip date: ${trip.date_of_trip}`}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                        <AccessTimeIcon fontSize="small" />
                        {trip.timeOfDay.map((time) => (
                            <Chip
                                key={time}
                                label={capitalize(time)}
                                size="small"
                                variant="outlined"
                            />
                        ))}
                    </Box>
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                        <GroupIcon fontSize="small" />
                        <Chip
                            label={capitalize(trip.group)}
                            size="small"
                            variant="outlined"
                        />
                    </Box>
                </Box>

                <Button variant="contained" onClick={handleViewTrip} fullWidth>
                    View Trip
                </Button>
            </CardContent>
        </Card>
    );
}

TripCard.propTypes = {
    trip: PropTypes.shape({
        trip_id: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        custom_name: PropTypes.string,
        date_created: PropTypes.string.isRequired,
        date_of_trip: PropTypes.string.isRequired,
        timeOfDay: PropTypes.arrayOf(PropTypes.string).isRequired,
        group: PropTypes.string.isRequired,
        itinerary: PropTypes.object.isRequired,
    }).isRequired,
    updateTrips: PropTypes.func.isRequired,
};

export default TripCard;
