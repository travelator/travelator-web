import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import CitySearchBar from '../components/CitySearchBar';
import '../styles/Home.css';
import useApi from '../hooks/FetchApi';
import CustomToggle from '../components/Toggles/CustomToggle';
import Loading from '../components/Loading';
import { FactsContext } from '../providers/FactsProvider';

function Home() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedTime, setSelectedTime] = useState([
        'morning',
        'afternoon',
        'evening',
    ]);
    const [selectedGroup, setSelectedGroup] = useState('solo');
    const [isLoading, setIsLoading] = useState(false);

    const { setFacts } = useContext(FactsContext);

    const navigate = useNavigate();

    const { error, loading, postData } = useApi('activities', false);
    const { getData } = useApi('facts', false);

    const selectedCity = selectedOption ? selectedOption.city : null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFacts([]);

        const homePageData = {
            //update with proper data
            city: selectedCity,
            timeOfDay: selectedTime,
            group: selectedGroup,
        };
        try {
            const request = postData(homePageData);
            const facts = await getData({ location: selectedCity, num: 2 });
            setFacts(facts.facts);
            const response = await request;
            navigate(`/rate/${selectedCity}`, {
                state: { activities: response.activities },
            });
        } catch (error) {
            console.error('Failed to fetch acitivities:', error);
            setIsLoading(false);
        }
    };

    if (loading || isLoading) {
        return <Loading text={'Fetching activities...'} factId={0} />;
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
