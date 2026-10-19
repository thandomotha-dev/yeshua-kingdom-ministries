import { useState } from 'react';

/**
 * "Get notified about new releases" signup.
 *
 * TODO: connect a real service. Create a form at formspree.io (or similar),
 * then add this line to a file called .env in your project root:
 *   VITE_NEWSLETTER_ENDPOINT=https://formspree.io/f/your-form-id
 * and restart `npm run dev`.
 */
const ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT;

export default function NewsletterBanner() {
    const [email, setEmail] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Hidden field that only bots fill in: pretend it worked and do nothing
        if (honeypot) {
            setStatus('success');
            return;
        }

        if (!ENDPOINT) {
            if (import.meta.env.DEV) {
                console.warn('VITE_NEWSLETTER_ENDPOINT is not set. Simulating success in development.');
                setStatus('success');
            } else {
                setStatus('error');
            }
            return;
        }

        setStatus('sending');
        try {
            const res = await fetch(ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ email, source: 'books-newsletter' }),
            });
            if (!res.ok) throw new Error('Request failed');
            setStatus('success');
            setEmail('');
        } catch {
            setStatus('error');
        }
    };

    return (
        <section className="section-alt" aria-labelledby="newsletter-title">
            <div className="container-custom mx-auto max-w-2xl text-center">
                <h2 id="newsletter-title">Get notified about new releases</h2>
                <p className="mt-3 text-charcoal-light">
                    Be the first to hear when a new book from Yeshua Kingdom Ministries is published.
                </p>

                {status === 'success' ? (
                    <p
                        role="status"
                        className="mt-8 rounded-xl bg-white px-6 py-4 font-semibold text-burgundy-700 shadow-warm"
                    >
                        Thank you! You are on the list.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-8" noValidate={false}>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <label htmlFor="newsletter-email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="newsletter-email"
                                type="email"
                                required
                                autoComplete="email"
                                className="input flex-1"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {/* Spam trap: hidden from people, visible to bots */}
                            <input
                                type="text"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                className="hidden"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                            />
                            <button type="submit" className="btn-primary" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Signing you up...' : 'Notify me'}
                            </button>
                        </div>

                        {status === 'error' && (
                            <p role="alert" className="mt-3 text-sm font-semibold text-burgundy-700">
                                We could not sign you up just now. Please try again later or contact us directly.
                            </p>
                        )}
                    </form>
                )}
            </div>
        </section>
    );
}