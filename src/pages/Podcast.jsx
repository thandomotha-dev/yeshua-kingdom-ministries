import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import siteConfig from '../data/siteConfig';
import podcasts, { podcastPlatforms } from '../data/podcasts';
import EpisodeCard from '../components/podcast/EpisodeCard';
import { isRealLink } from '../utils/links';

// Google Podcasts was shut down in 2024, so it is not offered here.
const platformLinks = [
    ['spotify', 'Listen on Spotify'],
    ['apple', 'Listen on Apple Podcasts'],
    ['youtube', 'Watch on YouTube'],
].filter(([key]) => isRealLink(podcastPlatforms[key]));

export default function Podcast() {
    const [series, setSeries] = useState('All');

    const sorted = useMemo(
        () => [...podcasts].sort((a, b) => new Date(b.date) - new Date(a.date)),
        []
    );
    const latest = sorted[0];
    const rest = sorted.slice(1);

    const seriesList = useMemo(() => ['All', ...new Set(rest.map((e) => e.series))], [rest]);
    const visible = series === 'All' ? rest : rest.filter((e) => e.series === series);

    const description = `Listen to the ${siteConfig.churchName} podcast: honest conversations on faith, marriage, family and life.`;

    return (
        <>
            <Helmet>
                <title>{`Podcast | ${siteConfig.churchName}`}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${siteConfig.siteUrl}/podcast`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Podcast | ${siteConfig.churchName}`} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`${siteConfig.siteUrl}${siteConfig.ogImage}`} />
                <meta property="og:url" content={`${siteConfig.siteUrl}/podcast`} />
            </Helmet>

            {/* Header */}
            <section className="text-white gradient-burgundy" aria-labelledby="podcast-title">
                <div className="py-16 container-custom md:py-24">
                    <div className="max-w-2xl">
                        <h1 id="podcast-title" className="text-4xl text-white md:text-5xl">
                            Podcast
                        </h1>
                        <p className="mt-4 text-lg leading-relaxed text-white/85">
                            Honest conversations on faith, marriage, family and life. Listen at home, in the car
                            or wherever you are.
                        </p>

                        {platformLinks.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-8">
                                {platformLinks.map(([key, label]) => (
                                    <a
                                        key={key}
                                        href={podcastPlatforms[key]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-outline-white"
                                    >
                                        {label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Latest episode */}
            {latest && (
                <section className="section" aria-labelledby="latest-episode-title">
                    <div className="mx-auto max-w-4xl container-custom">
                        <h2 id="latest-episode-title" className="section-title">
                            Latest episode
                        </h2>
                        <div className="section-divider" />
                        <div className="mt-8">
                            <EpisodeCard episode={latest} featured />
                        </div>
                    </div>
                </section>
            )}

            {/* More episodes */}
            {rest.length > 0 && (
                <section className="section-alt" aria-labelledby="more-episodes-title">
                    <div className="mx-auto max-w-4xl container-custom">
                        <h2 id="more-episodes-title" className="section-title">
                            More episodes
                        </h2>
                        <div className="section-divider" />

                        {seriesList.length > 2 && (
                            <div
                                role="group"
                                aria-label="Filter episodes by series"
                                className="flex flex-wrap gap-2 justify-center mb-8"
                            >
                                {seriesList.map((s) => {
                                    const active = s === series;
                                    return (
                                        <button
                                            key={s}
                                            type="button"
                                            aria-pressed={active}
                                            onClick={() => setSeries(s)}
                                            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${active
                                                    ? 'border-burgundy-700 bg-burgundy-700 text-white'
                                                    : 'border-cream-300 bg-white text-charcoal hover:border-burgundy-500 hover:text-burgundy-700'
                                                }`}
                                        >
                                            {s === 'All' ? 'All series' : s}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        <div className="space-y-6">
                            {visible.map((episode) => (
                                <EpisodeCard key={episode.id} episode={episode} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Subscribe */}
            {platformLinks.length > 0 && (
                <section className="section bg-gold-100" aria-labelledby="subscribe-title">
                    <div className="mx-auto max-w-2xl text-center container-custom">
                        <h2 id="subscribe-title">Never miss an episode</h2>
                        <p className="mt-4 leading-relaxed text-charcoal-light">
                            Follow the podcast on your favourite app and new episodes will be waiting for you.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center mt-8">
                            {platformLinks.map(([key, label]) => (
                                <a
                                    key={key}
                                    href={podcastPlatforms[key]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}