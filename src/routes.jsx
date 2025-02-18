import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Rate from './pages/Rate';
import FetchRateInfoTest from './pages/APITest'; //delete
import Itinerary from './pages/Itinerary';
import NotFound from './pages/NotFound';

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
                path: 'rate/:city',
                element: <Rate />,
            },
            {
                path: 'itinerary',
                element: <Itinerary />,
            },
            {
                path: 'test', //delete
                element: <FetchRateInfoTest />, //delete
            },
        ],
    },
]);

export default router;
