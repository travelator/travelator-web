import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Rate from './pages/Rate';
import Itinerary from './pages/Itinerary';
import NotFound from './pages/NotFound';
import UserTrips from './pages/UserTrips';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'signup',
                element: <Signup />,
            },
            {
                path: 'rate/:city',
                element: <Rate />,
            },
            {
                path: 'itinerary/:city',
                element: <Itinerary />,
            },
            {
                path: 'user-trips',
                element: <UserTrips />,
            },
        ],
    },
]);
export default router;
