const API_BASE = 'https://bible-api.com';
const TRANSLATION = 'kjv';

async function requestBible(path, signal) {
    const response = await fetch(`${API_BASE}${path}`, { signal });
    if (!response.ok) {
        throw new Error(`The Bible service returned an error (${response.status}).`);
    }

    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }

    return data;
}

export async function getBibleBooks(signal) {
    const data = await requestBible(`/data/${TRANSLATION}`, signal);
    return data.books;
}

export async function getBookChapters(bookId, signal) {
    const data = await requestBible(`/data/${TRANSLATION}/${encodeURIComponent(bookId)}`, signal);
    return data.chapters;
}

export async function getBibleChapter(bookId, chapter, signal) {
    const data = await requestBible(
        `/data/${TRANSLATION}/${encodeURIComponent(bookId)}/${chapter}`,
        signal
    );
    return data.verses;
}

export async function getBiblePassage(reference, signal) {
    const data = await requestBible(`/${encodeURIComponent(reference)}?translation=${TRANSLATION}`, signal);
    return data;
}
