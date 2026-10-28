/* वैदिक शोध संस्थान — पुस्तकालय (निःशुल्क व प्रामाणिक स्रोतों से)
   डेटा: data/books.json. पुस्तकें मूल स्रोत से ही दिखाई जाती हैं (आर्काइव का एम्बेड रीडर / मूल वेबसाइट),
   इसलिए किसी प्रकाशक की फ़ाइल यहाँ दोबारा अपलोड नहीं की गई है। */
(function () {
  'use strict';
  var X, DATA = null, loading = null;
  var T = {
    hi: {
      title: 'पुस्तकालय', sub: 'कर्मकांड व पूजा की प्रामाणिक पुस्तकें — निःशुल्क, मूल स्रोतों से। यहीं पढ़ें या स्रोत से डाउनलोड करें।',
      read: 'यहीं पढ़ें', open: 'मूल स्रोत पर खोलें', pdf: 'PDF डाउनलोड', back: 'सभी पुस्तकें', lang: 'भाषा', pub: 'प्रकाशक / संस्करण', src: 'स्रोत',
      gp_steps: 'गीता प्रेस यह पुस्तक अपनी आधिकारिक वेबसाइट पर निःशुल्क पढ़ने देता है। पढ़ने के लिए:', gp1: 'नीचे के बटन से गीता प्रेस की ई-बुक लाइब्रेरी खोलें।', gp2: 'खोज में “Nitya Karma” लिखें — कोड 592 वाली पुस्तक आएगी।', gp3: '“Read Book” दबाएँ; पहली बार गीता प्रेस पर मुफ़्त खाता (Sign Up) बनाना होता है।', gp_btn: 'गीता प्रेस ई-बुक लाइब्रेरी खोलें', gp_buy: 'छपी पुस्तक गीता प्रेस से खरीदें',
      loading: 'पुस्तक खुल रही है…', fail: 'जानकारी लोड नहीं हो सकी। पेज फिर से खोलें।', book: 'इससे जुड़ी पूजा बुक करें',
      note: 'पुस्तकें उनके मूल, निःशुल्क स्रोतों से दिखाई गई हैं — गीता प्रेस की आधिकारिक ई-बुक, sanskritdocuments.org का संस्कृत ग्रंथ-संग्रह और इंटरनेट आर्काइव पर उपलब्ध पुराने (पब्लिक डोमेन) छपे ग्रंथ। अनुष्ठान की विधि में आपके पंडित जी की पद्धति ही मान्य है।',
      tip: 'सुझाव: पढ़ते समय पृष्ठभूमि संगीत नीचे बाएँ बटन से बंद कर सकते हैं।'
    },
    en: {
      title: 'Library', sub: 'Authentic books on karmkand and puja — free, from their original sources. Read here or download from the source.',
      read: 'Read here', open: 'Open at source', pdf: 'Download PDF', back: 'All books', lang: 'Language', pub: 'Publisher / edition', src: 'Source',
      gp_steps: 'Gita Press lets you read this book free on its official website. To read:', gp1: 'Open the Gita Press e-book library with the button below.', gp2: 'Search “Nitya Karma” — the book with code 592 appears.', gp3: 'Press “Read Book”; the first time, create a free Gita Press account (Sign Up).', gp_btn: 'Open Gita Press e-book library', gp_buy: 'Buy the printed book from Gita Press',
      loading: 'Opening the book…', fail: 'Could not load. Please reopen the page.', book: 'Book the related puja',
      note: 'Books are shown from their original free sources — Gita Press’s official e-books, the sanskritdocuments.org collection, and old public-domain printed editions on the Internet Archive. For the ritual itself, your pandit’s paddhati prevails.',
      tip: 'Tip: you can turn off the background music with the button at bottom-left while reading.'
    }
  };
  function L(k) { return (T[X.lang] && T[X.lang][k]) || T.hi[k] || k; }
  function f(o, k) { return o[k + '_' + (X.lang === 'en' ? 'en' : 'hi')] || o[k + '_hi'] || ''; }
  function e(s) { return X.esc(s == null ? '' : String(s)); }
  function load() {
    if (DATA) return Promise.resolve(DATA);
    if (!loading) loading = fetch('data/books.json?v=1').then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) { DATA = d; return d; });
    return loading;
  }
  function withData(fn) {
    X.$('#main').innerHTML = '<div class="wrap detail"><p>' + L('loading') + '</p></div>';
    load().then(fn).catch(function () { X.$('#main').innerHTML = '<div class="wrap detail"><p>' + L('fail') + '</p></div>'; });
  }
  // typographic book cover (no images needed)
  function cover(b, big) {
    var c = b.color || '#7E1F1A', t = b.title_hi, words = t.split(' '), lines = [], cur = '';
    words.forEach(function (w) { if ((cur + ' ' + w).trim().length > 11 && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
    if (cur) lines.push(cur);
    var y0 = 150 - (lines.length - 1) * 19;
    return '<svg viewBox="0 0 220 300" class="bk-cover' + (big ? ' big' : '') + '" role="img" aria-label="' + e(t) + '">' +
      '<defs><linearGradient id="g' + b.id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c + '"/><stop offset="1" stop-color="#1A0E0A"/></linearGradient></defs>' +
      '<rect width="220" height="300" rx="6" fill="url(#g' + b.id + ')"/><rect x="0" y="0" width="14" height="300" fill="rgba(0,0,0,.28)"/>' +
      '<rect x="26" y="14" width="182" height="272" rx="3" fill="none" stroke="#E7C987" stroke-width="1.4"/><rect x="31" y="19" width="172" height="262" rx="2" fill="none" stroke="#E7C987" stroke-width=".6" opacity=".7"/>' +
      '<text x="117" y="56" text-anchor="middle" font-family="Tiro Devanagari Hindi, serif" font-size="18" fill="#E7C987">॥ श्रीः ॥</text>' +
      '<g transform="translate(117 92)" fill="none" stroke="#E7C987" stroke-width="1.1" opacity=".85"><circle r="16"/><circle r="9"/>' + [0, 45, 90, 135].map(function (a) { return '<ellipse rx="4" ry="15" transform="rotate(' + a + ')"/>'; }).join('') + '</g>' +
      lines.map(function (ln, i) { return '<text x="117" y="' + (y0 + 40 + i * 38) + '" text-anchor="middle" font-family="Tiro Devanagari Hindi, serif" font-size="27" fill="#FFF6E3">' + e(ln) + '</text>'; }).join('') +
      '<line x1="70" x2="164" y1="232" y2="232" stroke="#E7C987" stroke-width="1"/>' +
      '<text x="117" y="256" text-anchor="middle" font-family="Mukta, sans-serif" font-size="11" fill="#E7C987">' + e(b.source === 'gitapress' ? 'गीता प्रेस, गोरखपुर' : b.source === 'archive' ? 'प्राचीन संस्करण' : 'मूल संस्कृत पाठ') + '</text>' +
      '</svg>';
  }
  function list() {
    withData(function (d) {
      X.$('#main').innerHTML = '<div class="wrap detail">' +
        '<nav class="crumbs"><a href="#/">' + X.u('home') + '</a> / ' + L('title') + '</nav>' +
        '<div class="sec-head"><div><span class="eyebrow">' + (X.lang === 'en' ? 'Granth Sangrah' : 'ग्रंथ संग्रह') + '</span><h1>' + L('title') + '</h1><p class="lead">' + L('sub') + '</p></div></div>' +
        '<div class="bk-grid">' + d.books.map(function (b) {
          return '<a class="bk-card" href="#/pustak/' + b.id + '">' + cover(b) + '<div class="bk-info"><b>' + e(f(b, 'title')) + '</b><span>' + e(f(b, 'sub')) + '</span><small>' + e(b.lang_hi) + ' • ' + e(b.source_name) + '</small><i>' + (b.source === 'gitapress' ? L('open') : L('read')) + ' →</i></div></a>';
        }).join('') + '</div><p class="md-disc">' + L('note') + '</p></div>';
      window.scrollTo(0, 0);
    });
  }
  function reader(b) {
    if (b.source === 'archive') return '<div class="bk-frame"><iframe src="https://archive.org/embed/' + encodeURIComponent(b.archive) + '" title="' + e(f(b, 'title')) + '" allowfullscreen loading="lazy"></iframe></div>';
    if (b.source === 'embed') return '<div class="bk-frame tall"><iframe src="' + e(b.url) + '" title="' + e(f(b, 'title')) + '" loading="lazy"></iframe></div>';
    return '<div class="bk-gp"><p><b>' + L('gp_steps') + '</b></p><ol><li>' + L('gp1') + '</li><li>' + L('gp2') + '</li><li>' + L('gp3') + '</li></ol>' +
      '<a class="btn btn-primary" href="' + e(b.url) + '" target="_blank" rel="noopener">' + L('gp_btn') + '</a> <a class="btn btn-ghost" href="https://gitapress.org/buybooks" target="_blank" rel="noopener">' + L('gp_buy') + '</a></div>';
  }
  function detail(id) {
    withData(function (d) {
      var i = d.books.findIndex(function (b) { return b.id === id; }); if (i < 0) return list();
      var b = d.books[i], prev = d.books[(i + d.books.length - 1) % d.books.length], next = d.books[(i + 1) % d.books.length];
      X.$('#main').innerHTML = '<div class="wrap detail">' +
        '<nav class="crumbs"><a href="#/">' + X.u('home') + '</a> / <a href="#/pustak">' + L('title') + '</a> / ' + e(f(b, 'title')) + '</nav>' +
        '<div class="bk-head">' + cover(b, true) + '<div><h1>' + e(f(b, 'title')) + '</h1><p class="md-en">' + e(f(b, 'sub')) + '</p><p>' + e(f(b, 'desc')) + '</p>' +
        '<dl class="bk-meta"><dt>' + L('lang') + '</dt><dd>' + e(b.lang_hi) + '</dd><dt>' + L('pub') + '</dt><dd>' + e(b.publisher) + '</dd><dt>' + L('src') + '</dt><dd><a href="' + e(b.url) + '" target="_blank" rel="noopener">' + e(b.source_name) + '</a></dd></dl>' +
        '<div class="bk-actions">' + (b.source !== 'gitapress' ? '<a class="btn btn-primary" href="#bkread">' + L('read') + '</a>' : '') +
        (b.pdf ? '<a class="btn btn-ghost" href="' + e(b.pdf) + '" target="_blank" rel="noopener">' + L('pdf') + '</a>' : '') +
        (b.source !== 'gitapress' ? '<a class="btn btn-ghost" href="' + e(b.url) + '" target="_blank" rel="noopener">' + L('open') + '</a>' : '') + '</div></div></div>' +
        '<div id="bkread">' + reader(b) + '</div>' + (b.source !== 'gitapress' ? '<p class="bk-tip">' + L('tip') + '</p>' : '') +
        (b.seva ? '<div class="t-book"><div><b>' + L('book') + '</b><p>' + e(f(b, 'sub')) + '</p></div><a class="btn btn-primary" href="#/seva/' + e(b.seva) + '">' + X.u('book') + '</a></div>' : '') +
        '<div class="t-nav"><a href="#/pustak/' + prev.id + '">← ' + e(f(prev, 'title')) + '</a><a href="#/pustak">' + L('back') + '</a><a href="#/pustak/' + next.id + '">' + e(f(next, 'title')) + ' →</a></div></div>';
      var a = X.$('.bk-actions a[href="#bkread"]'); if (a) a.addEventListener('click', function (ev) { ev.preventDefault(); X.$('#bkread').scrollIntoView({ behavior: 'smooth' }); });
      window.scrollTo(0, 0);
    });
  }
  window.VSSBooks = {
    init: function (x) { X = x; },
    cover: cover,
    load: load,
    route: function (h) { var m = h.match(/^#\/pustak\/([\w-]+)/); return m ? detail(m[1]) : list(); }
  };
})();
