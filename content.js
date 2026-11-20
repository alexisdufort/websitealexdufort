/* ============================================================================
   EDIT THIS FILE TO UPDATE THE SITE. No other file needs to change.
   ============================================================================ */

const SITE = {
  // 1) Your Calendly link, e.g. "https://calendly.com/your-name/30min".
  //    While this is "" every "Book a call" button is hidden and the site
  //    points visitors to your email instead. Add the link and they appear.
  calendly: "",

  // 2) Optional: your LinkedIn URL (shows in the contact section and footer).
  //    Leave as "" to hide it.
  linkedin: "https://www.linkedin.com/in/alexdufort/",
};

/* ----------------------------------------------------------------------------
   LOGO STRIP ("As seen at"), shown under the intro.
   Each item shows its name as text. To show a real logo instead, save the file
   in images/logos/ and add:  logo: "images/logos/gigsky.svg"
   Delete everything between the brackets to hide the strip.
   ---------------------------------------------------------------------------- */
const LOGOS = [
  { name: "GigSky", url: "https://www.gigsky.com" },
  { name: "Traverse 26", url: "https://www.traverse-events.com/traverse-26/speakers-traverse-26-hamburg/" },
  { name: "Nomad Fest", url: "https://nomadfestcreator.com/" },
  { name: "LeBigData.fr", url: "https://www.lebigdata.fr/esim-la-connectivite-maritime-sort-de-lisolement" },
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
