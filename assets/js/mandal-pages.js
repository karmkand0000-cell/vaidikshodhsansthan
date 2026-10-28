/* वैदिक शोध संस्थान — पूजा मंडल (वेदी पर बनने वाले मंडल)
   डेटा: data/mandal.json (स्रोत सहित) */
(function () {
  'use strict';
  var X, DATA = null, loading = null;

  var T = {
    hi: {
      title: 'पूजा मंडल', sub: 'वेदी पर रंगीन अक्षत व अन्न से बनने वाले मंडल — किस अनुष्ठान में कौन-सा मंडल, उसकी रचना और उसमें आवाहित देवता।',
      used: 'किन अनुष्ठानों में', structure: 'रचना', colors: 'रंग व उनका भाव', deities: 'आवाहित देवता', table: 'ग्रह-सारणी',
      graha: 'ग्रह', dir: 'दिशा', shape: 'आकार', color: 'रंग', grain: 'अन्न', samidha: 'समिधा', adhi: 'अधिदेवता', pratyadhi: 'प्रत्यधिदेवता',
      notes: 'ध्यान दें / परंपराओं में भेद', sources: 'स्रोत', open: 'विस्तार से देखें', back: 'सभी मंडल', count: 'देवता',
      diagram: 'रेखाचित्र', diagram_note: 'कर्मकांड पद्धति के प्रचलित चक्र के अनुसार बनाया गया मंडल। वेदी पर पंडित जी इसे रंगीन अक्षत (चावल) से बनाते हैं।',
      east_top: 'चित्र में पूर्व दिशा ऊपर है', book: 'इस मंडल सहित अनुष्ठान बुक करें', book_note: 'पंडित जी आपके अनुष्ठान के अनुसार वेदी व मंडल की पूरी तैयारी करेंगे।',
      loading: 'जानकारी लोड हो रही है…', fail: 'जानकारी लोड नहीं हो सकी। पेज फिर से खोलें।',
      disclaimer: 'मंडलों की रचना व देवताओं के क्रम में क्षेत्र और पद्धति (जैसे गीता प्रेस, काशी, मिथिला, दक्षिण भारतीय परंपरा) के अनुसार अंतर मिलता है। यहाँ दी गई जानकारी स्रोतों से मिलाकर लिखी गई है; अनुष्ठान के समय आपके पंडित जी की पद्धति ही मान्य होगी।',
      prev: 'पिछला', next: 'अगला'
    },
    en: {
      title: 'Puja Mandals', sub: 'The sacred diagrams drawn on the vedi with coloured rice and grains — which ritual uses which mandal, how it is laid out and which deities are invoked.',
      used: 'Used in', structure: 'Layout', colors: 'Colours & meaning', deities: 'Deities invoked', table: 'Graha table',
      graha: 'Graha', dir: 'Direction', shape: 'Shape', color: 'Colour', grain: 'Grain', samidha: 'Samidha', adhi: 'Adhidevata', pratyadhi: 'Pratyadhidevata',
      notes: 'Notes / differing traditions', sources: 'Sources', open: 'Read more', back: 'All mandals', count: 'deities',
      diagram: 'Diagram', diagram_note: 'Drawn after the standard chart used in karmkand paddhatis. On the vedi, pandits make it with coloured rice.',
      east_top: 'East is at the top', book: 'Book a ritual with this mandal', book_note: 'Pandit ji will prepare the vedi and mandals as your ritual requires.',
      loading: 'Loading…', fail: 'Could not load. Please reopen the page.',
      disclaimer: 'The layout and order of deities vary by region and paddhati. This page is compiled from the listed sources; during the ritual, your pandit’s paddhati prevails.',
      prev: 'Previous', next: 'Next'
    }
  };
  function L(k) { return (T[X.lang] && T[X.lang][k]) || T.hi[k] || k; }
  function f(o, k) { return o[k + '_' + (X.lang === 'en' ? 'en' : 'hi')] || o[k + '_hi'] || o[k + '_en'] || ''; }
  function e(s) { return X.esc(s == null ? '' : String(s)); }

  // which bookable service fits each mandal
  var SVC = { sarvatobhadra: 'navgrah-havan', lingatobhadra: 'rudrabhishek', navgrah: 'navgrah-havan', shodash_matrika: 'griha-pravesh', saptaghrit_matrika: 'griha-pravesh', vastu: 'vastu-shanti', kshetrapal: 'navgrah-havan', yogini: 'chandi-path-havan', lokpal: 'navgrah-havan' };

  function load() {
    if (DATA) return Promise.resolve(DATA);
    if (!loading) loading = fetch('data/mandal.json?v=2').then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) { DATA = d; return d; });
    return loading;
  }
  function withData(fn) {
    X.$('#main').innerHTML = '<div class="wrap detail"><p>' + L('loading') + '</p></div>';
    load().then(fn).catch(function () { X.$('#main').innerHTML = '<div class="wrap detail"><p>' + L('fail') + '</p></div>'; });
  }

  /* ---------- diagrams (SVG) ---------- */
  var COL = [[/लाल|रक्त|red/i, '#B3261E'], [/श्वेत|सफ़ेद|सफेद|white/i, '#FFFFFF'], [/पीत|पीला|पीले|yellow/i, '#E8B21E'], [/हरा|हरित|green/i, '#2E7D32'], [/धूम्र|धुएँ|smok/i, '#8A8A8A'], [/काला|कृष्ण|नील|black|blue/i, '#262626']];
  function colorOf(s) { for (var i = 0; i < COL.length; i++) if (COL[i][0].test(s || '')) return COL[i][1]; return '#C9A25A'; }
  function art(m, labels) { return window.VSSMandalArt && window.VSSMandalArt.has(m.id) ? window.VSSMandalArt.draw(m.id, { labels: labels, en: X.lang === 'en' }) : ''; }
  function diagram(m) {
    var svg = art(m, true); if (!svg) return '';
    return '<figure class="md-fig">' + svg + '<figcaption>' + L('diagram_note') + (/navgrah|vastu|lokpal/.test(m.id) ? ' ' + L('east_top') + '.' : '') + '</figcaption></figure>';
  }
  function emblem(m) { return art(m, false); }

  /* ---------- pages ---------- */
  function intro(d) {
    return '<figure class="md-banner"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(d.banner.file) + '?width=1400" alt="" loading="lazy"></figure>';
  }
  function landing() {
    withData(function (d) {
      X.$('#main').innerHTML = '<div class="wrap detail">' +
        '<nav class="crumbs"><a href="#/">' + X.u('home') + '</a> / ' + L('title') + '</nav>' +
        '<div class="md-head"><div><span class="eyebrow">' + (X.lang === 'en' ? 'Vedi & Mandal' : 'वेदी व मंडल') + '</span><h1>' + L('title') + '</h1><p class="lead">' + L('sub') + '</p>' +
        (d.intro ? '<p>' + e(f(d.intro, 'text')) + '</p>' : '') + '</div>' + (d.banner ? intro(d) : '') + '</div>' +
        '<div class="md-grid">' + d.mandals.map(function (m) {
          return '<a class="md-card" href="#/mandal/' + m.id + '"><span class="md-art">' + emblem(m) + '</span><b>' + e(f(m, 'name')) + '</b>' +
            '<span class="md-en">' + e(X.lang === 'en' ? m.name_hi : m.name_en) + '</span><p>' + e(f(m, 'summary')) + '</p>' +
            ((m.deities || []).length ? '<small>' + m.deities.length + ' ' + L('count') + '</small>' : (m.graha_table ? '<small>9 ' + (X.lang === 'en' ? 'grahas' : 'ग्रह') + '</small>' : '')) +
            '<i>' + L('open') + ' →</i></a>';
        }).join('') + '</div>' +
        '<p class="md-disc">' + L('disclaimer') + '</p></div>';
      window.scrollTo(0, 0);
    });
  }
  function detail(id) {
    withData(function (d) {
      var ms = d.mandals, idx = ms.findIndex(function (m) { return m.id === id; });
      if (idx < 0) return landing();
      var m = ms[idx], prev = ms[(idx + ms.length - 1) % ms.length], next = ms[(idx + 1) % ms.length];
      var used = (X.lang === 'en' ? (m.used_in_en || m.used_in_hi) : m.used_in_hi) || [];
      var cols = m.colors || [], deities = m.deities || [], gt = m.graha_table || [], notes = (X.lang === 'en' ? (m.notes_en || m.notes_hi) : m.notes_hi) || [];
      var hasDir = deities.some(function (x) { return x.dir_hi; });
      X.$('#main').innerHTML = '<div class="wrap detail md-detail">' +
        '<nav class="crumbs"><a href="#/">' + X.u('home') + '</a> / <a href="#/mandal">' + L('title') + '</a> / ' + e(f(m, 'name')) + '</nav>' +
        '<div class="t-hero"><div><h1>' + e(f(m, 'name')) + '</h1><p class="md-en">' + e(X.lang === 'en' ? m.name_hi : m.name_en) + '</p></div></div>' +
        '<div class="md-cols"><div>' +
        '<p class="lead">' + e(f(m, 'summary')) + '</p>' +
        (used.length ? '<h2>' + L('used') + '</h2><ul class="t-ul">' + used.map(function (u) { return '<li>' + e(u) + '</li>'; }).join('') + '</ul>' : '') +
        (f(m, 'structure') ? '<h2>' + L('structure') + '</h2><p>' + e(f(m, 'structure')) + '</p>' : '') +
        (m.avahan_hi && X.lang !== 'en' ? '<h2>आवाहन</h2><p class="md-mantra">' + e(m.avahan_hi) + '</p>' : '') +
        (cols.length ? '<h2>' + L('colors') + '</h2><ul class="md-colors">' + cols.map(function (c) { return '<li><span class="sw" style="background:' + colorOf(c.hi + ' ' + (c.en || '')) + '"></span><b>' + e(X.lang === 'en' ? (c.en || c.hi) : c.hi) + '</b>' + (c.meaning_hi ? ' — ' + e(X.lang === 'en' ? (c.meaning_en || c.meaning_hi) : c.meaning_hi) : '') + '</li>'; }).join('') + '</ul>' : '') +
        '</div><div>' + diagram(m) + '</div></div>' +
        (gt.length ? '<h2>' + L('table') + '</h2><div class="md-tw"><table class="md-table"><thead><tr><th>' + [L('graha'), L('dir'), L('shape'), L('color'), L('grain'), L('samidha'), L('adhi'), L('pratyadhi')].join('</th><th>') + '</th></tr></thead><tbody>' +
          gt.map(function (g) { return '<tr><td><b>' + e(g.graha_hi) + '</b>' + (g.graha_en ? '<br><small>' + e(g.graha_en) + '</small>' : '') + '</td><td>' + [g.dir_hi, g.shape_hi, g.color_hi, g.grain_hi, g.samidha_hi, g.adhidevata_hi, g.pratyadhidevata_hi].map(function (v) { return e(v || '—'); }).join('</td><td>') + '</td></tr>'; }).join('') + '</tbody></table></div>' : '') +
        (deities.length ? '<h2>' + L('deities') + ' (' + deities.length + ')</h2><ol class="md-dei' + (deities.length > 20 ? ' many' : '') + '">' + deities.map(function (x) { return '<li><b>' + e(X.lang === 'en' ? (x.en || x.hi) : x.hi) + '</b>' + (X.lang !== 'en' && x.en ? ' <small>' + e(x.en) + '</small>' : '') + (hasDir && x.dir_hi ? ' <span class="md-d">' + e(x.dir_hi) + '</span>' : '') + '</li>'; }).join('') + '</ol>' : '') +
        ((m.pancha_lokapala || []).length ? '<h2>' + (X.lang === 'en' ? 'Pancha Lokapala' : 'पञ्चलोकपाल') + '</h2><ol class="md-dei">' + m.pancha_lokapala.map(function (x) { return '<li><b>' + e(X.lang === 'en' ? (x.en || x.hi) : x.hi) + '</b></li>'; }).join('') + '</ol>' : '') +
        (notes.length ? '<div class="md-notes"><h2>' + L('notes') + '</h2><ul>' + notes.map(function (n) { return '<li>' + e(n) + '</li>'; }).join('') + '</ul></div>' : '') +
        '<div class="t-book"><div><b>' + L('book') + '</b><p>' + L('book_note') + '</p></div><a class="btn btn-primary" href="#/seva/' + (SVC[m.id] || 'navgrah-havan') + '">' + X.u('book') + '</a></div>' +
        ((m.sources || []).length ? '<details class="t-src" open><summary>' + L('sources') + ' (' + m.sources.length + ')</summary><ul>' + m.sources.map(function (s) { return '<li><a href="' + e(s.url) + '" target="_blank" rel="noopener">' + e(s.title || s.url) + '</a></li>'; }).join('') + '</ul></details>' : '') +
        '<div class="t-nav"><a href="#/mandal/' + prev.id + '">← ' + e(f(prev, 'name')) + '</a><a href="#/mandal">' + L('back') + '</a><a href="#/mandal/' + next.id + '">' + e(f(next, 'name')) + ' →</a></div>' +
        '</div>';
      window.scrollTo(0, 0);
    });
  }

  window.VSSMandal = {
    init: function (x) { X = x; },
    title: function () { return L('title'); },
    route: function (h) {
      var m = h.match(/^#\/mandal\/?([\w-]*)/);
      if (m && m[1]) return detail(m[1]);
      return landing();
    }
  };
})();
