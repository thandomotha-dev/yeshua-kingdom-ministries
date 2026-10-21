/**
 * Sends a form to a form-handling service such as Formspree.
 *
 * TODO: create a form at formspree.io, then put its address in a .env file:
 *   VITE_FORM_ENDPOINT=https://formspree.io/f/your-form-id
 * Restart `npm run dev` after changing .env.
 *
 * While developing (npm run dev) with no address set, the form pretends to
 * succeed so you can test the design. On the live site it shows an error
 * instead, so nobody thinks a message was sent when it was not.
 */
export async function submitForm({ endpoint, data }) {
    if (!endpoint) {
        if (import.meta.env.DEV) {
            console.warn('No form endpoint set. Simulating a successful submit in development.', data);
            return { ok: true, simulated: true };
        }
        throw new Error('Form endpoint is not configured');
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('The form could not be sent');
    return { ok: true };
}