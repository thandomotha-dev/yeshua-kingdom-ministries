import { bookCategories, bookFormats } from '../../data/books';
import { sortOptions } from './bookUtils';

export default function BookFilters({
    search,
    onSearch,
    category,
    onCategory,
    format,
    onFormat,
    sort,
    onSort,
    resultCount,
    hasFilters,
    onClear,
}) {
    return (
        <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-[1fr_12rem_12rem]">
                <div>
                    <label htmlFor="book-search" className="label">
                        Search books
                    </label>
                    <input
                        id="book-search"
                        type="search"
                        className="input"
                        placeholder="Title, author or topic"
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="book-format" className="label">
                        Format
                    </label>
                    <select
                        id="book-format"
                        className="input"
                        value={format}
                        onChange={(e) => onFormat(e.target.value)}
                    >
                        {bookFormats.map((f) => (
                            <option key={f} value={f}>
                                {f === 'All' ? 'All formats' : f}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="book-sort" className="label">
                        Sort by
                    </label>
                    <select
                        id="book-sort"
                        className="input"
                        value={sort}
                        onChange={(e) => onSort(e.target.value)}
                    >
                        {sortOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
                {bookCategories.map((c) => {
                    const active = c === category;
                    return (
                        <button
                            key={c}
                            type="button"
                            aria-pressed={active}
                            onClick={() => onCategory(c)}
                            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${active
                                    ? 'border-burgundy-700 bg-burgundy-700 text-white'
                                    : 'border-cream-300 bg-white text-charcoal hover:border-burgundy-500 hover:text-burgundy-700'
                                }`}
                        >
                            {c}
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center justify-between text-sm text-charcoal-lighter" aria-live="polite">
                <p>
                    {resultCount} {resultCount === 1 ? 'book' : 'books'}
                </p>
                {hasFilters && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="font-semibold text-burgundy-700 hover:underline"
                    >
                        Clear filters
                    </button>
                )}
            </div>
        </div>
    );
}