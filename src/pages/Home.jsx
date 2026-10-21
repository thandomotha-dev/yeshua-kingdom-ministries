import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

import siteConfig from '../data/siteConfig';
import { serviceTimes } from '../data/serviceTimes';
import sermons from '../data/sermons';
import events from '../data/events';
import books from '../data/books';
import LiteYouTube from '../components/media/LiteYouTube';
import BookCover from '../components/books/BookCover';
import {
    formatPrice,
    getShortDescription,
    getStartingPrice,
} from '../components/books/bookUtils';
import {
    formatEventDates,
    formatEventTimes,
    formatLongDate,
    getDateBadge,
    getUpcomingEvents,
} from '../utils/dates';

const SNAPSHOT_IDS = ['main-service', 'youth-service', 'kids-ministry'];

export default function Home() {
    const mainService = serviceTimes.find((s) => s.id === 'main-service');
    const snapshot = SNAPSHOT_IDS.map((id) => serviceTimes.find((s) => s.id === id)).filter(Boolean);

    const latestSermon = [...sermons].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    const upcomingEvents = getUpcomingEvents(events).slice(0, 3);
    const featuredBook = books.find((b) => b.featured) || books[0];
    const bookPrice = featuredBook ? getStartingPrice(featuredBook) : null;

    const pageTitle = `${siteConfig.churchName} | ${siteConfig.tagline}`;

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={siteConfig.shortDescription} />
                <link rel="canonical" href={siteConfig.siteUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={siteConfig.shortDescription} />
                <meta property="og:image" content={`${siteConfig.siteUrl}${siteConfig.ogImage}`} />
                <meta property="og:url" content={siteConfig.siteUrl} />
            </Helmet>

            {/* Hero */}
            {/* TODO: add a church photo by placing it in /public/images/ and using it as a background here */}
            <section className="text-white gradient-burgundy" aria-labelledby="hero-title">
                <div className="py-20 container-custom md:py-32">
                    <div className="max-w-3xl">
                        <h1 id="hero-title" className="text-5xl text-white md:text-6xl lg:text-display">
                            {siteConfig.churchName}
                        </h1>
                        <p className="mt-4 text-2xl italic font-heading text-gold-300">{siteConfig.tagline}</p>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                            {siteConfig.shortDescription}
                        </p>

                        {mainService && (
                            <p className="mt-6 text-white/85">
                                Join us {mainService.day}s at{' '}
                                <span className="font-semibold text-white">{mainService.time}</span> for our main
                                service.
                            </p>
                        )}

                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link to="/service-times" className="btn-secondary btn-lg">
                                Join us this Sunday
                            </Link>
                            <Link to="/sermons" className="btn-outline-white btn-lg">
                                Watch a message
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service times */}
            <section className="section" aria-labelledby="services-title">
                <div className="container-custom">
                    <h2 id="services-title" className="section-title">
                        When we meet
                    </h2>
                    <div className="section-divider" />
                    <p className="section-subtitle">
                        There is a place for every age. Come as you are and bring your family.
                    </p>

                    <div className="grid gap-6 md:grid-cols-3">
                        {snapshot.map((service) => (
                            <article key={service.id} className="p-6 text-center card">
                                <h3 className="text-2xl md:text-2xl">{service.name}</h3>
                                <p className="mt-2 font-semibold text-burgundy-700">
                                    {service.day}, {service.time} to {service.endTime}
                                </p>
                                <p className="mt-1 text-sm text-charcoal-lighter">
                                    {service.venue || 'Main church building'}
                                    {service.ageGroup ? `, ages ${service.ageGroup}` : ''}
                                </p>
                                <p className="mt-3 text-sm leading-relaxed text-charcoal-light">
                                    {service.description}
                                </p>
                            </article>
                        ))}
                    </div>

                    <p className="mt-8 text-center">
                        <Link to="/service-times" className="btn-outline">
                            All service times and visitor info
                        </Link>
                    </p>
                </div>
            </section>

            {/* Latest sermon */}
            {latestSermon && (
                <section className="section-alt" aria-labelledby="sermon-title">
                    <div className="container-custom grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
                        <LiteYouTube
                            key={latestSermon.id}
                            videoId={latestSermon.youtubeId}
                            title={latestSermon.title}
                            thumbnail={latestSermon.thumbnail}
                        />

                        <div>
                            <span className="badge-gold">Latest message</span>
                            <h2 id="sermon-title" className="mt-4">
                                {latestSermon.title}
                            </h2>
                            <p className="mt-2 text-sm text-charcoal-lighter">
                                {latestSermon.speaker}, {formatLongDate(latestSermon.date)}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-burgundy-600">
                                Series: {latestSermon.series}
                            </p>
                            <p className="mt-4 leading-relaxed text-charcoal-light">
                                {latestSermon.description}
                            </p>
                            <Link to="/sermons" className="mt-6 btn-primary">
                                Watch more sermons
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Upcoming events */}
            <section className="section" aria-labelledby="events-title">
                <div className="container-custom">
                    <h2 id="events-title" className="section-title">
                        Upcoming events
                    </h2>
                    <div className="section-divider" />

                    {upcomingEvents.length > 0 ? (
                        <>
                            <p className="section-subtitle">
                                There is always something happening. Find an event and join in.
                            </p>
                            <div className="grid gap-6 md:grid-cols-3">
                                {upcomingEvents.map((event) => {
                                    const badge = getDateBadge(event.date);
                                    return (
                                        <article key={event.id} className="flex flex-col p-6 card">
                                            <div className="flex gap-4 items-start">
                                                <div
                                                    className="flex flex-col justify-center items-center w-16 h-16 text-white rounded-xl gradient-burgundy shrink-0"
                                                    aria-hidden="true"
                                                >
                                                    <span className="text-2xl font-bold leading-none font-heading">
                                                        {badge.day}
                                                    </span>
                                                    <span className="mt-1 text-xs text-gold-300">{badge.month}</span>
                                                </div>
                                                <div>
                                                    <span className="badge-burgundy">{event.category}</span>
                                                    <h3 className="mt-2 text-xl md:text-xl">{event.title}</h3>
                                                </div>
                                            </div>

                                            <ul className="mt-4 space-y-2 text-sm text-charcoal-light">
                                                <li className="flex gap-2">
                                                    <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                                                    <span>
                                                        {formatEventDates(event)}
                                                        <br />
                                                        {formatEventTimes(event)}
                                                    </span>
                                                </li>
                                                <li className="flex gap-2">
                                                    <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                                                    <span>{event.location}</span>
                                                </li>
                                            </ul>
                                        </article>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <p className="section-subtitle">
                            New events will be announced soon. Check back, or follow us on social media.
                        </p>
                    )}

                    <p className="mt-8 text-center">
                        <Link to="/events" className="btn-outline">
                            See all events
                        </Link>
                    </p>
                </div>
            </section>

            {/* Featured book */}
            {featuredBook && (
                <section className="section-alt" aria-labelledby="book-title">
                    <div className="container-custom grid items-center gap-10 md:grid-cols-[16rem_1fr] md:gap-14">
                        <Link
                            to={`/books/${featuredBook.slug}`}
                            aria-label={`View ${featuredBook.title}`}
                            className="block mx-auto w-48 md:w-full"
                        >
                            <BookCover book={featuredBook} />
                        </Link>

                        <div>
                            <span className="badge-gold">Featured book</span>
                            <h2 id="book-title" className="mt-4">
                                {featuredBook.title}
                            </h2>
                            <p className="mt-2 text-lg italic font-heading text-burgundy-600">
                                {featuredBook.subtitle}
                            </p>
                            <p className="mt-1 text-sm text-charcoal-lighter">by {featuredBook.author}</p>
                            <p className="mt-4 max-w-xl leading-relaxed text-charcoal-light">
                                {getShortDescription(featuredBook)}
                            </p>
                            {bookPrice && (
                                <p className="mt-4 font-semibold text-burgundy-700">
                                    From {formatPrice(bookPrice.price, bookPrice.currency)}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-4 mt-6">
                                <Link to={`/books/${featuredBook.slug}`} className="btn-primary">
                                    View this book
                                </Link>
                                <Link to="/books" className="btn-outline">
                                    Browse all books
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Prayer request call to action */}
            <section className="section bg-gold-100" aria-labelledby="prayer-title">
                <div className="mx-auto max-w-2xl text-center container-custom">
                    <h2 id="prayer-title">How can we pray for you?</h2>
                    <p className="mt-4 leading-relaxed text-charcoal-light">
                        Whatever you are facing, you do not have to carry it alone. Share your request and our
                        prayer team will stand with you.
                    </p>
                    <Link to="/prayer-request" className="mt-8 btn-primary btn-lg">
                        Send a prayer request
                    </Link>
                </div>
            </section>
        </>
    );
}