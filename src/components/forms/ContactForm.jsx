import { useState } from 'react';

import { submitForm } from '../../services/submitForm';

const ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || import.meta.env.VITE_FORM_ENDPOINT;

const subjects = [
    'General question',
    'Visiting the church',
    'Books and orders',
    'Marriage training',
    'Partnership and giving',
    'Invitations and media',
    'Something else',
];

const emptyForm = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactForm() {
    const [values, setValues] = useState(emptyForm);
    const [honeypot, setHoneypot] = useState('');
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const update = (field) => (e) => setValues((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Hidden field that only bots fill in: pretend it worked and do nothing
        if (honeypot) {
            setStatus('success');
            return;
        }

        setStatus('sending');
        try {
            await submitForm({ endpoint: ENDPOINT, data: { form: 'contact', ...values } });
            setStatus('success');
            setValues(emptyForm);
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div role="status" className="p-8 text-center bg-white rounded-2xl shadow-warm md:p-10">
                <h3 className="text-2xl md:text-2xl">Message sent</h3>
                <p className="mt-3 leading-relaxed text-charcoal-light">
                    Thank you for reaching out. We will reply as soon as we can.
                </p>
                <button type="button" className="mt-6 btn-outline" onClick={() => setStatus('idle')}>
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white rounded-2xl shadow-warm md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="ct-name" className="label">
                        Your name
                    </label>
                    <input
                        id="ct-name"
                        type="text"
                        required
                        autoComplete="name"
                        className="input"
                        value={values.name}
                        onChange={update('name')}
                    />
                </div>
                <div>
                    <label htmlFor="ct-email" className="label">
                        Email address
                    </label>
                    <input
                        id="ct-email"
                        type="email"
                        required
                        autoComplete="email"
                        className="input"
                        value={values.email}
                        onChange={update('email')}
                    />
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="ct-phone" className="label">
                        Phone or WhatsApp (optional)
                    </label>
                    <input
                        id="ct-phone"
                        type="tel"
                        autoComplete="tel"
                        className="input"
                        value={values.phone}
                        onChange={update('phone')}
                    />
                </div>
                <div>
                    <label htmlFor="ct-subject" className="label">
                        What is this about?
                    </label>
                    <select
                        id="ct-subject"
                        required
                        className="input"
                        value={values.subject}
                        onChange={update('subject')}
                    >
                        <option value="" disabled>
                            Please choose
                        </option>
                        {subjects.map((subject) => (
                            <option key={subject} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="ct-message" className="label">
                    Your message
                </label>
                <textarea
                    id="ct-message"
                    required
                    className="textarea min-h-[150px]"
                    value={values.message}
                    onChange={update('message')}
                />
            </div>

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

            {status === 'error' && (
                <p role="alert" className="text-sm font-semibold text-burgundy-700">
                    We could not send your message just now. Please try again, or call or email us using the
                    details on this page.
                </p>
            )}

            <button type="submit" className="w-full btn-primary btn-lg" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send message'}
            </button>
        </form>
    );
}