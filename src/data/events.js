/**
 * ============================================
 * EVENTS DATA
 * ============================================
 * Add upcoming events here. Past events are automatically hidden.
 *
 * - date / endDate: use the format YYYY-MM-DD (endDate only for multi-day events)
 * - TODO: all dates below are placeholders. Replace them with your real events.
 */

const events = [
  {
    id: 1,
    title: 'Kingdom Conference 2027',
    date: '2027-01-15',
    endDate: '2027-01-17',
    time: '09:00 AM',
    endTime: '05:00 PM',
    location: 'Yeshua Kingdom Ministries Main Hall',
    description:
      'Our annual conference bringing together believers from across the nation for three days of powerful worship, anointed teaching, and Kingdom encounters. Theme: "Arise & Build."',
    category: 'Conference',
    image: '/images/events/conference.jpg', // TODO: Replace with real image
    rsvpLink: '#', // TODO: Add registration link
    featured: true,
  },
  {
    id: 2,
    title: 'Marriage Enrichment Retreat',
    date: '2027-02-12',
    endDate: '2027-02-14',
    time: '05:00 PM',
    endTime: '12:00 PM',
    location: 'Cradle Moon Lakeside Lodge, Muldersdrift',
    description:
      'A weekend away for married couples. Reconnect, refresh, and reignite your marriage through workshops, fun activities, and quality time together. Includes accommodation and meals.',
    category: 'Marriage',
    image: '/images/events/retreat.jpg',
    rsvpLink: '#',
    featured: false,
  },
  {
    id: 3,
    title: 'Youth Night — Worship & Word',
    date: '2027-01-22',
    time: '06:00 PM',
    endTime: '09:00 PM',
    location: 'Youth Hall',
    description:
      'A special Friday night for young people ages 13–25. Live worship, a relevant message, and pizza afterwards. Bring a friend!',
    category: 'Youth',
    image: '/images/events/youth-night.jpg',
    rsvpLink: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'Community Outreach — Food Drive',
    date: '2027-01-30',
    time: '08:00 AM',
    endTime: '01:00 PM',
    location: 'Alexandra Community Centre',
    description:
      'Join us as we serve our community by distributing food parcels and sharing the love of Christ. Volunteers needed — sign up to help pack or distribute.',
    category: 'Outreach',
    image: '/images/events/outreach.jpg',
    rsvpLink: '#',
    featured: false,
  },
  {
    id: 5,
    title: "Women's Morning Tea",
    date: '2027-02-06',
    time: '09:30 AM',
    endTime: '12:00 PM',
    location: 'Yeshua Kingdom Ministries Fellowship Hall',
    description:
      'A beautiful morning of fellowship, encouragement, and prayer for women of all ages. Guest speaker: Sister Grace from Nairobi.',
    category: 'Women',
    image: '/images/events/womens-tea.jpg',
    rsvpLink: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'New Believers Class',
    date: '2026-11-08',
    time: '11:30 AM',
    endTime: '01:00 PM',
    location: 'Room 3, Main Building',
    description:
      'A four-week foundational class for new believers and anyone who wants to strengthen their spiritual foundation. Topics: Salvation, Baptism, The Holy Spirit, Church Life.',
    category: 'Discipleship',
    image: '/images/events/new-believers.jpg',
    rsvpLink: '#',
    featured: false,
  },
];

export const eventCategories = [
  'All',
  'Conference',
  'Marriage',
  'Youth',
  'Outreach',
  'Women',
  'Discipleship',
  'Worship',
];

export default events;