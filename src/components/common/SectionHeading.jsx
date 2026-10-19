/**
 * SectionHeading — consistent section titles across all pages
 * Includes a decorative gold divider line.
 */
export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
  className = '',
}) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <div
        className={`w-16 h-1 rounded-full mb-6 ${
          centered ? 'mx-auto' : ''
        } ${light ? 'bg-gold-400' : 'bg-gold-500'}`}
      />
      <h2
        className={`font-heading font-bold text-3xl md:text-4xl mb-4 ${
          light ? 'text-white' : 'text-burgundy-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${
            light ? 'text-cream-200' : 'text-charcoal-lighter'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
