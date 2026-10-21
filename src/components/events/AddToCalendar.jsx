import siteConfig from '../../data/siteConfig';
import { downloadIcs, googleCalendarUrl } from '../../utils/calendar';

// variant "light" is for white cards, "dark" is for the burgundy header
export default function AddToCalendar({ event, variant = 'light' }) {
    const textClass = variant === 'dark' ? 'text-white/75' : 'text-charcoal-lighter';
    const linkClass =
        variant === 'dark'
            ? 'font-semibold text-gold-300 underline hover:text-white'
            : 'font-semibold text-burgundy-700 underline hover:text-burgundy-500';

    return (
        <p className={`text-sm ${textClass}`}>
            Add to calendar:{' '}
            <a
                href={googleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
            >
                Google
            </a>{' '}
            or{' '}
            <button
                type="button"
                onClick={() => downloadIcs(event, siteConfig.churchName)}
                className={linkClass}
            >
                Apple and Outlook (.ics file)
            </button>
        </p>
    );
}