/* ============================================================================
   EDIT THIS FILE TO UPDATE THE SITE. No other file needs to change.
   ============================================================================ */

const SITE = {
  // 1) Your Calendly link, e.g. "https://calendly.com/your-name/30min".
  //    While this is "" every "Book a call" button is hidden and the site
  //    points visitors to your email instead. Add the link and they appear.
  calendly: "",

  // 2) Contact form. While this is "" the form opens the visitor's email app
  //    with their message filled in, addressed to a@alexdufort.com.
  //    To receive messages straight from the site instead, create a free form
  //    at https://formspree.io and paste its endpoint here, for example
  //    "https://formspree.io/f/abcdwxyz".
  formEndpoint: "",

  // 3) Optional: your LinkedIn URL (shows in the contact section and footer).
  //    Leave as "" to hide it.
  linkedin: "https://www.linkedin.com/in/alexdufort/",
};

/* ----------------------------------------------------------------------------
   MEDIA WINS: earned media, affiliate and partner placements.
   featured: true  -> shown first.   type: "affiliate" | "editorial" |
   "sponsored" | "partner"  (leave it out if unsure; no label is shown).
   ---------------------------------------------------------------------------- */
const WINS = [
  // Finance & news
  { outlet: "CNBC Select", category: "Finance & news", country: "US", featured: true, date: "Jul 2024", type: "affiliate", placement: "Best for cruises", title: "The best eSIMs for international travel", url: "https://www.cnbc.com/select/best-esim-for-travel/" },
  { outlet: "NerdWallet", category: "Finance & news", country: "US", featured: true, date: "Apr 2026", type: "editorial", placement: "Visa x GigSky explainer", title: "Traveling Abroad? Get Free Phone Data With These Cards", url: "https://www.nerdwallet.com/travel/learn/visa-infinite-signature-cards-free-esim" },
  { outlet: "Kiplinger", category: "Finance & news", country: "US", featured: true, date: "Apr 2024", type: "affiliate", placement: "Recommended provider", title: "International Phone Plans for Travel: 5 Smart Ways to Save", url: "https://www.kiplinger.com/personal-finance/travel/ways-to-save-big-on-your-phone-bill-when-traveling-abroad" },
  { outlet: "Which?", category: "Finance & news", country: "UK", featured: true, date: "Jan 2026", type: "editorial", placement: "Reviewed in roundup", title: "Best cheap eSIMs for mobile roaming abroad", url: "https://www.which.co.uk/reviews/mobile-phone-providers/article/best-cheap-esims-for-mobile-roaming-abroad-aku6K3M1EFOM" },
  { outlet: "Newsweek", category: "Finance & news", country: "US", featured: true, date: "2025", type: "editorial", placement: "Mention", title: "If You Travel Internationally You Need To Know This iPhone Trick", url: "https://www.newsweek.com/if-you-travel-internationally-you-need-know-this-iphone-trick-genius-2013216" },
  { outlet: "Yahoo Lifestyle", category: "Finance & news", country: "US", featured: true, date: "Jul 2025", type: "editorial", placement: "Dedicated feature", title: "If You're Traveling to Another Country You Need an eSIM. Here's How to Snag a Free One", url: "https://www.yahoo.com/lifestyle/articles/just-discovered-travel-hack-save-110007653.html" },
  { outlet: "MoneySense", category: "Finance & news", country: "Canada", date: "Oct 2026", type: "editorial", placement: "Mention", title: "Is the RBC British Airways Visa Infinite worth it? We did the math", url: "https://www.moneysense.ca/spend/rbc-british-airways-visa-infinite-credit-card-review/" },

  // Tech
  { outlet: "TechRadar", category: "Tech", country: "US", featured: true, date: "Dec 2024", type: "affiliate", placement: "Dedicated review", title: "GigSky eSIM review: For travelers who move around often", url: "https://www.techradar.com/pro/software-services/gigsky-esim" },
  { outlet: "Tech Advisor", category: "Tech", country: "UK", date: "Jul 2025", type: "editorial", placement: "Runner-up, best overall", title: "Best eSIMs 2026", url: "https://www.techadvisor.com/article/2837542/best-esims.html" },
  { outlet: "PCWorld", category: "Tech", country: "US", date: "Jul 2025", type: "sponsored", placement: "Dedicated feature", title: "The best travel app you haven't downloaded yet: Free data cruise plans and VISA perks", url: "https://www.pcworld.com/article/2849799/the-best-travel-app-esim-free-data-cruise-plans-and-visa-perks.html" },
  { outlet: "Macworld", category: "Tech", country: "US", date: "Jul 2025", type: "sponsored", placement: "Dedicated feature", title: "This iPhone eSIM app gives you free data in Europe", url: "https://www.macworld.com/article/2849908/this-iphone-esim-app-gives-you-free-data-in-europe.html" },
  { outlet: "Cybernews", category: "Tech", country: "US", date: "2025", type: "affiliate", placement: "Review, 4.4/5", title: "GigSky eSIM review", url: "https://cybernews.com/best-esim-providers/gigsky-review/" },
  { outlet: "Clubic", category: "Tech", country: "France", date: "Sep 2024", placement: "Dedicated review", title: "Avis Gigsky : notre test de ce fournisseur eSIM", url: "https://www.clubic.com/avis-537491-avis-gigsky-des-donnees-mobiles-a-petit-prix-partout-dans-le-monde.html" },
  { outlet: "Futura-Sciences", category: "Tech", country: "France", date: "Jul 2025", placement: "Dedicated review", title: "Avis Gigsky : que vaut réellement cette solution eSIM de voyage ?", url: "https://www.futura-sciences.com/tech/forfaits/esim-international/avis-gigsky/" },
  { outlet: "LeBigData", category: "Tech", country: "France", date: "Feb 2025", placement: "Dedicated review", title: "Test GigSky eSIM : une révolution pour les voyageurs connectés ?", url: "https://www.lebigdata.fr/test-gigsky-esim" },
  { outlet: "How-To Geek", category: "Tech", country: "US", date: "May 2024", type: "editorial", placement: "Mention", title: "Is a Cellular iPad Worth It? I Bought One and I'll Never Go Back", url: "https://www.howtogeek.com/is-a-cellular-ipad-worth-it-i-bought-one-and-ill-never-go-back/" },

  // Points & travel
  { outlet: "The Points Guy", category: "Points & travel", country: "US", featured: true, date: "Jul 2026", type: "editorial", placement: "Dedicated explainer", title: "How to get free GigSky eSIM data with eligible Visa cards", url: "https://thepointsguy.com/credit-cards/visa-gigsky-esim-benefit/" },
  { outlet: "Upgraded Points", category: "Points & travel", country: "US", date: "Jul 2025", type: "affiliate", placement: "Dedicated review", title: "GigSky eSIM Review: Fast Affordable Travel Data [Free Plans]", url: "https://upgradedpoints.com/travel/gigsky-esim-review/" },
  { outlet: "AwardWallet", category: "Points & travel", country: "US", date: "May 2026", type: "editorial", placement: "Dedicated explainer", title: "Got a Visa Card? Get a Free Unlimited eSIM From GigSky", url: "https://awardwallet.com/credit-cards/free-unlimited-gigsky-esim/" },
  { outlet: "Doctor of Credit", category: "Points & travel", country: "US", date: "Dec 2025", type: "editorial", placement: "Dedicated news", title: "U.S. Bank Altitude Connect Adding Free Mobile Data in 125+ Countries (GigSky)", url: "https://www.doctorofcredit.com/u-s-bank-adding-new-benefits-to-altitude-connect-card-with-gigsky-mobile-data-in-125-countries/" },
  { outlet: "The MileLion", category: "Points & travel", country: "Singapore", date: "May 2026", type: "editorial", placement: "Dedicated news", title: "Free GigSky eSIM data roaming now available to Visa cardholders worldwide", url: "https://milelion.com/2026/05/13/free-gigsky-esim-data-roaming-now-available-to-visa-cardholders-worldwide/" },
  { outlet: "Prince of Travel", category: "Points & travel", country: "Canada", date: "Oct 2026", type: "editorial", placement: "Major feature in guide", title: "Visa Infinite Benefits in Canada: Every Tier Explained", url: "https://princeoftravel.com/guides/visa-infinite-benefits-canada/" },
  { outlet: "Milesopedia", category: "Points & travel", country: "Canada", date: "Oct 2026", type: "editorial", placement: "Dedicated news", title: "TD Aeroplan Visa Infinite+: 10 GB of Free GigSky Data", url: "https://milesopedia.com/en/news/finance/td-aeroplan-free-mobile-data/" },
  { outlet: "InsideFlyer", category: "Points & travel", country: "US", date: "Oct 2026", type: "editorial", placement: "Dedicated news", title: "TD adds annual data benefit to select Aeroplan cards", url: "https://www.insideflyer.com/posts/td-adds-annual-data-benefit-to-select-aeroplan-cards/" },
  { outlet: "Daily Drop", category: "Points & travel", country: "US", date: "Apr 2026", type: "affiliate", placement: "Dedicated explainer", title: "How to Get Free International Data With Your Visa Card", url: "https://www.dailydrop.com/pages/free-international-data-with-visa" },
  { outlet: "BoardingArea", category: "Points & travel", country: "US", date: "May 2026", placement: "Dedicated feature", title: "Get Up to 7 Days of Free Unlimited Data in the World's Most Iconic Destinations", url: "https://boardingarea.com/get-up-to-7-days-of-free-unlimited-data-in-the-worlds-most-iconic-destinations/" },
  { outlet: "Travel-Dealz", category: "Points & travel", country: "Germany", date: "Jul 2025", placement: "Tested in comparison", title: "The big eSIM Comparison: A Test of 19 Global Data Plan Providers", url: "https://www.travel-dealz.com/esim/provider/" },

  // Travel trade & blogs
  { outlet: "Travel And Tour World", category: "Travel trade & blogs", country: "US", date: "Dec 2025", type: "editorial", placement: "Dedicated news", title: "Global Cruise Connectivity Grows as GigSky Extends eSIM Coverage to 280 Ships", url: "https://www.travelandtourworld.com/news/article/global-cruise-connectivity-grows-as-gigsky-extends-esim-coverage-to-280-ships/" },
  { outlet: "Travel Market Report", category: "Travel trade & blogs", country: "Canada", date: "May 2025", type: "editorial", placement: "Listed provider", title: "WHAT THE TECH? Affordable eSIM Options for Budget-Conscious Canadian Travellers", url: "https://www.travelmarketreport.com/canada/featured/articles/what-the-tech-affordable-esim-options-for-budget-conscious-canadian-travellers" },
  { outlet: "Project Untethered", category: "Travel trade & blogs", country: "US", date: "Jan 2024", type: "affiliate", placement: "Dedicated review", title: "GigSky Review: Thoughts After eSIM Tests Abroad", url: "https://www.projectuntethered.com/gigsky-review/" },
  { outlet: "Uprooted Traveler", category: "Travel trade & blogs", country: "US", date: "Dec 2025", type: "affiliate", placement: "Best eSIM for cruises", title: "GigSky Review: The Best eSIM for Cruises", url: "https://uprootedtraveler.com/gigsky-review-esim-for-cruises/" },
  { outlet: "Freaking Nomads", category: "Travel trade & blogs", country: "US", date: "Apr 2026", type: "affiliate", placement: "Dedicated review", title: "GigSky Hands-On eSIM Review: Is It Worth It?", url: "https://freakingnomads.com/gigsky-esim-review/" },
];

