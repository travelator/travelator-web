import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import CitySearchBar from '../components/CitySearchBar';
import '../styles/Home.css';
import useApi from '../hooks/FetchApi';
import CustomToggle from '../components/Toggles/CustomToggle';
import Loading from '../components/Loading';
import { FactsContext } from '../providers/FactsProvider';
import UniqueTripSlider from '../components/Slider/Slider';
import DateRangeComponent from '../components/DatePicker/DateRangeComponent';
import Typography from '@mui/material/Typography';

function Home() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedTime, setSelectedTime] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState('solo');
    const [selectedUniqueness, setSelectedUniqueness] = useState(0);
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

        const trimmedCity = selectedCity ? selectedCity.trim() : null;

        const homePageData = {
            city: trimmedCity,
            date: selectedDate
                ? selectedDate.toLocaleDateString('en-CA')
                : null,
            timeOfDay: selectedTime,
            group: selectedGroup,
            uniqueness: selectedUniqueness,
        };
        try {
            const request = postData(homePageData);
            const facts = await getData({ location: selectedCity, num: 3 });
            setFacts(facts.facts);
            const response = await request;
            navigate(`/rate/${trimmedCity}`, {
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
            <div className="home-hero">
                <div className="content-wrapper">
                    <div className="home-content">
                        <h1 className="company-header">Voya</h1>
                        <p className="subheader">
                            Your personal itinerary planner
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="main">
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
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{ mt: 1 }}
                                >
                                    Select one or more times of day for your
                                    itinerary.
                                </Typography>
                            </div>
                            <div className="main">
                                <CustomToggle
                                    options={groupOptions}
                                    multiple={false}
                                    selected={selectedGroup}
                                    setSelected={setSelectedGroup}
                                />
                            </div>
                            <div className="main">
                                <DateRangeComponent
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                />
                            </div>
                            {error && (
                                <p style={{ color: 'red' }}>
                                    Error: {error.message}
                                </p>
                            )}
                            <Button
                                disabled={
                                    !selectedCity || selectedTime.length === 0
                                } // date is optional.
                                type="submit"
                                variant="contained"
                                color="primary"
                                id="submit-city"
                                sx={{ fontSize: '1.2rem' }}
                            >
                                Start
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
