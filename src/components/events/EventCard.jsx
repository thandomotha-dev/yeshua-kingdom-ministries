import { Link } from 'react-router-dom';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

import AddToCalendar from './AddToCalendar';
import { formatEventDates, formatEventTimes, getDateBadge } from '../../utils/dates';

// "#" or an empty link means no registration page has been set up yet
export const hasRsvpLink = (event) => Boolean(event.rsvpLink) && event.rsvpLink !== '#';

export default function EventCard({ event }) {
    const badge = getDateBadge(event.date);

    return (
        <article className="overflow-hidden card md:flex">
            <div
                className="flex gap-3 justify-center items-center p-5 text-white gradient-burgundy shrink-0 md:w-32 md:flex-col md:gap-0"
                aria-hidden="true"
            >
                <span className="text-4xl font-bold leading-none font-heading">{badge.day}</span>
                <span className="text-sm text-gold-300 md:mt-1">{badge.month}</span>
            </div>

            <div className="flex-1 p-6">
                <span className="badge-burgundy">{event.category}</span>
                <h3 className="mt-3 text-2xl md:text-2xl">{event.title}</h3>

                <ul className="mt-3 space-y-2 text-sm text-charcoal-light">
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

                <p className="mt-4 leading-relaxed text-charcoal-light">{event.description}</p>

                <div className="flex flex-wrap gap-4 items-center mt-5">
                    {hasRsvpLink(event) ? (
                        <a
                            href={event.rsvpLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Register or RSVP
                        </a>
                    ) : (
                        <Link to="/contact" className="btn-primary">
                            Ask about this event
                        </Link>
                    )}
                </div>

                <div className="mt-4">
                    <AddToCalendar event={event} />
                </div>
            </div>
        </article>
    );
}