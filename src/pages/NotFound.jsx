import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

export default function NotFound() {
    return (
        <section className="section">
            <SEO
                title="Page not found"
                description="The page you are looking for could not be found."
            />
            <div className="container-custom mx-auto max-w-2xl text-center">
                <p className="font-semibold tracking-widest text-gold-700">ERROR 404</p>
                <h1 className="mt-3">Page not found</h1>
                <div className="section-divider mt-6" />
                <p className="section-subtitle mb-8">
                    The page may have moved, or the address may be incorrect.
                </p>
                <Link to="/" className="btn-primary">
                    Return to home
                </Link>
            </div>
        </section>
    );
}
