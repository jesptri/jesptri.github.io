// One random ID per page load: groups this page's clicks without cookies/storage.
var portfolioView = Array.from(crypto.getRandomValues(new Uint8Array(16)), function (byte) {
  return byte.toString(16).padStart(2, '0');
}).join('');
var portfolioPage = document.querySelector('meta[name="portfolio-page"]');

function recordPortfolioEvent(eventName, action, content) {
  var params = new URLSearchParams({
    event: eventName,
    page: portfolioPage ? portfolioPage.content : 'other',
    target: action,
    content: content || 'none',
    view: portfolioView
  });
  // Never send the current URL, referrer URL, form data or link text.
  // The referrer is reduced to a fixed category, not a hostname or full URL.
  var source = 'direct';
  if (document.referrer) {
    try {
      var referrer = new URL(document.referrer);
      source = referrer.origin === location.origin ? 'internal' : 'external';
      if (/(^|\.)google\.[a-z.]+$/.test(referrer.hostname)) source = 'google';
      if (/(^|\.)linkedin\.com$/.test(referrer.hostname)) source = 'linkedin';
      if (referrer.hostname === 'github.com') source = 'github';
    } catch (_) { source = 'unknown'; }
  }
  params.set('source', source);
  var endpoint = '/__events?' + params.toString();
  // Same-origin, best effort, and no wait before navigating away.
  try {
    if (navigator.sendBeacon && navigator.sendBeacon(endpoint)) return;
    fetch(endpoint, { method: 'POST', keepalive: true, referrerPolicy: 'no-referrer' })
      .catch(function () {});
  } catch (_) { /* Logging must never interrupt the site. */ }
}

recordPortfolioEvent('arrival', 'page');

document.addEventListener('click', function (event) {
  if (!(event.target instanceof Element)) return;
  var target = event.target.closest('a, button');
  if (!target) return;

  var actions = [
    ['a[href^="https://www.linkedin.com/"]', 'linkedin'],
    ['a[href^="https://github.com/"]', 'github'],
    ['a[href*="/assets/files/Jules_ESPINOUX_Resume.pdf"]', 'cv'],
    ['a[href^="mailto:"]', 'email'],
    ['[data-play-demo]', 'play_demo'],
    ['.site-nav a[href$="projects.html"]', 'navigation_projects'],
    ['.site-nav a[href$="blog.html"], .see-all', 'navigation_blog'],
    ['.site-nav a[href$="contact.html"]', 'navigation_contact'],
    ['.site-logo, .site-nav a, .breadcrumb a', 'navigation_home'],
    ['.post-link, .blog-entry .entry-link', 'open_article'],
    ['.entry-link', 'open_project'],
    ['.project-card a', 'project_link'],
    ['.work-mistral .work-actions a', 'connectors_documentation'],
    ['.work-sport a[href*="cnsnmm-internship"]', 'cnsnmm_story'],
    ['.work-sport a[href*="french-ski-federation"]', 'ski_federation_story'],
    ['button', 'button']
  ];
  for (var i = 0; i < actions.length; i++) {
    if (target.matches(actions[i][0])) {
      var content = target.closest('[data-content]');
      recordPortfolioEvent('click', actions[i][1], content ? content.dataset.content : 'none');
      break;
    }
  }
});

// Load the YouTube player only after an explicit request to watch the demo.
document.querySelectorAll('[data-play-demo]').forEach(function (trigger) {
  trigger.addEventListener('click', function (event) {
    var player = document.getElementById('connector-demo');
    if (!player) return;
    event.preventDefault();
    var iframe = player.querySelector('iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/QjoTkonLub4?autoplay=1';
      iframe.title = 'Connectors Debugger demo';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      player.replaceChildren(iframe);
    }
    iframe.focus();
  });
});
