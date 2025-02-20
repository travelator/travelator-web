import useApi from '../hooks/FetchApi';
import { useParams } from 'react-router-dom';
import { preset_itinerary } from '../assets/itinerary';
import { useState } from 'react';
import ActivityCard from '../components/ItineraryCards/ActivityCard';
import TravelCard from '../components/ItineraryCards/TravelCard';
import CustomCarousel from '../components/Carousel';
import '../styles/Itinerary.css';

function App() {
    const useLocalData = import.meta.env.VITE_USE_LOCAL_DATA === 'true';
    const { activities, error, loading } = useApi('itinerary', true);
    const { city } = useParams();

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

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <>
            <div className="content-wrapper">
                <h1>Get ready to explore {city && capitalize(city)}</h1>
                <div className="itinerary-main">
                    <CustomCarousel deviceType={'desktop'}>
                        {itinerary.map((i) =>
                            i.transport ? (
                                <TravelCard
                                    start={i.start}
                                    end={i.end}
                                    title={i.title}
                                    description={i.description}
                                    price={i.price}
                                    theme={i.theme}
                                    image={i.image}
                                    key={i.id}
                                />
                            ) : (
                                <ActivityCard
                                    start={i.start}
                                    end={i.end}
                                    title={i.title}
                                    description={i.description}
                                    price={i.price}
                                    theme={i.theme}
                                    image={i.image}
                                    key={i.id}
                                />
                            )
                        )}
                    </CustomCarousel>
                </div>
            </div>
        </>
    );
}

export default App;
