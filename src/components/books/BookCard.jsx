import { Link } from 'react-router-dom';

import BookCover from './BookCover';
import {
    formatPrice,
    getAvailableFormats,
    getShortDescription,
    getStartingPrice,
} from './bookUtils';

export default function BookCard({ book }) {
    const start = getStartingPrice(book);
    const formats = getAvailableFormats(book);

    return (
        <article className="card flex h-full flex-col p-5">
            <Link to={`/books/${book.slug}`} aria-label={`View ${book.title}`} className="block">
                <BookCover book={book} className="mx-auto max-w-[14rem]" />
            </Link>

            <div className="mt-5 flex flex-1 flex-col">
                <span className="badge-burgundy self-start">{book.category}</span>

                <h3 className="mt-3 text-xl md:text-xl">
                    <Link to={`/books/${book.slug}`} className="hover:text-burgundy-600">
                        {book.title}
                    </Link>
                </h3>
                <p className="mt-1 text-sm text-charcoal-lighter">by {book.author}</p>

                <p className="line-clamp-3 mt-3 flex-1 text-sm leading-relaxed text-charcoal-light">
                    {getShortDescription(book)}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                        {start ? (
                            <p className="font-semibold text-burgundy-700">
                                From {formatPrice(start.price, start.currency)}
                            </p>
                        ) : (
                            <p className="font-semibold text-charcoal-lighter">Coming soon</p>
                        )}
                        <p className="text-xs text-charcoal-lighter">
                            {formats.map((f) => f.type).join(', ')}
                        </p>
                    </div>
                    <Link to={`/books/${book.slug}`} className="btn-outline btn-sm shrink-0">
                        View details
                    </Link>
                </div>
            </div>
        </article>
    );
}