import { useState } from 'react';

import siteConfig from '../../data/siteConfig';
import { chapterSalesSettings, getChapterSales } from '../../data/chapterSales';
import { formatPrice, getAvailableFormats } from './bookUtils';

/**
 * Lets readers buy single chapters, while showing honestly that the complete
 * book is the better deal. Prices come from data/chapterSales.js.
 */
export default function ChapterShop({ book }) {
    const sales = getChapterSales(book.slug);
    const [selected, setSelected] = useState([]);

    const available = getAvailableFormats(book);
    if (!sales || available.length === 0) return null;

    const { currency } = chapterSalesSettings;
    const money = (value) => formatPrice(value, currency);
    const unit = sales.unit.toLowerCase();
    const units = `${unit}s`;
    const freeItems = sales.freeItems || [];

    const items = book.tableOfContents.map((title, index) => {
        const free = freeItems.includes(index);
        return { index, title, free, price: free ? 0 : sales.price };
    });
    const paidItems = items.filter((i) => !i.free);

    const allTotal = paidItems.length * sales.price;
    const cheapest = available.reduce((min, f) => (f.price < min.price ? f : min));
    const fullPrice = cheapest.price;
    const savings = allTotal - fullPrice;
    const showSavings = savings > 0;
    const savingsPercent = Math.round((savings / allTotal) * 100);
    // Fewest chapters whose combined price is higher than the complete book
    const breakEven = Math.floor(fullPrice / sales.price) + 1;

    const chosen = paidItems.filter((i) => selected.includes(i.index));
    const chosenTotal = chosen.reduce((sum, i) => sum + i.price, 0);
    const remaining = paidItems.length - chosen.length;
    const overFull = chosen.length > 0 && chosenTotal > fullPrice;
    const gap = fullPrice - chosenTotal;

    const toggle = (index) =>
        setSelected((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );

    const whatsappNumber = siteConfig.whatsapp.replace(/[^\d]/g, '');
    const orderMessage = [
        `Hello, I would like to order these ${units} from "${book.title}":`,
        ...chosen.map((i) => `- ${i.title} (${money(i.price)})`),
        `Total: ${money(chosenTotal)}`,
    ].join('\n');
    const orderLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMessage)}`;

    return (
        <section id="chapters" className="section scroll-mt-20 bg-gold-50" aria-labelledby="chapters-title">
            <div className="container-custom mx-auto max-w-4xl">
                <h2 id="chapters-title" className="section-title">
                    Buy by {unit}, or get the whole book
                </h2>
                <div className="section-divider" />
                <p className="section-subtitle">
                    {showSavings && breakEven <= paidItems.length
                        ? `Any ${breakEven} ${units} cost more than the complete book. Get it once and read every ${unit}.`
                        : `Start with the ${units} that speak to you, or get the complete book.`}
                </p>

                {/* Comparison */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="relative rounded-2xl border-2 border-gold-500 bg-white p-6 shadow-gold">
                        <span className="badge absolute -top-3 left-6 bg-gold-500 text-burgundy-900">
                            Best value
                        </span>
                        <h3 className="text-2xl md:text-2xl">The complete book</h3>
                        <p className="mt-2">
                            <span className="text-sm text-charcoal-lighter">From </span>
                            <span className="text-3xl font-bold text-burgundy-700">{money(fullPrice)}</span>
                        </p>
                        <ul className="mt-3 space-y-1 text-sm text-charcoal-light">
                            {available.map((f) => (
                                <li key={f.type}>
                                    {f.type}: <span className="font-semibold">{money(f.price)}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-3 text-sm text-charcoal-light">
                            Includes all {items.length} {units}
                            {freeItems.length > 0 ? ' (the free one too)' : ''}.
                        </p>
                        {showSavings && (
                            <p className="mt-3 inline-block rounded-lg bg-gold-100 px-3 py-1 text-sm font-semibold text-gold-800">
                                Save {savingsPercent}% ({money(savings)}) against buying every {unit}
                            </p>
                        )}
                        <a href="#buy" className="btn-primary mt-5 w-full">
                            Get the complete book
                        </a>
                    </div>

                    <div className="card-flat p-6">
                        <h3 className="text-2xl md:text-2xl">One {unit} at a time</h3>
                        <p className="mt-2">
                            <span className="text-3xl font-bold text-charcoal">{money(sales.price)}</span>
                            <span className="text-sm text-charcoal-lighter"> per {unit}</span>
                        </p>
                        <p className="mt-3 text-sm text-charcoal-light">
                            Buying all {paidItems.length} paid {units} separately comes to{' '}
                            <span className="font-semibold">{money(allTotal)}</span>.
                        </p>
                        <p className="mt-3 text-sm text-charcoal-lighter">
                            {chapterSalesSettings.deliveryNote}
                        </p>
                    </div>
                </div>

                {/* Chapter list */}
                <fieldset className="mt-10">
                    <legend className="sr-only">Choose the {units} you want to buy</legend>
                    <ul className="space-y-3">
                        {items.map((item) => {
                            const checked = selected.includes(item.index);
                            return (
                                <li key={item.index}>
                                    {item.free ? (
                                        <div className="flex items-center justify-between gap-4 rounded-xl border border-cream-300 bg-white/70 p-4">
                                            <span className="text-charcoal">{item.title}</span>
                                            <span className="flex shrink-0 items-center gap-3">
                                                <span className="badge bg-gold-100 text-gold-700">Free</span>
                                                <a href="#sample" className="text-sm font-semibold text-burgundy-700 hover:underline">
                                                    Read it free
                                                </a>
                                            </span>
                                        </div>
                                    ) : (
                                        <label
                                            className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${checked
                                                    ? 'border-burgundy-500 bg-burgundy-50'
                                                    : 'border-cream-300 bg-white hover:border-burgundy-300'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                className="h-5 w-5 shrink-0 accent-burgundy-700"
                                                checked={checked}
                                                onChange={() => toggle(item.index)}
                                            />
                                            <span className="flex-1 text-charcoal">{item.title}</span>
                                            <span className="shrink-0 font-semibold text-burgundy-700">
                                                {money(item.price)}
                                            </span>
                                        </label>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </fieldset>

                {/* Running total and nudge */}
                <div
                    aria-live="polite"
                    className="mt-6 rounded-2xl border border-cream-300 bg-white p-6 shadow-warm"
                >
                    {chosen.length === 0 ? (
                        <p className="text-charcoal-light">
                            Tick the {units} you want and we will show your total.
                        </p>
                    ) : (
                        <>
                            <p className="text-lg font-semibold text-charcoal">
                                {chosen.length} {chosen.length === 1 ? unit : units} selected:{' '}
                                <span className="text-burgundy-700">{money(chosenTotal)}</span>
                            </p>

                            {overFull ? (
                                <p className="mt-2 text-charcoal-light">
                                    Your selection already costs more than the complete book at{' '}
                                    <span className="font-semibold">{money(fullPrice)}</span>. Get the whole book and
                                    save <span className="font-semibold">{money(chosenTotal - fullPrice)}</span>
                                    {remaining > 0 ? `, plus you keep the other ${remaining} ${remaining === 1 ? unit : units}.` : '.'}
                                </p>
                            ) : (
                                remaining > 0 && (
                                    <p className="mt-2 text-charcoal-light">
                                        For just <span className="font-semibold">{money(gap)}</span> more, the complete
                                        book gives you all {items.length} {units}, including the other {remaining} you
                                        have not picked.
                                    </p>
                                )
                            )}

                            <div className="mt-5 flex flex-wrap gap-3">
                                <a href="#buy" className="btn-primary">
                                    Get the complete book for {money(fullPrice)}
                                </a>
                                <a
                                    href={orderLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline"
                                >
                                    {overFull ? 'Order these anyway' : `Order ${chosen.length === 1 ? 'this' : 'these'} ${chosen.length === 1 ? unit : units}`}
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}