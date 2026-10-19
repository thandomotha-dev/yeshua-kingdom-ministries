import { useState } from 'react';

/**
 * Shows the book's cover image. If the image file is missing (e.g. you haven't
 * added /public/images/books/book-1.jpg yet) it shows a designed placeholder
 * cover instead of a broken image icon.
 */
export default function BookCover({ book, className = '', priority = false }) {
    const [failed, setFailed] = useState(false);

    return (
        <div
            className={`aspect-[2/3] w-full overflow-hidden rounded-xl bg-cream-200 shadow-warm-lg ${className}`}
        >
            {failed || !book.coverImage ? (
                <div className="gradient-burgundy flex h-full w-full flex-col items-center justify-between border-4 border-gold-500/60 p-5 text-center">
                    <span className="font-heading text-xs italic text-gold-300">Yeshua Kingdom Ministries</span>
                    <span className="font-heading text-2xl font-bold leading-tight text-white">
                        {book.title}
                    </span>
                    <span className="text-xs font-semibold text-gold-300">{book.author}</span>
                </div>
            ) : (
                <img
                    src={book.coverImage}
                    alt={`Cover of ${book.title}`}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={() => setFailed(true)}
                    className="h-full w-full object-cover"
                />
            )}
        </div>
    );
}