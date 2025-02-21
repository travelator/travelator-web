import useApi from '../hooks/FetchApi';
import { useParams } from 'react-router-dom';
import { preset_itinerary } from '../assets/itinerary';
import { useState } from 'react';
import ItineraryOverview from './ItineraryTabs/ItineraryOverview';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../styles/Itinerary.css';

function App() {
    const useLocalData = import.meta.env.VITE_USE_LOCAL_DATA === 'true';
    const { activities, error, loading } = useApi('itinerary', true);
    const { city } = useParams();
    const [tab, setTab] = useState('overview');

    const [itinerary, setItinerary] = useState(preset_itinerary);

    if (!useLocalData) {
        // Handling loading, error, and data checks if using API.
        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>A network error was encountered</p>;
        }

        if (!activities) {
            return <p>No data available</p>;
        } else {
            setItinerary(activities);
        }
    }

    const renderTab = () => {
        switch (tab) {
            case 'overview':
                return <ItineraryOverview itinerary={itinerary} />;
            case 'map':
                return (
                    <div className="itinerary-main">
                        <p>Coming soon!</p>
                    </div>
                );
            default:
                return null;
        }
    };

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleChange = (e, newValue) => {
        setTab(newValue);
    };

    return (
        <>
            <div className="content-wrapper">
                <h1>Get ready to explore {city && capitalize(city)}</h1>
                <div className="subactions">
                    <div className="subactions-left">
                        <Tabs
                            value={tab}
                            onChange={handleChange}
                            aria-label="itinerary view tabs"
                        >
                            <Tab label="Overview" value={'overview'} />
                            <Tab label="Map" value={'map'} />
                        </Tabs>
                    </div>
                </div>
                <div className="itinerary-main">{renderTab()}</div>
            </div>
        </>
    );
}

export default App;
