/* वैदिक शोध संस्थान — डैशबोर्ड (admin) */
(function () {
  'use strict';
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function inr(n) { return '₹' + (Number(n) || 0).toLocaleString('en-IN'); }
  function toast(m, ms) { var el = document.createElement('div'); el.className = 'toast'; el.textContent = m; document.body.appendChild(el); setTimeout(function () { el.remove(); }, ms || 3000); }
  function slug(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50); }
  function digits(s) { return String(s || '').replace(/\D/g, ''); }
  function lsGet(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function lsSet(k, v) { localStorage.setItem(k, JSON.stringify(v)); }

  /* SHA-256 (UTF-8) — small self-contained implementation */
  function sha256(str) {
    str = unescape(encodeURIComponent(str));
    function rr(v, a) { return (v >>> a) | (v << (32 - a)); }
    var K = [], H = [], primes = [], n = 2;
    while (primes.length < 64) { var isP = true; for (var i = 0; i < primes.length && primes[i] * primes[i] <= n; i++) if (n % primes[i] === 0) { isP = false; break; } if (isP) { primes.push(n); } n++; }
    primes.forEach(function (p, i) { if (i < 8) H[i] = (Math.pow(p, 1 / 2) * 4294967296) | 0; K[i] = (Math.pow(p, 1 / 3) * 4294967296) | 0; });
    var words = [], bitLen = str.length * 8;
    str += '\x80'; while (str.length % 64 - 56) str += '\x00';
    for (i = 0; i < str.length; i++) words[i >> 2] |= str.charCodeAt(i) << ((3 - i) % 4) * 8;
    words[words.length] = (bitLen / 4294967296) | 0; words[words.length] = bitLen;
    for (var j = 0; j < words.length;) {
      var w = words.slice(j, j += 16), old = H.slice(0);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2], a = H[0], e = H[4];
        var t1 = H[7] + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & H[5]) ^ (~e & H[6])) + K[i] +
          (w[i] = i < 16 ? w[i] : (w[i - 16] + (rr(w15, 7) ^ rr(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rr(w2, 17) ^ rr(w2, 19) ^ (w2 >>> 10))) | 0);
        var t2 = (rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & H[1]) ^ (a & H[2]) ^ (H[1] & H[2]));
        H = [(t1 + t2) | 0].concat(H); H[4] = (H[4] + t1) | 0; H.length = 8;
      }
      for (i = 0; i < 8; i++) H[i] = (H[i] + old[i]) | 0;
    }
    return H.map(function (x) { return ('00000000' + (x >>> 0).toString(16)).slice(-8); }).join('');
  }
  function pwHash(pw) { return sha256('vss-admin:' + pw); }

  /* ---------------- data ---------------- */
  var D, LIVE_STR = '', BOOKINGS = null;
  function isDirty() { return JSON.stringify(D) !== LIVE_STR; }
  function save() { lsSet('vss_draft', D); $('#dirty').hidden = !isDirty(); }
  function gh() { return lsGet('vss_gh', { owner: '', repo: '', branch: 'main', token: '' }); }
  function sheetKey() { return localStorage.getItem('vss_sheet_key') || ''; }

  function loadAll() {
    return fetch('data/site-data.json?v=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .catch(function () { return clone(window.DEFAULT_DATA); })
      .then(function (live) {
        LIVE_STR = JSON.stringify(live);
        var draft = lsGet('vss_draft', null);
        D = draft || clone(live);
        var DEF = window.DEFAULT_DATA;
        Object.keys(DEF).forEach(function (k) { if (D[k] === undefined) D[k] = clone(DEF[k]); });
        Object.keys(DEF.settings).forEach(function (k) { if (D.settings[k] === undefined) D.settings[k] = clone(DEF.settings[k]); });
      });
  }

  /* ---------------- login ---------------- */
  function showLogin() {
    var setup = !D.settings.adminHash;
    $('#login').hidden = false; $('#app').hidden = true;
    $('#pw2wrap').hidden = !setup;
    $('#loginMsg').textContent = setup ? 'पहली बार: डैशबोर्ड के लिए नया पासवर्ड बनाएँ (कम से कम 8 अक्षर)।' : 'डैशबोर्ड में प्रवेश करें';
    $('#pw').autocomplete = setup ? 'new-password' : 'current-password';
    $('#pw').focus();
    $('#loginForm').onsubmit = function (e) {
      e.preventDefault();
      var pw = $('#pw').value, err = $('#loginErr');
      if (setup) {
        if (pw.length < 8) { err.textContent = 'पासवर्ड कम से कम 8 अक्षर का रखें।'; return; }
        if (pw !== $('#pw2').value) { err.textContent = 'दोनों पासवर्ड एक जैसे नहीं हैं।'; return; }
        D.settings.adminHash = pwHash(pw); save();
        sessionStorage.setItem('vss_auth', D.settings.adminHash);
        toast('पासवर्ड बन गया। इसे लागू करने के लिए “वेबसाइट पर प्रकाशित करें” दबाएँ।', 5000);
        startApp();
      } else {
        if (pwHash(pw) !== D.settings.adminHash) { err.textContent = 'पासवर्ड गलत है।'; return; }
        sessionStorage.setItem('vss_auth', D.settings.adminHash);
        startApp();
      }
    };
  }

  /* ---------------- tabs ---------------- */
  var TABS = [
    ['overview', 'अवलोकन'], ['bookings', 'बुकिंग'], ['services', 'पूजा सेवाएँ'], ['categories', 'श्रेणियाँ'],
    ['purposes', 'कामना अनुसार'], ['festivals', 'आगामी पर्व'], ['premium', 'प्रीमियम अनुष्ठान'], ['gallery', 'फ़ोटो गैलरी'], ['pandits', 'पंडित जी'], ['testimonials', 'यजमानों की राय'],
    ['faqs', 'प्रश्नोत्तर'], ['promises', 'हमारा संकल्प'], ['settings', 'वेबसाइट सेटिंग'], ['publish', 'प्रकाशन व बैकअप']
  ];
  var current = 'overview';

  function counts(id) {
    if (id === 'bookings') return BOOKINGS ? BOOKINGS.filter(function (b) { return (b.status || 'new') === 'new'; }).length || '' : '';
    if (COLS[id]) return (D[COLS[id].path] || []).length;
    return '';
  }
  function drawTabs() {
    $('#tabs').innerHTML = TABS.map(function (t) {
      var c = counts(t[0]);
      return '<button type="button" data-tab="' + t[0] + '"' + (t[0] === current ? ' aria-current="page"' : '') + '><span>' + t[1] + '</span>' + (c !== '' ? '<span class="count">' + c + '</span>' : '') + '</button>';
    }).join('');
  }
  function go(tab) {
    current = tab; location.hash = tab; drawTabs();
    $('#side').classList.remove('open');
    $('#pageTitle').textContent = (TABS.find(function (t) { return t[0] === tab; }) || TABS[0])[1];
    var v = $('#view');
    if (tab === 'overview') overview(v);
    else if (tab === 'bookings') bookings(v);
    else if (tab === 'settings') settings(v);
    else if (tab === 'publish') publishTab(v);
    else if (tab === 'premium') premiumTab(v);
    else if (COLS[tab]) collection(v, tab);
    window.scrollTo(0, 0);
  }

  /* ---------------- generic collections ---------------- */
  function catOpts() { return D.categories.map(function (c) { return [c.id, c.name.hi]; }); }
  function svcOpts() { return [['', '— कोई नहीं —']].concat(D.services.map(function (s) { return [s.id, s.name.hi]; })); }
  function catName(id) { var c = D.categories.find(function (x) { return x.id === id; }); return c ? c.name.hi : id; }
  function minPrice(s) { var p = (s.packages || []).map(function (x) { return Number(x.price) || 0; }).filter(Boolean); return p.length ? Math.min.apply(null, p) : Number(s.price) || 0; }

  var COLS = {
    services: {
      path: 'services', one: 'पूजा सेवा', filterCat: true,
      label: function (x) { return x.name.hi; },
      sub: function (x) { return catName(x.cat) + ' • ' + inr(minPrice(x)) + ' से' + (x.popular ? ' • लोकप्रिय' : ''); },
      hidden: function (x) { return x.active === false; },
      blank: function () { return { id: '', cat: D.categories[0] ? D.categories[0].id : '', active: true, popular: false, image: '', name: { hi: '', en: '' }, desc: { hi: '', en: '' }, duration: '', price: 0, packages: [{ id: 'basic', name: { hi: 'सामान्य', en: 'Basic' }, price: 0, features: { hi: '', en: '' } }], benefits: { hi: '', en: '' }, samagri: { hi: '', en: '' } }; },
      fields: [
        { k: 'name', t: 'bi', l: 'पूजा का नाम', req: true },
        { k: 'cat', t: 'select', l: 'श्रेणी', opts: catOpts },
        { k: 'duration', t: 'text', l: 'अवधि', ph: 'जैसे 2–3 घंटे' },
        { k: 'desc', t: 'bitext', l: 'संक्षिप्त विवरण', full: true },
        { k: 'image', t: 'url', l: 'फ़ोटो का लिंक (URL)', help: 'वैकल्पिक। फ़ोटो को GitHub के assets/img फ़ोल्डर में अपलोड करके “assets/img/naam.jpg” लिखें, या किसी इमेज का पूरा लिंक दें।', full: true },
        { k: 'popular', t: 'bool', l: 'लोकप्रिय टैग दिखाएँ' },
        { k: 'active', t: 'bool', l: 'वेबसाइट पर दिखाएँ' },
        { k: 'packages', t: 'packages', l: 'पैकेज व दक्षिणा', full: true },
        { k: 'benefits', t: 'bitext', l: 'लाभ (हर पंक्ति में एक)', full: true },
        { k: 'samagri', t: 'bitext', l: 'मुख्य सामग्री', full: true }
      ]
    },
    categories: {
      path: 'categories', one: 'श्रेणी',
      label: function (x) { return x.name.hi; }, sub: function (x) { return D.services.filter(function (s) { return s.cat === x.id; }).length + ' सेवाएँ'; },
      blank: function () { return { id: '', icon: 'star', name: { hi: '', en: '' } }; },
      fields: [{ k: 'name', t: 'bi', l: 'श्रेणी का नाम', req: true },
        { k: 'icon', t: 'select', l: 'चिह्न', opts: function () { return [['home', 'घर'], ['fire', 'अग्नि/हवन'], ['kalash', 'कलश'], ['book', 'ग्रंथ'], ['planet', 'ग्रह'], ['diya', 'दीपक'], ['star', 'तारा']]; } }],
      canDelete: function (x) { var n = D.services.filter(function (s) { return s.cat === x.id; }).length; return n ? 'इस श्रेणी में ' + n + ' सेवाएँ हैं। पहले उनकी श्रेणी बदलें।' : ''; }
    },
    purposes: {
      path: 'purposes', one: 'कामना',
      label: function (x) { return x.name.hi; }, sub: function (x) { return (x.services || []).length + ' पूजाएँ जुड़ी हैं'; },
      blank: function () { return { id: '', name: { hi: '', en: '' }, services: [] }; },
      fields: [{ k: 'name', t: 'bi', l: 'कामना / उद्देश्य', req: true }, { k: 'services', t: 'multi', l: 'इससे जुड़ी पूजाएँ', opts: function () { return svcOpts().slice(1); }, full: true }]
    },
    festivals: {
      path: 'festivals', one: 'पर्व', sortBy: 'date',
      label: function (x) { return x.name.hi; }, sub: function (x) { return x.date + (x.date < today() ? ' • बीत चुका (वेबसाइट पर नहीं दिखेगा)' : ''); },
      blank: function () { return { id: '', date: today(), name: { hi: '', en: '' }, note: { hi: '', en: '' }, service: '' }; },
      fields: [{ k: 'date', t: 'date', l: 'तिथि', req: true }, { k: 'service', t: 'select', l: 'बुकिंग हेतु पूजा', opts: svcOpts },
        { k: 'name', t: 'bi', l: 'पर्व का नाम', req: true, full: true }, { k: 'note', t: 'bi', l: 'छोटी टिप्पणी', full: true }]
    },
    gallery: {
      path: 'gallery', one: 'फ़ोटो',
      note: 'फ़ोटो जोड़ने का तरीका: GitHub पर अपनी repository में <b>assets/img/gallery</b> फ़ोल्डर खोलें → Add file → Upload files → फ़ोटो डालें → Commit। फिर यहाँ “फ़ोटो का पता” में <code>assets/img/gallery/फ़ाइल-का-नाम.jpg</code> लिखें। (या किसी इंटरनेट फ़ोटो का पूरा लिंक।) पहली फ़ोटो गैलरी में बड़ी दिखती है — क्रम ↑↓ से बदलें।',
      label: function (x) { return x.caption ? x.caption.hi : ''; }, sub: function (x) { return x.src; },
      blank: function () { return { id: '', src: 'assets/img/gallery/', caption: { hi: '', en: '' } }; },
      fields: [{ k: 'src', t: 'url', l: 'फ़ोटो का पता (URL)', req: true, full: true }, { k: 'caption', t: 'bi', l: 'फ़ोटो का विवरण', req: true, full: true }]
    },
    pandits: {
      path: 'pandits', one: 'पंडित जी',
      label: function (x) { return x.name.hi; }, sub: function (x) { return x.spec ? x.spec.hi : ''; },
      blank: function () { return { id: '', name: { hi: '', en: '' }, spec: { hi: '', en: '' }, exp: '', photo: '' }; },
      fields: [{ k: 'name', t: 'bi', l: 'नाम', req: true, full: true }, { k: 'spec', t: 'bi', l: 'विशेषज्ञता', full: true }, { k: 'exp', t: 'number', l: 'अनुभव (वर्ष)' }, { k: 'photo', t: 'url', l: 'फ़ोटो लिंक' }]
    },
    testimonials: {
      path: 'testimonials', one: 'राय', note: 'केवल असली यजमानों की राय उनकी अनुमति से ही जोड़ें। काल्पनिक समीक्षाएँ भरोसा घटाती हैं और ग्राहक-संरक्षण नियमों के विरुद्ध हैं।',
      label: function (x) { return x.name; }, sub: function (x) { return (x.city || '') + ' • ' + (x.rating || 5) + '★'; },
      blank: function () { return { id: '', name: '', city: '', rating: 5, text: { hi: '', en: '' } }; },
      fields: [{ k: 'name', t: 'text', l: 'यजमान का नाम', req: true }, { k: 'city', t: 'text', l: 'शहर / क्षेत्र' },
        { k: 'rating', t: 'select', l: 'रेटिंग', opts: function () { return [[5, '5 ★'], [4, '4 ★'], [3, '3 ★']]; } }, { k: 'text', t: 'bitext', l: 'राय', full: true, req: true }]
    },
    faqs: {
      path: 'faqs', one: 'प्रश्न',
      label: function (x) { return x.q.hi; }, sub: function (x) { return x.a.hi.slice(0, 80) + '…'; },
      blank: function () { return { q: { hi: '', en: '' }, a: { hi: '', en: '' } }; },
      fields: [{ k: 'q', t: 'bi', l: 'प्रश्न', req: true, full: true }, { k: 'a', t: 'bitext', l: 'उत्तर', full: true, req: true }]
    },
    promises: {
      path: 'promises', one: 'संकल्प बिंदु',
      label: function (x) { return x.hi; }, sub: function (x) { return x.en; },
      blank: function () { return { hi: '', en: '' }; },
      fields: [{ k: '.', t: 'bi', l: 'बिंदु', req: true, full: true }]
    }
  };

  function today() { var d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); }
  function getP(o, k) { if (k === '.') return o; return k.split('.').reduce(function (a, p) { return a == null ? a : a[p]; }, o); }
  function setP(o, k, v) { if (k === '.') { Object.keys(v).forEach(function (x) { o[x] = v[x]; }); return; } var ps = k.split('.'), last = ps.pop(); var t = ps.reduce(function (a, p) { if (a[p] == null) a[p] = {}; return a[p]; }, o); t[last] = v; }

  var filt = { q: '', cat: '' };
  function collection(v, key) {
    var C = COLS[key], arr = D[C.path] || (D[C.path] = []);
    var q = filt.q.toLowerCase();
    var idx = arr.map(function (x, i) { return i; }).filter(function (i) {
      var x = arr[i];
      if (C.filterCat && filt.cat && x.cat !== filt.cat) return false;
      if (!q) return true;
      return JSON.stringify(x).toLowerCase().indexOf(q) > -1;
    });
    if (C.sortBy) idx.sort(function (a, b) { return String(arr[a][C.sortBy]) < String(arr[b][C.sortBy]) ? -1 : 1; });
    v.innerHTML = (C.note ? '<div class="note">' + C.note + '</div>' : '') +
      '<div class="toolbar"><input class="grow" type="search" id="cq" placeholder="खोजें…" value="' + esc(filt.q) + '">' +
      (C.filterCat ? '<select id="ccat"><option value="">सभी श्रेणियाँ</option>' + D.categories.map(function (c) { return '<option value="' + esc(c.id) + '"' + (filt.cat === c.id ? ' selected' : '') + '>' + esc(c.name.hi) + '</option>'; }).join('') + '</select>' : '') +
      '<button class="btn btn-primary" id="addBtn" type="button">+ नया ' + C.one + ' जोड़ें</button></div>' +
      '<div class="table-wrap">' + (idx.length ? '<table><thead><tr><th>नाम</th><th>स्थिति</th><th>क्रम</th><th>कार्य</th></tr></thead><tbody>' +
        idx.map(function (i) {
          var x = arr[i], hid = C.hidden && C.hidden(x);
          return '<tr><td><b>' + esc(C.label(x)) + '</b><div class="sub">' + esc(C.sub(x)) + '</div></td>' +
            '<td>' + (hid ? '<span class="pill off">छिपा</span>' : '<span class="pill confirmed">दिख रहा</span>') + '</td>' +
            '<td class="actions">' + (C.sortBy ? '—' : '<button class="btn btn-ghost btn-sm" data-up="' + i + '" aria-label="ऊपर">↑</button><button class="btn btn-ghost btn-sm" data-down="' + i + '" aria-label="नीचे">↓</button>') + '</td>' +
            '<td class="actions"><button class="btn btn-ghost btn-sm" data-edit="' + i + '">बदलें</button>' +
            (C.hidden ? '<button class="btn btn-ghost btn-sm" data-toggle="' + i + '">' + (hid ? 'दिखाएँ' : 'छिपाएँ') + '</button>' : '') +
            '<button class="btn btn-danger btn-sm" data-del="' + i + '">हटाएँ</button></td></tr>';
        }).join('') + '</tbody></table>' : '<div class="empty">अभी कुछ नहीं है। “+ नया ' + C.one + ' जोड़ें” दबाएँ।</div>') + '</div>';

    $('#cq').oninput = function () { filt.q = this.value; collection(v, key); $('#cq').focus(); $('#cq').setSelectionRange(this.value.length, this.value.length); };
    if ($('#ccat')) $('#ccat').onchange = function () { filt.cat = this.value; collection(v, key); };
    $('#addBtn').onclick = function () { editItem(key, -1); };
    $$('[data-edit]', v).forEach(function (b) { b.onclick = function () { editItem(key, +b.dataset.edit); }; });
    $$('[data-toggle]', v).forEach(function (b) { b.onclick = function () { var x = arr[+b.dataset.toggle]; x.active = x.active === false; save(); collection(v, key); }; });
    $$('[data-up]', v).forEach(function (b) { b.onclick = function () { var i = +b.dataset.up; if (i > 0) { arr.splice(i - 1, 0, arr.splice(i, 1)[0]); save(); collection(v, key); } }; });
    $$('[data-down]', v).forEach(function (b) { b.onclick = function () { var i = +b.dataset.down; if (i < arr.length - 1) { arr.splice(i + 1, 0, arr.splice(i, 1)[0]); save(); collection(v, key); } }; });
    $$('[data-del]', v).forEach(function (b) {
      b.onclick = function () {
        var i = +b.dataset.del, x = arr[i];
        var block = C.canDelete && C.canDelete(x); if (block) { alert(block); return; }
        if (!confirm('क्या आप “' + C.label(x) + '” को हटाना चाहते हैं?\n\nप्रकाशित करने के बाद यह वेबसाइट से हट जाएगा। (बैकअप टैब से पुराना डेटा वापस ला सकते हैं।)')) return;
        arr.splice(i, 1);
        if (key === 'services') { (D.purposes || []).forEach(function (p) { p.services = (p.services || []).filter(function (id) { return id !== x.id; }); }); (D.festivals || []).forEach(function (f) { if (f.service === x.id) f.service = ''; }); }
        save(); drawTabs(); collection(v, key); toast('हटा दिया गया (प्रकाशन बाकी)');
      };
    });
  }

  /* --- form builder --- */
  function fieldHTML(f, item) {
    var val = getP(item, f.k), name = esc(f.k), cls = 'f' + (f.full ? ' full' : ''), req = f.req ? ' <span style="color:#9E1B1B">*</span>' : '';
    var help = f.help ? '<small>' + f.help + '</small>' : '';
    if (f.t === 'bi' || f.t === 'bitext') {
      val = val || { hi: '', en: '' };
      var mk = function (lg) { return f.t === 'bi' ? '<input data-k="' + name + '" data-lang="' + lg + '" value="' + esc(val[lg]) + '">' : '<textarea rows="3" data-k="' + name + '" data-lang="' + lg + '">' + esc(val[lg]) + '</textarea>'; };
      return '<div class="' + cls + '"><label class="f">' + '<span>' + f.l + req + '</span>' + '</label><div class="bi"><label class="f"><span>हिंदी</span>' + mk('hi') + '</label><label class="f"><span>English</span>' + mk('en') + '</label></div>' + help + '</div>';
    }
    if (f.t === 'select') return '<label class="' + cls + '">' + '<span>' + f.l + req + '</span>' + '<select data-k="' + name + '">' + f.opts().map(function (o) { return '<option value="' + esc(o[0]) + '"' + (String(o[0]) === String(val) ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select>' + help + '</label>';
    if (f.t === 'bool') return '<label class="' + cls + ' boolf"><input type="checkbox" data-k="' + name + '"' + (val !== false && val ? ' checked' : '') + '>' + f.l + '</label>';
    if (f.t === 'multi') { val = val || []; return '<div class="' + cls + '"><label class="f">' + f.l + '</label><div class="multi">' + f.opts().map(function (o) { return '<label><input type="checkbox" data-multi="' + name + '" value="' + esc(o[0]) + '"' + (val.indexOf(o[0]) > -1 ? ' checked' : '') + '>' + esc(o[1]) + '</label>'; }).join('') + '</div></div>'; }
    if (f.t === 'packages') return '<div class="' + cls + '"><p class="section-title">' + f.l + '</p><div id="pkList"></div><button type="button" class="btn btn-ghost btn-sm" id="pkAdd">+ पैकेज जोड़ें</button></div>';
    var type = f.t === 'number' ? 'number' : f.t === 'date' ? 'date' : f.t === 'url' ? 'text' : 'text';
    return '<label class="' + cls + '">' + '<span>' + f.l + req + '</span>' + '<input type="' + type + '" data-k="' + name + '" value="' + esc(val) + '"' + (f.ph ? ' placeholder="' + esc(f.ph) + '"' : '') + '>' + help + '</label>';
  }

  function pkHTML(p, i) {
    p.name = p.name || { hi: '', en: '' }; p.features = p.features || { hi: '', en: '' };
    return '<fieldset class="pk" data-pk="' + i + '"><legend>पैकेज ' + (i + 1) + '</legend><div class="grid2">' +
      '<label class="f">नाम (हिंदी)<input data-pf="name.hi" value="' + esc(p.name.hi) + '"></label><label class="f">Name (English)<input data-pf="name.en" value="' + esc(p.name.en) + '"></label>' +
      '<label class="f">दक्षिणा (₹)<input type="number" min="0" data-pf="price" value="' + esc(p.price) + '"></label>' +
      '<label class="f boolf" style="align-self:end"><input type="checkbox" data-pf="popular"' + (p.popular ? ' checked' : '') + '>लोकप्रिय / सुझाया गया</label>' +
      '<label class="f">क्या शामिल है (हिंदी)<input data-pf="features.hi" value="' + esc(p.features.hi) + '"></label><label class="f">Included (English)<input data-pf="features.en" value="' + esc(p.features.en) + '"></label>' +
      '</div><button type="button" class="btn btn-danger btn-sm" style="margin-top:8px" data-pkdel="' + i + '">यह पैकेज हटाएँ</button></fieldset>';
  }

  function readPk() {
    return $$('#pkList fieldset').map(function (fs, i) {
      var p = { id: 'p' + (i + 1), name: {}, features: {} };
      $$('[data-pf]', fs).forEach(function (el) { var k = el.dataset.pf; setP(p, k, el.type === 'checkbox' ? el.checked : el.type === 'number' ? Number(el.value) || 0 : el.value.trim()); });
      if (!p.popular) delete p.popular;
      return p;
    });
  }

  function openDlg(title, html, onSave, afterRender) {
    $('#dlgTitle').textContent = title;
    $('#dlgBody').innerHTML = html;
    var dlg = $('#dlg');
    if (afterRender) afterRender();
    $('#dlgForm').onsubmit = function (e) { e.preventDefault(); if (onSave() !== false) dlg.close(); };
    $('#dlgCancel').onclick = $('#dlgX').onclick = function () { dlg.close(); };
    $('#dlgSave').hidden = !onSave || onSave === true;
    if (onSave === true) $('#dlgForm').onsubmit = function (e) { e.preventDefault(); dlg.close(); };
    dlg.showModal();
  }

  function editItem(key, i) {
    var C = COLS[key], arr = D[C.path], item = i < 0 ? C.blank() : clone(arr[i]);
    var html = '<div class="grid2">' + C.fields.map(function (f) { return fieldHTML(f, item); }).join('') + '</div><p class="err" id="formErr"></p>';
    var pks = clone(item.packages || []);
    openDlg((i < 0 ? 'नया ' : '') + C.one + (i < 0 ? '' : ' बदलें'), html, function () {
      // read fields
      C.fields.forEach(function (f) {
        if (f.t === 'bi' || f.t === 'bitext') { var o = {}; $$('[data-k="' + f.k + '"]', $('#dlgBody')).forEach(function (el) { o[el.dataset.lang] = el.value.trim(); }); setP(item, f.k, o); }
        else if (f.t === 'bool') setP(item, f.k, $('[data-k="' + f.k + '"]', $('#dlgBody')).checked);
        else if (f.t === 'multi') setP(item, f.k, $$('[data-multi="' + f.k + '"]:checked', $('#dlgBody')).map(function (el) { return el.value; }));
        else if (f.t === 'packages') item.packages = readPk();
        else { var el = $('[data-k="' + f.k + '"]', $('#dlgBody')); var vv = el.value.trim(); if (f.t === 'number' || f.k === 'rating') vv = Number(vv) || 0; setP(item, f.k, vv); }
      });
      // validate
      var missing = C.fields.filter(function (f) { if (!f.req) return false; var vv = getP(item, f.k); return f.t === 'bi' || f.t === 'bitext' ? !(vv && vv.hi) : !vv; });
      if (missing.length) { $('#formErr').textContent = 'कृपया भरें: ' + missing.map(function (f) { return f.l; }).join(', ') + ' (हिंदी आवश्यक, English वैकल्पिक)'; return false; }
      if (key === 'services') {
        if (!item.packages.length) { $('#formErr').textContent = 'कम से कम एक पैकेज जोड़ें।'; return false; }
        item.price = minPrice(item);
      }
      // id
      if ('id' in item && !item.id) {
        var base = slug(item.name && item.name.en) || slug(C.one) || 'item';
        if (!/[a-z]/.test(base)) base = key.slice(0, -1);
        var id = base, n = 2; while (arr.some(function (x) { return x.id === id; })) id = base + '-' + n++;
        item.id = id;
      }
      if (i < 0) arr.push(item); else arr[i] = item;
      save(); drawTabs(); go(key); toast('सहेजा गया — वेबसाइट पर लाने के लिए “प्रकाशित करें” दबाएँ');
    }, function () {
      if (!$('#pkList')) return;
      var draw = function () {
        $('#pkList').innerHTML = pks.map(pkHTML).join('');
        $$('[data-pkdel]').forEach(function (b) { b.onclick = function () { pks = readPk(); if (!confirm('यह पैकेज हटाएँ?')) return; pks.splice(+b.dataset.pkdel, 1); draw(); }; });
      };
      draw();
      $('#pkAdd').onclick = function () { pks = readPk(); pks.push({ name: { hi: '', en: '' }, price: 0, features: { hi: '', en: '' } }); draw(); };
    });
  }

  /* ---------------- overview ---------------- */
  function overview(v) {
    var g = gh(), act = D.services.filter(function (s) { return s.active !== false; }).length;
    var up = (D.festivals || []).filter(function (f) { return f.date >= today(); }).sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var checks = [
      [!!D.settings.adminHash, 'डैशबोर्ड पासवर्ड बना है'],
      [!!(g.owner && g.repo && g.token), 'GitHub से जुड़ा है (एक क्लिक में प्रकाशन)', 'publish'],
      [!!D.settings.bookingEndpoint, 'बुकिंग Google Sheet से जुड़ी है', 'publish'],
      [!!sheetKey(), 'इस डिवाइस पर बुकिंग देखने की कुंजी डाली गई है', 'publish'],
      [!!D.settings.upiId, 'UPI आईडी डाली गई है (अग्रिम भुगतान हेतु)', 'settings'],
      [!!D.settings.email, 'ईमेल पता डाला गया है', 'settings'],
      [(D.pandits || []).length > 0, 'पंडित जी की प्रोफ़ाइल जोड़ी गई', 'pandits'],
      [(D.testimonials || []).length > 0, 'असली यजमानों की राय जोड़ी गई', 'testimonials']
    ];
    var bk = BOOKINGS || [];
    var cards = [
      [act, 'सक्रिय पूजा सेवाएँ'], [up.length, 'आगामी पर्व'],
      [BOOKINGS ? bk.length : '—', 'कुल बुकिंग'], [BOOKINGS ? bk.filter(function (b) { return (b.status || 'new') === 'new'; }).length : '—', 'नई बुकिंग (कॉल करें)']
    ];
    v.innerHTML = (isDirty() ? '<div class="note">आपके कुछ बदलाव अभी वेबसाइट पर नहीं गए हैं। <b>“वेबसाइट पर प्रकाशित करें”</b> दबाएँ।</div>' : '') +
      '<div class="cards">' + cards.map(function (c) { return '<div class="card"><div class="n">' + c[0] + '</div><div class="l">' + c[1] + '</div></div>'; }).join('') + '</div>' +
      '<div class="panel"><h2>सेटअप सूची</h2><ul class="check">' + checks.map(function (c) { return '<li><span class="s' + (c[0] ? ' ok' : '') + '">' + (c[0] ? '✓' : '') + '</span><span>' + c[1] + (c[0] || !c[2] ? '' : ' — <a href="#' + c[2] + '" data-go="' + c[2] + '">अभी करें</a>') + '</span></li>'; }).join('') + '</ul></div>' +
      '<div class="panel"><h2>अगले पर्व</h2>' + (up.length ? '<ul class="check">' + up.slice(0, 5).map(function (f) { return '<li><b>' + esc(f.date) + '</b> ' + esc(f.name.hi) + '</li>'; }).join('') + '</ul>' : '<p>कोई आगामी पर्व नहीं। “आगामी पर्व” टैब से जोड़ें।</p>') + '</div>';
    $$('[data-go]', v).forEach(function (a) { a.onclick = function (e) { e.preventDefault(); go(a.dataset.go); }; });
    if (!BOOKINGS && D.settings.bookingEndpoint && sheetKey()) fetchBookings().then(function () { if (current === 'overview') overview(v); });
  }

  /* ---------------- bookings ---------------- */
  var bf = { q: '', st: '' };
  function fetchBookings() {
    var ep = D.settings.bookingEndpoint, key = sheetKey();
    return fetch(ep + '?action=list&key=' + encodeURIComponent(key))
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j.ok) throw new Error(j.error || 'error'); BOOKINGS = j.rows || []; drawTabs(); return BOOKINGS; });
  }
  var ST = { new: 'नई', confirmed: 'पक्की', done: 'सम्पन्न', cancelled: 'रद्द' };

  function bookings(v) {
    var ep = D.settings.bookingEndpoint, key = sheetKey();
    if (!ep || !key) {
      v.innerHTML = '<div class="note">बुकिंग देखने के लिए Google Sheet जोड़ें (मुफ़्त)।<br>1) README में दिए चरणों से Apps Script लगाएँ।<br>2) <a href="#publish" data-go="publish">प्रकाशन व बैकअप</a> टैब में “बुकिंग वेब-ऐप लिंक” और “गुप्त कुंजी” डालें।</div>' +
        '<div class="panel"><h2>तब तक</h2><p>हर बुकिंग का पूरा विवरण यजमान व्हाट्सऐप पर ' + esc(D.settings.phone) + ' नंबर पर भेज सकते हैं — बुकिंग फ़ॉर्म के बाद उन्हें यही बटन मिलता है।</p></div>';
      $$('[data-go]', v).forEach(function (a) { a.onclick = function (e) { e.preventDefault(); go(a.dataset.go); }; });
      return;
    }
    if (!BOOKINGS) {
      v.innerHTML = '<div class="empty">बुकिंग लोड हो रही हैं…</div>';
      fetchBookings().then(function () { bookings(v); }).catch(function (e) {
        v.innerHTML = '<div class="note red">बुकिंग लोड नहीं हुईं: ' + esc(e.message) + '. जाँचें कि वेब-ऐप लिंक व गुप्त कुंजी सही हैं और Apps Script “Anyone” के लिए डिप्लॉय है।</div><button class="btn btn-primary" id="retry">फिर से कोशिश करें</button>';
        $('#retry').onclick = function () { bookings(v); };
      });
      return;
    }
    var q = bf.q.toLowerCase();
    var rows = BOOKINGS.slice().reverse().filter(function (b) {
      if (bf.st && (b.status || 'new') !== bf.st) return false;
      return !q || JSON.stringify(b).toLowerCase().indexOf(q) > -1;
    });
    v.innerHTML = '<div class="toolbar"><input class="grow" type="search" id="bq" placeholder="नाम, फ़ोन, बुकिंग संख्या से खोजें…" value="' + esc(bf.q) + '">' +
      '<select id="bst"><option value="">सभी स्थितियाँ</option>' + Object.keys(ST).map(function (k) { return '<option value="' + k + '"' + (bf.st === k ? ' selected' : '') + '>' + ST[k] + '</option>'; }).join('') + '</select>' +
      '<button class="btn btn-ghost" id="bref" type="button">ताज़ा करें</button><button class="btn btn-ghost" id="bcsv" type="button">CSV डाउनलोड</button></div>' +
      '<div class="table-wrap">' + (rows.length ? '<table><thead><tr><th>बुकिंग</th><th>यजमान</th><th>पूजा</th><th>तिथि</th><th>स्थिति</th><th>कार्य</th></tr></thead><tbody>' +
        rows.map(function (b) {
          var st = b.status || 'new';
          return '<tr><td><b>' + esc(b.id) + '</b><div class="sub">' + esc(String(b.createdAt || '').slice(0, 16).replace('T', ' ')) + '</div></td>' +
            '<td><b>' + esc(b.name) + '</b><div class="sub">' + esc(b.phone) + (b.city ? ' • ' + esc(b.city) : '') + '</div></td>' +
            '<td>' + esc(b.serviceName) + '<div class="sub">' + esc(b.packageName) + ' • ' + inr(b.price) + ' • ' + esc(b.mode) + '</div></td>' +
            '<td>' + esc(b.date) + '<div class="sub">' + esc(b.time) + '</div></td>' +
            '<td><select data-st="' + esc(b.id) + '" aria-label="स्थिति">' + Object.keys(ST).map(function (k) { return '<option value="' + k + '"' + (st === k ? ' selected' : '') + '>' + ST[k] + '</option>'; }).join('') + '</select></td>' +
            '<td class="actions"><a class="btn btn-ghost btn-sm" href="tel:+91' + esc(digits(b.phone).slice(-10)) + '">कॉल</a>' +
            '<a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="https://wa.me/91' + esc(digits(b.phone).slice(-10)) + '?text=' + encodeURIComponent(confirmMsg(b)) + '">व्हाट्सऐप</a>' +
            '<button class="btn btn-ghost btn-sm" data-view="' + esc(b.id) + '">पूरा विवरण</button></td></tr>';
        }).join('') + '</tbody></table>' : '<div class="empty">इस फ़िल्टर में कोई बुकिंग नहीं।</div>') + '</div>';
    $('#bq').oninput = function () { bf.q = this.value; bookings(v); $('#bq').focus(); $('#bq').setSelectionRange(this.value.length, this.value.length); };
    $('#bst').onchange = function () { bf.st = this.value; bookings(v); };
    $('#bref').onclick = function () { BOOKINGS = null; bookings(v); };
    $('#bcsv').onclick = function () { csv(rows); };
    $$('[data-st]', v).forEach(function (s) {
      s.onchange = function () {
        var id = s.dataset.st, st = s.value;
        fetch(ep + '?action=update&key=' + encodeURIComponent(key) + '&id=' + encodeURIComponent(id) + '&status=' + st)
          .then(function (r) { return r.json(); })
          .then(function (j) { if (!j.ok) throw new Error(j.error); BOOKINGS.forEach(function (b) { if (b.id === id) b.status = st; }); drawTabs(); toast('स्थिति बदली: ' + ST[st]); })
          .catch(function (e) { toast('स्थिति नहीं बदली: ' + e.message); });
      };
    });
    $$('[data-view]', v).forEach(function (btn) {
      btn.onclick = function () {
        var b = BOOKINGS.find(function (x) { return x.id === btn.dataset.view; });
        var labels = { id: 'बुकिंग संख्या', createdAt: 'प्राप्त', serviceName: 'पूजा', packageName: 'पैकेज', price: 'दक्षिणा', mode: 'स्थान', date: 'तिथि', time: 'समय', name: 'नाम', phone: 'फ़ोन', email: 'ईमेल', gotra: 'गोत्र', address: 'पता', city: 'शहर', pincode: 'पिन', lang: 'भाषा', dob: 'जन्म तिथि', tob: 'जन्म समय', pob: 'जन्म स्थान', partner: 'दूसरा व्यक्ति', question: 'प्रश्न', notes: 'निवेदन', status: 'स्थिति' };
        openDlg('बुकिंग ' + b.id, '<table>' + Object.keys(labels).filter(function (k) { return b[k]; }).map(function (k) { return '<tr><th>' + labels[k] + '</th><td>' + esc(k === 'status' ? ST[b[k]] || b[k] : b[k]) + '</td></tr>'; }).join('') + '</table>', true);
      };
    });
  }
  function confirmMsg(b) {
    return 'नमस्ते ' + b.name + ' जी 🙏\n' + (D.settings.siteName.hi) + ' से — आपकी बुकिंग ' + b.id + ' (' + b.serviceName + ', ' + b.packageName + ') प्राप्त हुई है।\nतिथि: ' + b.date + '\nपंडित जी का मुहूर्त व समय: ____\nकृपया पुष्टि करें।';
  }
  function csv(rows) {
    var cols = ['id', 'createdAt', 'status', 'serviceName', 'packageName', 'price', 'mode', 'date', 'time', 'name', 'phone', 'email', 'gotra', 'address', 'city', 'pincode', 'lang', 'dob', 'tob', 'pob', 'partner', 'question', 'notes'];
    var out = [cols.join(',')].concat(rows.map(function (r) { return cols.map(function (c) { return '"' + String(r[c] == null ? '' : r[c]).replace(/"/g, '""') + '"'; }).join(','); })).join('\n');
    download('bookings-' + today() + '.csv', '﻿' + out, 'text/csv');
  }
  function download(name, text, type) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: type || 'application/json' })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ---------------- settings ---------------- */
  var SETTINGS = [
    ['पहचान', [{ k: 'settings.siteName', t: 'bi', l: 'संस्थान का नाम' }, { k: 'settings.tagline', t: 'bi', l: 'टैगलाइन' }, { k: 'hero.title', t: 'bi', l: 'मुख्य शीर्षक (होमपेज)', full: true }, { k: 'hero.subtitle', t: 'bitext', l: 'उप-शीर्षक', full: true }, { k: 'settings.ticker', t: 'bitext', l: 'ऊपर चलने वाली सूचना पट्टी', full: true }]],
    ['संपर्क', [{ k: 'settings.phone', t: 'text', l: 'फ़ोन नंबर' }, { k: 'settings.whatsapp', t: 'text', l: 'व्हाट्सऐप नंबर (91 सहित)', help: 'जैसे 919625004090' }, { k: 'settings.email', t: 'text', l: 'संपर्क ईमेल (वेबसाइट पर दिखेगा)' }, { k: 'settings.bookingEmail', t: 'text', l: 'बुकिंग किस ईमेल पर आए', help: 'हर नई बुकिंग इस ईमेल पर आएगी (FormSubmit द्वारा, मुफ़्त)। पहली बुकिंग पर FormSubmit एक “Activate” ईमेल भेजेगा — उसे एक बार क्लिक करें।' }, { k: 'settings.mapQuery', t: 'text', l: 'नक्शे के लिए पता/स्थान' },
      { k: 'settings.address', t: 'bitext', l: 'पूरा पता', full: true }, { k: 'settings.hours', t: 'bi', l: 'समय', full: true }, { k: 'settings.serviceArea', t: 'bi', l: 'सेवा क्षेत्र', full: true }]],
    ['सोशल मीडिया', [{ k: 'settings.social.facebook', t: 'url', l: 'Facebook लिंक' }, { k: 'settings.social.instagram', t: 'url', l: 'Instagram लिंक' }, { k: 'settings.social.youtube', t: 'url', l: 'YouTube लिंक' }]],
    ['भुगतान', [{ k: 'settings.upiId', t: 'text', l: 'UPI आईडी', help: 'जैसे name@okhdfcbank — भरने पर बुकिंग के बाद “UPI से अग्रिम दें” बटन दिखेगा' }, { k: 'settings.advancePercent', t: 'number', l: 'अग्रिम राशि (%)' }]],
    ['नीतियाँ', [{ k: 'pages.terms', t: 'bitext', l: 'नियम व शर्तें', full: true }, { k: 'pages.refund', t: 'bitext', l: 'रद्दीकरण व धनवापसी', full: true }, { k: 'pages.privacy', t: 'bitext', l: 'गोपनीयता नीति', full: true }]]
  ];
  function settings(v) {
    v.innerHTML = '<form id="setForm">' + SETTINGS.map(function (g) { return '<div class="panel"><h2>' + g[0] + '</h2><div class="grid2">' + g[1].map(function (f) { return fieldHTML(f, D); }).join('') + '</div></div>'; }).join('') +
      '<button class="btn btn-primary" type="submit">बदलाव सहेजें</button></form>';
    $('#setForm').onsubmit = function (e) {
      e.preventDefault();
      SETTINGS.forEach(function (g) {
        g[1].forEach(function (f) {
          if (f.t === 'bi' || f.t === 'bitext') { var o = {}; $$('[data-k="' + f.k + '"]', v).forEach(function (el) { o[el.dataset.lang] = el.value.trim(); }); setP(D, f.k, o); }
          else { var el = $('[data-k="' + f.k + '"]', v); setP(D, f.k, f.t === 'number' ? Number(el.value) || 0 : el.value.trim()); }
        });
      });
      save(); toast('सहेजा गया — वेबसाइट पर लाने के लिए “प्रकाशित करें” दबाएँ');
    };
  }

  /* ---------------- premium ---------------- */
  function premiumTab(v) {
    var P = D.premium || (D.premium = { title: { hi: '', en: '' }, subtitle: { hi: '', en: '' }, features: [], services: [] });
    var feat = { hi: (P.features || []).map(function (f) { return f.hi; }).join('\n'), en: (P.features || []).map(function (f) { return f.en; }).join('\n') };
    var tmp = { title: P.title, subtitle: P.subtitle, feat: feat, services: P.services || [] };
    var F = [{ k: 'title', t: 'bi', l: 'शीर्षक', full: true }, { k: 'subtitle', t: 'bitext', l: 'विवरण', full: true },
      { k: 'feat', t: 'bitext', l: 'प्रीमियम में क्या शामिल है (हर पंक्ति में एक)', full: true },
      { k: 'services', t: 'multi', l: 'इस सेक्शन में दिखने वाले अनुष्ठान (कोई न चुनें तो सेक्शन छिप जाएगा)', opts: function () { return svcOpts().slice(1); }, full: true }];
    v.innerHTML = '<div class="note">होमपेज पर मरून-सुनहरे रंग का “प्रीमियम” सेक्शन, चलती हवन-अग्नि के साथ। यहाँ से उसका शीर्षक, सुविधाएँ और अनुष्ठान चुनें।</div>' +
      '<form id="premForm" class="panel"><div class="grid2">' + F.map(function (f) { return fieldHTML(f, tmp); }).join('') + '</div><button class="btn btn-primary" type="submit" style="margin-top:12px">बदलाव सहेजें</button></form>';
    $('#premForm').onsubmit = function (e) {
      e.preventDefault();
      var get = function (k) { var o = {}; $$('[data-k="' + k + '"]', v).forEach(function (el) { o[el.dataset.lang] = el.value.trim(); }); return o; };
      P.title = get('title'); P.subtitle = get('subtitle');
      var fe = get('feat'), hi = fe.hi.split('\n').filter(Boolean), en = fe.en.split('\n');
      P.features = hi.map(function (h, i) { return { hi: h.trim(), en: (en[i] || '').trim() }; });
      P.services = $$('[data-multi="services"]:checked', v).map(function (el) { return el.value; });
      save(); toast('सहेजा गया — वेबसाइट पर लाने के लिए “प्रकाशित करें” दबाएँ');
    };
  }

  /* ---------------- publish / backup ---------------- */
  function b64(str) { return btoa(unescape(encodeURIComponent(str))); }
  function ghFetch(path, opts) {
    var g = gh(); opts = opts || {};
    opts.headers = { 'Authorization': 'Bearer ' + g.token, 'Accept': 'application/vnd.github+json' };
    return fetch('https://api.github.com/repos/' + encodeURIComponent(g.owner) + '/' + encodeURIComponent(g.repo) + path, opts);
  }
  function publish() {
    var g = gh();
    if (!g.owner || !g.repo || !g.token) { toast('पहले GitHub जानकारी भरें'); go('publish'); return; }
    var btn = $('#publishBtn'); btn.disabled = true; btn.textContent = 'प्रकाशित हो रहा है…';
    var path = '/contents/data/site-data.json', branch = g.branch || 'main', body = JSON.stringify(D, null, 2);
    ghFetch(path + '?ref=' + encodeURIComponent(branch))
      .then(function (r) { return r.status === 404 ? {} : r.ok ? r.json() : r.json().then(function (j) { throw new Error(j.message || r.status); }); })
      .then(function (cur) {
        return ghFetch(path, { method: 'PUT', body: JSON.stringify({ message: 'डैशबोर्ड से अपडेट ' + new Date().toLocaleString('hi-IN'), content: b64(body), branch: branch, sha: cur.sha }) });
      })
      .then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.message || r.status); return j; }); })
      .then(function () { LIVE_STR = JSON.stringify(D); save(); toast('प्रकाशित हो गया ✓ — 1–2 मिनट में वेबसाइट पर दिखेगा', 5000); if (current === 'overview') go('overview'); })
      .catch(function (e) { alert('प्रकाशन नहीं हुआ: ' + e.message + '\n\nजाँचें: GitHub यूज़रनेम, repository नाम, branch और token (Contents: Read and write अनुमति) सही हैं।'); })
      .then(function () { btn.disabled = false; btn.textContent = 'वेबसाइट पर प्रकाशित करें'; });
  }

  function publishTab(v) {
    var g = gh();
    v.innerHTML =
      '<div class="panel"><h2>GitHub से जोड़ें (एक क्लिक प्रकाशन)</h2>' +
      '<p>यह जानकारी केवल इसी कंप्यूटर/फ़ोन के ब्राउज़र में रहती है, वेबसाइट पर नहीं जाती।</p>' +
      '<form id="ghForm" class="grid2">' +
        '<label class="f">GitHub यूज़रनेम<input name="owner" value="' + esc(g.owner) + '" placeholder="जैसे vaidikshodhsansthan"></label>' +
        '<label class="f">Repository का नाम<input name="repo" value="' + esc(g.repo) + '" placeholder="जैसे vaidikshodhsansthan.github.io"></label>' +
        '<label class="f">Branch<input name="branch" value="' + esc(g.branch || 'main') + '"></label>' +
        '<label class="f">Access token<input name="token" type="password" value="' + esc(g.token) + '" autocomplete="off"><small>Fine-grained token — केवल इस repository पर “Contents: Read and write”।</small></label>' +
        '<div class="full" style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-primary" type="submit">सहेजें</button><button class="btn btn-ghost" type="button" id="ghTest">कनेक्शन जाँचें</button></div>' +
      '</form></div>' +

      '<div class="panel"><h2>बुकिंग Google Sheet</h2>' +
      '<form id="bkForm" class="grid2">' +
        '<label class="f full">बुकिंग वेब-ऐप लिंक (Apps Script URL)<input name="ep" value="' + esc(D.settings.bookingEndpoint) + '" placeholder="https://script.google.com/macros/s/…/exec"><small>यह लिंक वेबसाइट में जाता है ताकि बुकिंग Sheet में सहेजी जाएँ — इसे सहेजकर प्रकाशित करें।</small></label>' +
        '<label class="f full">गुप्त कुंजी (ADMIN_KEY)<input name="key" type="password" value="' + esc(sheetKey()) + '" autocomplete="off"><small>Apps Script में जो ADMIN_KEY लिखी है वही। यह केवल इस डिवाइस पर रहती है।</small></label>' +
        '<div class="full"><button class="btn btn-primary" type="submit">सहेजें</button></div>' +
      '</form></div>' +

      '<div class="panel"><h2>पासवर्ड बदलें</h2><form id="pwForm" class="grid2">' +
        '<label class="f">नया पासवर्ड<input type="password" name="p1" autocomplete="new-password"></label><label class="f">दोबारा लिखें<input type="password" name="p2" autocomplete="new-password"></label>' +
        '<div class="full"><button class="btn btn-primary" type="submit">पासवर्ड बदलें</button></div></form></div>' +

      '<div class="panel"><h2>बैकअप</h2><p>किसी भी बड़े बदलाव से पहले बैकअप डाउनलोड कर लें।</p><div style="display:flex;gap:10px;flex-wrap:wrap">' +
        '<button class="btn btn-ghost" id="bkDown" type="button">बैकअप डाउनलोड (JSON)</button>' +
        '<label class="btn btn-ghost" style="cursor:pointer">बैकअप से वापस लाएँ<input type="file" id="bkUp" accept=".json,application/json" hidden></label>' +
        '<button class="btn btn-danger" id="discard" type="button">बिना-प्रकाशित बदलाव रद्द करें</button></div></div>';

    $('#ghForm').onsubmit = function (e) { e.preventDefault(); var f = new FormData(this); lsSet('vss_gh', { owner: f.get('owner').trim(), repo: f.get('repo').trim(), branch: f.get('branch').trim() || 'main', token: f.get('token').trim() }); toast('GitHub जानकारी सहेजी गई'); };
    $('#ghTest').onclick = function () {
      $('#ghForm').requestSubmit();
      ghFetch('').then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.message); return j; }); })
        .then(function (j) { toast('जुड़ गया ✓ ' + j.full_name + (j.permissions && j.permissions.push ? ' (लिखने की अनुमति है)' : '')); })
        .catch(function (e) { alert('कनेक्शन नहीं हुआ: ' + e.message); });
    };
    $('#bkForm').onsubmit = function (e) {
      e.preventDefault(); var f = new FormData(this);
      D.settings.bookingEndpoint = f.get('ep').trim(); save();
      localStorage.setItem('vss_sheet_key', f.get('key').trim()); BOOKINGS = null;
      toast('सहेजा गया — वेब-ऐप लिंक वेबसाइट पर लाने के लिए “प्रकाशित करें” दबाएँ', 4500);
    };
    $('#pwForm').onsubmit = function (e) {
      e.preventDefault(); var f = new FormData(this), p1 = f.get('p1');
      if (p1.length < 8) return alert('पासवर्ड कम से कम 8 अक्षर का रखें।');
      if (p1 !== f.get('p2')) return alert('दोनों पासवर्ड एक जैसे नहीं हैं।');
      D.settings.adminHash = pwHash(p1); save(); sessionStorage.setItem('vss_auth', D.settings.adminHash); this.reset();
      toast('पासवर्ड बदला — लागू करने के लिए “प्रकाशित करें” दबाएँ', 4500);
    };
    $('#bkDown').onclick = function () { download('vaidikshodhsansthan-backup-' + today() + '.json', JSON.stringify(D, null, 2)); };
    $('#bkUp').onchange = function () {
      var file = this.files[0]; if (!file) return;
      file.text().then(function (txt) {
        var j = JSON.parse(txt);
        if (!j.services || !j.settings) throw new Error('यह वैध बैकअप फ़ाइल नहीं है');
        if (!confirm('बैकअप से डेटा लाने पर वर्तमान ड्राफ़्ट बदल जाएगा। आगे बढ़ें?')) return;
        if (!j.settings.adminHash) j.settings.adminHash = D.settings.adminHash;
        D = j; save(); drawTabs(); toast('बैकअप लाया गया — जाँचकर प्रकाशित करें');
      }).catch(function (e) { alert('फ़ाइल नहीं पढ़ी जा सकी: ' + e.message); });
    };
    $('#discard').onclick = function () {
      if (!isDirty()) return toast('कोई बिना-प्रकाशित बदलाव नहीं है');
      if (!confirm('सभी बिना-प्रकाशित बदलाव रद्द करके वेबसाइट वाला डेटा वापस लाएँ?')) return;
      D = JSON.parse(LIVE_STR); save(); drawTabs(); toast('बदलाव रद्द किए गए');
    };
  }

  /* ---------------- boot ---------------- */
  function startApp() {
    $('#login').hidden = true; $('#app').hidden = false;
    $('#dirty').hidden = !isDirty();
    var h = location.hash.slice(1);
    go(TABS.some(function (t) { return t[0] === h; }) ? h : 'overview');
  }
  $('#tabs').addEventListener('click', function (e) { var b = e.target.closest('[data-tab]'); if (b) { filt = { q: '', cat: '' }; go(b.dataset.tab); } });
  $('#menu').onclick = function () { $('#side').classList.toggle('open'); };
  $('#publishBtn').onclick = publish;
  $('#logout').onclick = function () { sessionStorage.removeItem('vss_auth'); location.reload(); };
  window.addEventListener('beforeunload', function (e) { if (D && isDirty() && sessionStorage.getItem('vss_auth')) { e.preventDefault(); e.returnValue = ''; } });

  loadAll().then(function () {
    if (D.settings.adminHash && sessionStorage.getItem('vss_auth') === D.settings.adminHash) startApp();
    else showLogin();
  });
})();
