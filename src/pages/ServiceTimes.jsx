import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

import siteConfig from '../data/siteConfig';
import { serviceTimes, visitFAQ } from '../data/serviceTimes';
import ServiceCard from '../components/services/ServiceCard';
import VisitFAQ from '../components/services/VisitFAQ';

const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const digitsOnly = (value) => value.replace(/[^\d+]/g, '');

export default function ServiceTimes() {
    const { address, phone, whatsapp } = siteConfig;

    const sundayServices = serviceTimes.filter((s) => s.day === 'Sunday');
    const weekServices = serviceTimes
        .filter((s) => s.day !== 'Sunday')
        .sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

    const fullAddress = `${address.street}, ${address.city}, ${address.province} ${address.postalCode}, ${address.country}`;
    const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${siteConfig.churchName}, ${fullAddress}`
    )}`;

    const description = `Join us for Sunday worship, youth service and kids ministry at ${siteConfig.churchName} in ${address.city}. See times, location and what to expect.`;

    return (
        <>
            <Helmet>
                <title>{`Service Times | ${siteConfig.churchName}`}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${siteConfig.siteUrl}/service-times`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Service Times | ${siteConfig.churchName}`} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`${siteConfig.siteUrl}${siteConfig.ogImage}`} />
                <meta property="og:url" content={`${siteConfig.siteUrl}/service-times`} />
            </Helmet>

            {/* Header */}
            <section className="gradient-burgundy text-white" aria-labelledby="services-page-title">
                <div className="container-custom py-16 md:py-24">
                    <div className="max-w-2xl">
                        <h1 id="services-page-title" className="text-4xl text-white md:text-5xl">
                            Service times
                        </h1>
                        <p className="mt-4 text-lg leading-relaxed text-white/85">
                            There is a place for every age and every season. Come as you are, and bring your
                            family and friends.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-lg">
                                Get directions
                            </a>
                            <a href="#plan" className="btn-outline-white btn-lg">
                                Plan your visit
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sunday */}
            {sundayServices.length > 0 && (
                <section className="section" aria-labelledby="sunday-title">
                    <div className="container-custom">
                        <h2 id="sunday-title" className="section-title">
                            Sundays
                        </h2>
                        <div className="section-divider" />
                        <div className="mt-10 grid gap-6 md:grid-cols-2">
                            {sundayServices.map((service) => (
                                <ServiceCard key={service.id} service={service} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* During the week */}
            {weekServices.length > 0 && (
                <section className="section-alt" aria-labelledby="week-title">
                    <div className="container-custom">
                        <h2 id="week-title" className="section-title">
                            During the week
                        </h2>
                        <div className="section-divider" />
                        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {weekServices.map((service) => (
                                <ServiceCard key={service.id} service={service} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Location */}
            <section className="section" aria-labelledby="location-title">
                <div className="container-custom">
                    <h2 id="location-title" className="section-title">
                        Find us
                    </h2>
                    <div className="section-divider" />

                    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
                        <div className="card-flat p-6">
                            <h3 className="text-2xl md:text-2xl">{siteConfig.churchName}</h3>
                            <ul className="mt-5 space-y-4 text-charcoal-light">
                                <li className="flex gap-3">
                                    <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                                    <address className="not-italic">
                                        {address.street}
                                        <br />
                                        {address.city}, {address.province} {address.postalCode}
                                        <br />
                                        {address.country}
                                    </address>
                                </li>
                                <li className="flex gap-3">
                                    <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                                    <a href={`tel:${digitsOnly(phone)}`} className="hover:text-burgundy-700">
                                        {phone}
                                    </a>
                                </li>
                            </ul>
                            <a
                                href={directionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary mt-6 w-full"
                            >
                                Get directions in Google Maps
                            </a>
                        </div>

                        {/* TODO: replace mapEmbedUrl in siteConfig.js with your real Google Maps embed link */}
                        <div className="min-h-[18rem] overflow-hidden rounded-2xl border border-cream-300 bg-cream-200 shadow-warm lg:min-h-[24rem]">
                            {siteConfig.mapEmbedUrl ? (
                                <iframe
                                    title={`Map showing the location of ${siteConfig.churchName}`}
                                    src={siteConfig.mapEmbedUrl}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                    className="h-full min-h-[18rem] w-full border-0 lg:min-h-[24rem]"
                                />
                            ) : (
                                <p className="p-8 text-center text-charcoal-lighter">
                                    Map coming soon. Use the directions button to find us.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Plan your visit */}
            <section id="plan" className="section-alt scroll-mt-20" aria-labelledby="plan-title">
                <div className="container-custom mx-auto max-w-3xl">
                    <h2 id="plan-title" className="section-title">
                        Plan your visit
                    </h2>
                    <div className="section-divider" />
                    <p className="section-subtitle">
                        Visiting for the first time? Here is what you need to know.
                    </p>
                    <VisitFAQ items={visitFAQ} />
                </div>
            </section>

            {/* Contact call to action */}
            <section className="section bg-gold-100" aria-labelledby="questions-title">
                <div className="container-custom mx-auto max-w-2xl text-center">
                    <h2 id="questions-title">Still have a question?</h2>
                    <p className="mt-4 leading-relaxed text-charcoal-light">
                        We would love to hear from you. Send us a message and we will help you plan your first
                        visit.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link to="/contact" className="btn-primary btn-lg">
                            Contact us
                        </Link>
                        {whatsapp && (
                            <a
                                href={`https://wa.me/${digitsOnly(whatsapp).replace('+', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline btn-lg"
                            >
                                Message us on WhatsApp
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}