import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ItineraryOverview from './ItineraryTabs/ItineraryOverview';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../styles/Itinerary.css';

function Itinerary() {
    // Get city and set state for current tab
    const { city } = useParams();
    const [tab, setTab] = useState('overview');

    // Get itinerary data
    const { state } = useLocation();
    const [itinerary, setItinerary] = useState([]);

    // ensure itinerary is updated
    useEffect(() => {
        if (state?.itinerary) setItinerary(state?.itinerary);
    }, [state]);

    // tab logic
    const renderTab = () => {
        switch (tab) {
            case 'overview':
                return <ItineraryOverview itinerary={itinerary} />;
            case 'map':
                return (
                    <div className="itinerary-main">
                        <p>Coming soon!!!</p>
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

export default Itinerary;
