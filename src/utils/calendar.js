/**
 * "Add to calendar" helpers.
 * Works with the date, time, endDate and endTime fields in data/events.js.
 */

// TODO: change this if the church is not in South Africa
export const TIME_ZONE = 'Africa/Johannesburg';

const pad = (n) => String(n).padStart(2, '0');

// "09:30 AM" becomes hours 9, minutes 30
const parseTime = (time) => {
    const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time || '');
    if (!match) return { hours: 9, minutes: 0 };
    let hours = parseInt(match[1], 10) % 12;
    if (match[3].toUpperCase() === 'PM') hours += 12;
    return { hours, minutes: parseInt(match[2], 10) };
};

const buildDate = (iso, time) => {
    const [year, month, day] = iso.split('-').map(Number);
    const { hours, minutes } = parseTime(time);
    return new Date(year, month - 1, day, hours, minutes);
};

export const getEventTimes = (event) => {
    const start = buildDate(event.date, event.time);
    let end = buildDate(event.endDate || event.date, event.endTime || event.time);
    // If the end looks earlier than the start, assume a 2 hour event
    if (end <= start) end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    return { start, end };
};

// Local time without a time zone, e.g. 20270115T090000
const localStamp = (d) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(
        d.getMinutes()
    )}00`;

const utcStamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

const icsEscape = (value = '') =>
    String(value)
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\r?\n/g, '\\n');

// Calendar files must not have lines longer than 75 characters
const foldLine = (line) => {
    const parts = [];
    for (let i = 0; i < line.length; i += 70) parts.push(line.slice(i, i + 70));
    return parts.join('\r\n ');
};

const hasRealLink = (link) => Boolean(link) && link !== '#';

const buildDetails = (event) =>
    [event.description, hasRealLink(event.rsvpLink) ? `Register: ${event.rsvpLink}` : '']
        .filter(Boolean)
        .join('\n\n');

export const googleCalendarUrl = (event) => {
    const { start, end } = getEventTimes(event);
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: `${localStamp(start)}/${localStamp(end)}`,
        details: buildDetails(event),
        location: event.location,
        ctz: TIME_ZONE,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadIcs = (event, churchName) => {
    const { start, end } = getEventTimes(event);

    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        `PRODID:-//${icsEscape(churchName)}//Events//EN`,
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `UID:event-${event.id}@${icsEscape(churchName).replace(/\s+/g, '').toLowerCase()}`,
        `DTSTAMP:${utcStamp(new Date())}`,
        `DTSTART:${localStamp(start)}`,
        `DTEND:${localStamp(end)}`,
        `SUMMARY:${icsEscape(event.title)}`,
        `LOCATION:${icsEscape(event.location)}`,
        `DESCRIPTION:${icsEscape(buildDetails(event))}`,
        'END:VEVENT',
        'END:VCALENDAR',
    ];

    const content = lines.map(foldLine).join('\r\n');
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};