import { Box, Typography } from '@mui/material';
import TripList from '../components/TripList/TripList';
import { mockTrips } from '../assets/mockTrips';
import '../styles/UserTrips.css';


function UserTrips() {
    return (
        <div className="content-wrapper">
            <div className="trips-content">
                <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Your Trips
                    </Typography>
                    <TripList trips={mockTrips} />
                </Box>
            </div>
        </div>
    );
}

export default UserTrips; 