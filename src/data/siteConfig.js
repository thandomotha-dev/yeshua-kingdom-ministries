/**
 * ============================================
 * SITE CONFIGURATION
 * ============================================
 * Edit this file to update church details.
 * No coding knowledge required — just change the text between quotes.
 */

const siteConfig = {
  // --- Church Identity ---
  churchName: 'Yeshua Kingdom Ministries',
  tagline: 'Where Heaven Meets Earth',
  shortDescription:
    'A Christ-centered community pursuing the Kingdom of God through worship, the Word, and walking together in love.',

  // --- Contact Details ---
  // TODO: Replace with real address, phone and email
  address: {
    street: '123 Kingdom Way',
    city: 'Johannesburg',
    province: 'Gauteng',
    postalCode: '2001',
    country: 'South Africa',
  },
  phone: '+27 11 000 0000',
  email: 'info@yeshuakingdom.org',
  whatsapp: '+27 60 000 0000',

  // --- Online Presence ---
  // TODO: Replace with your real website URL
  siteUrl: 'https://yeshuakingdom.org',

  // --- Social Media ---
  // TODO: Replace with real social media URLs. Set to '' to hide a link.
  social: {
    facebook: 'https://facebook.com/yeshuakingdom',
    instagram: 'https://instagram.com/yeshuakingdom',
    youtube: 'https://youtube.com/@yeshuakingdom',
    twitter: 'https://twitter.com/yeshuakingdom',
    tiktok: 'https://tiktok.com/@yeshuakingdom',
    spotify: 'https://open.spotify.com/show/your-podcast-id',
    apple: 'https://podcasts.apple.com/podcast/your-podcast-id',
  },

  // --- Branding ---
  // TODO: Replace with your church logo file path (place logo in /public/images/)
  logo: '/images/logo-placeholder.svg',
  ogImage: '/images/og-default.jpg', // Default social sharing image

  // --- Google Maps Embed ---
  // TODO: Replace with your church's Google Maps embed URL
  // Go to Google Maps → Search your church → Share → Embed a map → Copy the src URL
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.123456!2d28.0473!3d-26.2041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzE0LjgiUyAyOMKwMDInNTAuMyJF!5e0!3m2!1sen!2sza!4v1234567890',

  // --- Pastor/Leader ---
  // TODO: Replace with actual pastor details
  pastor: {
    name: 'Pastor John & Sarah Doe',
    title: 'Senior Pastors',
    bio: 'Pastor John and Sarah have been faithfully serving the body of Christ for over 15 years. Their heart is to see families restored, leaders raised, and the Kingdom of God advancing in every sphere of life.',
    image: '/images/pastor-placeholder.jpg',
  },
};

export default siteConfig;
