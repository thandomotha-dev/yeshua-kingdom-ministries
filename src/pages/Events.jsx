import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

import siteConfig from '../data/siteConfig';
import events, { eventCategories } from '../data/events';
import EventCard, { hasRsvpLink } from '../components/events/EventCard';
import AddToCalendar from '../components/events/AddToCalendar';
import { formatEventDates, formatEventTimes, getUpcomingEvents } from '../utils/dates';

export default function Events() {
    const [category, setCategory] = useState('All');

    const upcoming = useMemo(() => getUpcomingEvents(events), []);
    const featured = upcoming.find((e) => e.featured) || upcoming[0];

    // Only offer categories that actually have an upcoming event
    const categories = useMemo(() => {
        const present = new Set(upcoming.map((e) => e.category));
        return [
            'All',
            ...eventCategories.filter((c) => c !== 'All' && present.has(c)),
            ...[...present].filter((c) => !eventCategories.includes(c)),
        ];
    }, [upcoming]);

    const visibleEvents = category === 'All' ? upcoming : upcoming.filter((e) => e.category === category);

    const description = `Upcoming events at ${siteConfig.churchName}: conferences, marriage retreats, youth nights, outreach and more.`;

    return (
        <>
            <Helmet>
                <title>{`Events | ${siteConfig.churchName}`}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${siteConfig.siteUrl}/events`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Events | ${siteConfig.churchName}`} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`${siteConfig.siteUrl}${siteConfig.ogImage}`} />
                <meta property="og:url" content={`${siteConfig.siteUrl}/events`} />
            </Helmet>

            {/* Header and featured event */}
            <section className="text-white gradient-burgundy" aria-labelledby="events-page-title">
                <div className="py-14 container-custom md:py-20">
                    <h1 id="events-page-title" className="text-4xl text-white md:text-5xl">
                        Events
                    </h1>
                    <p className="mt-3 max-w-xl text-lg text-white/85">
                        There is always something happening. Find an event, bring a friend and join in.
                    </p>

                    {featured && (
                        <div className="p-6 mt-10 max-w-3xl rounded-2xl border border-white/20 bg-white/10 md:p-8">
                            <span className="badge bg-gold-500 text-burgundy-900">Next big event</span>
                            <h2 className="mt-4 text-3xl text-white md:text-3xl">{featured.title}</h2>
                            <ul className="mt-4 space-y-2 text-white/85">
                                <li className="flex gap-2">
                                    <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                                    <span>
                                        {formatEventDates(featured)}, {formatEventTimes(featured).toLowerCase()}
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                                    <span>{featured.location}</span>
                                </li>
                            </ul>
                            <p className="mt-4 leading-relaxed text-white/85">{featured.description}</p>
                            <div className="flex flex-wrap gap-4 items-center mt-6">
                                {hasRsvpLink(featured) ? (
                                    <a
                                        href={featured.rsvpLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary"
                                    >
                                        Register or RSVP
                                    </a>
                                ) : (
                                    <Link to="/contact" className="btn-secondary">
                                        Ask about this event
                                    </Link>
                                )}
                            </div>
                            <div className="mt-4">
                                <AddToCalendar event={featured} variant="dark" />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Event list */}
            <section className="section" aria-labelledby="all-events-title">
                <div className="mx-auto max-w-4xl container-custom">
                    <h2 id="all-events-title" className="section-title">
                        All upcoming events
                    </h2>
                    <div className="section-divider" />

                    {upcoming.length > 0 ? (
                        <>
                            <div
                                role="group"
                                aria-label="Filter events by category"
                                className="flex flex-wrap gap-2 justify-center mb-8"
                            >
                                {categories.map((c) => {
                                    const active = c === category;
                                    return (
                                        <button
                                            key={c}
                                            type="button"
                                            aria-pressed={active}
                                            onClick={() => setCategory(c)}
                                            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${active
                                                    ? 'border-burgundy-700 bg-burgundy-700 text-white'
                                                    : 'border-cream-300 bg-white text-charcoal hover:border-burgundy-500 hover:text-burgundy-700'
                                                }`}
                                        >
                                            {c === 'All' ? 'All events' : c}
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="mb-6 text-sm text-charcoal-lighter" aria-live="polite">
                                {visibleEvents.length} {visibleEvents.length === 1 ? 'event' : 'events'}
                            </p>

                            <div className="space-y-6">
                                {visibleEvents.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="px-6 py-12 mt-8 text-center bg-white rounded-2xl border border-cream-300">
                            <h3 className="text-xl md:text-xl">No upcoming events right now</h3>
                            <p className="mt-2 text-charcoal-lighter">
                                New events are announced regularly. Follow us on social media or get in touch to
                                hear first.
                            </p>
                            <Link to="/contact" className="mt-6 btn-primary">
                                Contact us
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}