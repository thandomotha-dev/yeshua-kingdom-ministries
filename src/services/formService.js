/**
 * ============================================
 * FORM SUBMISSION SERVICE
 * ============================================
 * Handles all form submissions through Formspree.
 * To switch to EmailJS or Netlify Forms, update this file only.
 */

const FORMSPREE_BASE = 'https://formspree.io/f/';

/**
 * Submit a form to Formspree
 * @param {string} formId - The Formspree form ID (from .env)
 * @param {Object} data - Form data to submit
 * @returns {Promise<{ok: boolean, message: string}>}
 */
export async function submitForm(formId, data) {
  // If no form ID configured, log and return success (development mode)
  if (!formId || formId.startsWith('your_')) {
    console.warn(
      '⚠️ Form submission skipped — no Formspree ID configured. Set up your .env file.'
    );
    return {
      ok: true,
      message: 'Form submitted successfully! (Development mode — configure Formspree to send real emails)',
    };
  }

  try {
    const response = await fetch(`${FORMSPREE_BASE}${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { ok: true, message: 'Thank you! Your submission has been received.' };
    }

    const errorData = await response.json();
    return {
      ok: false,
      message: errorData?.error || 'Something went wrong. Please try again.',
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      ok: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Get the Formspree form ID from environment variables
 */
export const formIds = {
  contact: import.meta.env.VITE_FORMSPREE_CONTACT_ID,
  prayer: import.meta.env.VITE_FORMSPREE_PRAYER_ID,
  marriage: import.meta.env.VITE_FORMSPREE_MARRIAGE_ID,
  partner: import.meta.env.VITE_FORMSPREE_PARTNER_ID,
  newsletter: import.meta.env.VITE_FORMSPREE_NEWSLETTER_ID,
};