const MEDIA = {
  /* --------------------------------------------------------------------------
     PUBLIC APPEARANCES: panels, keynotes, podcasts, interviews, articles.
     To add one: copy the block below into the list, remove the leading "//"
     on each line, and fill it in. Newest dates are shown first automatically.
     -------------------------------------------------------------------------- */
  appearances: [
    {
      title: "Stay Connected Anywhere: A Guide to Effortless Global Internet for Content Creators",
      event: "GNTB Travel Creator Summit x Traverse 26 · Hamburg, Germany",
      date: "2026-10-17",
      type: "Talk",
      description: "Conference session for travel content creators on getting reliable internet wherever they travel.",
      link: "https://www.traverse-events.com/traverse-26/speakers-traverse-26-hamburg/",
      linkLabel: "See the event",
    },
    {
      title: "eSIM: maritime connectivity comes out of isolation",
      event: "LeBigData.fr",
      date: "2026-01-20",
      type: "Interview",
      description: "Interview on how eSIM is bringing seamless connectivity to passengers at sea. The article is in French.",
      link: "https://www.lebigdata.fr/esim-la-connectivite-maritime-sort-de-lisolement",
      linkLabel: "Read the article (French)",
    },
    {
      title: "Nomad Fest Bangkok 2025",
      event: "Nomad Fest · Creator Edition by HipTraveler",
      date: "2025",
      type: "Speaker",
      description: "Speaker on global connectivity for digital nomads and international travelers. GigSky was also an official partner of the event.",
      link: "https://nomadfestcreator.com/",
      linkLabel: "See the event",
    },
    // {
    //   title: "Scaling revenue through partnerships",
    //   event: "Name of the event / podcast / publication",
    //   date: "2026-05-14",            // YYYY-MM-DD, or YYYY-MM, or just YYYY
    //   type: "Panel",                 // Panel, Keynote, Podcast, Interview, Article...
    //   description: "One or two sentences about the talk or conversation.",
    //   link: "https://example.com",   // optional
    //   linkLabel: "Watch the recording", // optional (defaults to "View")
    // },
  ],

  /* --------------------------------------------------------------------------
     PHOTOS: drop your image files into the /images folder, then list them.
     Tip: resize photos to about 1600px wide so the page stays fast.
     -------------------------------------------------------------------------- */
  photos: [
    {
      src: "images/alex-dufort-speaking-traverse-26-hamburg.jpg",
      alt: "Alex Dufort speaking at the GNTB Travel Creator Summit x Traverse 26 in Hamburg",
      caption: "Speaking at GNTB Travel Creator Summit x Traverse 26, Hamburg, October 2026",
    },
    // { src: "images/summit-2026.jpg", alt: "Alex speaking on stage", caption: "Speaking at ..., May 2026" },
  ],
};
