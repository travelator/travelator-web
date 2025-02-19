// receiving all information in one api call
import { useState, useEffect } from 'react';

const useGetRequest = (apiRoute) => {
    const [activities, setActivities] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //const url = `${import.meta.env.VITE_APP_FETCH_GENERAL_API_URL}${apiRoute}`;

    useEffect(() => {
        const baseURL = import.meta.env.VITE_APP_FETCH_GENERAL_API_URL;
        console.log('Base URL:', baseURL);
        console.log('API Route:', apiRoute);
        const url = `${baseURL}${apiRoute}`;
        console.log('Fetching from:', url);
        console.log('Fetching data...');

        fetch(url, { mode: 'cors' }) //update the api address
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('server error');
                }
                return response.json();
            })
            .then((response) => setActivities(response))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [apiRoute]);

    return { activities, error, loading };
};

export default useGetRequest;
