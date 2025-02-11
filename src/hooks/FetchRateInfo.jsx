// receiving all information in one api call
import { useState, useEffect } from "react";

const useUserRateInfo = () => {
    const [activities, setActivities] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    console.log("Fetching data...")

    fetch("http://127.0.0.1:5000/api/rate-info"
        , { mode: "cors" }) //update the api address
        .then((response) => {
        if (response.status >= 400) {
            throw new Error("server error");
        }
        return response.json();
        })
        .then((response) => setActivities(response[0]))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, []);

    return { activities, error, loading };
};

export default useUserRateInfo