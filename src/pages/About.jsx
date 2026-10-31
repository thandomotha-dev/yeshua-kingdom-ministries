import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import siteConfig from '../data/siteConfig';
import about from '../data/aboutContent';
import Avatar from '../components/common/Avatar';

// Splits "Verse text. — John 3:16" into the verse and its reference
const splitScripture = (value = '') => {
    const index = value.lastIndexOf(' — ');
    if (index === -1) return { quote: value, reference: '' };
    return { quote: value.slice(0, index), reference: value.slice(index + 3) };
};

export default function About() {
    const { mission, vision, values, whatWeBelieve, leadership } = about;
    const missionVerse = splitScripture(mission.scripture);
    const visionVerse = splitScripture(vision.scripture);

    const description = `About ${siteConfig.churchName}: our mission, vision, values, beliefs and leadership.`;

    return (
        <>
            <Helmet>
                <title>{`About Us | ${siteConfig.churchName}`}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${siteConfig.siteUrl}/about`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`About Us | ${siteConfig.churchName}`} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`${siteConfig.siteUrl}${siteConfig.ogImage}`} />
                <meta property="og:url" content={`${siteConfig.siteUrl}/about`} />
            </Helmet>

            {/* Header */}
            <section className="text-white gradient-burgundy" aria-labelledby="about-title">
                <div className="py-16 container-custom md:py-24">
                    <div className="max-w-3xl">
                        <h1 id="about-title" className="text-4xl text-white md:text-5xl">
                            About us
                        </h1>
                        <p className="mt-3 text-2xl italic font-heading text-gold-300">{siteConfig.tagline}</p>
                        <p className="mt-6 text-lg leading-relaxed text-white/85">
                            {siteConfig.shortDescription}
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission and vision */}
            <section className="section" aria-label="Our mission and vision">
                <div className="grid gap-8 container-custom lg:grid-cols-2">
                    <div className="p-8 text-white rounded-2xl gradient-burgundy shadow-warm-lg md:p-10">
                        <h2 className="text-3xl text-white md:text-3xl">{mission.title}</h2>
                        <div className="mt-4 w-16 h-1 rounded-full bg-gold-500" />
                        <p className="mt-5 text-lg leading-relaxed text-white/90">{mission.text}</p>
                        <blockquote className="pl-4 mt-6 italic border-l-4 border-gold-400 font-heading text-white/80">
                            {missionVerse.quote}
                            {missionVerse.reference && (
                                <footer className="mt-2 text-sm not-italic text-gold-300">
                                    {missionVerse.reference}
                                </footer>
                            )}
                        </blockquote>
                    </div>

                    <div className="p-8 bg-white rounded-2xl border-2 border-gold-500 shadow-warm md:p-10">
                        <h2 className="text-3xl md:text-3xl">{vision.title}</h2>
                        <div className="mt-4 w-16 h-1 rounded-full bg-gold-500" />
                        <p className="mt-5 text-lg leading-relaxed text-charcoal-light">{vision.text}</p>
                        <blockquote className="pl-4 mt-6 italic border-l-4 border-burgundy-300 font-heading text-charcoal-light">
                            {visionVerse.quote}
                            {visionVerse.reference && (
                                <footer className="mt-2 text-sm not-italic text-burgundy-600">
                                    {visionVerse.reference}
                                </footer>
                            )}
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-alt" aria-labelledby="values-title">
                <div className="container-custom">
                    <h2 id="values-title" className="section-title">
                        Our values
                    </h2>
                    <div className="section-divider" />
                    <p className="section-subtitle">The convictions that shape everything we do.</p>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {values.map((value) => {
                            const verse = splitScripture(value.scripture);
                            return (
                                <article key={value.title} className="p-6 border-t-4 card-flat border-t-gold-500">
                                    <h3 className="text-xl md:text-xl">{value.title}</h3>
                                    <p className="mt-3 leading-relaxed text-charcoal-light">{value.description}</p>
                                    <p className="mt-4 text-sm italic text-charcoal-lighter">
                                        {verse.quote}
                                        {verse.reference && (
                                            <span className="block mt-1 not-italic font-semibold text-burgundy-600">
                                                {verse.reference}
                                            </span>
                                        )}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* What we believe */}
            <section className="section" aria-labelledby="believe-title">
                <div className="mx-auto max-w-3xl container-custom">
                    <h2 id="believe-title" className="section-title">
                        {whatWeBelieve.title}
                    </h2>
                    <div className="section-divider" />
                    <ul className="mt-8 space-y-4">
                        {whatWeBelieve.beliefs.map((belief) => (
                            <li key={belief} className="flex gap-3 text-charcoal-light">
                                <CheckCircleIcon
                                    className="mt-0.5 h-6 w-6 shrink-0 text-gold-500"
                                    aria-hidden="true"
                                />
                                <span className="leading-relaxed">{belief}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Leadership */}
            <section className="section-alt" aria-labelledby="leaders-title">
                <div className="container-custom">
                    <h2 id="leaders-title" className="section-title">
                        Our leaders
                    </h2>
                    <div className="section-divider" />

                    <div className="grid gap-6 mt-10 md:grid-cols-3">
                        {leadership.map((leader) => (
                            <article key={leader.name} className="flex flex-col items-center p-8 text-center card">
                                <Avatar name={leader.name} src={leader.image} size="h-28 w-28" />
                                <h3 className="mt-5 text-xl md:text-xl">{leader.name}</h3>
                                <p className="mt-1 text-sm font-semibold text-burgundy-600">{leader.title}</p>
                                <p className="mt-4 text-sm leading-relaxed text-charcoal-light">{leader.bio}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to action */}
            <section className="section bg-gold-100" aria-labelledby="visit-title">
                <div className="mx-auto max-w-2xl text-center container-custom">
                    <h2 id="visit-title">Come and see for yourself</h2>
                    <p className="mt-4 leading-relaxed text-charcoal-light">
                        There is a seat waiting for you. Join us for a service, or get in touch with any
                        questions.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center mt-8">
                        <Link to="/service-times" className="btn-primary btn-lg">
                            Service times
                        </Link>
                        <Link to="/contact" className="btn-outline btn-lg">
                            Contact us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}