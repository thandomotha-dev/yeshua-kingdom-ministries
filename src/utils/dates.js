/**
 * Date helpers for events and sermons.
 * Dates in the data files are written as YYYY-MM-DD.
 */

// Parse as local time so dates never shift by a day
const parse = (iso) => new Date(`${iso}T00:00:00`);

const startOfToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
};

// Events that have not finished yet, soonest first
export const getUpcomingEvents = (events) =>
    events
        .filter((e) => parse(e.endDate || e.date) >= startOfToday())
        .sort((a, b) => parse(a.date) - parse(b.date));

export const formatLongDate = (iso) =>
    parse(iso).toLocaleDateString('en-ZA', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

export const formatShortDate = (iso) =>
    parse(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });

export const getDateBadge = (iso) => ({
    day: parse(iso).getDate(),
    month: parse(iso).toLocaleDateString('en-ZA', { month: 'short' }),
});

// "15 January 2027 to 17 January 2027" for multi-day events
export const formatEventDates = (event) =>
    event.endDate
        ? `${formatShortDate(event.date)} to ${formatShortDate(event.endDate)}`
        : formatLongDate(event.date);

export const formatEventTimes = (event) =>
    event.endDate ? `Starts ${event.time}` : `${event.time} to ${event.endTime}`;