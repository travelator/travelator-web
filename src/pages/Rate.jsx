import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useApi from '../hooks/FetchApi';
import RateCard from '../components/RateCard/RateCard';
import '../styles/Rate.css';
import { useRef, useState, useEffect, useCallback } from 'react';
import Loading from '../components/Loading';

function Rate() {
    // get the city
    const { city } = useParams();
    const navigate = useNavigate();

    // get loaded activities
    const { state } = useLocation();
    const [remainingActivities, setRemainingActivities] = useState([]);
    const [visibleActivities, setVisibleActivities] = useState([]);

    // initialise hook to send data
    const { postData, error, loading } = useApi('itinerary', false);

    // containerRef manages visible card space
    const containerRef = useRef(null);

    // handles activities to show
    const [likedActivities, setLikedActivities] = useState([]);
    const [dislikedActivities, setDislikedActivities] = useState([]);

    // set remaining activities once state loads
    useEffect(() => {
        if (state?.activities) {
            setRemainingActivities(state.activities);
        }
    }, [state]);

    // handle going to next action if all swipes are complete
    const onNext = useCallback(async () => {
        const responseData = {
            city: city,
            preferences: {
                liked: likedActivities,
                disliked: dislikedActivities,
            },
        };

        try {
            const response = await postData(responseData);
            navigate(`/itinerary/${city}`, {
                state: { itinerary: response.itinerary },
            });
        } catch (error) {
            console.error('POST failed:', error);
            console.error('Request data was:', responseData);
        }
    }, [city, navigate, postData, dislikedActivities, likedActivities]);

    useEffect(() => {
        if (visibleActivities.length > 0 && remainingActivities.length === 0) {
            onNext();
        }
    }, [visibleActivities, remainingActivities, onNext]);

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

                console.log(cardWidth);
                console.log(totalWidth);
                console.log(containerWidth);

                if (totalWidth > containerWidth) break;
                newVisibleActivities.push(remainingActivities[i]);
            }

            console.log(newVisibleActivities);

            setVisibleActivities(newVisibleActivities);
        };

        hideOverflowingCards();
        window.addEventListener('resize', hideOverflowingCards);

        return () => window.removeEventListener('resize', hideOverflowingCards);
    }, [remainingActivities]);

    // handle loading state for POST request
    if (loading) {
        return <Loading text={'Building itinerary...'} factId={1} />;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error.message}</p>;
    }

    // create like and dislike handlers for rate card
    const onCardClick = (title, isLike) => {
        setLikedActivities((prevLikedActivities) => {
            if (isLike) {
                return [...prevLikedActivities, title];
            } else {
                return prevLikedActivities;
            }
        });

        setDislikedActivities((prevDislikedActivities) => {
            if (!isLike) {
                return [...prevDislikedActivities, title];
            } else {
                return prevDislikedActivities;
            }
        });

        setRemainingActivities((prevRemainingActivities) =>
            prevRemainingActivities.filter((a) => a.title !== title)
        );
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="activity-page">
                    <h1>{`Rate activities in ${city}`}</h1>
                    <div className="activity-main">
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
            </div>
        </>
    );
}

export default Rate;
