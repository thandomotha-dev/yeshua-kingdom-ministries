import { Link } from 'react-router-dom';
import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/outline';

import siteConfig from '../../data/siteConfig';
import navigation from '../../data/navigation';
import { serviceTimes } from '../../data/serviceTimes';

// Flatten dropdown items so every page gets a link in the footer
const footerLinks = navigation.flatMap((item) =>
    item.children ? item.children : item.path === '#' ? [] : [item]
);

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

export default function Footer() {
    const { address, phone, email, whatsapp, social } = siteConfig;
    const socialLinks = Object.entries(social).filter(([, url]) => url);

    return (
        <footer className="bg-burgundy-900 text-white/80">
            <div className="container-custom grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
                {/* About */}
                <div>
                    <h2 className="font-heading text-xl font-bold text-white">
                        {siteConfig.churchName}
                    </h2>
                    <p className="mt-1 font-heading italic text-gold-400">{siteConfig.tagline}</p>
                    <p className="mt-4 text-sm leading-relaxed">{siteConfig.shortDescription}</p>

                    {socialLinks.length > 0 && (
                        <ul className="mt-6 flex flex-wrap gap-2">
                            {socialLinks.map(([key, url]) => (
                                <li key={key}>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block rounded-full border border-white/25 px-3 py-1 text-xs font-semibold text-white hover:border-gold-400 hover:text-gold-400"
                                    >
                                        {socialLabels[key] || key}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Quick links */}
                <div>
                    <h3 className="font-heading text-lg font-bold text-gold-400">Explore</h3>
                    <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        {footerLinks.map((link) => (
                            <li key={link.path}>
                                <Link to={link.path} className="hover:text-gold-400">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Service times */}
                <div>
                    <h3 className="font-heading text-lg font-bold text-gold-400">Join us</h3>
                    <ul className="mt-4 space-y-3 text-sm">
                        {serviceTimes.map((service) => (
                            <li key={service.id}>
                                <span className="block font-semibold text-white">{service.name}</span>
                                <span>
                                    {service.day}, {service.time}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <Link to="/service-times" className="mt-4 inline-block text-sm font-semibold text-gold-400 hover:underline">
                        Plan your visit
                    </Link>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-heading text-lg font-bold text-gold-400">Contact us</h3>
                    <ul className="mt-4 space-y-3 text-sm">
                        <li className="flex gap-3">
                            <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
                            <address className="not-italic">
                                {address.street}
                                <br />
                                {address.city}, {address.province} {address.postalCode}
                                <br />
                                {address.country}
                            </address>
                        </li>
                        <li className="flex gap-3">
                            <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
                            <a href={`tel:${digitsOnly(phone)}`} className="hover:text-gold-400">
                                {phone}
                            </a>
                        </li>
                        <li className="flex gap-3">
                            <EnvelopeIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
                            <a href={`mailto:${email}`} className="break-all hover:text-gold-400">
                                {email}
                            </a>
                        </li>
                        {whatsapp && (
                            <li>
                                <a
                                    href={`https://wa.me/${digitsOnly(whatsapp).replace('+', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary btn-sm"
                                >
                                    Message us on WhatsApp
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="container-custom flex flex-col items-center justify-between gap-2 py-6 text-xs sm:flex-row">
                    <p>
                        &copy; {new Date().getFullYear()} {siteConfig.churchName}. All rights reserved.
                    </p>
                    <p>
                        {/* TODO: create a Privacy Policy page and add its route in App.jsx */}
                        <Link to="/privacy" className="hover:text-gold-400">
                            Privacy policy
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}