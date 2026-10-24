import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowDownIcon, ArrowPathIcon, BookOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import siteConfig from '../data/siteConfig';
import { bibleStudies, dailyVerseReferences } from '../data/bibleStudy';
import { getBibleBooks, getBibleChapter, getBiblePassage, getBookChapters } from '../services/bibleService';

function getDayIndex(length) {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now - start) / 86400000);
    return dayOfYear % length;
}

function ErrorMessage({ message, onRetry }) {
    return (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
            <p>{message}</p>
            <button type="button" onClick={onRetry} className="mt-3 inline-flex items-center gap-2 font-semibold underline">
                <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
                Try again
            </button>
        </div>
    );
}

export default function Bible() {
    const [books, setBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState('');
    const [chapters, setChapters] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState(1);
    const [fromVerse, setFromVerse] = useState('1');
    const [toVerse, setToVerse] = useState('');
    const [verses, setVerses] = useState([]);
    const [booksError, setBooksError] = useState('');
    const [chaptersError, setChaptersError] = useState('');
    const [chapterError, setChapterError] = useState('');
    const [booksLoading, setBooksLoading] = useState(true);
    const [chaptersLoading, setChaptersLoading] = useState(false);
    const [chapterLoading, setChapterLoading] = useState(false);
    const [dailyVerse, setDailyVerse] = useState(null);
    const [dailyVerseError, setDailyVerseError] = useState('');
    const [dailyVerseLoading, setDailyVerseLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [topic, setTopic] = useState('All topics');
    const [booksRequest, setBooksRequest] = useState(0);
    const [chaptersRequest, setChaptersRequest] = useState(0);
    const [chapterRequest, setChapterRequest] = useState(0);
    const [dailyVerseRequest, setDailyVerseRequest] = useState(0);

    const verseReference = dailyVerseReferences[getDayIndex(dailyVerseReferences.length)];
    const todaysStudy = bibleStudies[getDayIndex(bibleStudies.length)];
    const topics = useMemo(() => ['All topics', ...new Set(bibleStudies.map((study) => study.topic))], []);
    const visibleStudies = useMemo(() => {
        const query = search.trim().toLowerCase();
        return bibleStudies.filter((study) => {
            if (topic !== 'All topics' && study.topic !== topic) return false;
            if (!query) return true;
            return `${study.title} ${study.topic} ${study.reference} ${study.reflection} ${study.prompt}`
                .toLowerCase()
                .includes(query);
        });
    }, [search, topic]);

    useEffect(() => {
        const controller = new AbortController();
        setBooksLoading(true);
        setBooksError('');

        getBibleBooks(controller.signal)
            .then((items) => {
                setBooks(items);
                setSelectedBookId((current) => current || items[0]?.id || '');
            })
            .catch((error) => {
                if (error.name !== 'AbortError') setBooksError(error.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setBooksLoading(false);
            });

        return () => controller.abort();
    }, [booksRequest]);

    useEffect(() => {
        if (!selectedBookId) return undefined;
        const controller = new AbortController();
        setChaptersLoading(true);
        setChaptersError('');

        getBookChapters(selectedBookId, controller.signal)
            .then(setChapters)
            .catch((error) => {
                if (error.name !== 'AbortError') setChaptersError(error.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setChaptersLoading(false);
            });

        return () => controller.abort();
    }, [selectedBookId, chaptersRequest]);

    useEffect(() => {
        if (!selectedBookId || !selectedChapter) return undefined;
        const controller = new AbortController();
        setChapterLoading(true);
        setChapterError('');

        getBibleChapter(selectedBookId, selectedChapter, controller.signal)
            .then(setVerses)
            .catch((error) => {
                if (error.name !== 'AbortError') setChapterError(error.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setChapterLoading(false);
            });

        return () => controller.abort();
    }, [selectedBookId, selectedChapter, chapterRequest]);

    useEffect(() => {
        const controller = new AbortController();
        setDailyVerseLoading(true);
        setDailyVerseError('');

        getBiblePassage(verseReference, controller.signal)
            .then(setDailyVerse)
            .catch((error) => {
                if (error.name !== 'AbortError') setDailyVerseError(error.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setDailyVerseLoading(false);
            });

        return () => controller.abort();
    }, [verseReference, dailyVerseRequest]);

    const currentBook = books.find((book) => book.id === selectedBookId);
    const visibleVerses = verses.filter((verse) => {
        const verseNumber = Number(verse.verse);
        return verseNumber >= Number(fromVerse || 1) && (!toVerse || verseNumber <= Number(toVerse));
    });

    const resetVerseRange = () => {
        setFromVerse('1');
        setToVerse('');
    };

    const openStudyPassage = (reference) => {
        const bookName = reference.replace(/ \d.*$/, '');
        const book = books.find((item) => item.name.toLowerCase() === bookName.toLowerCase());
        const chapter = Number(reference.match(/\d+/)?.[0]);
        if (book && chapter) {
            setSelectedBookId(book.id);
            setSelectedChapter(chapter);
            resetVerseRange();
            document.getElementById('bible-reader')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const metaDescription =
        'Read the Bible online and grow through daily Scripture, devotionals, and Bible study resources.';

    return (
        <>
            <Helmet>
                <title>{`Bible | ${siteConfig.churchName}`}</title>
                <meta name="description" content={metaDescription} />
                <link rel="canonical" href={`${siteConfig.siteUrl}/bible`} />
            </Helmet>

            <section className="gradient-burgundy text-white" aria-labelledby="bible-title">
                <div className="container-custom py-16 md:py-24">
                    <div className="max-w-3xl">
                        <span className="badge bg-gold-500 text-burgundy-900">Read · Reflect · Grow</span>
                        <h1 id="bible-title" className="mt-5 text-4xl text-white md:text-5xl">
                            The Bible
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
                            Read Scripture, spend a few minutes in a daily devotion, and find encouragement for your walk with God.
                        </p>
                        <a href="#bible-reader" className="btn-secondary btn-lg mt-8">
                            <BookOpenIcon className="h-5 w-5" aria-hidden="true" />
                            Open the Bible
                            <ArrowDownIcon className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </section>

            <section className="section" aria-labelledby="daily-title">
                <div className="container-custom grid gap-8 lg:grid-cols-2">
                    <article className="rounded-3xl bg-white p-7 shadow-warm md:p-10">
                        <span className="badge-gold">Verse of the day · King James Version</span>
                        <h2 id="daily-title" className="mt-4 text-2xl">A word for today</h2>
                        {dailyVerseLoading ? (
                            <p className="mt-5 text-charcoal-lighter" role="status">Loading today’s verse…</p>
                        ) : dailyVerseError ? (
                            <div className="mt-5">
                                <ErrorMessage
                                    message={dailyVerseError}
                                    onRetry={() => setDailyVerseRequest((request) => request + 1)}
                                />
                            </div>
                        ) : (
                            <>
                                <blockquote className="mt-5 border-l-4 border-gold-500 pl-5 font-heading text-xl italic leading-relaxed text-burgundy-900">
                                    {dailyVerse?.text?.trim()}
                                </blockquote>
                                <p className="mt-4 font-semibold text-burgundy-700">{dailyVerse?.reference}</p>
                            </>
                        )}
                    </article>

                    <article className="rounded-3xl border border-cream-300 bg-cream-100 p-7 md:p-10">
                        <span className="badge-burgundy">Daily devotion · {todaysStudy.topic}</span>
                        <h2 className="mt-4 text-2xl">{todaysStudy.title}</h2>
                        <p className="mt-2 text-sm font-semibold text-burgundy-700">{todaysStudy.reference} · {todaysStudy.readingTime}</p>
                        <p className="mt-5 leading-relaxed text-charcoal-light">{todaysStudy.reflection}</p>
                        <p className="mt-5 rounded-xl bg-white/75 p-4 leading-relaxed text-charcoal">
                            <span className="font-semibold">Reflect:</span> {todaysStudy.prompt}
                        </p>
                        <button type="button" onClick={() => openStudyPassage(todaysStudy.reference)} className="btn-outline mt-6">
                            Read this passage
                        </button>
                    </article>
                </div>
            </section>

            <section id="bible-reader" className="section-alt scroll-mt-20" aria-labelledby="reader-title">
                <div className="container-custom">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 id="reader-title">Read the Bible</h2>
                        <div className="section-divider mt-5" />
                        <p className="section-subtitle">
                            Choose a book and chapter to read the King James Version right here.
                        </p>
                    </div>

                    {booksError ? (
                        <div className="mx-auto max-w-3xl">
                            <ErrorMessage
                                message={booksError}
                                onRetry={() => setBooksRequest((request) => request + 1)}
                            />
                        </div>
                    ) : (
                        <div className="mx-auto max-w-3xl">
                            <div className="grid gap-4 rounded-2xl border border-cream-300 bg-white p-5 sm:grid-cols-[1fr_10rem_10rem_10rem]">
                                <label className="label">
                                    Book
                                    <select
                                        className="input mt-2"
                                        value={selectedBookId}
                                        onChange={(event) => {
                                            setSelectedBookId(event.target.value);
                                            setSelectedChapter(1);
                                            resetVerseRange();
                                        }}
                                        disabled={booksLoading}
                                    >
                                        {booksLoading && <option value="">Loading books…</option>}
                                        {books.map((book) => <option key={book.id} value={book.id}>{book.name}</option>)}
                                    </select>
                                </label>
                                <label className="label">
                                    Chapter
                                    <select
                                        className="input mt-2"
                                        value={selectedChapter}
                                        onChange={(event) => {
                                            setSelectedChapter(Number(event.target.value));
                                            resetVerseRange();
                                        }}
                                        disabled={chaptersLoading || !chapters.length}
                                    >
                                        {chapters.map((item) => (
                                            <option key={item.chapter} value={item.chapter}>{item.chapter}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="label">
                                    From verse
                                    <select
                                        className="input mt-2"
                                        value={fromVerse}
                                        onChange={(event) => {
                                            const nextFrom = event.target.value;
                                            setFromVerse(nextFrom);
                                            if (toVerse && Number(nextFrom) > Number(toVerse)) setToVerse(nextFrom);
                                        }}
                                        disabled={chapterLoading || chaptersLoading || !verses.length}
                                    >
                                        {verses.map((verse) => (
                                            <option key={verse.verse} value={verse.verse}>
                                                Verse {verse.verse}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label className="label">
                                    To verse
                                    <select
                                        className="input mt-2"
                                        value={toVerse}
                                        onChange={(event) => {
                                            const nextTo = event.target.value;
                                            setToVerse(nextTo);
                                            if (nextTo && Number(nextTo) < Number(fromVerse)) setFromVerse(nextTo);
                                        }}
                                        disabled={chapterLoading || chaptersLoading || !verses.length}
                                    >
                                        <option value="">Last verse</option>
                                        {verses.map((verse) => (
                                            <option key={verse.verse} value={verse.verse}>
                                                Verse {verse.verse}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            {(chaptersError || chapterError) && (
                                <div className="mt-5">
                                    <ErrorMessage
                                        message={chaptersError || chapterError}
                                        onRetry={() => {
                                            if (chaptersError) setChaptersRequest((request) => request + 1);
                                            else setChapterRequest((request) => request + 1);
                                        }}
                                    />
                                </div>
                            )}

                            <div className="mt-6 rounded-3xl border border-cream-300 bg-white p-6 shadow-warm md:p-10">
                                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream-200 pb-5">
                                    <h3 className="text-2xl">
                                        {currentBook?.name || 'Bible'} {selectedChapter}
                                    </h3>
                                    <span className="badge-gold">King James Version</span>
                                </div>
                                {chapterLoading || chaptersLoading ? (
                                    <p className="py-10 text-center text-charcoal-lighter" role="status">Loading Scripture…</p>
                                ) : chapterError || chaptersError ? null : (
                                    <>
                                        <p className="sr-only" aria-live="polite">
                                            {`Showing verses ${fromVerse || 1} to ${toVerse || verses.length} of ${verses.length}.`}
                                        </p>
                                        <div
                                            className="max-h-[55vh] space-y-5 overflow-y-auto py-7 pr-3 scrollbar-thin"
                                            aria-label={`${currentBook?.name || 'Bible'} chapter ${selectedChapter} verses`}
                                        >
                                            {visibleVerses.map((verse) => (
                                                <p key={`${verse.book_id}-${verse.chapter}-${verse.verse}`} className="leading-8 text-charcoal-light">
                                                    <sup className="mr-2 font-semibold text-burgundy-700">{verse.verse}</sup>
                                                    {verse.text.trim()}
                                                </p>
                                            ))}
                                        </div>
                                        {verses.length === 0 && !chapterLoading && (
                                            <p className="py-8 text-center text-charcoal-lighter">No verses are available for this chapter.</p>
                                        )}
                                    </>
                                )}
                                <div className="flex justify-between border-t border-cream-200 pt-5">
                                    <button
                                        type="button"
                                        className="btn-ghost"
                                        disabled={chapterLoading || chaptersLoading || selectedChapter <= 1}
                                        onClick={() => {
                                            setSelectedChapter((chapter) => chapter - 1);
                                            resetVerseRange();
                                        }}
                                    >
                                        Previous chapter
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-ghost"
                                        disabled={chapterLoading || chaptersLoading || selectedChapter >= chapters.length}
                                        onClick={() => {
                                            setSelectedChapter((chapter) => chapter + 1);
                                            resetVerseRange();
                                        }}
                                    >
                                        Next chapter
                                    </button>
                                </div>
                            </div>
                            <p className="mt-4 text-center text-xs text-charcoal-lighter">
                                King James Version text is public domain. Scripture is provided by Bible API; an internet connection is required.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section className="section" aria-labelledby="studies-title">
                <div className="container-custom">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 id="studies-title">Bible study library</h2>
                        <div className="section-divider mt-5" />
                        <p className="section-subtitle">
                            Explore short reflections by topic, find a passage, and take a question into your day.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-[1fr_14rem]">
                        <label className="sr-only" htmlFor="study-search">Search Bible studies</label>
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-lighter" aria-hidden="true" />
                            <input
                                id="study-search"
                                type="search"
                                className="input pl-12"
                                placeholder="Search studies, topics, or passages…"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                        </div>
                        <label className="sr-only" htmlFor="study-topic">Filter by topic</label>
                        <select id="study-topic" className="input" value={topic} onChange={(event) => setTopic(event.target.value)}>
                            {topics.map((item) => <option key={item}>{item}</option>)}
                        </select>
                    </div>
                    <p className="mt-4 text-center text-sm text-charcoal-lighter" aria-live="polite">
                        {visibleStudies.length} {visibleStudies.length === 1 ? 'study' : 'studies'}
                    </p>

                    {visibleStudies.length ? (
                        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {visibleStudies.map((study) => (
                                <article key={study.id} className="card p-6">
                                    <span className="badge-burgundy">{study.topic}</span>
                                    <h3 className="mt-4 text-xl">{study.title}</h3>
                                    <p className="mt-2 text-sm font-semibold text-burgundy-700">{study.reference} · {study.readingTime}</p>
                                    <p className="mt-4 leading-relaxed text-charcoal-light">{study.reflection}</p>
                                    <p className="mt-4 text-sm leading-relaxed text-charcoal">
                                        <span className="font-semibold">Reflect:</span> {study.prompt}
                                    </p>
                                    <button type="button" onClick={() => openStudyPassage(study.reference)} className="btn-ghost mt-4 px-0">
                                        Read passage in the Bible
                                    </button>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-cream-300 bg-white p-8 text-center">
                            <h3 className="text-xl">No studies found</h3>
                            <p className="mt-2 text-charcoal-lighter">Try another search or choose a different topic.</p>
                            <button type="button" className="btn-primary mt-5" onClick={() => { setSearch(''); setTopic('All topics'); }}>
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
