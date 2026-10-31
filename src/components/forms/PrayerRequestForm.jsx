import { useState } from 'react';
import { Link } from 'react-router-dom';

import { submitForm } from '../../services/submitForm';

const ENDPOINT = import.meta.env.VITE_PRAYER_FORM_ENDPOINT || import.meta.env.VITE_FORM_ENDPOINT;

const MAX_LENGTH = 2000;

const topics = [
    'Healing',
    'Family and relationships',
    'Finances and provision',
    'Guidance and decisions',
    'Salvation',
    'Thanksgiving and praise',
    'Something else',
];

const visibilityOptions = [
    {
        value: 'private',
        title: 'Keep this private',
        help: 'Only our pastors and prayer leaders will see it.',
    },
    {
        value: 'team',
        title: 'Share with our prayer team',
        help: 'Our wider prayer team can stand in prayer with you.',
    },
];

const emptyForm = {
    name: '',
    email: '',
    topic: '',
    request: '',
    visibility: 'private',
    followUp: false,
};

export default function PrayerRequestForm() {
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
                data: { form: 'prayer-request', ...values },
            });
            setStatus('success');
            setValues(emptyForm);
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div role="status" className="p-8 text-center bg-white rounded-2xl shadow-warm md:p-10">
                <h3 className="text-2xl md:text-2xl">We have received your request</h3>
                <p className="mt-3 leading-relaxed text-charcoal-light">
                    Thank you for trusting us with this. We are praying with you, and you are not alone.
                </p>
                <button type="button" className="mt-6 btn-outline" onClick={() => setStatus('idle')}>
                    Send another request
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white rounded-2xl shadow-warm md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="pr-name" className="label">
                        Your name (optional)
                    </label>
                    <input
                        id="pr-name"
                        type="text"
                        autoComplete="name"
                        className="input"
                        value={values.name}
                        onChange={update('name')}
                    />
                </div>
                <div>
                    <label htmlFor="pr-email" className="label">
                        Email address {values.followUp ? '' : '(optional)'}
                    </label>
                    <input
                        id="pr-email"
                        type="email"
                        autoComplete="email"
                        required={values.followUp}
                        className="input"
                        value={values.email}
                        onChange={update('email')}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="pr-topic" className="label">
                    What is this about? (optional)
                </label>
                <select id="pr-topic" className="input" value={values.topic} onChange={update('topic')}>
                    <option value="">Choose a topic</option>
                    {topics.map((topic) => (
                        <option key={topic} value={topic}>
                            {topic}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="pr-request" className="label">
                    How can we pray for you?
                </label>
                <textarea
                    id="pr-request"
                    required
                    maxLength={MAX_LENGTH}
                    className="textarea min-h-[160px]"
                    value={values.request}
                    onChange={update('request')}
                />
                <p className="mt-1 text-xs text-right text-charcoal-lighter">
                    {values.request.length} of {MAX_LENGTH} characters
                </p>
            </div>

            <fieldset>
                <legend className="label">Who may see your request?</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                    {visibilityOptions.map((option) => {
                        const checked = values.visibility === option.value;
                        return (
                            <label
                                key={option.value}
                                className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${checked
                                        ? 'border-burgundy-500 bg-burgundy-50'
                                        : 'bg-white border-cream-300 hover:border-burgundy-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="visibility"
                                    value={option.value}
                                    checked={checked}
                                    onChange={update('visibility')}
                                    className="mt-1 w-4 h-4 shrink-0 accent-burgundy-700"
                                />
                                <span>
                                    <span className="block font-semibold text-charcoal">{option.title}</span>
                                    <span className="mt-0.5 block text-sm text-charcoal-lighter">{option.help}</span>
                                </span>
                            </label>
                        );
                    })}
                </div>
            </fieldset>

            <label className="flex gap-3 items-start text-sm text-charcoal-light">
                <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 shrink-0 accent-burgundy-700"
                    checked={values.followUp}
                    onChange={update('followUp')}
                />
                <span>I would like someone from the church to follow up with me (please add your email).</span>
            </label>

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
                    We could not send your request just now. Please try again, or{' '}
                    <Link to="/contact" className="underline">
                        contact us directly
                    </Link>
                    .
                </p>
            )}

            <button type="submit" className="w-full btn-primary btn-lg" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send my prayer request'}
            </button>
        </form>
    );
}