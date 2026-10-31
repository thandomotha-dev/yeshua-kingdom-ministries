import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import siteConfig from '../data/siteConfig';
import givingOptions, { fundUsage, givingScriptures } from '../data/givingOptions';
import CopyField from '../components/giving/CopyField';
import PartnerForm from '../components/forms/PartnerForm';
import { isRealLink } from '../utils/links';

/**
 * TODO before going live:
 * - Replace the bank details, payment link and QR codes in data/givingOptions.js
 * - Replace the example percentages in "fundUsage" with the church's real figures
 */

const detailLabels = {
    bankName: 'Bank',
    accountName: 'Account name',
    accountNumber: 'Account number',
    branchCode: 'Branch code',
    accountType: 'Account type',
    swiftCode: 'SWIFT code',
    reference: 'Payment reference',
};

// A QR code image, or a short message if the image has not been added yet
function QrImage({ src, label }) {
    const [failed, setFailed] = useState(false);

    return (
        <figure className="text-center">
            {failed ? (
                <div className="flex justify-center items-center p-3 w-36 h-36 text-xs rounded-xl border border-dashed border-cream-300 text-charcoal-lighter">
                    QR code coming soon
                </div>
            ) : (
                <img
                    src={src}
                    alt={`${label} QR code`}
                    loading="lazy"
                    onError={() => setFailed(true)}
                    className="object-contain p-2 w-36 h-36 bg-white rounded-xl border border-cream-300"
                />
            )}
            <figcaption className="mt-2 text-sm font-semibold text-charcoal">{label}</figcaption>
        </figure>
    );
}

function GivingCard({ option }) {
    const detailEntries = Object.entries(option.details || {}).filter(([key]) => detailLabels[key]);
    const hasQr = option.details && (option.details.snapScanCode || option.details.zapperCode);

    return (
        <article className="p-6 card-flat">
            <h3 className="text-2xl md:text-2xl">{option.method}</h3>
            <p className="mt-2 text-charcoal-light">{option.description}</p>

            {option.link !== undefined &&
                (isRealLink(option.link) ? (
                    <a
                        href={option.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 btn-primary"
                    >
                        {option.buttonText || 'Give online'}
                    </a>
                ) : (
                    <p className="p-4 mt-5 text-sm rounded-xl bg-cream-100 text-charcoal-lighter">
                        Online giving is coming soon. Please use one of the other options for now.
                    </p>
                ))}

            {detailEntries.length > 0 && (
                <dl className="mt-4 divide-y divide-cream-300">
                    {detailEntries.map(([key, value]) => (
                        <CopyField key={key} label={detailLabels[key]} value={value} />
                    ))}
                </dl>
            )}

            {hasQr && (
                <div className="flex flex-wrap gap-6 justify-center mt-5">
                    {option.details.snapScanCode && (
                        <QrImage src={option.details.snapScanCode} label="SnapScan" />
                    )}
                    {option.details.zapperCode && <QrImage src={option.details.zapperCode} label="Zapper" />}
                </div>
            )}
        </article>
    );
}

export default function Give() {
    const description = `Give your tithes and offerings, or become a partner of ${siteConfig.churchName}. Bank details, online giving and more.`;

    return (
        <>
            <Helmet>
                <title>{`Give and Partner | ${siteConfig.churchName}`}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${siteConfig.siteUrl}/give`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Give and Partner | ${siteConfig.churchName}`} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`${siteConfig.siteUrl}${siteConfig.ogImage}`} />
                <meta property="og:url" content={`${siteConfig.siteUrl}/give`} />
            </Helmet>

            {/* Header */}
            <section className="text-white gradient-burgundy" aria-labelledby="give-title">
                <div className="py-16 container-custom md:py-24">
                    <div className="max-w-2xl">
                        <h1 id="give-title" className="text-4xl text-white md:text-5xl">
                            Give and partner with us
                        </h1>
                        <p className="mt-4 text-lg leading-relaxed text-white/85">
                            Your tithes, offerings and partnership help us preach the Gospel, serve families and
                            reach our community. Thank you for your generosity.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <a href="#ways-to-give" className="btn-secondary btn-lg">
                                Ways to give
                            </a>
                            <a href="#partner" className="btn-outline-white btn-lg">
                                Become a partner
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why we give */}
            <section className="section" aria-labelledby="why-give-title">
                <div className="container-custom">
                    <h2 id="why-give-title" className="section-title">
                        Why we give
                    </h2>
                    <div className="section-divider" />
                    <div className="grid gap-6 mt-10 md:grid-cols-3">
                        {givingScriptures.map((verse) => (
                            <figure key={verse.reference} className="flex flex-col p-6 card-flat">
                                <blockquote className="flex-1 italic leading-relaxed font-heading text-charcoal-light">
                                    {verse.text}
                                </blockquote>
                                <figcaption className="mt-4 font-semibold text-burgundy-700">
                                    {verse.reference}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                    <p className="mt-6 text-xs text-center text-charcoal-lighter">
                        Scripture quotations taken from the Holy Bible, New International Version&reg;, NIV&reg;.
                        Copyright &copy; 1973, 1978, 1984, 2011 by Biblica, Inc.&reg; Used by permission. All
                        rights reserved worldwide.
                    </p>
                </div>
            </section>

            {/* Ways to give */}
            <section id="ways-to-give" className="section-alt scroll-mt-20" aria-labelledby="ways-title">
                <div className="container-custom">
                    <h2 id="ways-title" className="section-title">
                        Ways to give
                    </h2>
                    <div className="section-divider" />
                    <p className="section-subtitle">
                        Choose whatever is easiest for you. Use the copy buttons to paste details straight into
                        your banking app.
                    </p>

                    <div className="grid gap-6 items-start md:grid-cols-2">
                        {givingOptions.map((option) => (
                            <GivingCard key={option.id} option={option} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How funds are used */}
            <section className="section" aria-labelledby="funds-title">
                <div className="mx-auto max-w-3xl container-custom">
                    <h2 id="funds-title" className="section-title">
                        How your giving is used
                    </h2>
                    <div className="section-divider" />
                    <p className="section-subtitle">We believe in being open about where every rand goes.</p>

                    <ul className="space-y-5">
                        {fundUsage.map((item) => (
                            <li key={item.label}>
                                <div className="flex justify-between items-center text-sm font-semibold">
                                    <span className="text-charcoal">{item.label}</span>
                                    <span className="text-burgundy-700">{item.percentage}%</span>
                                </div>
                                <div className="overflow-hidden mt-2 h-3 rounded-full bg-cream-300">
                                    <div
                                        className="h-full rounded-full bg-burgundy-600"
                                        style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Become a partner */}
            <section id="partner" className="section-alt scroll-mt-20" aria-labelledby="partner-title">
                <div className="mx-auto max-w-2xl container-custom">
                    <h2 id="partner-title" className="section-title">
                        Become a partner
                    </h2>
                    <div className="section-divider" />
                    <p className="section-subtitle">
                        Partners stand with us in prayer and giving as we reach more people. Tell us how you
                        would like to be involved and we will contact you.
                    </p>
                    <PartnerForm />
                </div>
            </section>
        </>
    );
}