import { useParams, useNavigate } from 'react-router-dom';
import useApi from '../hooks/FetchApi';
import RateCard from '../components/RateCard/RateCard';
import '../styles/Rate.css';
import { useRef, useState, useEffect, useCallback } from 'react';
import localActivities from '../assets/activities'; //local data

function Rate() {
    const { city } = useParams();
    const navigate = useNavigate();
    const useLocalData = import.meta.env.VITE_USE_LOCAL_DATA === 'true';

    //GET request
    const { activities, error, loading } = useApi('rate-info', true);
    //POST request //TODO: implement error and post loading into HTML.
    const {
        postData,
        error: postError,
        loading: postLoading,
    } = useApi('rate-info/preferences', false);

    const containerRef = useRef(null);
    const [remainingActivities, setRemainingActivities] = useState([]);
    const [visibleActivities, setVisibleActivities] = useState([]);
    const [preferences, setPreferences] = useState([]);

    // handle going to next action if all swipes are complete
    const onNext = useCallback(async () => {
        try {
            const response = await postData(preferences);
            console.log('POST success:', response);
            navigate('/itinerary');
        } catch (error) {
            console.error('POST failed:', postError || error);
        }
    }, [postData, preferences, navigate, postError]);

    useEffect(() => {
        if (visibleActivities.length > 0 && remainingActivities.length === 0) {
            onNext();
        }
    }, [visibleActivities, remainingActivities, onNext]);

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

    // handle loading screen for GET request
    if (!useLocalData) {
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

    // handle loading state for POST request
    if (postLoading) {
        return <p>Saving preferences...</p>;
    }

    if (postError) {
        return <p style={{ color: 'red' }}>Error: {postError.message}</p>;
    }

    // create like and dislike handlers for rate card
    const onCardClick = (title, isLike) => {
        setPreferences([...preferences, { title: title, liked: isLike }]);
        setRemainingActivities(
            remainingActivities.filter((a) => a.title != title)
        );
    };

    return (
        <>
            <div className="content-wrapper">
                <h1>{`Rate activities in ${city}`}</h1>
                <div className="activity-main">
                    {loading && <p>Loading...</p>}
                    {error && (
                        <p style={{ color: 'red' }}>Error: {error.message}</p>
                    )}
                    <div
                        className="activity-cards"
                        ref={containerRef}
                        data-testid="activity-cards-container"
                    >
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
