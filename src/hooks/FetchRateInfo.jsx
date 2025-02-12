// receiving all information in one api call
import { useState, useEffect } from "react";

const useUserRateInfo = () => {
    const [activities, setActivities] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    console.log("Fetching data...")

    fetch(import.meta.env.VITE_APP_FETCH_API_URL
        , { mode: "cors" }) //update the api address
        .then((response) => {
        if (response.status >= 400) {
            throw new Error("server error");
        }
        return response.json();
        })
        .then((response) => setActivities(response))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, []);

    return { activities, error, loading };
};

export default useUserRateInfo