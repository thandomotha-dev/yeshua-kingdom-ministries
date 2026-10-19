import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import books from '../data/books';
import siteConfig from '../data/siteConfig';
import FeaturedBookHero from '../components/books/FeaturedBookHero';
import BookFilters from '../components/books/BookFilters';
import BookCard from '../components/books/BookCard';
import NewsletterBanner from '../components/books/NewsletterBanner';
import { sortBooks } from '../components/books/bookUtils';

export default function Books() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [format, setFormat] = useState('All');
    const [sort, setSort] = useState('newest');

    const featured = books.find((b) => b.featured) || books[0];

    const visibleBooks = useMemo(() => {
        const query = search.trim().toLowerCase();

        const filtered = books.filter((book) => {
            if (category !== 'All' && book.category !== category) return false;
            if (format !== 'All' && !book.formats.some((f) => f.type === format && f.available)) {
                return false;
            }
            if (query) {
                const text = `${book.title} ${book.subtitle} ${book.author} ${book.category} ${book.description}`.toLowerCase();
                if (!text.includes(query)) return false;
            }
            return true;
        });

        return sortBooks(filtered, sort);
    }, [search, category, format, sort]);

    const hasFilters = search !== '' || category !== 'All' || format !== 'All';

    const clearFilters = () => {
        setSearch('');
        setCategory('All');
        setFormat('All');
    };

    const description =
        'Books by Pastor John and Sarah Doe on faith, marriage, leadership, devotion, youth and children.';

    return (
        <>
            <Helmet>
                <title>{`Books | ${siteConfig.churchName}`}</title>
                <meta name="description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Books | ${siteConfig.churchName}`} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`${siteConfig.siteUrl}${siteConfig.ogImage}`} />
                <meta property="og:url" content={`${siteConfig.siteUrl}/books`} />
                <link rel="canonical" href={`${siteConfig.siteUrl}/books`} />
            </Helmet>

            <FeaturedBookHero book={featured} />

            <section className="section" aria-labelledby="all-books-title">
                <div className="container-custom">
                    <h2 id="all-books-title" className="section-title">
                        All books
                    </h2>
                    <div className="section-divider" />
                    <p className="section-subtitle">
                        Find a book to grow your faith, strengthen your marriage, lead others or encourage your
                        children.
                    </p>

                    <BookFilters
                        search={search}
                        onSearch={setSearch}
                        category={category}
                        onCategory={setCategory}
                        format={format}
                        onFormat={setFormat}
                        sort={sort}
                        onSort={setSort}
                        resultCount={visibleBooks.length}
                        hasFilters={hasFilters}
                        onClear={clearFilters}
                    />

                    {visibleBooks.length > 0 ? (
                        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {visibleBooks.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-10 rounded-2xl border border-cream-300 bg-white px-6 py-12 text-center">
                            <h3 className="text-xl md:text-xl">No books match your search</h3>
                            <p className="mt-2 text-charcoal-lighter">
                                Try a different word, or clear the filters to see every book.
                            </p>
                            <button type="button" onClick={clearFilters} className="btn-primary mt-6">
                                Show all books
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <NewsletterBanner />
        </>
    );
}