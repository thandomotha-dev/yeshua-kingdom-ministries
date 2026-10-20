/**
 * ============================================
 * CHAPTER SALES
 * ============================================
 * Sell individual chapters of a book. Each entry is matched to a book by its
 * "slug" in books.js. A book without an entry here simply shows no chapter shop.
 *
 * For each book:
 * - price: the price of ONE chapter
 * - unit: what to call each part ("Chapter", "Month", "Section"...)
 * - freeItems: (optional) positions of parts that are free, counting from 0.
 *              [0] makes the first item in the book's tableOfContents free.
 *
 * Chapters are listed in the same order as "tableOfContents" in books.js.
 *
 * The "complete book" price it is compared with is the cheapest available
 * format of that book (usually the eBook). Keep chapter prices high enough that
 * buying every chapter costs more than the book, or the comparison is hidden.
 *
 * TIP: If a text string contains an apostrophe (') wrap it in double
 * quotes ("...") or backticks (`...`), or escape it like this: \'
 */

export const chapterSalesSettings = {
    currency: 'ZAR',
    deliveryNote:
        'Chapters are digital downloads (PDF). After you order, we send your files by WhatsApp or email.', // TODO: confirm how chapters are delivered
};

const chapterSales = {
    'walking-in-kingdom-authority': { price: 39.99, unit: 'Chapter' },
    'covenant-marriage': { price: 44.99, unit: 'Chapter' },
    'raising-kingdom-leaders': { price: 34.99, unit: 'Chapter', freeItems: [0] },
    'daily-bread-devotional': { price: 49.99, unit: 'Month' },
    'on-fire-youth-devotional': { price: 24.99, unit: 'Section' },
    // 'little-warriors-bible-stories' is not listed: the kids book is sold whole.
};

export const getChapterSales = (slug) => chapterSales[slug] || null;

export default chapterSales;