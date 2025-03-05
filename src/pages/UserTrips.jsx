import { Box, Typography, Button } from '@mui/material';
import TripList from '../components/TripList/TripList';
//import { mockTrips } from '../assets/mockTrips';
import '../styles/UserTrips.css';
import useApi from '../hooks/FetchApi';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { getItinerary } from '../hooks/LocalStorage';

function UserTrips() {
    const { getData, loading, error } = useApi('trips', false);
    const { postData } = useApi('save', false);
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getData();
                if (response.trips) {
                    setTrips(response.trips);
                } else {
                    console.log('Trips not found!');
                }
            } catch (error) {
                console.error('Failed to fetch trips:', error);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <Loading text="Fetching activities" />;
    }

    const onSave = async () => {
        const itinerary = getItinerary();
        await postData({ itinerary: itinerary });
    };

    return (
        <div className="content-wrapper">
            <div className="trips-content">
                <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Your Trips
                    </Typography>
                    <Button
                        onClick={onSave}
                        variant="contained"
                        color="primary"
                    >
                        Save trip
                    </Button>
                    {trips.length > 0 ? (
                        <TripList trips={trips} />
                    ) : (
                        <p>No trips found!</p>
                    )}
                </Box>
                {error && (
                    <p style={{ color: 'red' }}>Error: {error.message}</p>
                )}
            </div>
        </div>
    );
}

export default UserTrips;
