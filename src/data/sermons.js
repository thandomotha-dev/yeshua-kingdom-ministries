/**
 * ============================================
 * SERMONS DATA
 * ============================================
 * Add sermon entries here. Each sermon needs a YouTube video ID.
 * To find it: open the YouTube video → the ID is after "v=" in the URL.
 * Example: https://youtube.com/watch?v=dQw4w9WgXcQ → ID is "dQw4w9WgXcQ"
 *
 * TIP: If a text string contains an apostrophe (') wrap it in double
 * quotes ("...") or backticks (`...`), or escape it like this: \'
 */

const sermons = [
  {
    id: 1,
    title: 'The Power of the Resurrection',
    speaker: 'Pastor John Doe', // TODO: Replace with real speaker
    date: '2024-10-13',
    series: 'Kingdom Power',
    description:
      'Discover the transformative power of the resurrection and what it means for your daily life as a believer.',
    youtubeId: 'dQw4w9WgXcQ', // TODO: Replace with real YouTube video ID
    thumbnail: '', // Leave empty to auto-generate from YouTube ID
    featured: true,
  },
  {
    id: 2,
    title: 'Walking by Faith, Not by Sight',
    speaker: 'Pastor John Doe',
    date: '2024-10-06',
    series: 'Kingdom Power',
    description:
      'What does it truly mean to walk by faith? This message explores 2 Corinthians 5:7 and the practical steps of trusting God in uncertain times.',
    youtubeId: 'dQw4w9WgXcQ', // TODO: Replace
    thumbnail: '',
    featured: false,
  },
  {
    id: 3,
    title: 'The Heart of Worship',
    speaker: 'Pastor Sarah Doe',
    date: '2024-09-29',
    series: 'Worship & Intimacy',
    description:
      "Worship is more than singing — it's a lifestyle. Learn how to cultivate a heart of worship in every season.",
    youtubeId: 'dQw4w9WgXcQ', // TODO: Replace
    thumbnail: '',
    featured: false,
  },
  {
    id: 4,
    title: 'Breaking Generational Chains',
    speaker: 'Pastor John Doe',
    date: '2024-09-22',
    series: 'Freedom Series',
    description:
      "You don't have to repeat the patterns of the past. Learn how the blood of Jesus breaks every generational chain.",
    youtubeId: 'dQw4w9WgXcQ', // TODO: Replace
    thumbnail: '',
    featured: false,
  },
  {
    id: 5,
    title: 'God in the Marketplace',
    speaker: 'Guest Speaker',
    date: '2024-09-15',
    series: 'Kingdom in the Marketplace',
    description:
      'How to carry the presence and principles of God into your workplace, business, and career.',
    youtubeId: 'dQw4w9WgXcQ', // TODO: Replace
    thumbnail: '',
    featured: false,
  },
  {
    id: 6,
    title: 'Raising Godly Families',
    speaker: 'Pastor John & Sarah Doe',
    date: '2024-09-08',
    series: 'Family Month',
    description:
      'Practical biblical wisdom for building a home that honors God and raises children who know Him.',
    youtubeId: 'dQw4w9WgXcQ', // TODO: Replace
    thumbnail: '',
    featured: false,
  },
];

export const sermonSeries = [
  'All',
  'Kingdom Power',
  'Worship & Intimacy',
  'Freedom Series',
  'Kingdom in the Marketplace',
  'Family Month',
];

export const speakers = [
  'All',
  'Pastor John Doe',
  'Pastor Sarah Doe',
  'Guest Speaker',
];

export default sermons;