import useApi from '../hooks/FetchApi'; // Path to your custom hook

const FetchRateInfoTest = () => {
    const { activities, error, loading } = useApi();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!activities) {
        return <p>No data available</p>;
    }

    return (
        <div>
            <h2>{activities.title}</h2>
            <p>{activities.description}</p>
            <img src={activities.image_link} alt={activities.title} />
        </div>
    );
};

export default FetchRateInfoTest;
