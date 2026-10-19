/**
 * ============================================
 * NAVIGATION LINKS
 * ============================================
 * Edit this file to add, remove, or reorder navigation items.
 * - label: the text shown in the menu
 * - path: the URL path (must match a route in App.jsx)
 * - children: optional dropdown items
 */

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Books', path: '/books' },
  {
    label: 'Media',
    path: '#',
    children: [
      { label: 'Sermons', path: '/sermons' },
      { label: 'Podcast', path: '/podcast' },
    ],
  },
  { label: 'Bible', path: '/bible' },
  { label: 'Events', path: '/events' },
  { label: 'Marriage Training', path: '/marriage-training' },
  { label: 'Service Times', path: '/service-times' },
  { label: 'Give', path: '/give' },
  { label: 'Prayer Request', path: '/prayer-request' },
  { label: 'Contact', path: '/contact' },
];

export default navigation;
