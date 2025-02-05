import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Rate from './pages/Rate'
import Itinerary from './pages/Itinerary'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/rate",
    element: <Rate />,
  },
  {
    path: "/Itinerary",
    element: <Itinerary />,
  },
]);

export default router