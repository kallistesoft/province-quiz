// Anonymous usage stats: window.track(name, params) sends one event to
// C.STATS_URL (no cookies, no IDs, no personal data). Names are [a-z_],
// params a flat object of short strings or numbers; the endpoint drops
// anything else. Never throws: stats must not break the quiz.
(function () {
  var C = window.QUIZ_CONFIG || {};

  // Google Analytics, only when GA_ID is set. Consent starts denied and is
  // granted later by Google's consent message, never by this code.
  if (C.GA_ID) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("consent", "default", {
        ad_storage: "denied", ad_user_data: "denied",
        ad_personalization: "denied", analytics_storage: "denied"
      });
      window.gtag("js", new Date());
      window.gtag("config", C.GA_ID);
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(C.GA_ID);
      document.head.appendChild(s);
    } catch (e) {}
  }

  window.track = function (name, params) {
    params = params || {};
    try {
      // A string body is sent as text/plain: no CORS preflight.
      // sendBeacon also survives the page change after a click.
      if (C.STATS_URL && navigator.sendBeacon) {
        navigator.sendBeacon(C.STATS_URL, JSON.stringify({ s: "quiz", e: name, p: params }));
      }
    } catch (e) {}
    try {
      if (C.GA_ID && window.gtag) window.gtag("event", name, params);
    } catch (e) {}
  };

  // Static pages (home, share pages) run no quiz.js: a link with
  // data-track="event_name" sends that event when clicked.
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("[data-track]");
    if (el) window.track(el.getAttribute("data-track"));
  });
})();
