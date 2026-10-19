/**
 * Small helpers used by the Books pages.
 * Nothing here needs editing to add or change books: edit data/books.js instead.
 */

export const formatPrice = (price, currency = 'ZAR') =>
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency }).format(price);

export const formatReleaseDate = (iso) =>
    new Date(iso).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long' });

export const getAvailableFormats = (book) => book.formats.filter((f) => f.available);

// Lowest price among the formats people can buy right now (or null)
export const getStartingPrice = (book) => {
    const available = getAvailableFormats(book);
    if (available.length === 0) return null;
    const cheapest = available.reduce((min, f) => (f.price < min.price ? f : min));
    return { price: cheapest.price, currency: cheapest.currency };
};

// First paragraph of the long description, used on cards and in SEO tags
export const getShortDescription = (book) => book.description.split('\n\n')[0];

const storeLabels = {
    amazon: 'Amazon',
    takealot: 'Takealot',
    selar: 'Selar',
    churchStore: 'our church store',
};

// Only stores that have a link filled in
export const getBuyLinks = (book) =>
    Object.entries(book.buyLinks || {})
        .filter(([, url]) => url)
        .map(([key, url]) => ({ key, url, label: storeLabels[key] || key }));

export const sortOptions = [
    { value: 'newest', label: 'Newest first' },
    { value: 'price-low', label: 'Price: low to high' },
    { value: 'price-high', label: 'Price: high to low' },
    { value: 'title', label: 'Title A to Z' },
];

export const sortBooks = (list, sort) => {
    const sorted = [...list];
    const price = (b) => getStartingPrice(b)?.price ?? Infinity;
    switch (sort) {
        case 'price-low':
            return sorted.sort((a, b) => price(a) - price(b));
        case 'price-high':
            return sorted.sort(
                (a, b) => (getStartingPrice(b)?.price ?? -1) - (getStartingPrice(a)?.price ?? -1)
            );
        case 'title':
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        default:
            return sorted.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    }
};