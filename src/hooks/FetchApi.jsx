import { useState, useEffect } from 'react';
import localActivities from '../assets/activities'; //local data
import { preset_itinerary } from '../assets/itinerary'; //local data

const useApi = (apiRoute, shouldFetchData = true) => {
    const [activities, setActivities] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const useLocalData = import.meta.env.VITE_USE_LOCAL_DATA === 'true';

    // Use auth API URL for auth routes
    const isAuthRoute =
        apiRoute === 'register' ||
        apiRoute === 'login' ||
        apiRoute === 'validate' ||
        apiRoute === 'logout';
    const baseURL = isAuthRoute
        ? import.meta.env.VITE_APP_AUTH_API_URL
        : import.meta.env.VITE_APP_FETCH_GENERAL_API_URL;

    const url = `${baseURL}${apiRoute}`;

    const delay = (t) =>
        new Promise((resolve) => setTimeout(resolve, t * 1000));

    useEffect(() => {
        if (shouldFetchData) {
            console.log('Fetching data from:', url);

            // fetch data (GET request)
            fetch(url, { mode: 'cors', credentials: 'include' }) //update the api address
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((response) => setActivities(response))
                .catch((error) => setError(error))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [apiRoute, shouldFetchData, url]);

    // Send data (POST request)
    const postData = async (data) => {
        setLoading(true);

        if (useLocalData) {
            if (apiRoute === 'activities') {
                await delay(2);
                return { activities: localActivities };
            } else if (apiRoute === 'itinerary') {
                console.log(data);
                await delay(2);
                return { itinerary: preset_itinerary };
            } else {
                setError('Route not found');
            }
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                mode: 'cors',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Response Data:', responseData);
            setActivities(responseData);
            return responseData;
        } catch (error) {
            console.error('POST request error:', error);
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Fetch data (GET request)
    const getData = async (data) => {
        setLoading(true);

        // Construct query parameters from data
        const queryParams = new URLSearchParams(data).toString();
        const urlWithParams = `${url}?${queryParams}`;

        if (useLocalData) {
            if (apiRoute === 'facts') {
                await delay(2);
                return { facts: ['The UK has about 70M people'] };
            } else {
                setError('Route not found');
            }
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(urlWithParams, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Response Data:', responseData);
            setActivities(responseData);
            return responseData;
        } catch (error) {
            console.error('GET request error:', error);
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { activities, error, loading, postData, getData };
};

export default useApi;
