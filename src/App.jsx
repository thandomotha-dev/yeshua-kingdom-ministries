import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import ComingSoon from './pages/ComingSoon';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';

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
                <Route path="about" element={<ComingSoon title="About Us" />} />
                <Route path="books" element={<Books />} />
                <Route path="books/:slug" element={<BookDetail />} />
                <Route path="sermons" element={<ComingSoon title="Sermons" />} />
                <Route path="podcast" element={<ComingSoon title="Podcast" />} />
                <Route path="bible" element={<ComingSoon title="Bible" />} />
                <Route path="events" element={<ComingSoon title="Events" />} />
                <Route path="marriage-training" element={<ComingSoon title="Marriage Training" />} />
                <Route path="service-times" element={<ComingSoon title="Service Times" />} />
                <Route path="give" element={<ComingSoon title="Offerings & Partnerships" />} />
                <Route path="prayer-request" element={<ComingSoon title="Prayer Request" />} />
                <Route path="contact" element={<ComingSoon title="Contact Us" />} />
                <Route path="privacy" element={<ComingSoon title="Privacy Policy" />} />
                <Route path="*" element={<ComingSoon title="Page not found" />} />
            </Route>
        </Routes>
    );
}