import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Polyline, Popup } from 'react-leaflet';
import useApi from '../../hooks/FetchApi';

const Directions = ({ origin, destination, mode, color, onClick }) => {
    const [route, setRoute] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { postData } = useApi('get-directions', false);

    const fetchDirections = useCallback(async () => {
        if (
            !origin ||
            !destination ||
            !Array.isArray(origin) ||
            !Array.isArray(destination)
        ) {
            return;
        }

        if (isLoading) return;

        const cacheKey = `directions_${origin.join(',')}_${destination.join(',')}_${mode}`;
        const cachedRoute = sessionStorage.getItem(cacheKey);
        if (cachedRoute) {
            try {
                const parsedRoute = JSON.parse(cachedRoute);
                setRoute(parsedRoute);
                return;
            } catch (e) {
                console.error('Failed to parse cached route:', e);
            }
        }

        setIsLoading(true);

        const directionsRequest = {
            origin,
            destination,
            mode,
        };

        try {
            const response = await postData(directionsRequest);
            if (response.routes && response.routes.length > 0) {
                const routeData = response.routes[0];
                setRoute(routeData.polyline);
                sessionStorage.setItem(
                    cacheKey,
                    JSON.stringify(routeData.polyline)
                );
            }
        } catch (error) {
            console.error('Error fetching directions:', error);
        } finally {
            setIsLoading(false);
        }
    }, [origin, destination, mode, postData, isLoading]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchDirections();
        }, 1000);

        return () => clearTimeout(debounceTimer);
    }, [fetchDirections]);

    if (!route) {
        return null;
    }

    return (
        <Polyline
            positions={route}
            color={color}
            weight={5}
            opacity={0.7}
            onClick={onClick}
        >
            <Popup>
                <div>
                    <strong>Mode: </strong> {mode}
                </div>
            </Popup>
        </Polyline>
    );
};

Directions.propTypes = {
    origin: PropTypes.arrayOf(PropTypes.number).isRequired,
    destination: PropTypes.arrayOf(PropTypes.number).isRequired,
    mode: PropTypes.string,
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

Directions.defaultProps = {
    mode: 'walking',
    onClick: () => {},
};

export default Directions;
