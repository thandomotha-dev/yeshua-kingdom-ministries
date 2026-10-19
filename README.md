# Yeshua Kingdom Ministries Website

The official website for Yeshua Kingdom Ministries, built with React, Vite and Tailwind CSS. Most of the content (books, service times, sermons, events and contact details) lives in simple data files, so it can be updated without changing any page code.

## Tech stack

- [React](https://react.dev) with [Vite](https://vite.dev)
- [React Router](https://reactrouter.com) for page navigation
- [Tailwind CSS v3](https://v3.tailwindcss.com) for styling (see `tailwind.config.js` for the colors and fonts)
- [React Helmet Async](https://github.com/staylor/react-helmet-async) for page titles and SEO tags
- [Heroicons](https://heroicons.com) for icons

## Getting started

You need [Node.js](https://nodejs.org) (LTS version) installed.

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start the development server
npm run dev
```

Open the address shown in the terminal, usually `http://localhost:5173`. The page refreshes automatically when you save a file. Press `Ctrl + C` to stop the server.

### Other commands

| Command           | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Starts the site locally for development           |
| `npm run build`   | Creates the optimized live version in `dist/`     |
| `npm run preview` | Previews the built site locally before publishing |

> **Important:** this project uses Tailwind CSS **version 3**. Do not upgrade to version 4, because the styles in `src/index.css` will stop working.

## Project status

| Page                                  | Status            |
| ------------------------------------- | ----------------- |
| Home                                  | Built             |
| Books and book details                | Built             |
| Navbar, footer and layout             | Built             |
| About (values, vision, mission)       | Coming soon       |
| Service times and Plan Your Visit     | Coming soon       |
| Sermons                               | Coming soon       |
| Podcast                               | Coming soon       |
| Events                                | Coming soon       |
| Marriage training                     | Coming soon       |
| Offerings and partnerships (Give)     | Coming soon       |
| Bible                                 | Coming soon       |
| Prayer request                        | Coming soon       |
| Contact                               | Coming soon       |
| Privacy policy                        | Coming soon       |

Pages marked "Coming soon" currently show a placeholder (`src/pages/ComingSoon.jsx`). When a real page is built, import it in `src/App.jsx` and replace its placeholder route.

## Project structure

```
src/
├── App.jsx                 Page routes
├── main.jsx                App entry point
├── index.css               Design system (buttons, cards, inputs)
├── components/
│   ├── books/              Book cards, filters, hero, newsletter signup
│   ├── common/             Shared pieces (SEO, section headings, copy button)
│   ├── layout/             Navbar, footer, page layout
│   └── media/              YouTube video player
├── data/                   All editable content (see below)
├── pages/                  One file per page
├── services/               Form submission code
└── utils/                  Helper functions (dates and others)
public/
└── images/                 Logo, book covers, photos
```

## Editing content

You do not need to touch the page code to update the site. Edit these files in `src/data/`:

| File                  | What it controls                                            |
| --------------------- | ----------------------------------------------------------- |
| `siteConfig.js`       | Church name, tagline, address, phone, email, social links    |
| `navigation.js`       | The menu links                                              |
| `serviceTimes.js`     | Service times and the Plan Your Visit questions             |
| `books.js`            | All books, prices, buy links, excerpts, testimonials        |
| `sermons.js`          | Sermon videos (needs a YouTube video ID for each)           |
| `events.js`           | Upcoming events (past events are hidden automatically)      |
| `podcasts.js`         | Podcast episodes                                            |
| `givingOptions.js`    | Giving and partnership details                              |
| `marriageTraining.js` | Marriage training program details                           |
| `aboutContent.js`     | Mission, vision, values and beliefs                         |

Look for comments starting with `TODO:` in these files. They mark placeholder content that must be replaced with real details before the site goes live.

### Apostrophes in text

If a piece of text contains an apostrophe (like `it's` or `don't`), wrap the text in **double quotes** instead of single quotes, or the file will break:

```js
description: "It's a lifestyle.",   // correct
description: 'It's a lifestyle.',   // causes an error
```

### Adding a book

Copy an existing book in `books.js`, give it a new `id` and a unique `slug` (lowercase, hyphens, no spaces), then update its details. Set `featured: true` on the one book that should appear in the banner. To offer a sample download, add `samplePdf: '/samples/book-name.pdf'` and place the PDF in `public/samples/`.

### Adding images

Put images in `public/images/` and refer to them like `/images/books/book-1.jpg`. Book covers go in `public/images/books/`. If a cover image is missing, the site shows a designed placeholder instead.

### Adding a sermon

Open the video on YouTube and copy the ID from the address, the part after `v=`. In `https://youtube.com/watch?v=dQw4w9WgXcQ` the ID is `dQw4w9WgXcQ`. Paste it into the `youtubeId` field. Dates are written as `YYYY-MM-DD`.

## Environment variables

Private keys and form addresses go in a file called `.env` in the project root. This file is **not** uploaded to GitHub.

```
# Newsletter signup (create a form at formspree.io and paste its address here)
VITE_NEWSLETTER_ENDPOINT=https://formspree.io/f/your-form-id
```

Restart `npm run dev` after changing `.env`. When you publish the site, add the same variables in your hosting dashboard (Netlify or Vercel, under Environment variables).

## Publishing the site

The site is a single-page app, so the host must send every address to `index.html`. Otherwise refreshing a page like `/books` shows an error.

### Netlify

1. Create a file at `public/_redirects` containing: `/*  /index.html  200`
2. Connect this GitHub repository in Netlify.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Add your environment variables, then deploy.

### Vercel

1. Create a file called `vercel.json` in the project root:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```
2. Import this GitHub repository in Vercel. It detects Vite automatically.
3. Add your environment variables, then deploy.

Both services can connect a custom domain such as `yeshuakingdom.org` from their dashboards, and they redeploy automatically each time you push to `main`.

### Before going live

- Replace every `TODO:` placeholder (names, address, phone, email, social links, buy links, YouTube IDs).
- Add a real logo, social share image (`/images/og-default.jpg`) and favicon.
- Update `siteUrl` in `siteConfig.js` to the real web address.
- Connect the newsletter and form endpoints.
- Add a privacy policy page.
- Add `sitemap.xml` and `robots.txt` to `public/`.

## Saving your work with Git

```bash
git add .
git commit -m "Describe what you changed"
git push
```

## Troubleshooting

| Problem                                    | Fix                                                                                 |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| Blank white page                           | Press `F12`, open the Console tab and read the first red error                      |
| "Failed to resolve import"                 | A file is missing or in the wrong folder. Check the path in the error message       |
| "This site can't be reached"               | The dev server stopped. Run `npm run dev` again                                     |
| Error mentioning an unexpected string      | An apostrophe inside single quotes in a data file. Use double quotes instead        |
| Styles missing or "class does not exist"   | Check you are on Tailwind v3 (`npm list tailwindcss`) and `tailwind.config.js` exists |

## License

All rights reserved, Yeshua Kingdom Ministries. <!-- TODO: change if you want to use an open-source license -->
