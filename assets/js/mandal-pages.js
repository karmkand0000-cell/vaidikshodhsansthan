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
      diagram: 'रेखाचित्र', diagram_note: 'यह शास्त्रीय विवरण के आधार पर बनाया गया सरल रेखाचित्र है, फ़ोटो नहीं। वास्तविक मंडल पंडित जी पद्धति अनुसार रंगीन अक्षत से बनाते हैं।',
      east_top: 'पूर्व दिशा ऊपर', book: 'इस मंडल सहित अनुष्ठान बुक करें', book_note: 'पंडित जी आपके अनुष्ठान के अनुसार वेदी व मंडल की पूरी तैयारी करेंगे।',
      loading: 'जानकारी लोड हो रही है…', fail: 'जानकारी लोड नहीं हो सकी। पेज फिर से खोलें।',
      disclaimer: 'मंडलों की रचना व देवताओं के क्रम में क्षेत्र और पद्धति (जैसे गीता प्रेस, काशी, मिथिला, दक्षिण भारतीय परंपरा) के अनुसार अंतर मिलता है। यहाँ दी गई जानकारी स्रोतों से मिलाकर लिखी गई है; अनुष्ठान के समय आपके पंडित जी की पद्धति ही मान्य होगी।',
      prev: 'पिछला', next: 'अगला'
    },
    en: {
      title: 'Puja Mandals', sub: 'The sacred diagrams drawn on the vedi with coloured rice and grains — which ritual uses which mandal, how it is laid out and which deities are invoked.',
      used: 'Used in', structure: 'Layout', colors: 'Colours & meaning', deities: 'Deities invoked', table: 'Graha table',
      graha: 'Graha', dir: 'Direction', shape: 'Shape', color: 'Colour', grain: 'Grain', samidha: 'Samidha', adhi: 'Adhidevata', pratyadhi: 'Pratyadhidevata',
      notes: 'Notes / differing traditions', sources: 'Sources', open: 'Read more', back: 'All mandals', count: 'deities',
      diagram: 'Diagram', diagram_note: 'A simple line diagram drawn from the textual description — not a photograph. Pandits draw the actual mandal with coloured rice as per their paddhati.',
      east_top: 'East at top', book: 'Book a ritual with this mandal', book_note: 'Pandit ji will prepare the vedi and mandals as your ritual requires.',
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
    if (!loading) loading = fetch('data/mandal.json?v=1').then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) { DATA = d; return d; });
    return loading;
  }
  function withData(fn) {
    X.$('#main').innerHTML = '<div class="wrap detail"><p>' + L('loading') + '</p></div>';
    load().then(fn).catch(function () { X.$('#main').innerHTML = '<div class="wrap detail"><p>' + L('fail') + '</p></div>'; });
  }

  /* ---------- diagrams (SVG) ---------- */
  var COL = [[/लाल|रक्त|red/i, '#B3261E'], [/श्वेत|सफ़ेद|सफेद|white/i, '#FFFFFF'], [/पीत|पीला|पीले|yellow/i, '#E8B21E'], [/हरा|हरित|green/i, '#2E7D32'], [/धूम्र|धुएँ|smok/i, '#8A8A8A'], [/काला|कृष्ण|नील|black|blue/i, '#262626']];
  function colorOf(s) { for (var i = 0; i < COL.length; i++) if (COL[i][0].test(s || '')) return COL[i][1]; return '#C9A25A'; }
  // East at top: col/row of 3x3
  var DIRPOS = [[/ईशान|north-?east/i, [0, 0]], [/आग्नेय|south-?east/i, [2, 0]], [/नैऋत्य|नैर्ऋत्य|south-?west/i, [2, 2]], [/वायव्य|north-?west/i, [0, 2]], [/मध्य|केंद्र|केन्द्र|centre|center/i, [1, 1]], [/पूर्व|east/i, [1, 0]], [/दक्षिण|south/i, [2, 1]], [/पश्चिम|west/i, [1, 2]], [/उत्तर|north/i, [0, 1]]];
  function posOf(s) { for (var i = 0; i < DIRPOS.length; i++) if (DIRPOS[i][0].test(s || '')) return DIRPOS[i][1]; return null; }
  function shapeSVG(s, cx, cy, r, fill) {
    var st = ' fill="' + fill + '" stroke="#3A2418" stroke-width="2"';
    var P = function (pts) { return '<polygon points="' + pts.map(function (p) { return (cx + p[0] * r).toFixed(1) + ',' + (cy + p[1] * r).toFixed(1); }).join(' ') + '"' + st + '/>'; };
    if (/वृत्त|गोल|वर्तुल|circle|round/i.test(s)) return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '"' + st + '/>';
    if (/अर्धचन्द्र|अर्धचंद्र|crescent/i.test(s)) return '<path d="M' + (cx + r * 0.3) + ' ' + (cy - r) + ' A ' + r + ' ' + r + ' 0 1 0 ' + (cx + r * 0.3) + ' ' + (cy + r) + ' A ' + r * 0.75 + ' ' + r * 0.75 + ' 0 1 1 ' + (cx + r * 0.3) + ' ' + (cy - r) + ' Z"' + st + '/>';
    if (/मनुष्य|human/i.test(s)) return '<circle cx="' + cx + '" cy="' + (cy - r * 0.7) + '" r="' + r * 0.28 + '"' + st + '/>' + P([[-0.45, -0.35], [0.45, -0.35], [0.3, 0.3], [0.38, 1], [0.08, 1], [0, 0.45], [-0.08, 1], [-0.38, 1], [-0.3, 0.3]]);
    if (/मकर|makara/i.test(s)) return '<path d="M' + (cx - r) + ' ' + cy + ' Q ' + (cx - r * 0.2) + ' ' + (cy - r * 0.75) + ' ' + (cx + r * 0.55) + ' ' + cy + ' L ' + (cx + r) + ' ' + (cy - r * 0.45) + ' L ' + (cx + r) + ' ' + (cy + r * 0.45) + ' L ' + (cx + r * 0.55) + ' ' + cy + ' Q ' + (cx - r * 0.2) + ' ' + (cy + r * 0.75) + ' ' + (cx - r) + ' ' + cy + ' Z"' + st + '/><circle cx="' + (cx - r * 0.6) + '" cy="' + (cy - r * 0.08) + '" r="3" fill="#fff"/>';
    if (/खड्ग|sword/i.test(s)) return P([[-0.12, -1], [0.12, -1], [0.12, 0.45], [-0.12, 0.45]]).replace('/>', ' transform="rotate(35 ' + cx + ' ' + cy + ')"/>') + P([[-0.5, 0.45], [0.5, 0.45], [0.5, 0.6], [-0.5, 0.6]]).replace('/>', ' transform="rotate(35 ' + cx + ' ' + cy + ')"/>') + P([[-0.09, 0.6], [0.09, 0.6], [0.09, 1], [-0.09, 1]]).replace('/>', ' transform="rotate(35 ' + cx + ' ' + cy + ')"/>');
    if (/त्रिकोण|triang/i.test(s)) return P([[0, -1], [0.95, 0.75], [-0.95, 0.75]]);
    if (/पंचकोण|पञ्चकोण|पञ्चास्र|पंचास्र|pentag/i.test(s)) { var a = []; for (var i = 0; i < 5; i++) { var t = -Math.PI / 2 + i * 2 * Math.PI / 5; a.push([Math.cos(t), Math.sin(t)]); } return P(a); }
    if (/बाण|arrow/i.test(s)) return P([[0, -1], [0.55, -0.35], [0.18, -0.35], [0.18, 1], [-0.18, 1], [-0.18, -0.35], [-0.55, -0.35]]);
    if (/धनु|bow/i.test(s)) return '<path d="M' + (cx - r) + ' ' + (cy + r * 0.3) + ' Q ' + cx + ' ' + (cy - r * 1.3) + ' ' + (cx + r) + ' ' + (cy + r * 0.3) + ' L ' + (cx + r * 0.75) + ' ' + (cy + r * 0.3) + ' Q ' + cx + ' ' + (cy - r * 0.85) + ' ' + (cx - r * 0.75) + ' ' + (cy + r * 0.3) + ' Z"' + st + '/><line x1="' + (cx - r) + '" y1="' + (cy + r * 0.3) + '" x2="' + (cx + r) + '" y2="' + (cy + r * 0.3) + '" stroke="#3A2418" stroke-width="1.5"/>';
    if (/शूर्प|सूप|winnow/i.test(s)) return P([[-1, -0.6], [1, -0.6], [0.6, 0.8], [-0.6, 0.8]]);
    if (/ध्वज|पताका|flag/i.test(s)) return '<line x1="' + (cx - r * 0.7) + '" y1="' + (cy - r) + '" x2="' + (cx - r * 0.7) + '" y2="' + (cy + r) + '" stroke="#3A2418" stroke-width="3"/>' + P([[-0.7, -1], [0.95, -0.55], [-0.7, -0.1]]);
    if (/आयत|दीर्घ|rectang/i.test(s)) return P([[-1, -0.6], [1, -0.6], [1, 0.6], [-1, 0.6]]);
    if (/चतुर|चौकोर|वर्ग|square/i.test(s)) return P([[-0.85, -0.85], [0.85, -0.85], [0.85, 0.85], [-0.85, 0.85]]);
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r * 0.7 + '"' + st + '/>';
  }
  function compass() {
    return '<text x="240" y="16" text-anchor="middle" class="md-dir">' + (X.lang === 'en' ? 'East' : 'पूर्व') + '</text>' +
      '<text x="240" y="474" text-anchor="middle" class="md-dir">' + (X.lang === 'en' ? 'West' : 'पश्चिम') + '</text>' +
      '<text x="12" y="244" text-anchor="middle" class="md-dir" transform="rotate(-90 12 244)">' + (X.lang === 'en' ? 'North' : 'उत्तर') + '</text>' +
      '<text x="468" y="244" text-anchor="middle" class="md-dir" transform="rotate(90 468 244)">' + (X.lang === 'en' ? 'South' : 'दक्षिण') + '</text>';
  }
  function navgrahSVG(m) {
    var rows = m.graha_table || []; if (rows.length < 9) return '';
    var cell = 140, o = 30, s = '<svg viewBox="0 0 480 480" class="md-svg" role="img" aria-label="' + e(f(m, 'name')) + '"><rect x="' + o + '" y="' + o + '" width="420" height="420" fill="#FBF3E2" stroke="#7E1F1A" stroke-width="3"/>';
    for (var i = 1; i < 3; i++) s += '<line x1="' + (o + i * cell) + '" y1="' + o + '" x2="' + (o + i * cell) + '" y2="' + (o + 420) + '" stroke="#C9A25A"/><line x1="' + o + '" y1="' + (o + i * cell) + '" x2="' + (o + 420) + '" y2="' + (o + i * cell) + '" stroke="#C9A25A"/>';
    var ok = 0;
    rows.forEach(function (g) {
      var p = posOf(g.dir_hi); if (!p) return; ok++;
      var cx = o + p[0] * cell + cell / 2, cy = o + p[1] * cell + cell / 2 - 12;
      s += shapeSVG(g.shape_hi || '', cx, cy, 34, colorOf(g.color_hi));
      s += '<text x="' + cx + '" y="' + (cy + 60) + '" text-anchor="middle" class="md-lbl">' + e(X.lang === 'en' ? (g.graha_en || g.graha_hi) : g.graha_hi) + '</text>';
    });
    if (ok < 9) return '';
    return s + compass() + '</svg>';
  }
  function gridSVG(names, cols) {
    var n = names.length, rows = Math.ceil(n / cols), cw = 420 / cols, ch = Math.min(110, 420 / rows), H = rows * ch + 60;
    var s = '<svg viewBox="0 0 480 ' + H + '" class="md-svg" role="img"><rect x="30" y="30" width="420" height="' + rows * ch + '" fill="#FBF3E2" stroke="#7E1F1A" stroke-width="3"/>';
    names.forEach(function (nm, i) {
      var c = i % cols, r = Math.floor(i / cols), x = 30 + c * cw, y = 30 + r * ch;
      s += '<rect x="' + x + '" y="' + y + '" width="' + cw + '" height="' + ch + '" fill="none" stroke="#C9A25A"/>' +
        '<text x="' + (x + cw / 2) + '" y="' + (y + ch / 2 - 6) + '" text-anchor="middle" class="md-num">' + (i + 1) + '</text>' +
        '<text x="' + (x + cw / 2) + '" y="' + (y + ch / 2 + 16) + '" text-anchor="middle" class="md-lbl sm">' + e(nm) + '</text>';
    });
    return s + '</svg>';
  }
  function streamsSVG(names) {
    var n = names.length, w = 420 / n, s = '<svg viewBox="0 0 480 360" class="md-svg" role="img"><rect x="30" y="20" width="420" height="320" rx="10" fill="#FBF3E2" stroke="#7E1F1A" stroke-width="3"/>';
    names.forEach(function (nm, i) {
      var x = 30 + w * i + w / 2;
      s += '<circle cx="' + x + '" cy="60" r="9" fill="#C8102E"/><path d="M' + x + ' 72 C ' + (x - 4) + ' 140, ' + (x + 4) + ' 200, ' + x + ' 280" stroke="#E8B21E" stroke-width="7" fill="none" stroke-linecap="round"/>' +
        '<text x="' + x + '" y="315" text-anchor="middle" class="md-lbl sm">' + e(nm) + '</text>';
    });
    return s + '</svg>';
  }
  function vastuSVG() {
    var o = 30, c = 420 / 9, s = '<svg viewBox="0 0 480 480" class="md-svg" role="img"><rect x="' + o + '" y="' + o + '" width="420" height="420" fill="#FBF3E2" stroke="#7E1F1A" stroke-width="3"/>';
    s += '<rect x="' + (o + c) + '" y="' + (o + c) + '" width="' + 7 * c + '" height="' + 7 * c + '" fill="#F4E3C1"/>';
    s += '<rect x="' + (o + 3 * c) + '" y="' + (o + 3 * c) + '" width="' + 3 * c + '" height="' + 3 * c + '" fill="#E7C987" stroke="#7E1F1A" stroke-width="2"/>';
    for (var i = 1; i < 9; i++) s += '<line x1="' + (o + i * c) + '" y1="' + o + '" x2="' + (o + i * c) + '" y2="' + (o + 420) + '" stroke="#C9A25A" stroke-width=".8"/><line x1="' + o + '" y1="' + (o + i * c) + '" x2="' + (o + 420) + '" y2="' + (o + i * c) + '" stroke="#C9A25A" stroke-width=".8"/>';
    s += '<text x="240" y="246" text-anchor="middle" class="md-lbl">' + (X.lang === 'en' ? 'Brahma' : 'ब्रह्मा') + '</text>';
    s += '<text x="240" y="' + (o + c * 1.6) + '" text-anchor="middle" class="md-lbl sm">' + (X.lang === 'en' ? 'inner 13 deities' : 'भीतरी 13 देवता') + '</text>';
    s += '<text x="240" y="' + (o + c * 0.62) + '" text-anchor="middle" class="md-lbl sm">' + (X.lang === 'en' ? 'outer 32 deities' : 'बाहरी 32 देवता') + '</text>';
    return s + compass() + '</svg>';
  }
  function diagram(m) {
    var names = (m.deities || []).map(function (d) { return X.lang === 'en' ? (d.en || d.hi) : d.hi; });
    var svg = '';
    if (m.id === 'navgrah') svg = navgrahSVG(m);
    else if (m.id === 'vastu') svg = vastuSVG();
    if (!svg) return '';
    return '<figure class="md-fig">' + svg + '<figcaption>' + L('diagram_note') + (/navgrah|vastu/.test(m.id) ? ' (' + L('east_top') + ')' : '') + '</figcaption></figure>';
  }
  function emblem(m) {
    // small decorative mark for cards: concentric square lotus
    var c = { sarvatobhadra: '#7E1F1A', lingatobhadra: '#3B4F7A', navgrah: '#B3261E', shodash_matrika: '#B88A3B', saptaghrit_matrika: '#E8B21E', vastu: '#2E6B3A', kshetrapal: '#5C1410', yogini: '#8C2D5A', lokpal: '#6B4E16' }[m.id] || '#7E1F1A';
    return '<svg viewBox="0 0 80 80" aria-hidden="true"><rect x="6" y="6" width="68" height="68" fill="none" stroke="' + c + '" stroke-width="3"/><rect x="18" y="18" width="44" height="44" transform="rotate(45 40 40)" fill="none" stroke="#B88A3B" stroke-width="2.5"/><rect x="24" y="24" width="32" height="32" fill="' + c + '" opacity=".12"/><circle cx="40" cy="40" r="9" fill="' + c + '"/><g stroke="' + c + '" stroke-width="2">' +
      [0, 45, 90, 135].map(function (a) { return '<line x1="40" y1="16" x2="40" y2="26" transform="rotate(' + a + ' 40 40)"/><line x1="40" y1="54" x2="40" y2="64" transform="rotate(' + a + ' 40 40)"/>'; }).join('') + '</g></svg>';
  }

  /* ---------- pages ---------- */
  function intro(d) {
    return '<figure class="md-banner"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(d.banner.file) + '?width=1400" alt="" loading="lazy"><figcaption>' + (X.lang === 'en' ? 'Photo: ' : 'फ़ोटो: ') + '<a href="https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(d.banner.file) + '" target="_blank" rel="noopener">' + e(d.banner.artist) + '</a>, ' + e(d.banner.license) + ' — Wikimedia Commons</figcaption></figure>';
  }
  function landing() {
    withData(function (d) {
      X.$('#main').innerHTML = '<div class="wrap detail">' +
        '<nav class="crumbs"><a href="#/">' + X.u('home') + '</a> / ' + L('title') + '</nav>' +
        '<div class="md-head"><div><span class="eyebrow">' + (X.lang === 'en' ? 'Vedi & Mandal' : 'वेदी व मंडल') + '</span><h1>' + L('title') + '</h1><p class="lead">' + L('sub') + '</p>' +
        (d.intro ? '<p>' + e(f(d.intro, 'text')) + '</p>' : '') + '</div>' + (d.banner ? intro(d) : '') + '</div>' +
        '<div class="md-grid">' + d.mandals.map(function (m) {
          return '<a class="md-card" href="#/mandal/' + m.id + '"><span class="md-em">' + emblem(m) + '</span><b>' + e(f(m, 'name')) + '</b>' +
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
        '<div class="t-hero"><span class="md-em lg">' + emblem(m) + '</span><div><h1>' + e(f(m, 'name')) + '</h1><p class="md-en">' + e(X.lang === 'en' ? m.name_hi : m.name_en) + '</p></div></div>' +
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
