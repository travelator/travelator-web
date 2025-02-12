import { Link, useParams } from "react-router-dom"
import useUserRateInfo from "../hooks/FetchRateInfo";
import RateCard from "../components/RateCard/RateCard"
import "../styles/Rate.css"
import { useRef, useState, useEffect } from "react"
import { Button } from "@mui/material"
import localActivities from "../assets/activities" //local data

function Rate() {

  const { city } = useParams();

  const [useLocalData, setUseLocalData] = useState(import.meta.env.VITE_USE_LOCAL_DATA === "true");


  const { activities, error, loading } = useUserRateInfo();
  const containerRef = useRef(null);
  const [remainingActivities, setRemainingActivities] = useState([]);
  const [visibleActivities, setVisibleActivities] = useState([]);  
  
  useEffect(() => { // Updates the state after data is fetched
    if(useLocalData){
      setRemainingActivities(localActivities);
      setVisibleActivities(localActivities);
    } else {
      if (activities) {
        setRemainingActivities(activities);
        setVisibleActivities(activities); 
      }
    }
  }, [activities, localActivities]); // Re-run whenever `useLocalData` or `activities` change



  useEffect(() => {
    const hideOverflowingCards = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      let totalWidth = 0;
      let newVisibleActivities = [];

      for (let i = 0; i < remainingActivities.length; i++) {
        const cardWidth = 324; 
        totalWidth += cardWidth;

        if (totalWidth > containerWidth) break;
        newVisibleActivities.push(remainingActivities[i]);
      }

      setVisibleActivities(newVisibleActivities);
    };

    hideOverflowingCards();
    window.addEventListener("resize", hideOverflowingCards);

    return () => window.removeEventListener("resize", hideOverflowingCards);
  }, [remainingActivities])  
  
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

    return (
      <>
        <div className = "content-wrapper">
          <h1>{`Preparing itinerary for ${city}...`}</h1>
          <div className="main">
            <p>
              Rate the activities while you wait to update your preferences
            </p>
            <div className="activity-cards" ref={containerRef}>
              {Array.isArray(visibleActivities) && visibleActivities.length > 0 ? ( //if the data can't be transformed into an array
                visibleActivities.map(a => (
                  <RateCard
                    title={a.title}
                    description={a.description}
                    url={a.image_link}
                    key={a.id}
                  />
                ))
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
          <div className="bottom-buttons">
            <Button
                variant="contained"
                color="primary"
                disabled={remainingActivities.length > 0}
                className="next-button"
              >
                Next
            </Button>
          </div>
        </div>
      </>
    )
  }
  
  export default Rate
  