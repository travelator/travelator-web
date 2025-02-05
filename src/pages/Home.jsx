import { Link } from "react-router-dom"

function Home() {

    return (
      <>
        <div className = "content-wrapper">
          <h1>Welcome to Travelator</h1>
          <div className="main">
            <p>
              Search for a location
            </p>
          </div>
          <Link to="rate">Start</Link>
        </div>
      </>
    )
  }
  
  export default Home
  