import { useState } from 'react';

/**
 * Shows a person's photo. If the image file is missing it shows a round badge
 * with their first initial instead of a broken image.
 */
export default function Avatar({ name, src, size = 'h-24 w-24' }) {
    const [failed, setFailed] = useState(false);
    const initial = name.replace(/^(Pastor|Elder|Dr\.?|Rev\.?)\s+/i, '').trim().charAt(0).toUpperCase();

    if (failed || !src) {
        return (
            <span
                aria-hidden="true"
                className={`flex justify-center items-center text-3xl font-bold rounded-full gradient-burgundy shrink-0 font-heading text-gold-400 ${size}`}
            >
                {initial}
            </span>
        );
    }

    return (
        <img
            src={src}
            alt={`Photo of ${name}`}
            loading="lazy"
            onError={() => setFailed(true)}
            className={`object-cover rounded-full shrink-0 ${size}`}
        />
    );
}