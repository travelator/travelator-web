import { Link } from "react-router-dom"
import activities from "../assets/activities"
import RateCard from "../components/RateCard"

function Rate() {

    return (
      <>
        <div className = "content-wrapper">
          <h1>Welcome to Travelator</h1>
          <div className="main">
            <p>
              Rate the activities
            </p>
            <RateCard 
                title={activities[0].title}
                description={activities[0].description}
                url={activities[0].image_link}
            />
          </div>
          <Link to ="/">Home</Link>
          <Link to="/itinerary">Itinerary</Link>
        </div>
      </>
    )
  }
  
  export default Rate
  