import { Link, useParams } from "react-router-dom"
import activities from "../assets/activities"
import RateCard from "../components/RateCard/RateCard"
import "../styles/Rate.css"
import { useRef, useState, useEffect } from "react"
import { Button } from "@mui/material"

function Rate() {

  const { city } = useParams();

  const containerRef = useRef(null);
  const [remainingActivities, setRemainingActivities] = useState(activities);
  const [visibleActivities, setVisibleActivities] = useState(activities);

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

    return (
      <>
        <div className = "content-wrapper">
          <h1>{`Preparing itinerary for ${city}...`}</h1>
          <div className="main">
            <p>
              Rate the activities while you wait to update your preferences
            </p>
            <div className="activity-cards" ref={containerRef}>
              {visibleActivities.map(a => (
                  <RateCard
                    title={a.title}
                    description={a.description}
                    url={a.image_link}
                    key={a.id}
                  />
                ))}
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
  