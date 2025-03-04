import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import TripList from '../components/TripList/TripList';
import useApi from '../hooks/FetchApi';
import '../styles/UserTrips.css';

function UserTrips() {
    const [trips, setTrips] = useState([]);
    const { getData, deleteTrip, error, loading } = useApi('trips');

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await getData();
                setTrips(response.trips);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };

        fetchTrips();
    }, [getData]);

    const handleDelete = async (tripId) => {
        try {
            await deleteTrip(tripId);
            setTrips(trips.filter((trip) => trip.trip_id !== tripId));
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    };

    return (
        <div className="content-wrapper">
            <div className="trips-content">
                <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Your Trips
                    </Typography>
                    {loading && <p>Loading trips...</p>}
                    {error && (
                        <p style={{ color: 'red' }}>Error: {error.message}</p>
                    )}
                    <TripList trips={trips} onDelete={handleDelete} />
                </Box>
            </div>
        </div>
    );
}

export default UserTrips;
