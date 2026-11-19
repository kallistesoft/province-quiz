// Site settings.
window.QUIZ_CONFIG = {
  // Public address of the quiz, no trailing slash. Used for share links
  // and by tools/build_pages.mjs (run it again after changing this).
  SITE_URL: "https://quiz.kallistesoft.ca",

  // Anonymous stats endpoint (js/track.js). Empty = send nothing.
  STATS_URL: "https://kallistesoft.ca/hit.php",
  // Google Analytics measurement id, e.g. "G-XXXXXXXXXX". Empty = GA off.
  GA_ID: "",

  // Google AdSense. Leave empty to hide the ad slots.
  // A cookie-consent banner (Google-certified CMP) is required before going live for EU visitors.
  ADSENSE_CLIENT: "", // e.g. "ca-pub-1234567890123456"
  ADSENSE_SLOT: ""    // ad unit id for the question pages
};
