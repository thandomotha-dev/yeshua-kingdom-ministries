import { Link } from 'react-router-dom';

import BookCover from './BookCover';
import {
    formatPrice,
    getAvailableFormats,
    getShortDescription,
    getStartingPrice,
} from './bookUtils';

export default function FeaturedBookHero({ book }) {
    if (!book) return null;

    const start = getStartingPrice(book);
    const formats = getAvailableFormats(book);

    return (
        <section className="gradient-burgundy text-white" aria-labelledby="featured-book-title">
            <div className="container-custom grid items-center gap-10 py-14 md:grid-cols-[1fr_auto] md:gap-16 md:py-20">
                <div className="max-w-2xl">
                    <span className="badge bg-gold-500 text-burgundy-900">Featured book</span>

                    <h1
                        id="featured-book-title"
                        className="mt-5 text-4xl text-white md:text-5xl lg:text-display-sm"
                    >
                        {book.title}
                    </h1>
                    <p className="mt-3 font-heading text-xl italic text-gold-300">{book.subtitle}</p>
                    <p className="mt-1 text-white/80">by {book.author}</p>

                    <p className="mt-6 max-w-xl leading-relaxed text-white/85">
                        {getShortDescription(book)}
                    </p>

                    <p className="mt-6 text-white/85">
                        {start && (
                            <>
                                From{' '}
                                <span className="text-2xl font-bold text-white">
                                    {formatPrice(start.price, start.currency)}
                                </span>{' '}
                            </>
                        )}
                        <span className="text-sm">in {formats.map((f) => f.type).join(', ')}</span>
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link to={`/books/${book.slug}#buy`} className="btn-secondary btn-lg">
                            Buy now
                        </Link>
                        <Link to={`/books/${book.slug}#sample`} className="btn-outline-white btn-lg">
                            Read a sample
                        </Link>
                    </div>
                </div>

                <Link
                    to={`/books/${book.slug}`}
                    aria-label={`View ${book.title}`}
                    className="mx-auto block w-56 sm:w-64 md:w-72"
                >
                    <BookCover book={book} priority className="shadow-2xl" />
                </Link>
            </div>
        </section>
    );
}