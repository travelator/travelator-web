import { useParams, useNavigate } from 'react-router-dom';
import useUserRateInfo from '../hooks/FetchRateInfo';
import RateCard from '../components/RateCard/RateCard';
import '../styles/Rate.css';
import { useRef, useState, useEffect } from 'react';
import localActivities from '../assets/activities'; //local data

function Rate() {
    const { city } = useParams();
    const navigate = useNavigate();
    const useLocalData = import.meta.env.VITE_USE_LOCAL_DATA === 'true';

    const { activities, error, loading } = useUserRateInfo();
    const containerRef = useRef(null);
    const [remainingActivities, setRemainingActivities] = useState([]);
    const [visibleActivities, setVisibleActivities] = useState([]);
    const [preferences, setPreferences] = useState([]);

    // handle going to next action if all swipes are complete
    const onNext = () => {
        // TODO: send preferences to server
        navigate('/itinerary') 
    }

    if (visibleActivities.length > 0 && remainingActivities.length == 0) {
        onNext();
    }

    // fetch activity data
    useEffect(() => {
        // Updates the state after data is fetched
        if (useLocalData) {
            setRemainingActivities(localActivities);
            setVisibleActivities(localActivities);
        } else {
            if (activities) {
                setRemainingActivities(activities);
                setVisibleActivities(activities);
            }
        }
    }, [activities, useLocalData]); // Re-run whenever `useLocalData` or `activities` change

    // set number of cards to show
    useEffect(() => {
        const hideOverflowingCards = () => {
            if (!containerRef.current) return;

            const containerWidth = containerRef.current.clientWidth;
            let totalWidth = 0;
            let newVisibleActivities = [];

            for (let i = 0; i < remainingActivities.length; i++) {
                const cardWidth = 324;
                totalWidth += cardWidth;

                if (totalWidth > containerWidth) break;
                newVisibleActivities.push(remainingActivities[i]);
            }

            setVisibleActivities(newVisibleActivities);
        };

        hideOverflowingCards();
        window.addEventListener('resize', hideOverflowingCards);

        return () => window.removeEventListener('resize', hideOverflowingCards);
    }, [remainingActivities]);

    // handle loading screen
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
        }
    }

    // create like and dislike handlers for rate card
    const onCardClick = (title, isLike) => {
        setPreferences([...preferences, {title: title, liked: isLike}]);
        setRemainingActivities(remainingActivities.filter(a => a.title != title));
    }

    return (
        <>
            <div className="content-wrapper">
                <h1>{`Rate activities in ${city}`}</h1>
                <div className="activity-main">
                    <div className="activity-cards" ref={containerRef}>
                        {Array.isArray(visibleActivities) &&
                        visibleActivities.length > 0 ? ( //if the data can't be transformed into an array
                            visibleActivities.map((a) => (
                                <RateCard
                                    title={a.title}
                                    description={a.description}
                                    url={a.image_link}
                                    theme={a.theme}
                                    price={a.price}
                                    onCardClick={onCardClick}
                                    key={a.id}
                                />
                            ))
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Rate;
