/**
 * ============================================
 * SERVICE TIMES
 * ============================================
 * Edit the services below. Each service has:
 * - name: the service type
 * - day: which day it happens
 * - time: start time
 * - description: a short note about the service
 * - venue: where it takes place (leave blank if same as main church)
 * - icon: an emoji or icon name (used for display)
 * - ageGroup: only for children/youth services
 * - safetyInfo: only for children's services
 *
 * TIP: If a text string contains an apostrophe (') wrap it in double
 * quotes ("...") or backticks (`...`), or escape it like this: \'
 */

const serviceTimes = [
  {
    id: 'main-service',
    name: 'Main Service',
    day: 'Sunday',
    time: '09:00 AM',
    endTime: '11:30 AM',
    description:
      'Our main weekly gathering for worship, the Word, and fellowship. Everyone is welcome!',
    venue: '', // Leave blank = main church location
    icon: '⛪',
  },
  {
    id: 'midweek-service',
    name: 'Midweek Bible Study',
    day: 'Wednesday',
    time: '06:30 PM',
    endTime: '08:00 PM',
    description:
      'An interactive study through the Scriptures. Bring your Bible and your questions!',
    venue: '',
    icon: '📖',
  },
  {
    id: 'youth-service',
    name: 'Youth Service',
    day: 'Friday',
    time: '05:00 PM',
    endTime: '07:00 PM',
    description:
      'A vibrant, Spirit-filled gathering for teens and young adults (ages 13–25).',
    venue: 'Youth Hall',
    icon: '🔥',
    ageGroup: '13–25 years',
  },
  {
    id: 'kids-ministry',
    name: 'Kids Ministry',
    day: 'Sunday',
    time: '09:00 AM',
    endTime: '11:30 AM',
    description:
      'Fun, age-appropriate teaching during the main service. Children are checked in and checked out by a parent/guardian.',
    venue: 'Kids Hall',
    icon: '🌟',
    ageGroup: '3–12 years',
    safetyInfo:
      'All kids ministry volunteers are vetted and trained. We use a secure check-in/check-out system. Parents receive a tag number and must present it to collect their child.',
  },
  {
    id: 'prayer-meeting',
    name: 'Prayer Meeting',
    day: 'Saturday',
    time: '06:00 AM',
    endTime: '07:00 AM',
    description:
      'Start your weekend with powerful, corporate prayer. Come as you are.',
    venue: '',
    icon: '🙏',
  },
];

/**
 * Plan Your Visit FAQ
 * Add or remove questions as needed.
 */
const visitFAQ = [
  {
    question: 'What should I wear?',
    answer:
      "Come as you are! Our congregation dresses in everything from casual to smart — there's no dress code. Just come comfortable and ready to encounter God.",
  },
  {
    question: 'Is there parking?',
    answer:
      'Yes, we have free parking on-site. Marshals will guide you to available spots. We also have dedicated parking for visitors and people with disabilities.',
  },
  {
    question: 'What can I expect?',
    answer:
      "A warm welcome at the door, uplifting worship (about 30 minutes), followed by a practical, Bible-based message. Services usually last about 2 hours. We also have tea and coffee after the service — we'd love to meet you!",
  },
  {
    question: 'Is there anything for my children?',
    answer:
      'Absolutely! We have a dedicated Kids Ministry for ages 3–12 that runs during the main service. Children are checked in at the Kids Hall and enjoy age-appropriate Bible teaching, worship, and activities.',
  },
  {
    question: "I'm new — will I be singled out?",
    answer:
      "We'll never embarrass you! We may ask first-time visitors to stand briefly so we can welcome you, but it's completely optional. We do have a gift for first-time visitors at our Welcome Desk.",
  },
  {
    question: 'Can I watch online?',
    answer:
      'Yes! We stream our Sunday service live on YouTube. Check our YouTube channel for the live stream link each Sunday.',
  },
];

export { serviceTimes, visitFAQ };