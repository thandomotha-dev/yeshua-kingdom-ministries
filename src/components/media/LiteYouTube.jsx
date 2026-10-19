import { useState } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';

/**
 * Shows a thumbnail first and only loads the real YouTube player after a click.
 * This keeps pages fast, especially on phones with many videos.
 */
export default function LiteYouTube({ videoId, title, thumbnail }) {
    const [playing, setPlaying] = useState(false);
    const [thumbFailed, setThumbFailed] = useState(false);

    if (playing) {
        return (
            <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-warm-lg">
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                />
            </div>
        );
    }

    const thumbSrc = thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-burgundy-900 shadow-warm-lg"
        >
            {!thumbFailed && (
                <img
                    src={thumbSrc}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={() => setThumbFailed(true)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-burgundy-950/30 transition-colors group-hover:bg-burgundy-950/10">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-burgundy-900 shadow-gold transition-transform group-hover:scale-110">
                    <PlayIcon className="ml-1 h-8 w-8" aria-hidden="true" />
                </span>
            </span>
        </button>
    );
}