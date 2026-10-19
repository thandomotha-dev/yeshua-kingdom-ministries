import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

import books from '../data/books';
import siteConfig from '../data/siteConfig';
import BookCover from '../components/books/BookCover';
import BookCard from '../components/books/BookCard';
import NewsletterBanner from '../components/books/NewsletterBanner';
import {
    formatPrice,
    formatReleaseDate,
    getBuyLinks,
    getShortDescription,
} from '../components/books/bookUtils';

function Stars({ rating }) {
    return (
        <span className="flex" role="img" aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((n) => (
                <StarIcon
                    key={n}
                    aria-hidden="true"
                    className={`h-5 w-5 ${n <= Math.round(rating) ? 'text-gold-500' : 'text-cream-300'}`}
                />
            ))}
        </span>
    );
}

function AuthorAvatar({ book }) {
    const [failed, setFailed] = useState(false);
    const initial = book.author.trim().charAt(0).toUpperCase();

    if (failed || !book.authorImage) {
        return (
            <span
                aria-hidden="true"
                className="gradient-burgundy flex h-24 w-24 shrink-0 items-center justify-center rounded-full font-heading text-3xl font-bold text-gold-400"
            >
                {initial}
            </span>
        );
    }

    return (
        <img
            src={book.authorImage}
            alt={`Photo of ${book.author}`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-24 w-24 shrink-0 rounded-full object-cover"
        />
    );
}

export default function BookDetail() {
    const { slug } = useParams();
    const location = useLocation();
    const book = books.find((b) => b.slug === slug);
    const [expanded, setExpanded] = useState(false);

    // Collapse the sample again when moving to a different book
    useEffect(() => {
        setExpanded(false);
    }, [slug]);

    // Scroll to #buy or #sample after the page has loaded (links from the Books hero)
    useEffect(() => {
        if (!location.hash) return undefined;
        const id = location.hash.slice(1);
        const timer = setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timer);
    }, [location.hash, slug]);

    if (!book) {
        return (
            <section className="section">
                <Helmet>
                    <title>{`Book not found | ${siteConfig.churchName}`}</title>
                    <meta name="robots" content="noindex" />
                </Helmet>
                <div className="container-custom mx-auto max-w-xl text-center">
                    <h1>We could not find that book</h1>
                    <p className="mt-4 text-charcoal-light">
                        The link may be old, or the book may have been removed.
                    </p>
                    <Link to="/books" className="btn-primary mt-8">
                        See all books
                    </Link>
                </div>
            </section>
        );
    }

    const buyLinks = getBuyLinks(book);
    const related = (book.relatedBooks || [])
        .map((id) => books.find((b) => b.id === id))
        .filter(Boolean);
    const reviews = book.testimonials || [];
    const averageRating = reviews.length
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    const metaDescription = getShortDescription(book).slice(0, 155).trim();
    const pageUrl = `${siteConfig.siteUrl}/books/${book.slug}`;
    const pageTitle = `${book.title} by ${book.author} | ${siteConfig.churchName}`;

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:type" content="book" />
                <meta property="og:title" content={`${book.title}: ${book.subtitle}`} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={`${siteConfig.siteUrl}${book.coverImage}`} />
                <meta property="og:url" content={pageUrl} />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            {/* Top: cover and key details */}
            <section className="section">
                <div className="container-custom">
                    <Link
                        to="/books"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-burgundy-700 hover:underline"
                    >
                        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                        All books
                    </Link>

                    <div className="grid gap-10 md:grid-cols-[18rem_1fr] md:gap-14">
                        <div className="mx-auto w-56 md:w-full">
                            <BookCover key={book.id} book={book} priority />
                        </div>

                        <div>
                            <span className="badge-burgundy">{book.category}</span>
                            <h1 className="mt-4">{book.title}</h1>
                            <p className="mt-2 font-heading text-xl italic text-burgundy-600">{book.subtitle}</p>
                            <p className="mt-3 text-charcoal-light">
                                by <span className="font-semibold">{book.author}</span>
                            </p>
                            <p className="mt-1 text-sm text-charcoal-lighter">
                                Published {formatReleaseDate(book.releaseDate)}
                            </p>

                            {reviews.length > 0 && (
                                <div className="mt-4 flex items-center gap-2">
                                    <Stars rating={averageRating} />
                                    <span className="text-sm text-charcoal-lighter">
                                        {averageRating.toFixed(1)} from {reviews.length}{' '}
                                        {reviews.length === 1 ? 'review' : 'reviews'}
                                    </span>
                                </div>
                            )}

                            {/* Formats and buy buttons */}
                            <div id="buy" className="mt-8 scroll-mt-28 rounded-2xl border border-cream-200 bg-cream-100 p-6">
                                <h2 className="text-xl md:text-xl">Choose your format</h2>
                                <ul className="mt-4 divide-y divide-cream-300">
                                    {book.formats.map((f) => (
                                        <li key={f.type} className="flex items-center justify-between py-3">
                                            <span className="font-semibold">{f.type}</span>
                                            {f.available ? (
                                                <span className="font-semibold text-burgundy-700">
                                                    {formatPrice(f.price, f.currency)}
                                                </span>
                                            ) : (
                                                <span className="badge bg-cream-300 text-charcoal-light">Coming soon</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>

                                {buyLinks.length > 0 ? (
                                    <div className="mt-5">
                                        <p className="mb-3 text-sm text-charcoal-lighter">Buy from</p>
                                        <div className="flex flex-wrap gap-3">
                                            {buyLinks.map((link, i) => (
                                                <a
                                                    key={link.key}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={i === 0 ? 'btn-primary' : 'btn-outline'}
                                                >
                                                    Buy on {link.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link to="/contact" className="btn-primary mt-5">
                                        Contact us to order
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About the book + contents */}
            <section className="section-alt">
                <div className="container-custom grid gap-12 lg:grid-cols-[1.4fr_1fr]">
                    <div>
                        <h2>About this book</h2>
                        <div className="section-divider mx-0 mt-4" />
                        <p className="max-w-prose whitespace-pre-line leading-relaxed text-charcoal-light">
                            {book.description}
                        </p>
                    </div>

                    <div>
                        <h2>Inside the book</h2>
                        <div className="section-divider mx-0 mt-4" />
                        <ol className="space-y-2 text-charcoal-light">
                            {book.tableOfContents.map((item) => (
                                <li key={item} className="rounded-lg bg-white px-4 py-2.5 text-sm shadow-warm">
                                    {item}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Sample */}
            <section id="sample" className="section scroll-mt-20">
                <div className="container-custom mx-auto max-w-3xl">
                    <h2 className="section-title">Read a sample</h2>
                    <div className="section-divider" />

                    <div className="relative rounded-2xl border border-cream-300 bg-white p-6 shadow-warm md:p-10">
                        <div className={expanded ? '' : 'max-h-80 overflow-hidden'}>
                            <p className="whitespace-pre-line font-heading text-lg leading-relaxed text-charcoal">
                                {book.excerpt}
                            </p>
                        </div>
                        {!expanded && (
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-x-0 bottom-0 h-32 rounded-b-2xl bg-gradient-to-t from-white to-transparent"
                            />
                        )}
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <button
                            type="button"
                            className="btn-outline"
                            onClick={() => setExpanded((v) => !v)}
                            aria-expanded={expanded}
                        >
                            {expanded ? 'Show less' : 'Read more'}
                        </button>
                        {/* TODO: add  samplePdf: '/samples/your-book.pdf'  to a book in books.js to show this button */}
                        {book.samplePdf && (
                            <a href={book.samplePdf} download className="btn-primary">
                                Download the sample (PDF)
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {reviews.length > 0 && (
                <section className="section-alt" aria-labelledby="reviews-title">
                    <div className="container-custom">
                        <h2 id="reviews-title" className="section-title">
                            What readers say
                        </h2>
                        <div className="section-divider" />
                        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {reviews.map((r) => (
                                <figure key={r.name} className="card-flat p-6">
                                    <Stars rating={r.rating} />
                                    <blockquote className="mt-4 leading-relaxed text-charcoal-light">
                                        {r.text}
                                    </blockquote>
                                    <figcaption className="mt-4 font-semibold text-burgundy-700">{r.name}</figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Author */}
            <section className="section" aria-labelledby="author-title">
                <div className="container-custom mx-auto max-w-3xl">
                    <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
                        <AuthorAvatar key={book.id} book={book} />
                        <div>
                            <h2 id="author-title" className="text-2xl md:text-2xl">
                                About {book.author}
                            </h2>
                            <p className="mt-3 leading-relaxed text-charcoal-light">{book.authorBio}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related books */}
            {related.length > 0 && (
                <section className="section-alt" aria-labelledby="related-title">
                    <div className="container-custom">
                        <h2 id="related-title" className="section-title">
                            You may also like
                        </h2>
                        <div className="section-divider" />
                        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((b) => (
                                <BookCard key={b.id} book={b} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <NewsletterBanner />
        </>
    );
}