/**
 * ============================================
 * BOOKS DATA
 * ============================================
 * This is the main data file for the Books section.
 * Add, edit, or remove books here. The website will update automatically.
 *
 * Each book needs:
 * - id: a unique number
 * - slug: URL-friendly name (lowercase, hyphens instead of spaces)
 * - title, subtitle, author
 * - category: one of the categories listed below
 * - formats: array of { type, price, available }
 * - coverImage: path to cover image (place images in /public/images/books/)
 * - description: full book description (can be long)
 * - excerpt: a sample chapter or excerpt
 * - buyLinks: external store URLs
 * - testimonials: reader reviews
 * - tableOfContents: array of chapter titles
 * - featured: true if this should appear in the hero banner
 * - releaseDate: publication date
 *
 * TIP: If a text string contains an apostrophe (') wrap it in double
 * quotes ("...") or backticks (`...`), or escape it like this: \'
 */

export const bookCategories = [
  'All',
  'Faith',
  'Marriage',
  'Leadership',
  'Devotional',
  'Youth',
  'Kids',
];

export const bookFormats = ['All', 'Paperback', 'eBook', 'Audiobook'];

const books = [
  {
    id: 1,
    slug: 'walking-in-kingdom-authority',
    title: 'Walking in Kingdom Authority',
    subtitle: 'Discovering Your Identity and Power as a Believer',
    author: 'Pastor John Doe', // TODO: Replace with real author name
    category: 'Faith',
    formats: [
      { type: 'Paperback', price: 249.99, currency: 'ZAR', available: true },
      { type: 'eBook', price: 149.99, currency: 'ZAR', available: true },
      { type: 'Audiobook', price: 199.99, currency: 'ZAR', available: false },
    ],
    coverImage: '/images/books/book-1.jpg', // TODO: Replace with real cover image
    description: `In "Walking in Kingdom Authority," Pastor John Doe takes you on a transformative journey through Scripture to uncover the authority that every believer carries. Drawing from years of pastoral experience and deep Biblical study, this book will challenge you to step into the fullness of your calling.

You will discover:
• How to understand your identity in Christ
• The keys to exercising spiritual authority in daily life
• Practical steps for overcoming fear, doubt, and spiritual opposition
• How to walk in victory in every area — family, work, ministry, and beyond

This is not just theology — it's a roadmap for living the abundant life Jesus promised.`,
    excerpt: `Chapter 1: The Kingdom Within

"The Kingdom of God does not come with observation; nor will they say, 'See here!' or 'See there!' For indeed, the kingdom of God is within you." — Luke 17:20-21 (NKJV)

There is a reality that many believers have yet to awaken to. It is not a distant hope or a future promise alone — it is a present truth. The Kingdom of God is not merely a place we go when we die. It is a realm of authority, power, and dominion that resides within every born-again believer right now.

For years, I walked through life as a Christian who knew the right words but hadn't grasped the full weight of what those words meant. I could quote Scripture, attend services, and lead prayers — but something was missing. There was a gap between what the Bible promised and what I experienced daily.

That gap closed the day I truly understood authority.

Not authority as the world defines it — not a title, a position, or a platform. Kingdom authority is something far deeper. It flows from identity. It is rooted in relationship. And it is activated by faith...`,
    buyLinks: {
      // TODO: Replace with real store URLs
      amazon: 'https://amazon.com/dp/PLACEHOLDER',
      takealot: 'https://takealot.com/PLACEHOLDER',
      selar: 'https://selar.co/PLACEHOLDER',
      churchStore: '', // Leave empty if no church store
    },
    testimonials: [
      {
        name: 'Grace M.',
        text: "This book completely changed how I see my walk with God. I finally understand the authority I carry as a believer. Every chapter is packed with revelation!",
        rating: 5,
      },
      {
        name: 'David K.',
        text: "Practical, biblical, and transformative. I've bought copies for my entire small group.",
        rating: 5,
      },
      {
        name: 'Nomsa T.',
        text: "I couldn't put it down. Pastor John writes with such clarity and passion. This is a must-read for every Christian.",
        rating: 5,
      },
    ],
    tableOfContents: [
      'Chapter 1: The Kingdom Within',
      'Chapter 2: Identity Before Authority',
      'Chapter 3: The Voice of the King',
      'Chapter 4: Breaking the Chains of Fear',
      'Chapter 5: Warfare and Worship',
      'Chapter 6: Authority in the Home',
      'Chapter 7: Authority in the Marketplace',
      'Chapter 8: Walking It Out Daily',
      'Chapter 9: The Mantle of Leadership',
      'Chapter 10: Legacy — Building Beyond Yourself',
    ],
    featured: true,
    releaseDate: '2024-03-15',
    authorBio:
      "Pastor John Doe is the senior pastor of Yeshua Kingdom Ministries. With over 15 years of ministry experience, he is passionate about equipping believers to walk in the fullness of their God-given authority. He holds a Master of Divinity and lives in Johannesburg with his wife Sarah and their three children.",
    authorImage: '/images/pastor-placeholder.jpg',
    relatedBooks: [2, 3], // IDs of related books
  },
  {
    id: 2,
    slug: 'covenant-marriage',
    title: 'Covenant Marriage',
    subtitle: 'Building a Marriage That Reflects Heaven',
    author: 'Pastor John & Sarah Doe', // TODO: Replace with real author names
    category: 'Marriage',
    formats: [
      { type: 'Paperback', price: 279.99, currency: 'ZAR', available: true },
      { type: 'eBook', price: 169.99, currency: 'ZAR', available: true },
    ],
    coverImage: '/images/books/book-2.jpg',
    description: `Marriage was God's first institution, and it remains one of His most powerful tools for transformation. In "Covenant Marriage," Pastor John and Sarah Doe share Biblical principles, personal stories, and practical wisdom for building a marriage that stands the test of time.

Whether you're engaged, newly married, or celebrating decades together, this book will help you:
• Understand the difference between a contract and a covenant
• Navigate conflict with grace and truth
• Build deep intimacy — spiritual, emotional, and physical
• Raise a godly family in a challenging world
• Recover and rebuild after seasons of difficulty`,
    excerpt: `Chapter 1: More Than a Contract

When Sarah and I stood at the altar twenty years ago, we had no idea what we were stepping into. We were in love — deeply, madly, naively in love. And while love is a beautiful starting point, it takes much more than feelings to build a marriage that lasts.

God designed marriage as a covenant, not a contract. A contract says, "I'll keep my end as long as you keep yours." A covenant says, "I'm committed to you regardless."

That distinction changed everything for us...`,
    buyLinks: {
      amazon: 'https://amazon.com/dp/PLACEHOLDER',
      takealot: 'https://takealot.com/PLACEHOLDER',
      selar: 'https://selar.co/PLACEHOLDER',
      churchStore: '',
    },
    testimonials: [
      {
        name: 'Michael & Linda R.',
        text: "We were on the verge of giving up when we found this book. The chapter on forgiveness saved our marriage. Thank you, Pastors!",
        rating: 5,
      },
      {
        name: 'Thabo S.',
        text: "Every engaged couple needs this book. It's honest, practical, and deeply biblical.",
        rating: 5,
      },
    ],
    tableOfContents: [
      'Chapter 1: More Than a Contract',
      'Chapter 2: Choosing Each Other Daily',
      'Chapter 3: Communication — The Lifeline',
      "Chapter 4: Intimacy God's Way",
      'Chapter 5: Fighting Fair',
      'Chapter 6: Money, Roles & Decision-Making',
      'Chapter 7: Raising Kingdom Kids Together',
      'Chapter 8: Seasons of Testing',
      'Chapter 9: Forgiveness and Restoration',
      'Chapter 10: A Legacy of Love',
    ],
    featured: false,
    releaseDate: '2023-08-01',
    authorBio:
      'Pastor John and Sarah Doe have been married for over 20 years and are the founders of the Kingdom Marriage Training program at Yeshua Kingdom Ministries.',
    authorImage: '/images/pastor-placeholder.jpg',
    relatedBooks: [1, 4],
  },
  {
    id: 3,
    slug: 'raising-kingdom-leaders',
    title: 'Raising Kingdom Leaders',
    subtitle: 'A Biblical Framework for Leadership Development',
    author: 'Pastor John Doe',
    category: 'Leadership',
    formats: [
      { type: 'Paperback', price: 229.99, currency: 'ZAR', available: true },
      { type: 'eBook', price: 139.99, currency: 'ZAR', available: true },
      { type: 'Audiobook', price: 179.99, currency: 'ZAR', available: true },
    ],
    coverImage: '/images/books/book-3.jpg',
    description: `The world is desperate for godly leaders — in churches, businesses, families, and communities. "Raising Kingdom Leaders" provides a comprehensive Biblical framework for identifying, developing, and releasing leaders who carry the heart of God.

This book covers:
• The difference between worldly leadership and Kingdom leadership
• How Jesus developed the Twelve — and what we can learn from His model
• Practical tools for mentoring and discipleship
• Building leadership pipelines in your church or organization
• Leading through crisis and uncertainty`,
    excerpt: `Introduction: The Leadership Crisis

We are living in an era of unprecedented leadership failure. Political leaders are distrusted. Business leaders are exposed. Even church leaders have fallen in devastating ways. The result? A generation that is cynical about leadership altogether.

But God's solution has never been better systems — it's always been better leaders. Leaders shaped not by ambition but by surrender. Not by position but by character. Not by charisma but by the Spirit of God...`,
    buyLinks: {
      amazon: 'https://amazon.com/dp/PLACEHOLDER',
      takealot: 'https://takealot.com/PLACEHOLDER',
      selar: 'https://selar.co/PLACEHOLDER',
      churchStore: '',
    },
    testimonials: [
      {
        name: 'Rev. Peter N.',
        text: "I've read dozens of leadership books, but this is the first one that feels truly Kingdom-oriented. Essential reading for pastors and ministry leaders.",
        rating: 5,
      },
    ],
    tableOfContents: [
      'Introduction: The Leadership Crisis',
      'Chapter 1: Jesus the Leader-Maker',
      'Chapter 2: Character Before Calling',
      'Chapter 3: The Heart of a Servant',
      'Chapter 4: Building a Leadership Pipeline',
      'Chapter 5: The Art of Mentoring',
      'Chapter 6: Delegation and Empowerment',
      'Chapter 7: Leading Through Crisis',
      "Chapter 8: The Leader's Family",
      'Chapter 9: Succession and Legacy',
    ],
    featured: false,
    releaseDate: '2024-01-10',
    authorBio:
      'Pastor John Doe is a sought-after speaker on leadership and organizational development, having trained leaders across Southern Africa.',
    authorImage: '/images/pastor-placeholder.jpg',
    relatedBooks: [1, 5],
  },
  {
    id: 4,
    slug: 'daily-bread-devotional',
    title: 'Daily Bread',
    subtitle: '365 Devotions for the Hungry Heart',
    author: 'Sarah Doe',
    category: 'Devotional',
    formats: [
      { type: 'Paperback', price: 299.99, currency: 'ZAR', available: true },
      { type: 'eBook', price: 179.99, currency: 'ZAR', available: true },
    ],
    coverImage: '/images/books/book-4.jpg',
    description: `Start every day with God's Word. "Daily Bread" is a year-long devotional that combines Scripture, reflection, prayer, and practical application to help you grow deeper in your relationship with the Lord.

Each daily entry includes:
• A key Scripture passage
• A short, heartfelt reflection
• A prayer to start your day
• A practical challenge for applying the Word

Perfect for personal devotion, family worship, or small group use.`,
    excerpt: `January 1 — New Beginnings

"See, I am doing a new thing! Now it springs up; do you not perceive it?" — Isaiah 43:19 (NIV)

Every new year carries an invitation from God: Will you trust Me with what's ahead? The past — with all its failures, heartbreaks, and missed opportunities — does not define your future. God is the God of new beginnings.

Today, take a moment to release last year to Him. Every regret. Every wound. Every unfinished plan. Place it in His hands and say, "Lord, I trust You with this new season."

Prayer: Father, thank You for the gift of a new day, a new year, a new beginning. I choose to trust You with everything I cannot see. Lead me, guide me, and fill me with fresh faith for the journey ahead. In Jesus' name, Amen.

Challenge: Write down three things you're releasing to God this year, and three things you're believing Him for. Keep this list somewhere you'll see it often.`,
    buyLinks: {
      amazon: 'https://amazon.com/dp/PLACEHOLDER',
      takealot: 'https://takealot.com/PLACEHOLDER',
      selar: 'https://selar.co/PLACEHOLDER',
      churchStore: '',
    },
    testimonials: [
      {
        name: 'Lerato P.',
        text: "This devotional has transformed my mornings. Each entry is short enough to fit into a busy schedule but deep enough to carry me through the day.",
        rating: 5,
      },
      {
        name: 'James O.',
        text: "I bought this for my wife and ended up reading it myself every morning. Beautiful, Spirit-led writing.",
        rating: 5,
      },
    ],
    tableOfContents: [
      'January: New Beginnings',
      'February: The Heart of Love',
      'March: Walking by Faith',
      'April: Resurrection Power',
      'May: The Holy Spirit',
      'June: Family & Relationships',
      'July: Purpose & Calling',
      'August: Prayer & Intimacy',
      'September: Spiritual Warfare',
      'October: Gratitude & Praise',
      'November: Generosity & Stewardship',
      'December: Hope & Expectation',
    ],
    featured: false,
    releaseDate: '2023-11-15',
    authorBio:
      "Sarah Doe is a writer, speaker, and pastor's wife with a deep passion for helping women and families encounter God through His Word.",
    authorImage: '/images/pastor-placeholder.jpg',
    relatedBooks: [2, 6],
  },
  {
    id: 5,
    slug: 'on-fire-youth-devotional',
    title: 'On Fire',
    subtitle: 'A 90-Day Devotional for Young Believers',
    author: 'Pastor John Doe',
    category: 'Youth',
    formats: [
      { type: 'Paperback', price: 179.99, currency: 'ZAR', available: true },
      { type: 'eBook', price: 99.99, currency: 'ZAR', available: true },
    ],
    coverImage: '/images/books/book-5.jpg',
    description: `Written specifically for teens and young adults, "On Fire" is a 90-day devotional that tackles real issues young believers face — identity, peer pressure, social media, purpose, relationships, and faith in a skeptical world.

Each day includes:
• A relatable real-life scenario
• A Scripture to anchor you
• A short, no-fluff reflection
• A daily dare to live it out

No religious clichés. No boring lectures. Just real talk about real faith for a generation that's ready to burn for Jesus.`,
    excerpt: `Day 1: You Are Not an Accident

"For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do." — Ephesians 2:10 (NIV)

Real Talk: You've probably scrolled through social media today and compared yourself to someone. Their body. Their grades. Their followers. Their life. And maybe, for a moment, you wondered: Do I even matter?

Here's the truth: You are not a random accident. You are God's handiwork — His masterpiece. The Greek word is "poiema," and it's where we get the English word "poem." You are a poem written by the hand of God.

Daily Dare: Look in the mirror today and say out loud: "I am God's masterpiece. I was created on purpose, for a purpose." Say it until you start to believe it — because it's true.`,
    buyLinks: {
      amazon: 'https://amazon.com/dp/PLACEHOLDER',
      takealot: 'https://takealot.com/PLACEHOLDER',
      selar: 'https://selar.co/PLACEHOLDER',
      churchStore: '',
    },
    testimonials: [
      {
        name: 'Sipho M., age 17',
        text: "Finally a devotional that speaks my language! This book kept me grounded during my matric year.",
        rating: 5,
      },
    ],
    tableOfContents: [
      'Days 1–10: Identity — Who Am I?',
      'Days 11–20: Purpose — Why Am I Here?',
      'Days 21–30: Relationships — Who Do I Walk With?',
      'Days 31–40: Pressure — How Do I Stand?',
      'Days 41–50: Faith — What Do I Believe?',
      'Days 51–60: Purity — How Do I Live?',
      'Days 61–70: Prayer — How Do I Connect?',
      'Days 71–80: Influence — How Do I Shine?',
      'Days 81–90: Fire — How Do I Keep Burning?',
    ],
    featured: false,
    releaseDate: '2024-06-01',
    authorBio:
      'Pastor John Doe has worked with young people for over a decade and is passionate about raising a generation that knows their God and walks in His power.',
    authorImage: '/images/pastor-placeholder.jpg',
    relatedBooks: [1, 6],
  },
  {
    id: 6,
    slug: 'little-warriors-bible-stories',
    title: 'Little Warriors',
    subtitle: 'Bible Stories for Brave Kids',
    author: 'Sarah Doe',
    category: 'Kids',
    formats: [
      { type: 'Paperback', price: 199.99, currency: 'ZAR', available: true },
    ],
    coverImage: '/images/books/book-6.jpg',
    description: `Introduce your little ones to the heroes of the Bible with "Little Warriors" — a beautifully illustrated storybook for children ages 4–10.

Featuring 20 stories from the Old and New Testaments, each retold in simple, engaging language with:
• Vibrant full-color illustrations
• A "Be Brave Like..." takeaway for each story
• Simple prayers kids can pray on their own
• Discussion questions for parents and Sunday school teachers

From David facing Goliath to Esther saving her people, these stories will inspire courage, faith, and a love for God's Word in the hearts of young readers.`,
    excerpt: `Story 1: David and the Giant

A long, long time ago, there was a boy named David. He wasn't the biggest. He wasn't the strongest. He wasn't even old enough to be a soldier. But David had something more powerful than muscles — he had faith in God.

One day, a giant named Goliath stood on a hill and shouted mean things at God's people. Everyone was scared. Even the big, strong soldiers hid in their tents.

But not David.

"Who is this giant that he thinks he can talk about our God like that?" David said. And with just a sling, a stone, and a whole lot of faith, David ran straight at the giant.

THWACK! The stone hit Goliath right in the forehead, and down he went!

Be Brave Like David: You might face "giants" too — things that seem too big or too scary. But remember: God is ALWAYS bigger. Talk to Him about your giants, and trust Him to help you be brave.

Let's Pray: "Dear God, when I'm scared, help me remember that You are bigger than any giant. Give me courage like David. Amen."`,
    buyLinks: {
      amazon: 'https://amazon.com/dp/PLACEHOLDER',
      takealot: 'https://takealot.com/PLACEHOLDER',
      selar: '',
      churchStore: '',
    },
    testimonials: [
      {
        name: 'Amanda R.',
        text: `My kids ask for a "Little Warriors" story every night. The illustrations are gorgeous and the stories are told so well. A must-have for Christian families!`,
        rating: 5,
      },
    ],
    tableOfContents: [
      'Story 1: David and the Giant',
      'Story 2: Noah and the Big Boat',
      'Story 3: Moses and the Sea',
      'Story 4: Daniel and the Lions',
      'Story 5: Esther the Brave Queen',
      'Story 6: Joseph the Dreamer',
      'Story 7: Jonah and the Whale',
      'Story 8: Joshua and the Walls',
      'Story 9: Ruth and Naomi',
      'Story 10: Baby Jesus',
      '...and 10 more stories',
    ],
    featured: false,
    releaseDate: '2024-09-01',
    authorBio:
      "Sarah Doe is a children's ministry leader and author who believes that the best time to plant the seed of God's Word is in the early years.",
    authorImage: '/images/pastor-placeholder.jpg',
    relatedBooks: [4, 5],
  },
];

export default books;