import { Link } from "react-router-dom"
import CitySearchBar from "../components/CitySearchBar"

function Home() {

    return (
      <>
        <div className = "content-wrapper">
          <h1>Welcome to Travelator</h1>
          <div className="main">
            <p>
              Where do you want to go?
            </p>
            <CitySearchBar />
          </div>
          <Link to="rate">Start</Link>
        </div>
      </>
    )
  }
  
  export default Home
  