/**
 * ============================================
 * PODCAST DATA
 * ============================================
 * Add podcast episodes here. The latest episode appears first.
 *
 * For embedUrl, use the embed link from Spotify/YouTube:
 * - Spotify: Open episode → Share → Embed episode → Copy the src URL
 * - YouTube: Use https://www.youtube.com/embed/VIDEO_ID
 */

const podcasts = [
  {
    id: 1,
    title: 'When God is Silent',
    description:
      'In this episode, Pastor John explores the difficult seasons when God seems silent — and what He may actually be doing in the waiting.',
    date: '2024-10-10',
    duration: '42 min',
    embedUrl: 'https://open.spotify.com/embed/episode/PLACEHOLDER', // TODO: Replace
    youtubeUrl: 'https://youtube.com/watch?v=PLACEHOLDER', // TODO: Replace
    series: 'Kingdom Conversations',
  },
  {
    id: 2,
    title: 'Marriage After the Honeymoon',
    description:
      'Pastor John and Sarah have an honest conversation about the real challenges of marriage and how covenant love carries you through.',
    date: '2024-10-03',
    duration: '38 min',
    embedUrl: 'https://open.spotify.com/embed/episode/PLACEHOLDER',
    youtubeUrl: 'https://youtube.com/watch?v=PLACEHOLDER',
    series: 'Kingdom Marriage',
  },
  {
    id: 3,
    title: 'Raising Gen Z for Christ',
    description:
      'How do you reach a generation that's constantly connected yet deeply lonely? Practical wisdom for parents and youth leaders.',
    date: '2024-09-26',
    duration: '35 min',
    embedUrl: 'https://open.spotify.com/embed/episode/PLACEHOLDER',
    youtubeUrl: 'https://youtube.com/watch?v=PLACEHOLDER',
    series: 'Parenting & Family',
  },
  {
    id: 4,
    title: 'Faith in the Workplace',
    description:
      'How to be a Kingdom representative at work without being preachy. Real stories, real strategies.',
    date: '2024-09-19',
    duration: '40 min',
    embedUrl: 'https://open.spotify.com/embed/episode/PLACEHOLDER',
    youtubeUrl: 'https://youtube.com/watch?v=PLACEHOLDER',
    series: 'Kingdom in the Marketplace',
  },
];

/**
 * Podcast platform links
 * TODO: Replace with your real podcast URLs
 */
export const podcastPlatforms = {
  spotify: 'https://open.spotify.com/show/PLACEHOLDER',
  apple: 'https://podcasts.apple.com/podcast/PLACEHOLDER',
  youtube: 'https://youtube.com/@yeshuakingdom',
  google: 'https://podcasts.google.com/feed/PLACEHOLDER',
};

export default podcasts;
