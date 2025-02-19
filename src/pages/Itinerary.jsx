import { Link } from 'react-router-dom';
import useGetRequest from '../hooks/FetchApi';

function App() {
    const useLocalData = import.meta.env.VITE_USE_LOCAL_DATA === 'true';

    const { activities, error, loading } = useGetRequest('itinerary');

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

    const apiStatus =
        activities && activities.length > 0
            ? activities[0]['api status']
            : 'No status available';

    return (
        <>
            <div className="content-wrapper">
                <h1>See your itinerary</h1>
                <h1>{apiStatus}</h1>
                <div className="main">
                    <p>See itinerary results here.</p>
                </div>
                <Link to="/">Home</Link>
                <Link to="/rate">Back</Link>
            </div>
        </>
    );
}

export default App;
