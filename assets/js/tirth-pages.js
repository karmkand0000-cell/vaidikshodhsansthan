/* वैदिक शोध संस्थान — तीर्थ दर्शन: 12 ज्योतिर्लिंग, अष्टविनायक, 51 शक्तिपीठ
   डेटा: data/tirth.json (स्रोत सहित) */
(function () {
  'use strict';
  var X, DATA = null, loading = null, leafletP = null;

  var T = {
    hi: {
      tirth: 'तीर्थ दर्शन', t_sub: 'भारत व पड़ोसी देशों के प्रमुख शिव, गणेश व शक्ति तीर्थों की प्रामाणिक जानकारी — कथा, स्थान, विशेषताएँ व स्रोत सहित।',
      jyotirling: '12 ज्योतिर्लिंग', ashtavinayak: 'अष्टविनायक', shaktipeeth: '51 शक्तिपीठ',
      jy_sub: 'भगवान शिव के बारह स्वयं प्रकट ज्योति-स्वरूप लिंग', av_sub: 'महाराष्ट्र के आठ स्वयंभू गणपति मंदिर', sp_sub: 'जहाँ देवी सती के अंग व आभूषण गिरे',
      open: 'देखें', all: 'सभी', search: 'नाम या स्थान से खोजें', count: 'तीर्थ', map: 'मानचित्र पर देखें', list: 'सूची',
      place: 'स्थान', setting: 'भौगोलिक स्थिति', legend: 'पौराणिक कथा', special: 'विशेषताएँ', idol: 'मूर्ति', festivals: 'प्रमुख पर्व', reach: 'कैसे पहुँचें',
      disputed: 'परंपराओं में मतभेद', sources: 'स्रोत', directions: 'Google Maps पर रास्ता', back: 'सूची पर लौटें',
      part: 'गिरा अंग / आभूषण', shakti: 'शक्ति', bhairav: 'भैरव', country: 'देश', prev: 'पिछला', next: 'अगला',
      stotra: 'द्वादश ज्योतिर्लिंग स्तोत्र', ashtadasha: '18 महाशक्तिपीठ (आदि शंकराचार्य के अष्टादश शक्तिपीठ स्तोत्र अनुसार)',
      book: 'घर पर पूजा बुक करें', book_note: 'तीर्थ यात्रा पर न जा सकें तो घर पर ही विधिवत अनुष्ठान कराएँ।',
      loading: 'जानकारी लोड हो रही है…', fail: 'जानकारी लोड नहीं हो सकी। पेज फिर से खोलें।',
      disclaimer: 'यह जानकारी विकिपीडिया, मंदिर ट्रस्टों व सरकारी पर्यटन स्रोतों से मिलाकर लिखी गई है; हर तीर्थ के नीचे स्रोत दिए हैं। मंदिर के दर्शन-समय व नियम बदलते रहते हैं — यात्रा से पहले मंदिर प्रशासन से पुष्टि करें।'
    },
    en: {
      tirth: 'Sacred Tirthas', t_sub: 'Authentic information on the great Shiva, Ganesh and Shakti shrines of India and neighbouring lands — legends, locations, highlights and sources.',
      jyotirling: '12 Jyotirlingas', ashtavinayak: 'Ashtavinayak', shaktipeeth: '51 Shakti Peethas',
      jy_sub: 'The twelve self-manifested radiant lingas of Lord Shiva', av_sub: 'Eight swayambhu Ganesh temples of Maharashtra', sp_sub: 'Where parts and ornaments of Devi Sati fell',
      open: 'Open', all: 'All', search: 'Search by name or place', count: 'tirthas', map: 'View on map', list: 'List',
      place: 'Location', setting: 'Setting', legend: 'Legend', special: 'Highlights', idol: 'The murti', festivals: 'Main festivals', reach: 'How to reach',
      disputed: 'Differing traditions', sources: 'Sources', directions: 'Directions on Google Maps', back: 'Back to list',
      part: 'Part / ornament fallen', shakti: 'Shakti', bhairav: 'Bhairava', country: 'Country', prev: 'Previous', next: 'Next',
      stotra: 'Dvadasha Jyotirlinga Stotram', ashtadasha: '18 Maha Shakti Peethas (per Adi Shankaracharya’s Ashtadasha Shakti Peetha Stotram)',
      book: 'Book a puja at home', book_note: 'If you cannot travel to the tirtha, have the ritual performed properly at home.',
      loading: 'Loading…', fail: 'Could not load. Please reopen the page.',
      disclaimer: 'Compiled from Wikipedia, temple trusts and government tourism sources; sources are listed under each tirtha. Darshan timings and rules change — confirm with the temple administration before travelling.'
    }
  };
  function L(k) { return (T[X.lang] && T[X.lang][k]) || T.hi[k] || k; }
  function f(o, k) { return o[k + '_' + (X.lang === 'en' ? 'en' : 'hi')] || o[k + '_hi'] || o[k + '_en'] || ''; }
  function list(v) { if (!v) return []; if (Array.isArray(v)) return v; return String(v).split(/\n|•|;\s*(?=[^\s])/).map(function (x) { return x.trim(); }).filter(Boolean); }

  var GROUPS = {
    jyotirling: { key: 'jyotirling', svc: 'rudrabhishek', icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 52h48l-4-8H12z" fill="#7A1313"/><path d="M50 44l10 3-2 4-8-1z" fill="#7A1313"/><path d="M22 44V28a10 10 0 0 1 20 0v16z" fill="#2B2B33"/><path d="M25 30h14M25 34h14M25 38h14" stroke="#F4F1EE" stroke-width="2"/><circle cx="32" cy="34" r="2" fill="#E8871E"/><path d="M32 6c5 6 7 9 7 13a7 7 0 0 1-14 0c0-4 2-7 7-13z" fill="#F2B705"/></svg>' },
    ashtavinayak: { key: 'ashtavinayak', svc: 'satyanarayan-katha', icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 50c0-14 8-26 18-34 10 8 18 20 18 34z" fill="#E8871E"/><path d="M32 16c-4 8-6 18-6 34M32 16c4 8 6 18 6 34M32 16v34M22 22c-3 8-5 17-5 28M42 22c3 8 5 17 5 28" stroke="#9E1B1B" stroke-width="1.6" fill="none"/><path d="M28 10q4-6 8 0q-4 3-8 0z" fill="#2E6B3A"/><rect x="10" y="50" width="44" height="6" rx="3" fill="#C9952B"/></svg>' },
    shaktipeeth: { key: 'shaktipeeth', svc: 'chandi-path-havan', icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 6v52" stroke="#7A1313" stroke-width="4" stroke-linecap="round"/><path d="M16 14c0 14 6 20 16 20s16-6 16-20" stroke="#7A1313" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M32 4l-5 9h10z" fill="#7A1313"/><path d="M16 10l-3 7h7zM48 10l-3 7h7z" fill="#7A1313"/><circle cx="32" cy="44" r="5" fill="#C62828"/><path d="M24 58h16" stroke="#C9952B" stroke-width="4" stroke-linecap="round"/></svg>' }
  };

  function load() {
    if (DATA) return Promise.resolve(DATA);
    if (!loading) loading = fetch('data/tirth.json?v=2').then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) { DATA = d; return d; });
    return loading;
  }
  function withData(fn) {
    X.$('#main').innerHTML = '<div class="wrap detail"><p>' + L('loading') + '</p></div>';
    load().then(fn).catch(function () { X.$('#main').innerHTML = '<div class="wrap detail"><p>' + L('fail') + '</p></div>'; });
  }
  function gname(g) { return L(g); }
  function gmaps(it) { return it.lat ? 'https://www.google.com/maps/search/?api=1&query=' + it.lat + ',' + it.lon : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent((it.name_en || '') + ' ' + (it.location_en || it.town || '')); }
  function placeOf(it) { return f(it, 'place') || f(it, 'location') || [it.town || it.village, it.district, it.state].filter(Boolean).join(', '); }
  function imgUrl(it, w) { return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(it.img.file) + '?width=' + (w || 960); }
  function credit(it) {
    var a = it.img.artist || (X.lang === 'en' ? 'Wikimedia Commons contributor' : 'विकिमीडिया कॉमन्स योगदानकर्ता');
    return (X.lang === 'en' ? 'Photo: ' : 'फ़ोटो: ') + '<a href="https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(it.img.file) + '" target="_blank" rel="noopener">' + X.esc(a) + '</a>, ' + X.esc(it.img.license) + ' — Wikimedia Commons';
  }
  function idOf(it) { return it.id || ('p' + it.n); }

  /* ---------- landing ---------- */
  function landing() {
    withData(function (d) {
      var card = function (g, n) {
        return '<a class="tg-card" href="#/tirth/' + g + '"><span class="tg-ic">' + GROUPS[g].icon + '</span><span><b>' + gname(g) + '</b><small>' + L(g === 'jyotirling' ? 'jy_sub' : g === 'ashtavinayak' ? 'av_sub' : 'sp_sub') + '</small><em>' + n + ' ' + L('count') + ' →</em></span></a>';
      };
      X.$('#main').innerHTML = '<div class="wrap detail tirth">' +
        '<nav class="crumbs"><a href="#/">' + X.u('home') + '</a> / ' + L('tirth') + '</nav>' +
        '<h1>' + L('tirth') + '</h1><p class="lead-s">' + L('t_sub') + '</p>' +
        '<div class="tg-grid">' + card('jyotirling', d.jyotirling.items.length) + card('ashtavinayak', d.ashtavinayak.items.length) + card('shaktipeeth', d.shaktipeeth.items.length) + '</div>' +
        '<h2 style="margin-top:36px">' + L('map') + '</h2><div id="tmap" class="tmap"></div>' +
        '<p class="astro-note">' + L('disclaimer') + '</p></div>';
      drawMap('tmap', [].concat(
        d.jyotirling.items.map(function (i) { return [i, 'jyotirling']; }),
        d.ashtavinayak.items.map(function (i) { return [i, 'ashtavinayak']; }),
        d.shaktipeeth.items.map(function (i) { return [i, 'shaktipeeth']; })));
      window.scrollTo(0, 0);
    });
  }

  /* ---------- leaflet map (free OpenStreetMap) ---------- */
  function leaflet() {
    if (window.L && window.L.map) return Promise.resolve(window.L);
    if (leafletP) return leafletP;
    leafletP = new Promise(function (res, rej) {
      var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'; document.head.appendChild(css);
      var s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'; s.onload = function () { res(window.L); }; s.onerror = rej; document.head.appendChild(s);
    });
    return leafletP;
  }
  var COL = { jyotirling: '#7A1313', ashtavinayak: '#E8871E', shaktipeeth: '#C62828' };
  function drawMap(elId, pairs) {
    var pts = pairs.filter(function (p) { return p[0].lat && p[0].lon; });
    if (!pts.length) { var e = document.getElementById(elId); if (e) e.remove(); return; }
    leaflet().then(function (Lf) {
      var el = document.getElementById(elId); if (!el) return;
      var map = Lf.map(el, { scrollWheelZoom: false });
      Lf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
      var b = [];
      pts.forEach(function (p) {
        var it = p[0], g = p[1], ll = [+it.lat, +it.lon]; b.push(ll);
        Lf.circleMarker(ll, { radius: 7, color: '#fff', weight: 2, fillColor: COL[g], fillOpacity: 1 }).addTo(map)
          .bindPopup('<b>' + X.esc(f(it, 'name')) + '</b><br>' + X.esc(placeOf(it)) + '<br><a href="#/tirth/' + g + '/' + idOf(it) + '">' + L('open') + ' →</a>');
      });
      map.fitBounds(b, { padding: [24, 24] });
    }).catch(function () { var e = document.getElementById(elId); if (e) e.innerHTML = ''; });
  }

  /* ---------- group list ---------- */
  var LS = { q: '', c: '' };
  function groupPage(g) {
    withData(function (d) {
      var G = d[g]; if (!G) return landing();
      var items = G.items;
      var countries = g === 'shaktipeeth' ? items.map(function (i) { return i.country; }).filter(function (c, i, a) { return c && a.indexOf(c) === i; }) : [];
      var html = '<div class="wrap detail tirth">' +
        '<nav class="crumbs"><a href="#/">' + X.u('home') + '</a> / <a href="#/tirth">' + L('tirth') + '</a> / ' + gname(g) + '</nav>' +
        '<div class="tg-head"><span class="tg-ic big">' + GROUPS[g].icon + '</span><div><h1>' + gname(g) + '</h1><p class="lead-s">' + X.esc(f(G, 'intro')) + '</p></div></div>' +
        (G.tradition_hi || G.tradition_en ? '<p class="t-trad">' + X.esc(f(G, 'tradition')) + '</p>' : '') +
        (g === 'jyotirling' && G.stotra ? '<details class="stotra"><summary>' + L('stotra') + '</summary><pre>' + X.esc(G.stotra) + '</pre></details>' : '') +
        '<div class="toolbar-t"><input type="search" id="tq" placeholder="' + X.esc(L('search')) + '" value="' + X.esc(LS.q) + '">' +
          (countries.length > 1 ? '<select id="tc"><option value="">' + L('all') + '</option>' + countries.map(function (c) { return '<option' + (LS.c === c ? ' selected' : '') + '>' + X.esc(c) + '</option>'; }).join('') + '</select>' : '') + '</div>' +
        '<div id="tlist" class="' + (g === 'shaktipeeth' ? 'sp-list' : 't-list') + '"></div>' +
        (items.some(function (i) { return i.lat; }) ? '<h2 style="margin-top:36px">' + L('map') + '</h2><div id="gmap" class="tmap"></div>' : '') +
        (g === 'shaktipeeth' && (G.ashtadasha || []).length ? '<h2 style="margin-top:36px">' + L('ashtadasha') + '</h2><ol class="ashta">' + G.ashtadasha.map(function (a) { return '<li><b>' + X.esc(f(a, 'devi') || f(a, 'name')) + '</b> — ' + X.esc(f(a, 'location')) + '</li>'; }).join('') + '</ol>' : '') +
        bookBox(g) +
        ((G.sources || []).length ? '<details class="t-src"><summary>' + L('sources') + ' (' + G.sources.length + ')</summary><ul>' + G.sources.map(function (u) { return '<li><a href="' + X.esc(u) + '" target="_blank" rel="noopener">' + X.esc(u.replace(/^https?:\/\//, '').slice(0, 80)) + '</a></li>'; }).join('') + '</ul></details>' : '') +
        '<p class="astro-note">' + L('disclaimer') + '</p></div>';
      X.$('#main').innerHTML = html;
      var draw = function () {
        var q = LS.q.trim().toLowerCase();
        var vis = items.filter(function (i) { if (LS.c && i.country !== LS.c) return false; return !q || JSON.stringify(i).toLowerCase().indexOf(q) > -1; });
        X.$('#tlist').innerHTML = vis.map(function (it, i) {
          var num = it.n || (items.indexOf(it) + 1);
          if (g === 'shaktipeeth') return '<a class="sp-row" href="#/tirth/' + g + '/' + idOf(it) + '">' + (it.img ? '<img class="sp-th" loading="lazy" alt="" src="' + imgUrl(it, 120) + '">' : '<span class="sp-n">' + num + '</span>') + '<span class="sp-main"><b>' + X.esc(f(it, 'name')) + '</b><small>' + X.esc(placeOf(it)) + '</small></span><span class="sp-meta"><span>' + L('part') + ': <b>' + X.esc(f(it, 'part')) + '</b></span><span>' + L('shakti') + ': <b>' + X.esc(f(it, 'shakti')) + '</b></span></span></a>';
          return '<a class="t-card' + (it.img ? ' has-img' : '') + '" href="#/tirth/' + g + '/' + idOf(it) + '">' + (it.img ? '<img class="t-img" loading="lazy" alt="' + X.esc(f(it, 'name')) + '" src="' + imgUrl(it, 500) + '">' : '') + '<span class="t-n">' + num + '</span><b>' + X.esc(f(it, 'name')) + '</b><small>' + X.esc(placeOf(it)) + '</small><p>' + X.esc((f(it, 'legend') || '').split(/(?<=[।.])\s/)[0]) + '</p></a>';
        }).join('') || '<div class="empty">—</div>';
      };
      draw();
      X.$('#tq').oninput = function () { LS.q = this.value; draw(); };
      if (X.$('#tc')) X.$('#tc').onchange = function () { LS.c = this.value; draw(); };
      drawMap('gmap', items.map(function (i) { return [i, g]; }));
      window.scrollTo(0, 0);
    });
  }

  function bookBox(g) {
    return '<div class="t-book"><div><b>' + L('book') + '</b><p>' + L('book_note') + '</p></div><a class="btn btn-primary" href="#/seva/' + GROUPS[g].svc + '">' + L('book') + '</a></div>';
  }

  /* ---------- detail ---------- */
  function detail(g, id) {
    withData(function (d) {
      var G = d[g]; if (!G) return landing();
      var items = G.items, idx = items.findIndex(function (i) { return idOf(i) === id; });
      if (idx < 0) return groupPage(g);
      var it = items[idx], prev = items[idx - 1], next = items[idx + 1];
      var row = function (k, v) { return v ? '<div class="pc-row"><dt>' + k + '</dt><dd>' + X.esc(v) + '</dd></div>' : ''; };
      var bullets = function (title, v) { var a = list(v); return a.length ? '<h2>' + title + '</h2><ul class="t-ul">' + a.map(function (x) { return '<li>' + X.esc(x) + '</li>'; }).join('') + '</ul>' : ''; };
      var para = function (title, v) { return v ? '<h2>' + title + '</h2><p>' + X.esc(v) + '</p>' : ''; };
      var src = it.sources || G.sources || [];
      document.title = f(it, 'name') + ' — ' + gname(g) + ' — ' + X.t(X.D.settings.siteName);
      X.$('#main').innerHTML = '<div class="wrap detail tirth">' +
        '<nav class="crumbs"><a href="#/">' + X.u('home') + '</a> / <a href="#/tirth">' + L('tirth') + '</a> / <a href="#/tirth/' + g + '">' + gname(g) + '</a> / ' + X.esc(f(it, 'name')) + '</nav>' +
        '<div class="detail-grid"><article>' +
          '<div class="t-hero"><span class="tg-ic big">' + GROUPS[g].icon + '</span><div><span class="t-badge">' + gname(g) + ' • ' + (it.n || idx + 1) + '</span><h1>' + X.esc(f(it, 'name')) + '</h1><p class="t-place">📍 ' + X.esc(placeOf(it)) + '</p></div></div>' +
          (it.img ? '<figure class="t-photo"><img src="' + imgUrl(it, 1280) + '" alt="' + X.esc(f(it, 'name')) + '"><figcaption>' + credit(it) + '</figcaption></figure>' : '') +
          (g === 'shaktipeeth' ? '<dl class="sp-facts">' + row(L('part'), f(it, 'part')) + row(L('shakti'), f(it, 'shakti')) + row(L('bhairav'), f(it, 'bhairav')) + row(L('country'), it.country) + '</dl>' : '') +
          para(L('setting'), f(it, 'geography') || f(it, 'river_or_setting')) +
          para(L('legend'), f(it, 'legend')) +
          bullets(L('idol'), f(it, 'idol')) +
          bullets(L('special'), f(it, 'special')) +
          (f(it, 'note') ? '<p class="t-note">' + X.esc(f(it, 'note')) + '</p>' : '') +
          bullets(L('festivals'), f(it, 'festivals')) +
          para(L('reach'), f(it, 'reach')) +
          (f(it, 'disputed') ? '<div class="t-disp"><h2>' + L('disputed') + '</h2><p>' + X.esc(f(it, 'disputed')) + '</p></div>' : '') +
          (src.length ? '<details class="t-src"><summary>' + L('sources') + ' (' + src.length + ')</summary><ul>' + src.map(function (u) { return '<li><a href="' + X.esc(u) + '" target="_blank" rel="noopener">' + X.esc(u.replace(/^https?:\/\//, '').slice(0, 80)) + '</a></li>'; }).join('') + '</ul></details>' : '') +
          '<nav class="t-pn">' + (prev ? '<a class="btn btn-ghost btn-sm" href="#/tirth/' + g + '/' + idOf(prev) + '">‹ ' + X.esc(f(prev, 'name')) + '</a>' : '<span></span>') + (next ? '<a class="btn btn-ghost btn-sm" href="#/tirth/' + g + '/' + idOf(next) + '">' + X.esc(f(next, 'name')) + ' ›</a>' : '') + '</nav>' +
        '</article><aside class="pkg-box">' +
          '<a class="btn btn-ghost" style="width:100%" target="_blank" rel="noopener" href="' + gmaps(it) + '">🗺 ' + L('directions') + '</a>' +
          (it.lat ? '<div id="dmap" class="tmap small"></div>' : '') +
          '<div class="t-book side"><b>' + L('book') + '</b><p>' + L('book_note') + '</p><a class="btn btn-primary" style="width:100%" href="#/seva/' + GROUPS[g].svc + '">' + L('book') + '</a></div>' +
          '<a class="btn btn-ghost btn-sm" style="width:100%;margin-top:10px" href="#/tirth/' + g + '">← ' + L('back') + '</a>' +
        '</aside></div></div>';
      if (it.lat) leaflet().then(function (Lf) {
        var el = document.getElementById('dmap'); if (!el) return;
        var m = Lf.map(el, { scrollWheelZoom: false }).setView([+it.lat, +it.lon], 10);
        Lf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap' }).addTo(m);
        Lf.circleMarker([+it.lat, +it.lon], { radius: 8, color: '#fff', weight: 2, fillColor: COL[g], fillOpacity: 1 }).addTo(m);
      }).catch(function () {});
      window.scrollTo(0, 0);
    });
  }

  window.VSSTirth = {
    init: function (ctx) { X = ctx; },
    route: function (h) {
      var m = h.match(/^#\/tirth(?:\/([\w-]+))?(?:\/([\w-]+))?/);
      if (!m[1]) return landing();
      if (!m[2]) return groupPage(m[1]);
      return detail(m[1], m[2]);
    }
  };
})();
