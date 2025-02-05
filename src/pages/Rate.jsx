import { Link } from "react-router-dom"

function Rate() {

    return (
      <>
        <div className = "content-wrapper">
          <h1>Welcome to Travelator</h1>
          <div className="main">
            <p>
              Rate the activities
            </p>
          </div>
          <Link to ="/">Home</Link>
          <Link to="/itinerary">Itinerary</Link>
        </div>
      </>
    )
  }
  
  export default Rate
  