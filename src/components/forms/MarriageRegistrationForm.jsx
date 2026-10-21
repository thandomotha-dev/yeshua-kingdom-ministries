import { useState } from 'react';

import { submitForm } from '../../services/submitForm';

const ENDPOINT =
    import.meta.env.VITE_MARRIAGE_FORM_ENDPOINT || import.meta.env.VITE_FORM_ENDPOINT;

const relationshipOptions = [
    'Engaged',
    'Married 0 to 5 years',
    'Married 6 to 15 years',
    'Married over 15 years',
];

const emptyForm = {
    yourName: '',
    partnerName: '',
    email: '',
    phone: '',
    status: '',
    message: '',
    consent: false,
};

export default function MarriageRegistrationForm() {
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
            await submitForm({
                endpoint: ENDPOINT,
                data: { form: 'marriage-training', ...values },
            });
            setStatus('success');
            setValues(emptyForm);
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div role="status" className="p-8 text-center bg-white rounded-2xl shadow-warm">
                <h3 className="text-2xl md:text-2xl">Thank you!</h3>
                <p className="mt-3 text-charcoal-light">
                    We have received your details and will contact you soon about the next intake.
                </p>
                <button type="button" className="mt-6 btn-outline" onClick={() => setStatus('idle')}>
                    Register another couple
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white rounded-2xl shadow-warm md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="mt-your-name" className="label">
                        Your full name
                    </label>
                    <input
                        id="mt-your-name"
                        type="text"
                        required
                        autoComplete="name"
                        className="input"
                        value={values.yourName}
                        onChange={update('yourName')}
                    />
                </div>
                <div>
                    <label htmlFor="mt-partner-name" className="label">
                        Your spouse or fiance(e) full name
                    </label>
                    <input
                        id="mt-partner-name"
                        type="text"
                        required
                        className="input"
                        value={values.partnerName}
                        onChange={update('partnerName')}
                    />
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="mt-email" className="label">
                        Email address
                    </label>
                    <input
                        id="mt-email"
                        type="email"
                        required
                        autoComplete="email"
                        className="input"
                        value={values.email}
                        onChange={update('email')}
                    />
                </div>
                <div>
                    <label htmlFor="mt-phone" className="label">
                        Phone or WhatsApp number
                    </label>
                    <input
                        id="mt-phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        className="input"
                        value={values.phone}
                        onChange={update('phone')}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="mt-status" className="label">
                    Where are you in your relationship?
                </label>
                <select
                    id="mt-status"
                    required
                    className="input"
                    value={values.status}
                    onChange={update('status')}
                >
                    <option value="" disabled>
                        Please choose
                    </option>
                    {relationshipOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="mt-message" className="label">
                    Anything you would like us to know (optional)
                </label>
                <textarea
                    id="mt-message"
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
                    I agree to be contacted about the Kingdom Marriage Training program. Your details are kept
                    private and used only for this purpose.
                </span>
            </label>

            {status === 'error' && (
                <p role="alert" className="text-sm font-semibold text-burgundy-700">
                    We could not send your details just now. Please try again, or contact us directly.
                </p>
            )}

            <button type="submit" className="w-full btn-primary btn-lg" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Register your interest'}
            </button>
        </form>
    );
}