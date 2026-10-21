import LiteYouTube from '../media/LiteYouTube';
import { formatShortDate } from '../../utils/dates';

export default function SermonCard({ sermon }) {
    return (
        <article className="flex overflow-hidden flex-col h-full card">
            <LiteYouTube
                videoId={sermon.youtubeId}
                title={sermon.title}
                thumbnail={sermon.thumbnail}
            />

            <div className="flex flex-col flex-1 p-5">
                <span className="self-start badge-burgundy">{sermon.series}</span>
                <h3 className="mt-3 text-xl md:text-xl">{sermon.title}</h3>
                <p className="mt-1 text-sm text-charcoal-lighter">
                    {sermon.speaker}, {formatShortDate(sermon.date)}
                </p>
                <p className="mt-3 text-sm leading-relaxed line-clamp-3 text-charcoal-light">
                    {sermon.description}
                </p>
            </div>
        </article>
    );
}