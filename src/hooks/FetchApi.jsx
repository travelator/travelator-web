// receiving all information in one api call
import { useState, useEffect } from 'react';

const useApi = (apiRoute, shouldFetchData = true) => {
    const [activities, setActivities] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const baseURL = import.meta.env.VITE_APP_FETCH_GENERAL_API_URL;
    const url = `${baseURL}${apiRoute}`;

    useEffect(() => {
        if (shouldFetchData) {
            console.log('Fetching data from:', url);

            // fetch data (GET request)
            fetch(url, { mode: 'cors' }) //update the api address
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
    }, [apiRoute, shouldFetchData]);

    //Send data (POST request)
    const postData = async (data) => {
        try {
            setLoading(true);
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                mode: 'cors',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log("Response Data:", responseData);
            setActivities(responseData);
            return responseData;
        } catch (error) {
            console.error("POST request error:", error);
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { activities, error, loading, postData };
};

export default useApi;
