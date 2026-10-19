import { Helmet } from 'react-helmet-async';
import siteConfig from '../../data/siteConfig';

/**
 * SEO Component — sets page-specific meta tags and Open Graph data
 * Use on every page to ensure good SEO and social sharing previews.
 *
 * @param {string} title - Page title (appended to church name)
 * @param {string} description - Meta description
 * @param {string} image - OG image URL (absolute or relative)
 * @param {string} url - Canonical URL path (e.g., "/books/my-book")
 * @param {string} type - OG type (default: "website")
 */
export default function SEO({
  title,
  description = siteConfig.shortDescription,
  image = siteConfig.ogImage,
  url = '',
  type = 'website',
}) {
  const fullTitle = title
    ? `${title} | ${siteConfig.churchName}`
    : `${siteConfig.churchName} — ${siteConfig.tagline}`;

  const fullUrl = `${siteConfig.siteUrl}${url}`;
  const fullImage = image.startsWith('http')
    ? image
    : `${siteConfig.siteUrl}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteConfig.churchName} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
}
