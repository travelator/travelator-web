import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useApi from '../hooks/FetchApi';
import ItineraryOverview from './ItineraryTabs/ItineraryOverview';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import BoltIcon from '@mui/icons-material/Bolt';
import RegenerateModal from '../components/Modal/RegenerateModal';
import Loading from '../components/Loading';
import '../styles/Itinerary.css';
import Map from '../components/Map/map';
import SideBar from '../components/Map/SideBar';

function Itinerary() {
    // Get city and set state for current tab
    const { city } = useParams();
    const [tab, setTab] = useState('overview');

    // regeneration modals
    const [modalOpen, setModalOpen] = useState(false);
    const [swapId, setSwapId] = useState(0);
    const [modalConfig, setModalConfig] = useState('');

    const { postData, error, loading } = useApi('itinerary', false);
    const {
        postData: postSwapData,
        error: swapError,
        loading: swapLoading,
    } = useApi('swap', false);

    // Get itinerary data
    const { state } = useLocation();
    const [itinerary, setItinerary] = useState([]);
    const [tripId, setTripId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);

    // ensure itinerary is updated
    useEffect(() => {
        if (state?.itinerary) setItinerary(state?.itinerary);
        if (state?.tripId) {
            setTripId(state?.tripId);
            console.log(`New trip ID! ${state.tripId}`);
        }
    }, [state]);

    // tab logic
    const renderTab = () => {
        switch (tab) {
            case 'overview':
                return (
                    <ItineraryOverview
                        itinerary={itinerary}
                        handleSwapClick={handleSwapClick}
                    />
                );
            case 'map':
                return (
                    <div
                        className="itinerary-main"
                        style={{ display: 'flex', height: '100vh' }}
                    >
                        <SideBar
                            itinerary={itinerary}
                            onSelectItem={setSelectedItem}
                            selectedItem={selectedItem}
                            selectedRoute={selectedRoute}
                        />
                        <Map
                            itinerary={itinerary}
                            selectedItem={selectedItem}
                            setSelectedRoute={setSelectedRoute}
                        />
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

    const handleRegenerate = async (feedback) => {
        // Add logic to regenerate the itinerary with feedback
        const responseData = {
            city: city,
            itinerary: { itinerary: itinerary },
            feedback: feedback,
            trip_id: tripId,
        };
        setModalOpen(false);
        try {
            const response = await postData(responseData);
            setItinerary(response.itinerary);
        } catch (error) {
            console.error('POST failed:', error);
            console.error('Request data was:', responseData);
        }
    };

    const handleSwap = async (feedback) => {
        // Add logic to regenerate the itinerary with feedback
        const responseData = {
            city: city,
            activityId: swapId,
            itinerary: { itinerary: itinerary },
            feedback: feedback,
            trip_id: tripId,
        };
        setModalOpen(false);
        try {
            const response = await postSwapData(responseData);
            if (response.trip_id) setTripId(response.trip_id);
            setItinerary(response.itinerary);
        } catch (error) {
            console.error('POST failed:', error);
            console.error('Request data was:', responseData);
        }
    };

    const handleRegenerateClick = () => {
        setModalOpen(true);
        setModalConfig('regenerate-all');
    };

    const handleSwapClick = (id) => {
        setModalOpen(true);
        setModalConfig('regenerate-one');
        setSwapId(id);
    };

    // handle loading state for POST request
    if (loading || swapLoading) {
        return <Loading text={'Building itinerary...'} factId={2} />;
    }

    return (
        <>
            <div className="content-wrapper">
                <div className="itinerary-page">
                    <div className="header">
                        <h1>Get ready to explore {city && capitalize(city)}</h1>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleRegenerateClick}
                            startIcon={<BoltIcon />}
                            sx={{ fontSize: '1.2rem' }} // Increase font size by 20%
                        >
                            Regenerate
                        </Button>
                    </div>
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
                    {error && (
                        <p style={{ color: 'red' }}>Error: {error.message}</p>
                    )}
                    {swapError && (
                        <p style={{ color: 'red' }}>
                            Error: {swapError.message}
                        </p>
                    )}
                </div>
            </div>
            <RegenerateModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                handleRegenerate={
                    modalConfig == 'regenerate-all'
                        ? handleRegenerate
                        : handleSwap
                }
                configKey={modalConfig}
            />
        </>
    );
}

export default Itinerary;
