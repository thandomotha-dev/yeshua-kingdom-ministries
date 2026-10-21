import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import siteConfig from '../data/siteConfig';
import sermons from '../data/sermons';
import LiteYouTube from '../components/media/LiteYouTube';
import SermonCard from '../components/sermons/SermonCard';
import SermonFilters from '../components/sermons/SermonFilters';
import { formatLongDate } from '../utils/dates';

export default function Sermons() {
    const [search, setSearch] = useState('');
    const [series, setSeries] = useState('All');
    const [speaker, setSpeaker] = useState('All');
    const [sort, setSort] = useState('newest');

    // The most recent sermon is the featured one
    const latest = useMemo(
        () => [...sermons].sort((a, b) => new Date(b.date) - new Date(a.date))[0],
        []
    );

    const visibleSermons = useMemo(() => {
        const query = search.trim().toLowerCase();

        const filtered = sermons.filter((s) => {
            if (series !== 'All' && s.series !== series) return false;
            if (speaker !== 'All' && s.speaker !== speaker) return false;
            if (query) {
                const text = `${s.title} ${s.speaker} ${s.series} ${s.description}`.toLowerCase();
                if (!text.includes(query)) return false;
            }
            return true;
        });

        return filtered.sort((a, b) =>
            sort === 'oldest' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
        );
    }, [search, series, speaker, sort]);

    const hasFilters = search !== '' || series !== 'All' || speaker !== 'All';

    const clearFilters = () => {
        setSearch('');
        setSeries('All');
        setSpeaker('All');
    };

    const description = `Watch recent messages from ${siteConfig.churchName}. Browse by series or speaker and grow in the Word.`;
    const youtubeUrl = siteConfig.social.youtube;

    return (
        <>
            <Helmet>
                <title>{`Sermons | ${siteConfig.churchName}`}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${siteConfig.siteUrl}/sermons`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Sermons | ${siteConfig.churchName}`} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`${siteConfig.siteUrl}${siteConfig.ogImage}`} />
                <meta property="og:url" content={`${siteConfig.siteUrl}/sermons`} />
            </Helmet>

            {/* Header and featured message */}
            <section className="text-white gradient-burgundy" aria-labelledby="sermons-page-title">
                <div className="py-14 container-custom md:py-20">
                    <h1 id="sermons-page-title" className="text-4xl text-white md:text-5xl">
                        Sermons
                    </h1>
                    <p className="mt-3 max-w-xl text-lg text-white/85">
                        Watch, listen and be encouraged. New messages are added every week.
                    </p>

                    {latest && (
                        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
                            <LiteYouTube
                                key={latest.id}
                                videoId={latest.youtubeId}
                                title={latest.title}
                                thumbnail={latest.thumbnail}
                            />
                            <div>
                                <span className="badge bg-gold-500 text-burgundy-900">Latest message</span>
                                <h2 className="mt-4 text-3xl text-white md:text-3xl">{latest.title}</h2>
                                <p className="mt-2 text-sm text-white/75">
                                    {latest.speaker}, {formatLongDate(latest.date)}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-gold-300">Series: {latest.series}</p>
                                <p className="mt-4 leading-relaxed text-white/85">{latest.description}</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* All sermons */}
            <section className="section" aria-labelledby="all-sermons-title">
                <div className="container-custom">
                    <h2 id="all-sermons-title" className="section-title">
                        All messages
                    </h2>
                    <div className="section-divider" />
                    <p className="section-subtitle">
                        Search by title or topic, or narrow the list by series and speaker.
                    </p>

                    <SermonFilters
                        search={search}
                        onSearch={setSearch}
                        series={series}
                        onSeries={setSeries}
                        speaker={speaker}
                        onSpeaker={setSpeaker}
                        sort={sort}
                        onSort={setSort}
                        resultCount={visibleSermons.length}
                        hasFilters={hasFilters}
                        onClear={clearFilters}
                    />

                    {visibleSermons.length > 0 ? (
                        <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                            {visibleSermons.map((sermon) => (
                                <SermonCard key={sermon.id} sermon={sermon} />
                            ))}
                        </div>
                    ) : (
                        <div className="px-6 py-12 mt-10 text-center bg-white rounded-2xl border border-cream-300">
                            <h3 className="text-xl md:text-xl">No sermons match your search</h3>
                            <p className="mt-2 text-charcoal-lighter">
                                Try a different word, or clear the filters to see every message.
                            </p>
                            <button type="button" onClick={clearFilters} className="mt-6 btn-primary">
                                Show all sermons
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Subscribe */}
            <section className="section bg-gold-100" aria-labelledby="subscribe-title">
                <div className="mx-auto max-w-2xl text-center container-custom">
                    <h2 id="subscribe-title">Never miss a message</h2>
                    <p className="mt-4 leading-relaxed text-charcoal-light">
                        Subscribe on YouTube to get every new sermon, or listen on the go with our podcast.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center mt-8">
                        {youtubeUrl && (
                            <a
                                href={youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary btn-lg"
                            >
                                Subscribe on YouTube
                            </a>
                        )}
                        <Link to="/podcast" className="btn-outline btn-lg">
                            Listen to the podcast
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}