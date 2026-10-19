import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

// Scrolls to the top whenever the visitor opens a new page
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            <Navbar />
            <main id="main-content" className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}