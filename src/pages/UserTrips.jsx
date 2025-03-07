import { Box } from '@mui/material';
import TripList from '../components/TripList/TripList';
//import { mockTrips } from '../assets/mockTrips';
import '../styles/UserTrips.css';
import useApi from '../hooks/FetchApi';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

function UserTrips() {
    const { getData, loading, error } = useApi('trips', false);
    const [trips, setTrips] = useState([]);
    const [refreshCount, setRefreshCount] = useState(0);

    const triggerRefresh = () => {
        setRefreshCount(refreshCount + 1);
    };

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
    }, [refreshCount]);

    if (loading) {
        return <Loading text="Fetching activities" />;
    }

    return (
        <div className="content-wrapper">
            <div className="trips-page">
                <div className="header">
                    <h1>Your trips</h1>
                </div>
                <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
                    {trips.length > 0 ? (
                        <TripList
                            trips={trips}
                            triggerRefresh={triggerRefresh}
                        />
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
