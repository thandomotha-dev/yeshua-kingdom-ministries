import { sermonSeries, speakers } from '../../data/sermons';

export default function SermonFilters({
    search,
    onSearch,
    series,
    onSeries,
    speaker,
    onSpeaker,
    sort,
    onSort,
    resultCount,
    hasFilters,
    onClear,
}) {
    return (
        <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-[1fr_14rem_12rem]">
                <div>
                    <label htmlFor="sermon-search" className="label">
                        Search sermons
                    </label>
                    <input
                        id="sermon-search"
                        type="search"
                        className="input"
                        placeholder="Title, speaker or topic"
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="sermon-speaker" className="label">
                        Speaker
                    </label>
                    <select
                        id="sermon-speaker"
                        className="input"
                        value={speaker}
                        onChange={(e) => onSpeaker(e.target.value)}
                    >
                        {speakers.map((s) => (
                            <option key={s} value={s}>
                                {s === 'All' ? 'All speakers' : s}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="sermon-sort" className="label">
                        Sort by
                    </label>
                    <select
                        id="sermon-sort"
                        className="input"
                        value={sort}
                        onChange={(e) => onSort(e.target.value)}
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                    </select>
                </div>
            </div>

            <div role="group" aria-label="Filter by series" className="flex flex-wrap gap-2">
                {sermonSeries.map((s) => {
                    const active = s === series;
                    return (
                        <button
                            key={s}
                            type="button"
                            aria-pressed={active}
                            onClick={() => onSeries(s)}
                            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${active
                                    ? 'border-burgundy-700 bg-burgundy-700 text-white'
                                    : 'border-cream-300 bg-white text-charcoal hover:border-burgundy-500 hover:text-burgundy-700'
                                }`}
                        >
                            {s === 'All' ? 'All series' : s}
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-between items-center text-sm text-charcoal-lighter" aria-live="polite">
                <p>
                    {resultCount} {resultCount === 1 ? 'sermon' : 'sermons'}
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