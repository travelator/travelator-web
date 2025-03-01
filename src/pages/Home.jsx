import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import CitySearchBar from '../components/CitySearchBar';
import '../styles/Home.css';
import useApi from '../hooks/FetchApi';
import CustomToggle from '../components/Toggles/CustomToggle';
import Loading from '../components/Loading';
import UniqueTripSlider from '../components/Slider/Slider';

function Home() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedTime, setSelectedTime] = useState([
        'morning',
        'afternoon',
        'evening',
    ]);
    const [selectedGroup, setSelectedGroup] = useState('solo');
    const [selectedUniqueness, setSelectedUniqueness] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { error, loading, postData } = useApi('activities', false);

    const selectedCity = selectedOption ? selectedOption.city : null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const homePageData = {
            //update with proper data
            city: selectedCity,
            timeOfDay: selectedTime,
            group: selectedGroup,
            uniqueness: selectedUniqueness,
        };
        try {
            const response = await postData(homePageData);
            navigate(`/rate/${selectedCity}`, {
                state: { activities: response.activities },
            });
            console.log('POST success:', response);
        } catch (error) {
            console.error('POST failed:', error);
            setIsLoading(false);
        }
    };

    if (loading || isLoading) {
        return <Loading text={'Fetching activities...'} />;
    }

    const timeOfDayOptions = [
        { label: 'Morning', value: 'morning' },
        { label: 'Afternoon', value: 'afternoon' },
        { label: 'Evening', value: 'evening' },
    ];

    const groupOptions = [
        { label: 'Solo', value: 'solo' },
        { label: 'Family', value: 'family' },
        { label: 'Friends', value: 'friends' },
        { label: 'Couples', value: 'couples' },
    ];

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
                        <div className="main">
                            <UniqueTripSlider
                                value={selectedUniqueness}
                                onChange={(e, newValue) =>
                                    setSelectedUniqueness(newValue)
                                }
                            />
                        </div>
                        <div className="main">
                            <CustomToggle
                                options={timeOfDayOptions}
                                multiple={true}
                                selected={selectedTime}
                                setSelected={setSelectedTime}
                            />
                        </div>
                        <div className="main">
                            <CustomToggle
                                options={groupOptions}
                                multiple={false}
                                selected={selectedGroup}
                                setSelected={setSelectedGroup}
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
                {error && (
                    <p style={{ color: 'red' }}>Error: {error.message}</p>
                )}
            </div>
        </>
    );
}

export default Home;
