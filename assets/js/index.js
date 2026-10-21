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