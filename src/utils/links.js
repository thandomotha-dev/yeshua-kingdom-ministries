/**
 * True only for a real web address. Empty values, "#" and anything containing
 * the word PLACEHOLDER are treated as "not set up yet" so the site can hide
 * them instead of showing a button that leads nowhere.
 */
export const isRealLink = (url) =>
    Boolean(url) && url !== '#' && !String(url).toUpperCase().includes('PLACEHOLDER');