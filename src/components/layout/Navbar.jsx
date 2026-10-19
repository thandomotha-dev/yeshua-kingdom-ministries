import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';

import navigation from '../../data/navigation';
import siteConfig from '../../data/siteConfig';

// The "Give" link is shown as a gold button instead of a normal menu item.
const GIVE_PATH = '/give';

const linkBase =
    'rounded-lg px-2.5 py-2 text-[13px] font-semibold transition-colors duration-200';

const desktopLinkClass = ({ isActive }) =>
    `${linkBase} ${isActive
        ? 'bg-burgundy-50 text-burgundy-700'
        : 'text-charcoal hover:bg-burgundy-50 hover:text-burgundy-700'
    }`;

const mobileLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-base font-semibold ${isActive
        ? 'bg-burgundy-50 text-burgundy-700'
        : 'text-charcoal hover:bg-cream-200'
    }`;

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const menuItems = navigation.filter((item) => item.path !== GIVE_PATH);
    const giveItem = navigation.find((item) => item.path === GIVE_PATH);

    // Close the mobile menu whenever the page changes
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    // Add a shadow once the page has been scrolled
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Stop the page behind the mobile menu from scrolling
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <header
            className={`sticky top-0 z-50 border-b border-cream-200 bg-white/95 backdrop-blur transition-shadow duration-300 ${scrolled ? 'shadow-warm' : ''
                }`}
        >
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-burgundy-700 focus:px-4 focus:py-2 focus:text-white"
            >
                Skip to main content
            </a>

            <nav
                className="container-custom flex h-18 items-center justify-between gap-4"
                aria-label="Main navigation"
            >
                {/* Logo / church name */}
                <Link to="/" className="flex items-center gap-3" aria-label={`${siteConfig.churchName} home`}>
                    {/* TODO: swap this badge for an <img src={siteConfig.logo} /> once you have a logo */}
                    <span
                        aria-hidden="true"
                        className="gradient-burgundy flex h-11 w-11 items-center justify-center rounded-full font-heading text-lg font-bold text-gold-400"
                    >
                        YK
                    </span>
                    <span className="font-heading text-lg font-bold leading-tight text-burgundy-900">
                        {siteConfig.churchName}
                    </span>
                </Link>

                {/* Desktop menu */}
                <ul className="hidden items-center gap-0.5 xl:flex">
                    {menuItems.map((item) =>
                        item.children ? (
                            <li key={item.label} className="group relative">
                                <button
                                    type="button"
                                    className={`${linkBase} flex items-center gap-1 text-charcoal hover:bg-burgundy-50 hover:text-burgundy-700`}
                                    aria-haspopup="true"
                                >
                                    {item.label}
                                    <ChevronDownIcon className="h-3.5 w-3.5" aria-hidden="true" />
                                </button>
                                <ul className="invisible absolute left-0 top-full min-w-[11rem] rounded-xl border border-cream-200 bg-white p-2 opacity-0 shadow-warm-lg transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                                    {item.children.map((child) => (
                                        <li key={child.path}>
                                            <NavLink
                                                to={child.path}
                                                className={({ isActive }) =>
                                                    `block rounded-lg px-3 py-2 text-sm font-semibold ${isActive
                                                        ? 'bg-burgundy-50 text-burgundy-700'
                                                        : 'text-charcoal hover:bg-burgundy-50 hover:text-burgundy-700'
                                                    }`
                                                }
                                            >
                                                {child.label}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ) : (
                            <li key={item.path}>
                                <NavLink to={item.path} end={item.path === '/'} className={desktopLinkClass}>
                                    {item.label}
                                </NavLink>
                            </li>
                        )
                    )}
                    {giveItem && (
                        <li className="ml-2">
                            <Link to={giveItem.path} className="btn-secondary btn-sm">
                                {giveItem.label}
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Mobile menu button */}
                <button
                    type="button"
                    className="rounded-lg p-2 text-burgundy-700 hover:bg-burgundy-50 xl:hidden"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                >
                    {open ? (
                        <XMarkIcon className="h-7 w-7" aria-hidden="true" />
                    ) : (
                        <Bars3Icon className="h-7 w-7" aria-hidden="true" />
                    )}
                </button>
            </nav>

            {/* Mobile menu panel */}
            {open && (
                <div
                    id="mobile-menu"
                    className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-cream-200 bg-white xl:hidden"
                >
                    <ul className="container-custom space-y-1 py-4">
                        {menuItems.map((item) =>
                            item.children ? (
                                <li key={item.label}>
                                    <p className="px-4 pb-1 pt-3 text-sm font-semibold text-charcoal-lighter">
                                        {item.label}
                                    </p>
                                    <ul className="space-y-1 border-l-2 border-gold-300 pl-3 ml-4">
                                        {item.children.map((child) => (
                                            <li key={child.path}>
                                                <NavLink to={child.path} className={mobileLinkClass}>
                                                    {child.label}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ) : (
                                <li key={item.path}>
                                    <NavLink to={item.path} end={item.path === '/'} className={mobileLinkClass}>
                                        {item.label}
                                    </NavLink>
                                </li>
                            )
                        )}
                        {giveItem && (
                            <li className="pt-3">
                                <Link to={giveItem.path} className="btn-secondary w-full">
                                    {giveItem.label}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </header>
    );
}