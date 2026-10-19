/**
 * ============================================
 * GIVING / OFFERINGS DATA
 * ============================================
 * Edit payment details below. These appear on the Offerings page.
 *
 * IMPORTANT: Double-check all bank details before going live!
 */

const givingOptions = [
  {
    id: 'bank-transfer',
    method: 'Bank Transfer (EFT)',
    icon: '🏦',
    description: 'Transfer directly to our church bank account.',
    details: {
      // TODO: Replace with real banking details
      bankName: 'First National Bank (FNB)',
      accountName: 'Yeshua Kingdom Ministries',
      accountNumber: '62000000000',
      branchCode: '250655',
      accountType: 'Cheque/Current',
      reference: 'Your Name + Tithe/Offering/Partnership',
    },
  },
  {
    id: 'online-payment',
    method: 'Online Payment (Card)',
    icon: '💳',
    description: 'Pay securely with your credit or debit card.',
    // TODO: Replace with your real payment link (e.g., PayFast, Paystack, Stripe)
    link: 'https://payfast.co.za/PLACEHOLDER',
    buttonText: 'Give Online',
  },
  {
    id: 'mobile-money',
    method: 'Mobile Payment',
    icon: '📱',
    description: 'Send via SnapScan, Zapper, or EFT from your banking app.',
    details: {
      // TODO: Replace with real mobile payment details
      snapScanCode: '/images/snapscan-placeholder.png',
      zapperCode: '/images/zapper-placeholder.png',
    },
  },
  {
    id: 'international',
    method: 'International Giving',
    icon: '🌍',
    description: 'For partners giving from outside South Africa.',
    details: {
      // TODO: Replace with real international banking details
      bankName: 'First National Bank (FNB)',
      swiftCode: 'FIRNZAJJ',
      accountName: 'Yeshua Kingdom Ministries',
      accountNumber: '62000000000',
      branchCode: '250655',
    },
  },
];

/**
 * Scripture references for the giving page
 */
export const givingScriptures = [
  {
    text: '"Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this," says the LORD Almighty, "and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it."',
    reference: 'Malachi 3:10 (NIV)',
  },
  {
    text: '"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."',
    reference: '2 Corinthians 9:7 (NIV)',
  },
  {
    text: '"Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap."',
    reference: 'Luke 6:38 (NIV)',
  },
];

/**
 * How funds are used — transparency section
 */
export const fundUsage = [
  { label: 'Ministry & Outreach', percentage: 35, icon: '🌍' },
  { label: 'Building & Facilities', percentage: 20, icon: '🏗️' },
  { label: 'Staff & Leadership', percentage: 20, icon: '👥' },
  { label: 'Youth & Children', percentage: 15, icon: '🧒' },
  { label: 'Community Projects', percentage: 10, icon: '❤️' },
];

export default givingOptions;
