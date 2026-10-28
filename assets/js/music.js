/* वैदिक शोध संस्थान — हल्का आध्यात्मिक पृष्ठभूमि संगीत (तानपुरा + सिंगिंग बाउल, स्वयं-निर्मित)
   ब्राउज़र बिना क्लिक के आवाज़ चलाने नहीं देते, इसलिए संगीत पहले क्लिक/टच पर शुरू होता है।
   बटन से बंद करने पर पसंद याद रहती है। */
(function () {
  'use strict';
  var KEY = 'vss_music', VOL = 0.08;
  var get = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var set = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} };
  var a = new Audio('assets/audio/ambient.mp3?v=1');
  a.loop = true; a.preload = 'auto'; a.volume = 0;
  var on = get() !== 'off', fadeT = null, started = false;

  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'music-btn'; btn.id = 'musicBtn';
  document.body.appendChild(btn);
  function label() {
    var en = document.documentElement.lang === 'en';
    var playing = on && !a.paused;
    btn.classList.toggle('on', playing);
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    btn.title = playing ? (en ? 'Turn music off' : 'संगीत बंद करें') : (en ? 'Play soft music' : 'संगीत चलाएँ');
    btn.setAttribute('aria-label', btn.title);
    btn.innerHTML = playing
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span class="eq"><i></i><i></i><i></i></span>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16.5 9.5l5 5m0-5l-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  }
  function fade(to, ms, cb) {
    clearInterval(fadeT); var from = a.volume, n = Math.max(1, Math.round(ms / 50)), i = 0;
    fadeT = setInterval(function () { i++; a.volume = Math.max(0, Math.min(1, from + (to - from) * i / n)); if (i >= n) { clearInterval(fadeT); if (cb) cb(); } }, 50);
  }
  function play() {
    var p = a.play();
    if (p && p.then) p.then(function () { started = true; fade(VOL, 2500); label(); }).catch(function () { label(); });
    else { started = true; fade(VOL, 2500); label(); }
  }
  function stop() { fade(0, 600, function () { a.pause(); label(); }); }
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (on && !a.paused) { on = false; set('off'); stop(); }
    else { on = true; set('on'); play(); }
  });
  // first interaction anywhere starts the music (browsers block sound before that)
  function firstTouch(e) {
    if (e && e.target && e.target.closest && e.target.closest('#musicBtn')) return;
    ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) { document.removeEventListener(ev, firstTouch, true); });
    if (on && a.paused) play();
  }
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) { document.addEventListener(ev, firstTouch, true); });
  document.addEventListener('visibilitychange', function () {
    if (!started || !on) return;
    if (document.hidden) a.pause(); else play();
  });
  new MutationObserver(label).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  label();
  if (on) play(); // works only where the browser already allows autoplay
})();
