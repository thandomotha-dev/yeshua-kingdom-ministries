import { useState } from 'react';

/**
 * Shows one payment detail (like an account number) with a Copy button.
 * Must be placed inside a <dl>.
 */
export default function CopyField({ label, value }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
        } catch {
            // Older browsers: copy through a temporary hidden text box
            const box = document.createElement('textarea');
            box.value = value;
            box.style.position = 'fixed';
            box.style.opacity = '0';
            document.body.appendChild(box);
            box.select();
            try {
                document.execCommand('copy');
            } catch {
                /* nothing more we can do */
            }
            document.body.removeChild(box);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex gap-3 justify-between items-center py-3">
            <div className="min-w-0">
                <dt className="text-xs text-charcoal-lighter">{label}</dt>
                <dd className="font-semibold break-words text-charcoal">{value}</dd>
            </div>
            <button
                type="button"
                onClick={copy}
                className="btn-ghost btn-sm shrink-0"
                aria-label={`Copy ${label}`}
            >
                {copied ? 'Copied' : 'Copy'}
            </button>
        </div>
    );
}