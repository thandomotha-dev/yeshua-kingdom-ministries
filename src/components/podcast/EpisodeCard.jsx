import { useState } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';

import { formatShortDate } from '../../utils/dates';
import { isRealLink } from '../../utils/links';

/**
 * One podcast episode. The audio player only loads after the visitor presses
 * "Play episode", which keeps the page fast.
 * Links containing PLACEHOLDER are hidden until you add real ones in podcasts.js.
 */
export default function EpisodeCard({ episode, featured = false }) {
    const [open, setOpen] = useState(false);
    const canEmbed = isRealLink(episode.embedUrl);
    const canWatch = isRealLink(episode.youtubeUrl);

    return (
        <article className={`card p-6 ${featured ? 'md:p-8' : ''}`}>
            <div className="flex flex-wrap gap-3 items-center">
                <span className="badge-burgundy">{episode.series}</span>
                <span className="text-sm text-charcoal-lighter">
                    {formatShortDate(episode.date)}, {episode.duration}
                </span>
            </div>

            <h3 className={`mt-3 ${featured ? 'text-3xl md:text-3xl' : 'text-xl md:text-xl'}`}>
                {episode.title}
            </h3>
            <p className="mt-3 leading-relaxed text-charcoal-light">{episode.description}</p>

            {open && canEmbed && (
                <div className="mt-5">
                    <iframe
                        title={`Podcast episode: ${episode.title}`}
                        src={episode.embedUrl}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-xl"
                    />
                </div>
            )}

            <div className="flex flex-wrap gap-3 items-center mt-5">
                {canEmbed && !open && (
                    <button type="button" className="btn-primary btn-sm" onClick={() => setOpen(true)}>
                        <PlayIcon className="w-4 h-4" aria-hidden="true" />
                        Play episode
                    </button>
                )}
                {canWatch && (
                    <a
                        href={episode.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline btn-sm"
                    >
                        Watch on YouTube
                    </a>
                )}
                {!canEmbed && !canWatch && (
                    <p className="text-sm text-charcoal-lighter">Audio coming soon.</p>
                )}
            </div>
        </article>
    );
}