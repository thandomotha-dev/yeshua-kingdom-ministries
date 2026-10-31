import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import ComingSoon from './pages/ComingSoon';
import Home from './pages/Home';
import ServiceTimes from './pages/ServiceTimes';
import Sermons from './pages/Sermons';
import Events from './pages/Events';
import MarriageTraining from './pages/MarriageTraining';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Bible from './pages/Bible';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import PrayerRequest from './pages/PrayerRequest';
import About from './pages/About';
import Podcast from './pages/Podcast';
import Give from './pages/Give';


/**
 * ROUTES
 * Paths match the links in data/navigation.js.
 * As each real page is built, import it and replace its <ComingSoon /> element,
 * e.g.  <Route path="events" element={<Events />} />
 */
export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="books" element={<Books />} />
                <Route path="books/:slug" element={<BookDetail />} />
                <Route path="sermons" element={<Sermons />} />
                <Route path="podcast" element={<Podcast />} />
                <Route path="bible" element={<Bible />} />
                <Route path="events" element={<Events />} />
                <Route path="marriage-training" element={<MarriageTraining />} />
                <Route path="service-times" element={<ServiceTimes />} />
                <Route path="give" element={<Give />} />
                <Route path="contact" element={<Contact />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="prayer-request" element={<PrayerRequest />} />
                <Route path="*" element={<ComingSoon title="Page not found" />} />
            </Route>
        </Routes>
    );
}