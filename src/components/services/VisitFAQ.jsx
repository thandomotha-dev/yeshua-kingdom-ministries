import { ChevronDownIcon } from '@heroicons/react/24/outline';

// Click-to-open questions. Uses the browser's built-in <details> element,
// so it works with the keyboard and screen readers without extra code.
export default function VisitFAQ({ items }) {
    return (
        <div className="space-y-3">
            {items.map((item) => (
                <details
                    key={item.question}
                    className="group rounded-xl border border-cream-300 bg-white shadow-warm open:border-burgundy-300"
                >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-charcoal [&::-webkit-details-marker]:hidden">
                        {item.question}
                        <ChevronDownIcon
                            className="h-5 w-5 shrink-0 text-burgundy-700 transition-transform duration-200 group-open:rotate-180"
                            aria-hidden="true"
                        />
                    </summary>
                    <p className="px-5 pb-5 leading-relaxed text-charcoal-light">{item.answer}</p>
                </details>
            ))}
        </div>
    );
}