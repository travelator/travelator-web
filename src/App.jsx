import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className = "content-wrapper">
        <h1>Welcome to Travelator</h1>
        <div className="main">
          <p>
            Search for a location
          </p>
        </div>
      </div>
    </>
  )
}

export default App
