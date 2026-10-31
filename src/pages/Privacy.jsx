import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import siteConfig from '../data/siteConfig';

/**
 * TODO before going live:
 * 1. Read this policy carefully and change anything that does not match what the
 *    church really does (for example, add analytics details if you add analytics).
 * 2. Have it reviewed by someone qualified, such as a lawyer or the church's
 *    appointed Information Officer. This is a plain-language starting point, not
 *    legal advice.
 */
const LAST_UPDATED = 'October 2026'; // TODO: update this whenever the policy changes

function Section({ title, children }) {
    return (
        <section className="mt-10">
            <h2 className="text-2xl md:text-2xl">{title}</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-charcoal-light">{children}</div>
        </section>
    );
}

function List({ items }) {
    return (
        <ul className="pl-6 space-y-2 list-disc">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

export default function Privacy() {
    const { churchName, email, address } = siteConfig;

    return (
        <>
            <Helmet>
                <title>{`Privacy Policy | ${churchName}`}</title>
                <meta
                    name="description"
                    content={`How ${churchName} collects, uses and protects your personal information.`}
                />
                <link rel="canonical" href={`${siteConfig.siteUrl}/privacy`} />
            </Helmet>

            <section className="text-white gradient-burgundy" aria-labelledby="privacy-title">
                <div className="py-14 container-custom md:py-20">
                    <h1 id="privacy-title" className="text-4xl text-white md:text-5xl">
                        Privacy policy
                    </h1>
                    <p className="mt-3 text-white/85">Last updated: {LAST_UPDATED}</p>
                </div>
            </section>

            <article className="section">
                <div className="mx-auto max-w-3xl container-custom">
                    <p className="text-lg leading-relaxed text-charcoal-light">
                        We care about your privacy. This page explains what personal information this website
                        collects, why we collect it, and the choices you have. We aim to follow South Africa&rsquo;s
                        Protection of Personal Information Act (POPIA).
                    </p>

                    <Section title="Who we are">
                        <p>
                            This website is run by {churchName}, based at {address.street}, {address.city},{' '}
                            {address.province}, {address.country}. You can reach us at{' '}
                            <a href={`mailto:${email}`} className="font-semibold underline text-burgundy-700">
                                {email}
                            </a>
                            .
                        </p>
                    </Section>

                    <Section title="What information we collect">
                        <p>We only collect what you choose to give us through our forms:</p>
                        <List
                            items={[
                                'Contact form: your name, email address, phone number (optional) and your message.',
                                'Prayer requests: your request, and optionally your name, email address and topic.',
                                'Marriage training registration: both partners\u2019 names, email, phone number, relationship stage and any note you add.',
                                'Newsletter: your email address.',
                                'Chapter orders: if you order book chapters through WhatsApp, we receive the message you send.',
                            ]}
                        />
                        <p>
                            Like most websites, our hosting provider may automatically record technical details
                            such as your IP address and browser type when you visit.
                        </p>
                    </Section>

                    <Section title="How we use your information">
                        <List
                            items={[
                                'To reply to your messages and questions.',
                                'To pray for you and, if you ask, to follow up with you.',
                                'To run our programs, such as marriage training, and to confirm your place.',
                                'To send you news about new books or events, only if you signed up for it.',
                                'To keep the website secure and working properly.',
                            ]}
                        />
                        <p>We do not sell your personal information.</p>
                    </Section>

                    <Section title="Prayer requests">
                        <p>
                            Prayer requests can contain sensitive details, such as health or family matters. We
                            handle them with extra care. If you choose &ldquo;Keep this private&rdquo;, your request is
                            seen only by our pastors and prayer leaders. If you choose &ldquo;Share with our prayer
                            team&rdquo;, our wider prayer team can see it so they can pray with you. You can always
                            send a request without your name or email.
                        </p>
                    </Section>

                    <Section title="Who we share information with">
                        <p>
                            We use trusted services to run the website. They handle information only for the
                            purposes we give them:
                        </p>
                        <List
                            items={[
                                'A form service that delivers your form messages to us.',
                                'Our website hosting provider.',
                                'YouTube, which provides our sermon videos. We use its privacy-enhanced mode, and a video only loads after you press play.',
                                'Google Maps, which shows our location on some pages.',
                                'WhatsApp, if you choose to message us there.',
                            ]}
                        />
                        <p>
                            These services have their own privacy policies. We may also share information when the
                            law requires it.
                        </p>
                    </Section>

                    <Section title="Cookies">
                        <p>
                            This website does not use its own tracking cookies. Embedded content from other
                            services, such as YouTube videos and Google Maps, may set cookies of their own. If we
                            add website analytics in future, we will update this policy and tell you here.
                        </p>
                    </Section>

                    <Section title="How long we keep your information">
                        <p>
                            We keep your information only for as long as we need it for the reason you gave it to
                            us, or as the law requires. You can ask us to delete it at any time.
                        </p>
                    </Section>

                    <Section title="Keeping your information safe">
                        <p>
                            We take reasonable steps to protect your information. No method of sending information
                            over the internet is completely secure, so we cannot promise absolute security.
                        </p>
                    </Section>

                    <Section title="Your rights">
                        <p>You have the right to:</p>
                        <List
                            items={[
                                'Ask what personal information we hold about you.',
                                'Ask us to correct or delete it.',
                                'Object to how we use it, or withdraw your consent.',
                                'Complain to the Information Regulator of South Africa if you believe we have not handled your information properly (inforegulator.org.za).',
                            ]}
                        />
                        <p>
                            To use any of these rights, email us at{' '}
                            <a href={`mailto:${email}`} className="font-semibold underline text-burgundy-700">
                                {email}
                            </a>
                            .
                        </p>
                    </Section>

                    <Section title="Children">
                        <p>
                            This website is meant for adults. If you are under 18, please ask a parent or guardian
                            before sending us any personal information.
                        </p>
                    </Section>

                    <Section title="Changes to this policy">
                        <p>
                            We may update this policy from time to time. The date at the top shows when it was
                            last changed.
                        </p>
                    </Section>

                    <Section title="Questions">
                        <p>
                            If you have any questions about this policy, email{' '}
                            <a href={`mailto:${email}`} className="font-semibold underline text-burgundy-700">
                                {email}
                            </a>{' '}
                            or use our{' '}
                            <Link to="/contact" className="font-semibold underline text-burgundy-700">
                                contact page
                            </Link>
                            .
                        </p>
                    </Section>
                </div>
            </article>
        </>
    );
}