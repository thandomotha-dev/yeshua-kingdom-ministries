import { useState } from 'react';

import { submitForm } from '../../services/submitForm';

const ENDPOINT = import.meta.env.VITE_PARTNER_FORM_ENDPOINT || import.meta.env.VITE_FORM_ENDPOINT;

const partnershipTypes = [
    'Monthly partner',
    'One-time gift',
    'A specific project',
    'I am not sure yet',
];

const emptyForm = { name: '', email: '', phone: '', type: '', message: '', consent: false };

export default function PartnerForm() {
    const [values, setValues] = useState(emptyForm);
    const [honeypot, setHoneypot] = useState('');
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const update = (field) => (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Hidden field that only bots fill in: pretend it worked and do nothing
        if (honeypot) {
            setStatus('success');
            return;
        }

        setStatus('sending');
        try {
            await submitForm({ endpoint: ENDPOINT, data: { form: 'partnership', ...values } });
            setStatus('success');
            setValues(emptyForm);
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div role="status" className="p-8 text-center bg-white rounded-2xl shadow-warm md:p-10">
                <h3 className="text-2xl md:text-2xl">Thank you for your heart to partner</h3>
                <p className="mt-3 leading-relaxed text-charcoal-light">
                    We have received your details and will be in touch soon.
                </p>
                <button type="button" className="mt-6 btn-outline" onClick={() => setStatus('idle')}>
                    Send another form
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white rounded-2xl shadow-warm md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="pt-name" className="label">
                        Your full name
                    </label>
                    <input
                        id="pt-name"
                        type="text"
                        required
                        autoComplete="name"
                        className="input"
                        value={values.name}
                        onChange={update('name')}
                    />
                </div>
                <div>
                    <label htmlFor="pt-email" className="label">
                        Email address
                    </label>
                    <input
                        id="pt-email"
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
                    <label htmlFor="pt-phone" className="label">
                        Phone or WhatsApp (optional)
                    </label>
                    <input
                        id="pt-phone"
                        type="tel"
                        autoComplete="tel"
                        className="input"
                        value={values.phone}
                        onChange={update('phone')}
                    />
                </div>
                <div>
                    <label htmlFor="pt-type" className="label">
                        How would you like to partner?
                    </label>
                    <select
                        id="pt-type"
                        required
                        className="input"
                        value={values.type}
                        onChange={update('type')}
                    >
                        <option value="" disabled>
                            Please choose
                        </option>
                        {partnershipTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="pt-message" className="label">
                    Anything you would like to tell us (optional)
                </label>
                <textarea
                    id="pt-message"
                    className="textarea"
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

            <label className="flex gap-3 items-start text-sm text-charcoal-light">
                <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 shrink-0 accent-burgundy-700"
                    checked={values.consent}
                    onChange={update('consent')}
                />
                <span>
                    I agree to be contacted about partnering with the church. This form does not take any
                    payment.
                </span>
            </label>

            {status === 'error' && (
                <p role="alert" className="text-sm font-semibold text-burgundy-700">
                    We could not send your details just now. Please try again, or contact us directly.
                </p>
            )}

            <button type="submit" className="w-full btn-primary btn-lg" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Become a partner'}
            </button>
        </form>
    );
}