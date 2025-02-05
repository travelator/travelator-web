import { Link } from "react-router-dom"

function App() {

    return (
      <>
        <div className = "content-wrapper">
          <h1>See your itinerary</h1>
          <div className="main">
            <p>
              See itinerary results here.
            </p>
          </div>
          <Link to ="/">Home</Link>
          <Link to="/rate">Back</Link>
        </div>
      </>
    )
  }
  
  export default App
  