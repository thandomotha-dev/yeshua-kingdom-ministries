import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

import siteConfig from '../data/siteConfig';
import ContactForm from '../components/forms/ContactForm';

const socialLabels = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    youtube: 'YouTube',
    twitter: 'X (Twitter)',
    tiktok: 'TikTok',
    spotify: 'Spotify',
    apple: 'Apple Podcasts',
};

const digitsOnly = (value) => value.replace(/[^\d+]/g, '');

export default function Contact() {
    const { address, phone, email, whatsapp, social } = siteConfig;
    const socialLinks = Object.entries(social).filter(([, url]) => url);

    const fullAddress = `${address.street}, ${address.city}, ${address.province} ${address.postalCode}, ${address.country}`;
    const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${siteConfig.churchName}, ${fullAddress}`
    )}`;

    const description = `Get in touch with ${siteConfig.churchName} in ${address.city}. Call, email, send a message or come and visit us.`;

    return (
        <>
            <Helmet>
                <title>{`Contact Us | ${siteConfig.churchName}`}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${siteConfig.siteUrl}/contact`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Contact Us | ${siteConfig.churchName}`} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`${siteConfig.siteUrl}${siteConfig.ogImage}`} />
                <meta property="og:url" content={`${siteConfig.siteUrl}/contact`} />
            </Helmet>

            {/* Header */}
            <section className="text-white gradient-burgundy" aria-labelledby="contact-page-title">
                <div className="py-16 container-custom md:py-24">
                    <div className="max-w-2xl">
                        <h1 id="contact-page-title" className="text-4xl text-white md:text-5xl">
                            Contact us
                        </h1>
                        <p className="mt-4 text-lg leading-relaxed text-white/85">
                            We would love to hear from you. Send us a message, give us a call, or come and visit.
                        </p>
                    </div>
                </div>
            </section>

            {/* Details and form */}
            <section className="section" aria-labelledby="contact-details-title">
                <div className="container-custom grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
                    <div>
                        <h2 id="contact-details-title">Get in touch</h2>
                        <div className="mx-0 mt-4 section-divider" />

                        <ul className="space-y-6 text-charcoal-light">
                            <li className="flex gap-4">
                                <MapPinIcon className="mt-1 w-6 h-6 shrink-0 text-gold-600" aria-hidden="true" />
                                <div>
                                    <span className="block font-semibold text-charcoal">Visit us</span>
                                    <address className="not-italic">
                                        {address.street}
                                        <br />
                                        {address.city}, {address.province} {address.postalCode}
                                        <br />
                                        {address.country}
                                    </address>
                                    <a
                                        href={directionsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-1 font-semibold underline text-burgundy-700"
                                    >
                                        Get directions
                                    </a>
                                </div>
                            </li>

                            <li className="flex gap-4">
                                <PhoneIcon className="mt-1 w-6 h-6 shrink-0 text-gold-600" aria-hidden="true" />
                                <div>
                                    <span className="block font-semibold text-charcoal">Call us</span>
                                    <a href={`tel:${digitsOnly(phone)}`} className="hover:text-burgundy-700">
                                        {phone}
                                    </a>
                                    {whatsapp && (
                                        <>
                                            <br />
                                            <a
                                                href={`https://wa.me/${digitsOnly(whatsapp).replace('+', '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-semibold underline text-burgundy-700"
                                            >
                                                Message us on WhatsApp
                                            </a>
                                        </>
                                    )}
                                </div>
                            </li>

                            <li className="flex gap-4">
                                <EnvelopeIcon className="mt-1 w-6 h-6 shrink-0 text-gold-600" aria-hidden="true" />
                                <div>
                                    <span className="block font-semibold text-charcoal">Email us</span>
                                    <a href={`mailto:${email}`} className="break-all hover:text-burgundy-700">
                                        {email}
                                    </a>
                                </div>
                            </li>
                        </ul>

                        <p className="mt-8 text-charcoal-light">
                            Planning a visit? See our{' '}
                            <Link to="/service-times" className="font-semibold underline text-burgundy-700">
                                service times
                            </Link>
                            . Need prayer?{' '}
                            <Link to="/prayer-request" className="font-semibold underline text-burgundy-700">
                                Send a prayer request
                            </Link>
                            .
                        </p>

                        {socialLinks.length > 0 && (
                            <div className="mt-8">
                                <p className="font-semibold text-charcoal">Follow us</p>
                                <ul className="flex flex-wrap gap-2 mt-3">
                                    {socialLinks.map(([key, url]) => (
                                        <li key={key}>
                                            <a
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block rounded-full border border-cream-300 bg-white px-4 py-1.5 text-sm font-semibold text-charcoal hover:border-burgundy-500 hover:text-burgundy-700"
                                            >
                                                {socialLabels[key] || key}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div>
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* Map */}
            {siteConfig.mapEmbedUrl && (
                <section className="section-alt" aria-labelledby="map-title">
                    <div className="container-custom">
                        <h2 id="map-title" className="section-title">
                            Find us on the map
                        </h2>
                        <div className="section-divider" />
                        {/* TODO: replace mapEmbedUrl in siteConfig.js with your real Google Maps embed link */}
                        <div className="overflow-hidden mt-8 h-96 rounded-2xl border border-cream-300 shadow-warm">
                            <iframe
                                title={`Map showing the location of ${siteConfig.churchName}`}
                                src={siteConfig.mapEmbedUrl}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                                className="w-full h-full border-0"
                            />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}