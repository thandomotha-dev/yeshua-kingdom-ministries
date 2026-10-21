import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import siteConfig from '../data/siteConfig';
import marriageTraining from '../data/marriageTraining';
import books from '../data/books';
import MarriageRegistrationForm from '../components/forms/MarriageRegistrationForm';
import { formatShortDate, isPastDate } from '../utils/dates';

function CheckList({ items }) {
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item} className="flex gap-3 text-charcoal-light">
                    <CheckCircleIcon className="mt-0.5 h-6 w-6 shrink-0 text-gold-500" aria-hidden="true" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function MarriageTraining() {
    const { title, subtitle, overview, whoItsFor, whatYoullLearn, modules, schedule, testimonials } =
        marriageTraining;

    const intakeOver = isPastDate(schedule.endDate);
    const covenantBook = books.find((b) => b.slug === 'covenant-marriage');

    const facts = [
        { label: 'Sessions', value: `${modules.length} sessions` },
        { label: 'When', value: `${schedule.day}, ${schedule.time}` },
        { label: 'Cost', value: schedule.cost },
    ];

    const metaDescription = `${title} at ${siteConfig.churchName}: ${modules.length} sessions for engaged and married couples. Learn communication, conflict, intimacy, finances and more.`;

    return (
        <>
            <Helmet>
                <title>{`${title} | ${siteConfig.churchName}`}</title>
                <meta name="description" content={metaDescription} />
                <link rel="canonical" href={`${siteConfig.siteUrl}/marriage-training`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`${title} | ${siteConfig.churchName}`} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={`${siteConfig.siteUrl}${siteConfig.ogImage}`} />
                <meta property="og:url" content={`${siteConfig.siteUrl}/marriage-training`} />
            </Helmet>

            {/* Hero */}
            <section className="text-white gradient-burgundy" aria-labelledby="marriage-title">
                <div className="py-16 container-custom md:py-24">
                    <div className="max-w-3xl">
                        <h1 id="marriage-title" className="text-4xl text-white md:text-5xl">
                            {title}
                        </h1>
                        <p className="mt-3 text-2xl italic font-heading text-gold-300">{subtitle}</p>
                        <p className="mt-6 text-lg leading-relaxed text-white/85">{overview}</p>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <a href="#register" className="btn-secondary btn-lg">
                                Register your interest
                            </a>
                            <a href="#sessions" className="btn-outline-white btn-lg">
                                See the sessions
                            </a>
                        </div>
                    </div>

                    <dl className="grid gap-6 pt-8 mt-12 border-t border-white/20 sm:grid-cols-3">
                        {facts.map((fact) => (
                            <div key={fact.label}>
                                <dt className="text-sm text-gold-300">{fact.label}</dt>
                                <dd className="mt-1 text-lg font-semibold text-white">{fact.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Who it is for and what you will learn */}
            <section className="section" aria-labelledby="for-title">
                <div className="grid gap-12 container-custom lg:grid-cols-2">
                    <div>
                        <h2 id="for-title">Who this is for</h2>
                        <div className="mx-0 mt-4 section-divider" />
                        <CheckList items={whoItsFor} />
                    </div>
                    <div>
                        <h2>What you will learn</h2>
                        <div className="mx-0 mt-4 section-divider" />
                        <CheckList items={whatYoullLearn} />
                    </div>
                </div>
            </section>

            {/* Sessions */}
            <section id="sessions" className="section-alt scroll-mt-20" aria-labelledby="sessions-title">
                <div className="container-custom">
                    <h2 id="sessions-title" className="section-title">
                        The {modules.length} sessions
                    </h2>
                    <div className="section-divider" />
                    <p className="section-subtitle">
                        Each session builds on the last, with teaching, discussion and time to talk as a couple.
                    </p>

                    <ol className="grid gap-6 md:grid-cols-2">
                        {modules.map((module) => {
                            const [name, ...rest] = module.title.split(' — ');
                            const tagline = rest.join(' — ');
                            return (
                                <li key={module.number} className="flex gap-5 p-6 card-flat">
                                    <span
                                        aria-hidden="true"
                                        className="flex justify-center items-center w-12 h-12 text-xl font-bold rounded-full gradient-burgundy shrink-0 font-heading text-gold-300"
                                    >
                                        {module.number}
                                    </span>
                                    <div>
                                        <h3 className="text-xl md:text-xl">
                                            <span className="sr-only">Session {module.number}: </span>
                                            {name}
                                        </h3>
                                        {tagline && (
                                            <p className="mt-1 italic font-heading text-burgundy-600">{tagline}</p>
                                        )}
                                        <p className="mt-2 text-sm leading-relaxed text-charcoal-light">
                                            {module.description}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </section>

            {/* Schedule */}
            <section className="section" aria-labelledby="schedule-title">
                <div className="mx-auto max-w-3xl container-custom">
                    <h2 id="schedule-title" className="section-title">
                        Dates and details
                    </h2>
                    <div className="section-divider" />

                    <div className="p-6 card-flat md:p-8">
                        {intakeOver ? (
                            <p className="p-4 mb-6 font-semibold rounded-xl bg-gold-50 text-burgundy-700">
                                The next intake dates will be announced soon. Register your interest below and we
                                will let you know first.
                            </p>
                        ) : (
                            <p className="mb-6 text-lg font-semibold text-burgundy-700">
                                {formatShortDate(schedule.startDate)} to {formatShortDate(schedule.endDate)}
                            </p>
                        )}

                        <dl className="divide-y divide-cream-300">
                            {[
                                ['Day and time', `${schedule.day}, ${schedule.time}`],
                                ['Venue', schedule.venue],
                                ['Cost', schedule.cost],
                                ['Registration', schedule.registration],
                            ].map(([label, value]) => (
                                <div key={label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr]">
                                    <dt className="font-semibold text-charcoal">{label}</dt>
                                    <dd className="text-charcoal-light">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {testimonials.length > 0 && (
                <section className="section-alt" aria-labelledby="stories-title">
                    <div className="container-custom">
                        <h2 id="stories-title" className="section-title">
                            Stories from couples
                        </h2>
                        <div className="section-divider" />
                        <div className="grid gap-6 mt-10 md:grid-cols-3">
                            {testimonials.map((t) => (
                                <figure key={t.couple} className="p-6 card-flat">
                                    <blockquote className="leading-relaxed text-charcoal-light">{t.text}</blockquote>
                                    <figcaption className="mt-4">
                                        <span className="block font-semibold text-burgundy-700">{t.couple}</span>
                                        <span className="text-sm text-charcoal-lighter">{t.years}</span>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Registration */}
            <section id="register" className="section scroll-mt-20" aria-labelledby="register-title">
                <div className="mx-auto max-w-2xl container-custom">
                    <h2 id="register-title" className="section-title">
                        Register your interest
                    </h2>
                    <div className="section-divider" />
                    <p className="section-subtitle">
                        Tell us about you and your spouse or fiance(e). {schedule.registration}
                    </p>
                    <MarriageRegistrationForm />
                </div>
            </section>

            {/* Book tie-in */}
            {covenantBook && (
                <section className="section bg-gold-100" aria-labelledby="book-cta-title">
                    <div className="mx-auto max-w-2xl text-center container-custom">
                        <h2 id="book-cta-title">Go deeper with the book</h2>
                        <p className="mt-4 leading-relaxed text-charcoal-light">
                            Pastor John and Sarah Doe share the principles behind this program in{' '}
                            <span className="font-semibold">{covenantBook.title}</span>.
                        </p>
                        <Link to={`/books/${covenantBook.slug}`} className="mt-8 btn-primary btn-lg">
                            See the book
                        </Link>
                    </div>
                </section>
            )}
        </>
    );
}