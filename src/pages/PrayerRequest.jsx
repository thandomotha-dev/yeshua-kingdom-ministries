import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import siteConfig from '../data/siteConfig';
import PrayerRequestForm from '../components/forms/PrayerRequestForm';

export default function PrayerRequest() {
    const description = `Share a prayer request with ${siteConfig.churchName}. Your request is treated with care and confidentiality.`;

    return (
        <>
            <Helmet>
                <title>{`Prayer Request | ${siteConfig.churchName}`}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${siteConfig.siteUrl}/prayer-request`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Prayer Request | ${siteConfig.churchName}`} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`${siteConfig.siteUrl}${siteConfig.ogImage}`} />
                <meta property="og:url" content={`${siteConfig.siteUrl}/prayer-request`} />
            </Helmet>

            {/* Header */}
            <section className="text-white gradient-burgundy" aria-labelledby="prayer-page-title">
                <div className="py-16 container-custom md:py-24">
                    <div className="max-w-2xl">
                        <h1 id="prayer-page-title" className="text-4xl text-white md:text-5xl">
                            How can we pray for you?
                        </h1>
                        <p className="mt-4 text-lg leading-relaxed text-white/85">
                            Whatever you are facing, you do not have to carry it alone. Share your request and our
                            team will stand with you in prayer.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section" aria-labelledby="prayer-form-title">
                <div className="container-custom grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
                    {/* Reassurance */}
                    <div>
                        <h2 id="prayer-form-title">You are in safe hands</h2>
                        <div className="mx-0 mt-4 section-divider" />

                        <blockquote className="pl-5 text-lg italic leading-relaxed border-l-4 border-gold-500 font-heading text-burgundy-800">
                            Be careful for nothing; but in every thing by prayer and supplication with
                            thanksgiving let your requests be made known unto God.
                            <footer className="mt-2 text-sm not-italic text-charcoal-lighter">
                                Philippians 4:6 (KJV)
                            </footer>
                        </blockquote>

                        {/* TODO: make sure the points below match how your church really handles requests */}
                        <ul className="mt-8 space-y-5 text-charcoal-light">
                            <li>
                                <span className="block font-semibold text-charcoal">Private by default</span>
                                Requests are private unless you choose to share them with our prayer team. Private
                                requests are seen only by our pastors and prayer leaders.
                            </li>
                            <li>
                                <span className="block font-semibold text-charcoal">Your name is optional</span>
                                You can send a request without giving your name or email.
                            </li>
                            <li>
                                <span className="block font-semibold text-charcoal">Follow up if you want it</span>
                                Tick the follow-up box and add your email if you would like someone to reach out.
                            </li>
                        </ul>

                        <p className="p-4 mt-8 text-sm leading-relaxed rounded-xl bg-gold-50 text-charcoal-light">
                            This form is not watched around the clock. If someone is in danger, or you are in
                            crisis, please call your local emergency number straight away (112 from a mobile phone
                            in South Africa).
                        </p>

                        <p className="mt-6 text-sm text-charcoal-lighter">
                            Your details are used only to pray for you and, if you ask, to follow up. Read our{' '}
                            <Link to="/privacy" className="font-semibold underline text-burgundy-700">
                                privacy policy
                            </Link>
                            .
                        </p>
                    </div>

                    {/* Form */}
                    <div>
                        <PrayerRequestForm />
                    </div>
                </div>
            </section>
        </>
    );
}