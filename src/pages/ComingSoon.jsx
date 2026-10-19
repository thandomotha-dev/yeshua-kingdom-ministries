import { Link } from 'react-router-dom';

// Temporary page. Each one gets replaced by its real page as we build it.
export default function ComingSoon({ title }) {
    return (
        <section className="section">
            <div className="container-custom mx-auto max-w-2xl text-center">
                <h1>{title}</h1>
                <div className="section-divider mt-6" />
                <p className="section-subtitle mb-8">This page is being built and will be ready soon.</p>
                <Link to="/" className="btn-primary">
                    Back to home
                </Link>
            </div>
        </section>
    );
}