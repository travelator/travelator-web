import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import CitySearchBar from '../components/CitySearchBar';
import '../styles/Home.css';

function Home() {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();

    const selectedCity = selectedOption ? selectedOption.city : null;

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/rate/${selectedCity}`);
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="home-content">
                    <h1 className="company-header">Voya</h1>
                    <p className="subheader">Your personal itinerary planner</p>
                    <form onSubmit={handleSubmit}>
                        <div className="main">
                            <p>Where do you want to go? This is a test.</p>
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
