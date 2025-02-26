import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, Chip, Box, IconButton, TextField } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function TripCard({ trip }) {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [customName, setCustomName] = useState(trip.customName || trip.city);

    const handleViewTrip = () => {
        navigate(`/itinerary/${trip.city}`, {
            state: { itinerary: trip.itinerary }
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
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
                            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                                {customName}
                            </Typography>
                            <IconButton onClick={handleEditClick} size="small">
                                <EditIcon />
                            </IconButton>
                        </>
                    )}
                </Box>
                
                <Typography color="text.secondary" gutterBottom>
                    Created: {new Date(trip.dateCreated).toLocaleDateString()}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon fontSize="small" />
                        {trip.timeOfDay.map((time) => (
                            <Chip 
                                key={time} 
                                label={time} 
                                size="small" 
                                variant="outlined"
                            />
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <GroupIcon fontSize="small" />
                        <Chip label={trip.group} size="small" variant="outlined" />
                    </Box>
                </Box>

                <Button 
                    variant="contained" 
                    onClick={handleViewTrip}
                    fullWidth
                >
                    View Trip
                </Button>
            </CardContent>
        </Card>
    );
}

TripCard.propTypes = {
    trip: PropTypes.shape({
        id: PropTypes.number.isRequired,
        city: PropTypes.string.isRequired,
        customName: PropTypes.string,
        dateCreated: PropTypes.string.isRequired,
        timeOfDay: PropTypes.arrayOf(PropTypes.string).isRequired,
        group: PropTypes.string.isRequired,
        itinerary: PropTypes.object.isRequired
    }).isRequired
};

export default TripCard; 