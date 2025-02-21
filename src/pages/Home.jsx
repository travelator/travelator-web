import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import CitySearchBar from '../components/CitySearchBar';
import '../styles/Home.css';
import useApi from '../hooks/FetchApi';

function Home() {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();

    const { error, loading, postData } = useApi('home-data', false);

    const selectedCity = selectedOption ? selectedOption.city : null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const homePageData = {
            city: selectedCity,
            timeOfDay: 'morning',
            group: 'family',
        };
        try {
            const response = await postData(homePageData);
            console.log('POST success:', response);
        } catch (error) {
            console.error('POST failed:', error);
        }
        navigate(`/rate/${selectedCity}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            <div className="content-wrapper">
                <div className="home-content">
                    <h1 className="company-header">Voya</h1>
                    <p className="subheader">Your personal itinerary planner</p>

                    <form onSubmit={handleSubmit}>
                        <div className="main">
                            <p>Where do you want to go?</p>
                            <CitySearchBar
                                selectedCity={selectedOption}
                                setSelectedCity={setSelectedOption}
                            />
                        </div>
                        <Button
                            disabled={!selectedCity}
                            type="submit"
                            variant="contained"
                            color="primary"
                            id="submit-city"
                        >
                            Start
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Home;
