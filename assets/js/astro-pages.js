/* वैदिक शोध संस्थान — पंचांग, कुंडली, राशिफल पेज
   app.js इन्हें window.VSSAstro से बुलाता है */
(function () {
  'use strict';
  var X; // context from app.js: { D, lang, t, u, esc, $, $$, openBooking, toast, ICONS }
  var VJ = window.VJ;

  var T = {
    hi: {
      p_title: 'आज का पंचांग', p_full: 'पूरा पंचांग देखें', panchang: 'पंचांग', kundli: 'कुंडली', rashifal: 'राशिफल',
      date: 'तिथि चुनें', city: 'स्थान', today: 'आज', prev: 'पिछला', next: 'अगला',
      tithi: 'तिथि', nak: 'नक्षत्र', yoga: 'योग', karana: 'करण', vaar: 'वार', paksha: 'पक्ष',
      sunrise: 'सूर्योदय', sunset: 'सूर्यास्त', moonrise: 'चंद्रोदय', moonset: 'चंद्रास्त', moonsign: 'चंद्र राशि', sunsign: 'सूर्य राशि',
      month_p: 'मास (पूर्णिमांत)', month_a: 'मास (अमांत)', samvat: 'संवत', vikram: 'विक्रम संवत', shaka: 'शक संवत',
      till: 'तक', nextday: '(अगले दिन)', auspicious: 'शुभ मुहूर्त', inauspicious: 'अशुभ काल', abhijit: 'अभिजित मुहूर्त',
      rahu: 'राहु काल', yama: 'यमगंड', gulika: 'गुलिक काल', festivals: 'व्रत व त्योहार', none: 'कोई विशेष व्रत-त्योहार नहीं',
      cal: 'मासिक पंचांग व त्योहार कैलेंडर', calnote: 'हर दिन की तिथि सूर्योदय के समय की है। लाल रंग के दिन प्रमुख त्योहार हैं।',
      adhik: 'अधिक मास', mypuja: 'इस दिन पूजा बुक करें', muhurat_cta: 'किसी कार्य के लिए शुभ मुहूर्त निकलवाएँ',
      p_note: 'गणना: लाहिड़ी अयनांश, सूर्योदय-आधारित तिथि, आपके चुने स्थान के अनुसार। स्थानीय परंपरा के कारण कुछ व्रत-त्योहारों में एक दिन का अंतर संभव है — महत्वपूर्ण अनुष्ठान के लिए पंडित जी से मुहूर्त अवश्य पूछें।',
      wk: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
      k_title: 'निःशुल्क जन्म कुंडली', k_sub: 'जन्म विवरण भरें — लग्न, राशि, नक्षत्र, ग्रह स्थिति, विंशोत्तरी दशा और मांगलिक विचार तुरंत।',
      name: 'नाम', dob: 'जन्म तिथि', tob: 'जन्म समय', pob: 'जन्म स्थान', pob_ph: 'शहर का नाम लिखें — जैसे वाराणसी', make: 'कुंडली बनाएँ',
      searching: 'स्थान खोजा जा रहा है…', pick: 'सूची से सही स्थान चुनें', notfound: 'स्थान नहीं मिला — नज़दीकी बड़ा शहर लिखें',
      e_fill: 'नाम, जन्म तिथि, समय और स्थान भरें', lagna: 'लग्न', rashi: 'राशि (चंद्र)', nakpada: 'नक्षत्र / चरण', sun: 'सूर्य राशि',
      chart: 'लग्न कुंडली', planets: 'ग्रह स्थिति', graha: 'ग्रह', degree: 'अंश', house: 'भाव', retro: 'वक्री',
      dasha: 'विंशोत्तरी महादशा', from: 'से', to: 'तक', current: 'वर्तमान', manglik: 'मांगलिक विचार',
      mangl_yes: 'लग्न से मंगल {h}वें भाव में है — कुंडली मांगलिक है। विवाह से पहले कुंडली मिलान व शांति उपाय पर पंडित जी से परामर्श लें।',
      mangl_no: 'लग्न से मंगल {h}वें भाव में है — लग्न के अनुसार मांगलिक दोष नहीं है।',
      mangl_moon: ' (चंद्र राशि से भी मांगलिक योग बनता है।)',
      deep: 'विस्तृत कुंडली विश्लेषण बुक करें', print: 'प्रिंट / PDF सहेजें', privacy: 'आपका जन्म विवरण कहीं भेजा या सहेजा नहीं जाता — कुंडली आपके फ़ोन/कंप्यूटर में ही बनती है।',
      r_title: 'दैनिक राशिफल', r_sub: 'चंद्रमा के गोचर पर आधारित आज का फल', moonin: 'आज चंद्रमा {r} राशि में ({n} नक्षत्र)',
      tomorrow: 'कल', remedy: 'उपाय', bypandit: 'पंडित जी द्वारा', r_note: 'यह राशिफल चंद्र गोचर पर आधारित सामान्य फल है। व्यक्तिगत फल आपकी पूरी कुंडली पर निर्भर करता है।',
      knowrashi: 'अपनी राशि नहीं पता? निःशुल्क कुंडली बनाएँ', rating: 'दिन',
      m_title: 'कुंडली मिलान (गुण मिलान)', m_sub: 'वर और वधू का जन्म विवरण भरें — अष्टकूट के 36 गुण, नाड़ी व भकूट दोष और मांगलिक मिलान तुरंत।',
      boy: 'वर (लड़का)', girl: 'वधू (लड़की)', match: 'गुण मिलाएँ', tab_k: 'जन्म कुंडली', tab_m: 'कुंडली मिलान',
      koota: 'कूट', obtained: 'प्राप्त', gunas: 'गुण', total: 'कुल',
      k_varna: 'वर्ण', k_vashya: 'वश्य', k_tara: 'तारा', k_yoni: 'योनि', k_maitri: 'ग्रह मैत्री', k_gana: 'गण', k_bhakoot: 'भकूट', k_nadi: 'नाड़ी',
      d_varna: 'आध्यात्मिक अनुकूलता व अहं', d_vashya: 'आपसी आकर्षण', d_tara: 'भाग्य व स्वास्थ्य', d_yoni: 'शारीरिक व स्वभाविक अनुकूलता',
      d_maitri: 'मानसिक मेल व मित्रता', d_gana: 'स्वभाव व व्यवहार', d_bhakoot: 'परिवार, धन व प्रेम', d_nadi: 'संतान व स्वास्थ्य',
      v_bad: 'मिलान अनुकूल नहीं — 18 से कम गुण। विवाह से पहले पंडित जी से विस्तृत परामर्श आवश्यक है।',
      v_ok: 'सामान्य मिलान — 18 से 24 गुण। विवाह संभव है, दोषों का परिहार देख लें।',
      v_good: 'अच्छा मिलान — 25 से 32 गुण। विवाह हेतु शुभ।', v_best: 'उत्तम मिलान — 32 से अधिक गुण।',
      nadi_dosh: 'नाड़ी दोष है (दोनों की नाड़ी एक ही)।', bhakoot_dosh: 'भकूट दोष है।', parihar: 'शास्त्र अनुसार इसका परिहार बनता है।',
      mangl_both: 'दोनों मांगलिक हैं — मांगलिक दोष आपस में कट जाता है।', mangl_one: 'केवल {who} मांगलिक है — मंगल दोष विचार व शांति उपाय आवश्यक।', mangl_none: 'कोई भी मांगलिक नहीं है।',
      book_milan: 'पंडित जी से विस्तृत मिलान कराएँ', m_note: 'गुण मिलान चंद्र नक्षत्र पर आधारित है। विवाह निर्णय के लिए दोनों की पूरी कुंडली (ग्रह स्थिति, दशा, सप्तम भाव) का विचार पंडित जी से अवश्य कराएँ।'
    },
    en: {
      p_title: "Today's Panchang", p_full: 'See full panchang', panchang: 'Panchang', kundli: 'Kundli', rashifal: 'Horoscope',
      date: 'Choose date', city: 'Place', today: 'Today', prev: 'Previous', next: 'Next',
      tithi: 'Tithi', nak: 'Nakshatra', yoga: 'Yoga', karana: 'Karana', vaar: 'Day', paksha: 'Paksha',
      sunrise: 'Sunrise', sunset: 'Sunset', moonrise: 'Moonrise', moonset: 'Moonset', moonsign: 'Moon sign', sunsign: 'Sun sign',
      month_p: 'Month (Purnimanta)', month_a: 'Month (Amanta)', samvat: 'Samvat', vikram: 'Vikram Samvat', shaka: 'Shaka Samvat',
      till: 'till', nextday: '(next day)', auspicious: 'Auspicious', inauspicious: 'Inauspicious', abhijit: 'Abhijit Muhurat',
      rahu: 'Rahu Kaal', yama: 'Yamaganda', gulika: 'Gulika Kaal', festivals: 'Vrat & festivals', none: 'No major vrat or festival',
      cal: 'Monthly panchang & festival calendar', calnote: 'Each day shows the tithi at sunrise. Red days are major festivals.',
      adhik: 'Adhik Maas', mypuja: 'Book a puja for this day', muhurat_cta: 'Get an auspicious muhurat for your event',
      p_note: 'Computed with Lahiri ayanamsa and sunrise tithi for your chosen place. Local traditions may differ by a day for some festivals — ask Pandit ji for the muhurat of important rituals.',
      wk: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      k_title: 'Free Birth Chart (Kundli)', k_sub: 'Enter birth details — get lagna, rashi, nakshatra, planet positions, Vimshottari dasha and Manglik check instantly.',
      name: 'Name', dob: 'Date of birth', tob: 'Time of birth', pob: 'Place of birth', pob_ph: 'Type a city — e.g. Varanasi', make: 'Make kundli',
      searching: 'Searching place…', pick: 'Pick the correct place', notfound: 'Place not found — try a nearby larger city',
      e_fill: 'Fill name, date, time and place', lagna: 'Lagna', rashi: 'Rashi (Moon)', nakpada: 'Nakshatra / Pada', sun: 'Sun sign',
      chart: 'Lagna chart', planets: 'Planet positions', graha: 'Planet', degree: 'Degree', house: 'House', retro: 'Retro',
      dasha: 'Vimshottari Mahadasha', from: 'from', to: 'to', current: 'Current', manglik: 'Manglik check',
      mangl_yes: 'Mars is in house {h} from lagna — the chart is Manglik. Consult Pandit ji on matching and remedies before marriage.',
      mangl_no: 'Mars is in house {h} from lagna — no Manglik dosh by lagna.',
      mangl_moon: ' (Manglik yoga also forms from the Moon sign.)',
      deep: 'Book a detailed chart reading', print: 'Print / save PDF', privacy: 'Your birth details are not sent or stored anywhere — the chart is computed on your own device.',
      r_title: 'Daily Horoscope', r_sub: "Today's result based on the Moon's transit", moonin: 'Today the Moon is in {r} ({n} nakshatra)',
      tomorrow: 'Tomorrow', remedy: 'Remedy', bypandit: 'By Pandit ji', r_note: 'This is a general result from the Moon transit. Personal results depend on your full birth chart.',
      knowrashi: "Don't know your rashi? Make a free kundli", rating: 'Day',
      m_title: 'Kundli Milan (Guna Matching)', m_sub: 'Enter the groom’s and bride’s birth details — get the Ashtakoot 36-guna score, Nadi & Bhakoot dosh and Manglik matching instantly.',
      boy: 'Groom', girl: 'Bride', match: 'Match gunas', tab_k: 'Birth chart', tab_m: 'Kundli matching',
      koota: 'Koota', obtained: 'Obtained', gunas: 'gunas', total: 'Total',
      k_varna: 'Varna', k_vashya: 'Vashya', k_tara: 'Tara', k_yoni: 'Yoni', k_maitri: 'Graha Maitri', k_gana: 'Gana', k_bhakoot: 'Bhakoot', k_nadi: 'Nadi',
      d_varna: 'Spiritual compatibility & ego', d_vashya: 'Mutual attraction', d_tara: 'Fortune & health', d_yoni: 'Physical & temperamental match',
      d_maitri: 'Mental harmony & friendship', d_gana: 'Nature & behaviour', d_bhakoot: 'Family, wealth & love', d_nadi: 'Progeny & health',
      v_bad: 'Not favourable — below 18 gunas. Consult Pandit ji in detail before marriage.',
      v_ok: 'Average match — 18 to 24 gunas. Marriage is possible; check remedies for doshas.',
      v_good: 'Good match — 25 to 32 gunas. Auspicious for marriage.', v_best: 'Excellent match — above 32 gunas.',
      nadi_dosh: 'Nadi dosh present (same nadi).', bhakoot_dosh: 'Bhakoot dosh present.', parihar: 'A shastric cancellation (parihar) applies.',
      mangl_both: 'Both are Manglik — the dosh cancels out.', mangl_one: 'Only the {who} is Manglik — Mangal dosh remedies needed.', mangl_none: 'Neither is Manglik.',
      book_milan: 'Get a detailed match by Pandit ji', m_note: 'Guna matching is based on Moon nakshatras. For a marriage decision, have Pandit ji review both full charts (planets, dasha, 7th house).'
    }
  };
  function L(k) { return (T[X.lang] && T[X.lang][k]) || T.hi[k] || k; }
  function n(arr) { return VJ.N[arr][X.lang === 'en' ? 'en' : 'hi']; }

  var CITIES = [
    ['नई दिल्ली', 'New Delhi', 28.6139, 77.2090], ['छतरपुर, दिल्ली', 'Chhatarpur, Delhi', 28.4983, 77.1840], ['मुंबई', 'Mumbai', 19.0760, 72.8777], ['कोलकाता', 'Kolkata', 22.5726, 88.3639],
    ['चेन्नई', 'Chennai', 13.0827, 80.2707], ['बेंगलुरु', 'Bengaluru', 12.9716, 77.5946], ['हैदराबाद', 'Hyderabad', 17.3850, 78.4867], ['अहमदाबाद', 'Ahmedabad', 23.0225, 72.5714],
    ['जयपुर', 'Jaipur', 26.9124, 75.7873], ['लखनऊ', 'Lucknow', 26.8467, 80.9462], ['वाराणसी', 'Varanasi', 25.3176, 82.9739], ['प्रयागराज', 'Prayagraj', 25.4358, 81.8463],
    ['अयोध्या', 'Ayodhya', 26.7922, 82.1998], ['मथुरा', 'Mathura', 27.4924, 77.6737], ['हरिद्वार', 'Haridwar', 29.9457, 78.1642], ['उज्जैन', 'Ujjain', 23.1765, 75.7885],
    ['पटना', 'Patna', 25.5941, 85.1376], ['भोपाल', 'Bhopal', 23.2599, 77.4126], ['इंदौर', 'Indore', 22.7196, 75.8577], ['चंडीगढ़', 'Chandigarh', 30.7333, 76.7794],
    ['देहरादून', 'Dehradun', 30.3165, 78.0322], ['पुणे', 'Pune', 18.5204, 73.8567], ['नागपुर', 'Nagpur', 21.1458, 79.0882], ['गुवाहाटी', 'Guwahati', 26.1445, 91.7362],
    ['भुवनेश्वर', 'Bhubaneswar', 20.2961, 85.8245], ['रायपुर', 'Raipur', 21.2514, 81.6296], ['रांची', 'Ranchi', 23.3441, 85.3096], ['अमृतसर', 'Amritsar', 31.6340, 74.8723],
    ['कानपुर', 'Kanpur', 26.4499, 80.3319], ['आगरा', 'Agra', 27.1767, 78.0081], ['गुरुग्राम', 'Gurugram', 28.4595, 77.0266], ['नोएडा', 'Noida', 28.5355, 77.3910],
    ['गाज़ियाबाद', 'Ghaziabad', 28.6692, 77.4538], ['फ़रीदाबाद', 'Faridabad', 28.4089, 77.3178], ['सूरत', 'Surat', 21.1702, 72.8311], ['गया', 'Gaya', 24.7914, 85.0002]
  ];
  function place() {
    var i = +(localStorage.getItem('vss_city') || 0); var c = CITIES[i] || CITIES[0];
    return { idx: i, name: X.lang === 'en' ? c[1] : c[0], lat: c[2], lon: c[3], tz: 5.5 };
  }
  function cityOptions(sel) { return CITIES.map(function (c, i) { return '<option value="' + i + '"' + (i === sel ? ' selected' : '') + '>' + X.esc(X.lang === 'en' ? c[1] : c[0]) + '</option>'; }).join(''); }

  function istParts(date, tz) { var d = new Date(date.getTime() + (tz == null ? 5.5 : tz) * 3600e3); return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), h: d.getUTCHours(), mi: d.getUTCMinutes() }; }
  function hm(date, ref, tz) {
    if (!date) return '—';
    var p = istParts(date, tz), h = p.h % 12 || 12;
    var s = (h < 10 ? '0' : '') + h + ':' + (p.mi < 10 ? '0' : '') + p.mi + ' ' + (p.h < 12 ? 'AM' : 'PM');
    if (ref && (p.d !== ref.d || p.m !== ref.m)) s += ' ' + L('nextday');
    return s;
  }
  function todayParts() { return istParts(new Date(), 5.5); }
  function iso(p) { return p.y + '-' + ('0' + (p.m + 1)).slice(-2) + '-' + ('0' + p.d).slice(-2); }
  function parseIso(s) { var a = s.split('-'); return { y: +a[0], m: +a[1] - 1, d: +a[2] }; }
  function niceDate(p) { return new Date(Date.UTC(p.y, p.m, p.d)).toLocaleDateString(X.lang === 'en' ? 'en-IN' : 'hi-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }); }
  function tithiName(i) { var tn = n('tithi'); return i === 14 ? tn[14] : i === 29 ? tn[15] : tn[i % 15]; }

  /* ---------------- home strip ---------------- */
  function strip() {
    try {
      var tp = todayParts(), pl = place(), p = VJ.panchang(tp.y, tp.m, tp.d, pl);
      var ev = VJ.events(tp.y, tp.m, tp.d, 1, pl)[0].events;
      return '<section class="pstrip" aria-label="' + L('p_title') + '"><div class="wrap">' +
        '<div class="ps-head"><b>' + L('p_title') + '</b><span>' + X.esc(niceDate(tp)) + ' • ' + X.esc(pl.name) + '</span></div>' +
        '<dl class="ps-grid">' +
          '<div><dt>' + L('tithi') + '</dt><dd>' + n('paksha')[p.paksha].split(' ')[0] + ' ' + tithiName(p.tithi) + '</dd></div>' +
          '<div><dt>' + L('nak') + '</dt><dd>' + n('nak')[p.nak] + '</dd></div>' +
          '<div><dt>' + L('sunrise') + ' / ' + L('sunset') + '</dt><dd>' + hm(p.sunrise) + ' / ' + hm(p.sunset) + '</dd></div>' +
          '<div><dt>' + L('rahu') + '</dt><dd>' + hm(p.rahu[0]) + ' – ' + hm(p.rahu[1]) + '</dd></div>' +
          '<div><dt>' + L('month_p') + '</dt><dd>' + n('masa')[p.purnimanta] + ', ' + L('vikram') + ' ' + p.vikram + '</dd></div>' +
        '</dl>' +
        (ev.length ? '<p class="ps-ev">🪔 ' + ev.map(function (e) { return X.esc(e[X.lang] || e.hi); }).join(' • ') + '</p>' : '') +
        '<div class="ps-links"><a class="btn btn-primary btn-sm" href="#/panchang">' + L('p_full') + '</a><a class="btn btn-ghost btn-sm" href="#/kundli">' + L('k_title') + '</a><a class="btn btn-ghost btn-sm" href="#/milan">' + L('tab_m') + '</a><a class="btn btn-ghost btn-sm" href="#/rashifal">' + L('r_title') + '</a></div>' +
      '</div></section>';
    } catch (e) { return ''; }
  }

  /* ---------------- panchang page ---------------- */
  var calState = null;
  function panchangPage(qs) {
    var tp = todayParts(), sel = qs && qs.d ? parseIso(qs.d) : tp, pl = place();
    if (!calState || (qs && qs.d)) calState = { y: sel.y, m: sel.m };
    var p = VJ.panchang(sel.y, sel.m, sel.d, pl);
    var ev = VJ.events(sel.y, sel.m, sel.d, 1, pl)[0];
    var adminF = (X.D.festivals || []).filter(function (f) { return f.date === iso(sel); });
    var row = function (k, v) { return '<div class="pc-row"><dt>' + k + '</dt><dd>' + v + '</dd></div>'; };
    var sr = istParts(p.sunrise, pl.tz);
    var html = '<div class="wrap detail astro">' +
      '<nav class="crumbs"><a href="#/">' + X.u('home') + '</a> / ' + L('panchang') + '</nav>' +
      '<div class="astro-head"><h1>' + L('panchang') + '</h1>' +
        '<form class="astro-ctl" id="pForm"><label>' + L('date') + '<input type="date" name="d" value="' + iso(sel) + '"></label>' +
        '<label>' + L('city') + '<select name="c">' + cityOptions(pl.idx) + '</select></label>' +
        '<button class="btn btn-ghost btn-sm" type="button" id="pToday">' + L('today') + '</button></form></div>' +
      '<div class="pcard">' +
        '<div class="pc-top"><div><span class="pc-date">' + X.esc(niceDate(sel)) + '</span><b class="pc-tithi">' + n('paksha')[p.paksha] + ' ' + tithiName(p.tithi) + '</b>' +
          '<span class="pc-sub">' + n('masa')[p.purnimanta] + (p.adhik ? ' (' + L('adhik') + ')' : '') + ' • ' + L('vikram') + ' ' + p.vikram + ' • ' + L('shaka') + ' ' + p.shaka + '</span></div>' +
          '<div class="pc-sun"><span>☀ ' + hm(p.sunrise) + '</span><span>🌇 ' + hm(p.sunset) + '</span></div></div>' +
        '<div class="pc-cols"><dl>' +
          row(L('vaar'), n('vaar')[p.weekday]) +
          row(L('tithi'), tithiName(p.tithi) + ' <small>' + L('till') + ' ' + hm(p.tithiEnd, sr, pl.tz) + '</small>') +
          row(L('nak'), n('nak')[p.nak] + ' <small>' + L('till') + ' ' + hm(p.nakEnd, sr, pl.tz) + '</small>') +
          row(L('yoga'), n('yoga')[p.yoga] + ' <small>' + L('till') + ' ' + hm(p.yogaEnd, sr, pl.tz) + '</small>') +
          row(L('karana'), n('karana')[p.karana] + ' <small>' + L('till') + ' ' + hm(p.karanaEnd, sr, pl.tz) + '</small>') +
        '</dl><dl>' +
          row(L('moonsign'), n('rashi')[p.moonRashi]) + row(L('sunsign'), n('rashi')[p.sunRashi]) +
          row(L('moonrise'), hm(p.moonrise)) + row(L('moonset'), hm(p.moonset)) +
          row(L('month_a'), n('masa')[p.amanta]) +
        '</dl></div>' +
        '<div class="pc-cols"><div class="pc-box good"><h3>' + L('auspicious') + '</h3>' + row(L('abhijit'), hm(p.abhijit[0]) + ' – ' + hm(p.abhijit[1])) + '</div>' +
          '<div class="pc-box bad"><h3>' + L('inauspicious') + '</h3>' + row(L('rahu'), hm(p.rahu[0]) + ' – ' + hm(p.rahu[1])) + row(L('yama'), hm(p.yamaganda[0]) + ' – ' + hm(p.yamaganda[1])) + row(L('gulika'), hm(p.gulika[0]) + ' – ' + hm(p.gulika[1])) + '</div></div>' +
        '<div class="pc-fest"><h3>' + L('festivals') + '</h3>' +
          ((ev.events.length || adminF.length) ? '<ul>' + adminF.map(function (f) { return '<li class="maj">' + X.esc(X.t(f.name)) + (f.note ? ' — ' + X.esc(X.t(f.note)) : '') + '</li>'; }).join('') + ev.events.map(function (e) { return '<li' + (e.major ? ' class="maj"' : '') + '>' + X.esc(e[X.lang] || e.hi) + '</li>'; }).join('') + '</ul>' : '<p>' + L('none') + '</p>') +
          '<a class="btn btn-primary btn-sm" href="#/seva/muhurat">' + L('muhurat_cta') + '</a></div>' +
      '</div>' +
      '<section class="calsec"><div class="cal-head"><h2>' + L('cal') + '</h2><div><button class="btn btn-ghost btn-sm" id="cPrev" type="button">‹ ' + L('prev') + '</button> <b id="cTitle"></b> <button class="btn btn-ghost btn-sm" id="cNext" type="button">' + L('next') + ' ›</button></div></div>' +
        '<p class="calnote">' + L('calnote') + '</p><div id="cal" class="cal" aria-live="polite"></div></section>' +
      '<p class="astro-note">' + L('p_note') + '</p></div>';
    X.$('#main').innerHTML = html;
    var f = X.$('#pForm');
    f.d.onchange = function () { if (this.value) location.hash = '#/panchang?d=' + this.value; };
    f.c.onchange = function () { localStorage.setItem('vss_city', this.value); panchangPage({ d: f.d.value }); };
    X.$('#pToday').onclick = function () { location.hash = '#/panchang?d=' + iso(todayParts()); };
    X.$('#cPrev').onclick = function () { calState.m--; if (calState.m < 0) { calState.m = 11; calState.y--; } drawCal(sel); };
    X.$('#cNext').onclick = function () { calState.m++; if (calState.m > 11) { calState.m = 0; calState.y++; } drawCal(sel); };
    drawCal(sel);
    window.scrollTo(0, 0);
  }

  function drawCal(sel) {
    var y = calState.y, m = calState.m, pl = place();
    var days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    var first = new Date(Date.UTC(y, m, 1)).getUTCDay();
    var ev = VJ.events(y, m, 1, days, pl), today = iso(todayParts());
    X.$('#cTitle').textContent = new Date(Date.UTC(y, m, 1)).toLocaleDateString(X.lang === 'en' ? 'en-IN' : 'hi-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    var adminMap = {}; (X.D.festivals || []).forEach(function (f) { (adminMap[f.date] = adminMap[f.date] || []).push(X.t(f.name)); });
    var html = L('wk').map(function (w) { return '<div class="cal-wk">' + w + '</div>'; }).join('');
    for (var i = 0; i < first; i++) html += '<div class="cal-d empty"></div>';
    ev.forEach(function (d) {
      var key = iso(d), names = (adminMap[key] || []).concat(d.events.map(function (e) { return e[X.lang] || e.hi; }));
      var major = (adminMap[key] || []).length || d.events.some(function (e) { return e.major; });
      var tn = (d.tithi < 15 ? 'शु' : 'कृ'); if (X.lang === 'en') tn = d.tithi < 15 ? 'S' : 'K';
      html += '<a href="#/panchang?d=' + key + '" class="cal-d' + (major ? ' maj' : names.length ? ' ev' : '') + (key === today ? ' today' : '') + (key === iso(sel) ? ' sel' : '') + '">' +
        '<b>' + d.d + '</b><span class="ct">' + tn + ' ' + tithiName(d.tithi) + '</span>' + (names.length ? '<span class="ce">' + X.esc(names.join(', ')) + '</span>' : '') + '</a>';
    });
    X.$('#cal').innerHTML = html;
  }

  /* ---------------- kundli page ---------------- */
  var KS = { form: {}, place: null };
  function kundliPage() {
    var f = KS.form;
    X.$('#main').innerHTML = '<div class="wrap detail astro">' +
      '<nav class="crumbs"><a href="#/">' + X.u('home') + '</a> / ' + L('kundli') + '</nav>' +
      tabsK('k') + '<h1>' + L('k_title') + '</h1><p class="lead-s">' + L('k_sub') + '</p>' +
      '<form id="kForm" class="kform" novalidate autocomplete="off">' +
        '<label class="f">' + L('name') + '<input name="name" value="' + X.esc(f.name || '') + '"></label>' +
        '<label class="f">' + L('dob') + '<input type="date" name="dob" value="' + X.esc(f.dob || '') + '" max="2100-12-31"></label>' +
        '<label class="f">' + L('tob') + '<input type="time" name="tob" value="' + X.esc(f.tob || '') + '"></label>' +
        '<label class="f pob">' + L('pob') + '<input name="pob" placeholder="' + X.esc(L('pob_ph')) + '" value="' + X.esc(f.pob || '') + '"><span class="pob-list" id="pobList" role="listbox"></span></label>' +
        '<div class="kbtn"><button class="btn btn-primary" type="submit">' + L('make') + '</button></div>' +
        '<p class="err" id="kErr"></p>' +
      '</form><p class="astro-note">🔒 ' + L('privacy') + '</p><div id="kOut"></div></div>';
    var form = X.$('#kForm'), list = X.$('#pobList'), timer;
    form.pob.oninput = function () {
      KS.place = null; var q = this.value.trim(); clearTimeout(timer);
      if (q.length < 2) { list.innerHTML = ''; return; }
      var local = CITIES.filter(function (c) { return c[0].indexOf(q) === 0 || c[1].toLowerCase().indexOf(q.toLowerCase()) === 0; }).slice(0, 4)
        .map(function (c) { return { name: X.lang === 'en' ? c[1] : c[0], admin: 'India', lat: c[2], lon: c[3], tz: 'Asia/Kolkata' }; });
      showPlaces(local);
      timer = setTimeout(function () {
        list.insertAdjacentHTML('beforeend', '<span class="pl-msg">' + L('searching') + '</span>');
        fetch('https://geocoding-api.open-meteo.com/v1/search?count=6&format=json&language=' + (X.lang === 'en' ? 'en' : 'hi') + '&name=' + encodeURIComponent(q))
          .then(function (r) { return r.json(); })
          .then(function (j) {
            var res = (j.results || []).map(function (r) { return { name: r.name, admin: [r.admin1, r.country].filter(Boolean).join(', '), lat: r.latitude, lon: r.longitude, tz: r.timezone }; });
            showPlaces(local.concat(res.filter(function (r) { return !local.some(function (l) { return Math.abs(l.lat - r.lat) < .05 && Math.abs(l.lon - r.lon) < .05; }); })));
          }).catch(function () { showPlaces(local); });
      }, 350);
    };
    function showPlaces(arr) {
      list.innerHTML = arr.length ? arr.map(function (p, i) { return '<button type="button" data-pi="' + i + '">' + X.esc(p.name) + ' <small>' + X.esc(p.admin) + '</small></button>'; }).join('') : '<span class="pl-msg">' + L('notfound') + '</span>';
      X.$$('[data-pi]', list).forEach(function (b) { b.onclick = function () { var p = arr[+b.dataset.pi]; KS.place = p; form.pob.value = p.name + (p.admin ? ', ' + p.admin : ''); list.innerHTML = ''; }; });
    }
    form.onsubmit = function (e) {
      e.preventDefault();
      var fd = { name: form.name.value.trim(), dob: form.dob.value, tob: form.tob.value, pob: form.pob.value.trim() };
      KS.form = fd;
      if (!fd.name || !fd.dob || !fd.tob || !fd.pob) { X.$('#kErr').textContent = L('e_fill'); return; }
      if (!KS.place) {
        var c = CITIES.find(function (c) { return fd.pob.indexOf(c[0]) === 0 || fd.pob.toLowerCase().indexOf(c[1].toLowerCase()) === 0; });
        if (c) KS.place = { name: X.lang === 'en' ? c[1] : c[0], admin: 'India', lat: c[2], lon: c[3], tz: 'Asia/Kolkata' };
        else { X.$('#kErr').textContent = L('pick'); form.pob.dispatchEvent(new Event('input')); return; }
      }
      X.$('#kErr').textContent = '';
      var d = fd.dob.split('-').map(Number), tm = fd.tob.split(':').map(Number);
      var off = VJ.tzOffset(KS.place.tz, d[0], d[1] - 1, d[2], tm[0], tm[1]);
      var utc = new Date(Date.UTC(d[0], d[1] - 1, d[2], tm[0], tm[1]) - off * 3600e3);
      renderKundli(VJ.kundli(utc, KS.place.lat, KS.place.lon), fd, off);
    };
    if (f.name && KS.place) form.requestSubmit();
    window.scrollTo(0, 0);
  }

  function chartSVG(k) {
    var C = [[200, 92], [100, 36], [36, 100], [100, 192], [36, 300], [100, 360], [200, 300], [300, 360], [364, 300], [300, 192], [364, 100], [300, 36]];
    var NUM = [[200, 162], [100, 70], [68, 104], [162, 205], [68, 304], [100, 340], [200, 250], [300, 340], [332, 304], [238, 205], [332, 104], [300, 70]];
    var NARROW = { 2: 1, 4: 1, 8: 1, 10: 1 };
    var sh = VJ.N.short[X.lang === 'en' ? 'en' : 'hi'];
    var s = '<svg viewBox="0 0 400 400" class="kchart" role="img" aria-label="' + L('chart') + '"><rect x="2" y="2" width="396" height="396" fill="#FFFBF2" stroke="#7A1313" stroke-width="3"/>' +
      '<path d="M2 2L398 398M398 2L2 398M200 2L398 200L200 398L2 200Z" fill="none" stroke="#7A1313" stroke-width="2"/>';
    for (var h = 0; h < 12; h++) {
      var c = C[h], rn = ((k.lagna + h) % 12) + 1;
      s += '<text x="' + NUM[h][0] + '" y="' + NUM[h][1] + '" class="kr">' + rn + '</text>';
      var ps = k.planets.filter(function (p) { return p.house === h + 1; }).map(function (p) { return sh[p.id] + (p.retro && p.id !== 'Rahu' && p.id !== 'Ketu' ? '*' : ''); });
      if (h === 0) ps.unshift(X.lang === 'en' ? 'Asc' : 'लग्न');
      var cols = NARROW[h] ? 1 : 2, rows = Math.ceil(ps.length / cols);
      ps.forEach(function (lbl, i) {
        var row = Math.floor(i / cols), col = i % cols, inRow = Math.min(ps.length - row * cols, cols);
        var x = c[0] + (inRow === 2 ? (col ? 18 : -18) : 0), y = c[1] + 5 + row * 18 - (rows - 1) * 9;
        s += '<text x="' + x + '" y="' + y + '" class="kp' + (lbl === 'लग्न' || lbl === 'Asc' ? ' asc' : '') + '">' + lbl + '</text>';
      });
    }
    return s + '</svg>';
  }

  function fmtDeg(x) { var d = Math.floor(x), m = Math.floor((x - d) * 60); return d + '° ' + ('0' + m).slice(-2) + '′'; }
  function renderKundli(k, fd, off) {
    var gn = VJ.N.graha[X.lang === 'en' ? 'en' : 'hi'], now = new Date();
    var dd = function (d) { return d.toLocaleDateString(X.lang === 'en' ? 'en-IN' : 'hi-IN', { day: 'numeric', month: 'short', year: 'numeric' }); };
    var mars = k.planets[2];
    var html = '<div class="kres" id="kres">' +
      '<div class="khead"><div><h2>' + X.esc(fd.name) + '</h2><p>' + X.esc(fd.dob) + ' • ' + X.esc(fd.tob) + ' • ' + X.esc(KS.place.name) + ' (' + KS.place.lat.toFixed(2) + ', ' + KS.place.lon.toFixed(2) + ', UTC+' + off + ')</p></div>' +
        '<div class="kact"><button class="btn btn-ghost btn-sm" type="button" onclick="window.print()">' + L('print') + '</button></div></div>' +
      '<div class="kchips"><div><span>' + L('lagna') + '</span><b>' + n('rashi')[k.lagna] + '</b></div><div><span>' + L('rashi') + '</span><b>' + n('rashi')[k.moonRashi] + '</b></div>' +
        '<div><span>' + L('nakpada') + '</span><b>' + n('nak')[k.nak] + ' / ' + k.pada + '</b></div><div><span>' + L('sun') + '</span><b>' + n('rashi')[k.sunRashi] + '</b></div></div>' +
      '<div class="kgrid"><div><h3>' + L('chart') + '</h3>' + chartSVG(k) + '</div>' +
        '<div><h3>' + L('planets') + '</h3><div class="table-scroll"><table class="ktab"><thead><tr><th>' + L('graha') + '</th><th>' + L('rashi').split(' ')[0] + '</th><th>' + L('degree') + '</th><th>' + L('nak') + '</th><th>' + L('house') + '</th></tr></thead><tbody>' +
          '<tr><td><b>' + gn.Lagna + '</b></td><td>' + n('rashi')[k.lagna] + '</td><td>' + fmtDeg(k.asc % 30) + '</td><td>' + n('nak')[Math.floor(k.asc / (360 / 27))] + '</td><td>1</td></tr>' +
          k.planets.map(function (p) { return '<tr><td><b>' + gn[p.id] + '</b>' + (p.retro && p.id !== 'Rahu' && p.id !== 'Ketu' ? ' <small>(' + L('retro') + ')</small>' : '') + '</td><td>' + n('rashi')[p.rashi] + '</td><td>' + fmtDeg(p.deg) + '</td><td>' + n('nak')[p.nak] + ' ' + p.pada + '</td><td>' + p.house + '</td></tr>'; }).join('') +
        '</tbody></table></div></div></div>' +
      '<div class="kgrid"><div><h3>' + L('dasha') + '</h3><table class="ktab"><tbody>' +
        k.dashas.map(function (d) { var cur = d.start <= now && now < d.end; return '<tr' + (cur ? ' class="cur"' : '') + '><td><b>' + gn[d.lord] + '</b>' + (cur ? ' <small>(' + L('current') + ')</small>' : '') + '</td><td>' + dd(d.start) + ' – ' + dd(d.end) + '</td></tr>'; }).join('') +
        '</tbody></table></div>' +
        '<div><h3>' + L('manglik') + '</h3><p class="mangl ' + (k.manglik ? 'yes' : 'no') + '">' + L(k.manglik ? 'mangl_yes' : 'mangl_no').replace('{h}', mars.house) + (k.manglikMoon && !k.manglik ? L('mangl_moon') : '') + '</p>' +
        '<button class="btn btn-primary" type="button" id="kBook">' + L('deep') + '</button></div></div>' +
      '</div>';
    X.$('#kOut').innerHTML = html;
    X.$('#kBook').onclick = function () { X.openBooking('kundli-vishleshan', null, { dob: fd.dob, tob: fd.tob, pob: KS.place.name + ', ' + KS.place.admin, name: fd.name }); };
    X.$('#kres').scrollIntoView({ behavior: 'smooth' });
  }

  function tabsK(which) {
    return '<div class="seg-tabs" style="display:inline-flex;margin-bottom:14px"><a href="#/kundli"' + (which === 'k' ? ' aria-current="page"' : '') + '>' + L('tab_k') + '</a><a href="#/milan"' + (which === 'm' ? ' aria-current="page"' : '') + '>' + L('tab_m') + '</a></div>';
  }

  /* generic place search: input + list element; calls setPlace(p) */
  function placePicker(input, list, setPlace) {
    var timer;
    function show(arr) {
      if (document.activeElement !== input) { list.innerHTML = ''; return; }
      list.innerHTML = arr.length ? arr.map(function (p, i) { return '<button type="button" data-pi="' + i + '">' + X.esc(p.name) + ' <small>' + X.esc(p.admin) + '</small></button>'; }).join('') : '<span class="pl-msg">' + L('notfound') + '</span>';
      X.$$('[data-pi]', list).forEach(function (b) { b.onclick = function () { var p = arr[+b.dataset.pi]; setPlace(p); input.value = p.name + (p.admin ? ', ' + p.admin : ''); list.innerHTML = ''; }; });
    }
    input.oninput = function () {
      setPlace(null); var q = this.value.trim(); clearTimeout(timer);
      if (q.length < 2) { list.innerHTML = ''; return; }
      var local = CITIES.filter(function (c) { return c[0].indexOf(q) === 0 || c[1].toLowerCase().indexOf(q.toLowerCase()) === 0; }).slice(0, 4)
        .map(function (c) { return { name: X.lang === 'en' ? c[1] : c[0], admin: 'India', lat: c[2], lon: c[3], tz: 'Asia/Kolkata' }; });
      show(local);
      timer = setTimeout(function () {
        fetch('https://geocoding-api.open-meteo.com/v1/search?count=6&format=json&language=' + (X.lang === 'en' ? 'en' : 'hi') + '&name=' + encodeURIComponent(q))
          .then(function (r) { return r.json(); })
          .then(function (j) {
            var res = (j.results || []).map(function (r) { return { name: r.name, admin: [r.admin1, r.country].filter(Boolean).join(', '), lat: r.latitude, lon: r.longitude, tz: r.timezone }; });
            show(local.concat(res.filter(function (r) { return !local.some(function (l) { return Math.abs(l.lat - r.lat) < .05 && Math.abs(l.lon - r.lon) < .05; }); })));
          }).catch(function () { show(local); });
      }, 350);
    };
  }
  function guessPlace(txt) {
    var c = CITIES.find(function (c) { return txt.indexOf(c[0]) === 0 || txt.toLowerCase().indexOf(c[1].toLowerCase()) === 0; });
    return c ? { name: X.lang === 'en' ? c[1] : c[0], admin: 'India', lat: c[2], lon: c[3], tz: 'Asia/Kolkata' } : null;
  }
  function chartFor(fd, pl) {
    var d = fd.dob.split('-').map(Number), tm = fd.tob.split(':').map(Number);
    var off = VJ.tzOffset(pl.tz, d[0], d[1] - 1, d[2], tm[0], tm[1]);
    return VJ.kundli(new Date(Date.UTC(d[0], d[1] - 1, d[2], tm[0], tm[1]) - off * 3600e3), pl.lat, pl.lon);
  }

  /* ---------------- milan page ---------------- */
  var MS = { b: {}, g: {}, bp: null, gp: null };
  function milanPage() {
    var side = function (key, title) {
      var f = MS[key];
      return '<fieldset class="mside"><legend>' + title + '</legend>' +
        '<label class="f">' + L('name') + '<input name="' + key + 'name" value="' + X.esc(f.name || '') + '"></label>' +
        '<div class="mrow"><label class="f">' + L('dob') + '<input type="date" name="' + key + 'dob" value="' + X.esc(f.dob || '') + '"></label>' +
        '<label class="f">' + L('tob') + '<input type="time" name="' + key + 'tob" value="' + X.esc(f.tob || '') + '"></label></div>' +
        '<label class="f pob">' + L('pob') + '<input name="' + key + 'pob" placeholder="' + X.esc(L('pob_ph')) + '" value="' + X.esc(f.pob || '') + '"><span class="pob-list" id="' + key + 'List"></span></label></fieldset>';
    };
    X.$('#main').innerHTML = '<div class="wrap detail astro">' +
      '<nav class="crumbs"><a href="#/">' + X.u('home') + '</a> / ' + L('tab_m') + '</nav>' + tabsK('m') +
      '<h1>' + L('m_title') + '</h1><p class="lead-s">' + L('m_sub') + '</p>' +
      '<form id="mForm" class="mform" novalidate autocomplete="off"><div class="mcols">' + side('b', L('boy')) + side('g', L('girl')) + '</div>' +
      '<p class="err" id="mErr"></p><button class="btn btn-primary" type="submit">' + L('match') + '</button></form>' +
      '<p class="astro-note">🔒 ' + L('privacy') + '</p><div id="mOut"></div></div>';
    var form = X.$('#mForm');
    placePicker(form.bpob, X.$('#bList'), function (p) { MS.bp = p; });
    placePicker(form.gpob, X.$('#gList'), function (p) { MS.gp = p; });
    form.onsubmit = function (e) {
      e.preventDefault(); X.$('#bList').innerHTML = ''; X.$('#gList').innerHTML = '';
      ['b', 'g'].forEach(function (k) { MS[k] = { name: form[k + 'name'].value.trim(), dob: form[k + 'dob'].value, tob: form[k + 'tob'].value, pob: form[k + 'pob'].value.trim() }; });
      var miss = ['b', 'g'].some(function (k) { var f = MS[k]; return !f.name || !f.dob || !f.tob || !f.pob; });
      if (miss) { X.$('#mErr').textContent = L('e_fill'); return; }
      MS.bp = MS.bp || guessPlace(MS.b.pob); MS.gp = MS.gp || guessPlace(MS.g.pob);
      if (!MS.bp || !MS.gp) { X.$('#mErr').textContent = L('pick'); (MS.bp ? form.gpob : form.bpob).dispatchEvent(new Event('input')); return; }
      X.$('#mErr').textContent = '';
      renderMilan(VJ.milan(chartFor(MS.b, MS.bp), chartFor(MS.g, MS.gp)));
    };
    window.scrollTo(0, 0);
  }

  function renderMilan(m) {
    var lg = X.lang === 'en' ? 'en' : 'hi', gn = VJ.N.graha[lg];
    var attr = function (k, which) {
      var i = which === 'b' ? k.bi : k.gi;
      if (k.lord) return gn[m.LORD_ID[i]];
      if (k.id === 'tara') return (lg === 'hi' ? 'तारा ' : 'Tara ') + i;
      if (k.rashi) return (lg === 'hi' ? 'भाव ' : 'House ') + i;
      return k.b ? k.b[lg][i] : i;
    };
    var pct = Math.round(m.total / 36 * 100);
    var verdict = m.total < 18 ? 'v_bad' : m.total <= 24 ? 'v_ok' : m.total <= 32 ? 'v_good' : 'v_best';
    var cls = m.total < 18 ? 'bad' : m.total <= 24 ? 'ok' : 'good';
    var notes = [];
    m.kootas.forEach(function (k) { if (k.dosh) notes.push(L(k.id === 'nadi' ? 'nadi_dosh' : 'bhakoot_dosh') + (k.parihar ? ' ' + L('parihar') : '')); });
    var mg = m.boy.manglik && m.girl.manglik ? L('mangl_both') : (m.boy.manglik || m.girl.manglik) ? L('mangl_one').replace('{who}', m.boy.manglik ? L('boy') : L('girl')) : L('mangl_none');
    var tot = m.total % 1 ? m.total.toFixed(1) : m.total;
    X.$('#mOut').innerHTML = '<div class="kres" id="mres">' +
      '<div class="mhead"><div class="mscore ' + cls + '" style="--p:' + pct + '"><b>' + tot + '</b><span>/ 36 ' + L('gunas') + '</span></div>' +
        '<div><h2>' + X.esc(MS.b.name) + ' ♥ ' + X.esc(MS.g.name) + '</h2><p class="mverdict ' + cls + '">' + L(verdict) + '</p>' +
        '<p class="msub">' + L('boy') + ': ' + n('rashi')[m.boy.rashi] + ', ' + n('nak')[m.boy.nak] + ' • ' + L('girl') + ': ' + n('rashi')[m.girl.rashi] + ', ' + n('nak')[m.girl.nak] + '</p></div>' +
        '<div class="kact"><button class="btn btn-ghost btn-sm" type="button" onclick="window.print()">' + L('print') + '</button></div></div>' +
      '<div class="table-scroll"><table class="ktab mtab"><thead><tr><th>' + L('koota') + '</th><th>' + L('boy') + '</th><th>' + L('girl') + '</th><th>' + L('obtained') + '</th><th></th></tr></thead><tbody>' +
        m.kootas.map(function (k) {
          var w = Math.round(k.got / k.max * 100);
          return '<tr' + (k.got === 0 ? ' class="zero"' : '') + '><td><b>' + L('k_' + k.id) + '</b><small>' + L('d_' + k.id) + '</small></td><td>' + X.esc(attr(k, 'b')) + '</td><td>' + X.esc(attr(k, 'g')) + '</td>' +
            '<td><b>' + k.got + '</b> / ' + k.max + '</td><td class="kbar"><i style="width:' + w + '%"></i></td></tr>';
        }).join('') +
        '<tr class="tot"><td><b>' + L('total') + '</b></td><td></td><td></td><td><b>' + tot + '</b> / 36</td><td></td></tr>' +
      '</tbody></table></div>' +
      '<div class="kgrid"><div><h3>' + L('manglik') + '</h3><p class="mangl ' + ((m.boy.manglik !== m.girl.manglik) ? 'yes' : 'no') + '">' + mg + '</p>' +
        (notes.length ? '<p class="mangl yes">' + notes.join('<br>') + '</p>' : '') + '</div>' +
        '<div><p class="astro-note" style="margin-top:0">' + L('m_note') + '</p><button class="btn btn-primary" type="button" id="mBook">' + L('book_milan') + '</button></div></div>' +
      '</div>';
    X.$('#mBook').onclick = function () {
      X.openBooking('kundli-milan', null, { name: MS.b.name, dob: MS.b.dob, tob: MS.b.tob, pob: MS.b.pob,
        partner: MS.g.name + ' — ' + MS.g.dob + ' ' + MS.g.tob + ', ' + MS.g.pob + ' (' + tot + '/36)' });
    };
    X.$('#mres').scrollIntoView({ behavior: 'smooth' });
  }

  /* ---------------- rashifal page ---------------- */
  var GOOD = { 1: 4, 2: 3, 3: 4, 4: 2, 5: 3, 6: 5, 7: 4, 8: 2, 9: 3, 10: 5, 11: 5, 12: 2 };
  var FAL = {
    hi: { 1: 'मन प्रसन्न रहेगा और आत्मविश्वास बढ़ेगा। नए कार्य की शुरुआत के लिए दिन अनुकूल है।', 2: 'धन के लेन-देन में सावधानी रखें, वाणी पर संयम रखें। परिवार के साथ समय सुखद रहेगा।', 3: 'पराक्रम और साहस बढ़ेगा। छोटी यात्रा या भाई-बहनों से लाभ के योग हैं।', 4: 'मन में कुछ बेचैनी रह सकती है। घर के कामों में उलझन संभव — वाहन सावधानी से चलाएँ।', 5: 'सोच-समझकर निर्णय लें। संतान या पढ़ाई को लेकर चिंता हो सकती है; जोखिम वाले काम टालें।', 6: 'विरोधियों पर विजय मिलेगी, अटके काम पूरे होंगे। स्वास्थ्य में सुधार के योग।', 7: 'दांपत्य और साझेदारी में सुख। मेल-मिलाप और यात्रा के लिए शुभ दिन।', 8: 'स्वास्थ्य और खर्च पर ध्यान दें, अनावश्यक विवाद से बचें। महामृत्युंजय मंत्र का जप लाभकारी रहेगा।', 9: 'भाग्य का आंशिक साथ मिलेगा। धार्मिक कार्यों में मन लगेगा, बड़ों की सलाह मानें।', 10: 'कार्यक्षेत्र में सफलता और मान-सम्मान बढ़ेगा। रुके हुए सरकारी काम बन सकते हैं।', 11: 'लाभ और इच्छापूर्ति के योग हैं। मित्रों व परिचितों से सहयोग मिलेगा।', 12: 'खर्च बढ़ सकता है, मन अशांत रह सकता है। दान-पुण्य और ध्यान से शांति मिलेगी।' },
    en: { 1: 'A cheerful mind and rising confidence. A good day to start something new.', 2: 'Be careful with money matters and measured in speech. Time with family goes well.', 3: 'Courage and initiative rise. Short trips or siblings bring gains.', 4: 'Some restlessness of mind. Household matters may tangle — drive carefully.', 5: 'Decide thoughtfully. Children or studies may cause concern; avoid risky moves.', 6: 'Victory over opponents and pending work gets done. Health improves.', 7: 'Harmony in marriage and partnerships. Good for meetings and travel.', 8: 'Watch health and spending; avoid needless disputes. Chanting the Maha Mrityunjaya mantra helps.', 9: 'Partial support of fortune. The mind turns to dharma; heed elders’ advice.', 10: 'Success and respect at work. Pending official matters may move.', 11: 'Gains and fulfilment of wishes. Friends and contacts help.', 12: 'Expenses may rise and the mind may feel unsettled. Charity and meditation bring peace.' }
  };
  var UPAY = {
    hi: ['हनुमान चालीसा का पाठ करें', 'माँ लक्ष्मी को सफ़ेद पुष्प अर्पित करें', 'गणेश जी को दूर्वा चढ़ाएँ', 'शिवलिंग पर जल अर्पित करें', 'सूर्यदेव को अर्घ्य दें', 'गणेश जी को दूर्वा चढ़ाएँ', 'माँ लक्ष्मी को सफ़ेद पुष्प अर्पित करें', 'हनुमान चालीसा का पाठ करें', 'पीली वस्तु का दान करें, गुरु मंत्र जपें', 'पीपल के नीचे दीपक जलाएँ', 'शनि मंत्र का जप करें', 'केले के पेड़ की पूजा करें'],
    en: ['Recite Hanuman Chalisa', 'Offer white flowers to Maa Lakshmi', 'Offer durva grass to Ganesh ji', 'Offer water on the Shivling', 'Offer arghya to Surya Dev', 'Offer durva grass to Ganesh ji', 'Offer white flowers to Maa Lakshmi', 'Recite Hanuman Chalisa', 'Donate something yellow, chant Guru mantra', 'Light a diya under a peepal tree', 'Chant Shani mantra', 'Worship a banana tree']
  };
  var GLYPH = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  function rashifalPage(qs) {
    var tp = todayParts(), isTom = qs && qs.day === 'kal';
    var base = new Date(Date.UTC(tp.y, tp.m, tp.d, 6, 30) - 5.5 * 3600e3 + (isTom ? 864e5 : 0)); // ~6 AM IST
    var mn = VJ.moonNow(new Date(base.getTime() + 6 * 3600e3)); // midday moon
    var dp = istParts(base, 5.5), key = iso(dp);
    var adm = X.D.rashifal && X.D.rashifal.date === key ? X.D.rashifal.items || {} : {};
    var lg = X.lang === 'en' ? 'en' : 'hi';
    X.$('#main').innerHTML = '<div class="wrap detail astro">' +
      '<nav class="crumbs"><a href="#/">' + X.u('home') + '</a> / ' + L('rashifal') + '</nav>' +
      '<div class="astro-head"><div><h1>' + L('r_title') + '</h1><p class="lead-s">' + X.esc(niceDate(dp)) + ' — ' + L('r_sub') + '</p></div>' +
        '<div class="seg-tabs"><a href="#/rashifal"' + (!isTom ? ' aria-current="page"' : '') + '>' + L('today') + '</a><a href="#/rashifal?day=kal"' + (isTom ? ' aria-current="page"' : '') + '>' + L('tomorrow') + '</a></div></div>' +
      '<p class="moonline">🌙 ' + L('moonin').replace('{r}', n('rashi')[mn.rashi]).replace('{n}', n('nak')[mn.nak]) + '</p>' +
      '<div class="rgrid">' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (r) {
        var h = ((mn.rashi - r + 12) % 12) + 1, a = adm[r] && adm[r][lg];
        var stars = '★★★★★'.slice(0, GOOD[h]) + '<span class="off">' + '★★★★★'.slice(GOOD[h]) + '</span>';
        return '<article class="rcard" id="r' + r + '"><div class="rg">' + GLYPH[r] + '</div><div><h3>' + n('rashi')[r] + '</h3>' +
          '<div class="rs" aria-label="' + GOOD[h] + '/5">' + stars + '</div>' +
          '<p>' + X.esc(a || FAL[lg][h]) + '</p>' + (a ? '<span class="badge">' + L('bypandit') + '</span>' : '') +
          '<p class="rup"><b>' + L('remedy') + ':</b> ' + UPAY[lg][r] + '</p></div></article>';
      }).join('') + '</div>' +
      '<p class="astro-note">' + L('r_note') + ' <a href="#/kundli">' + L('knowrashi') + '</a></p></div>';
    window.scrollTo(0, 0);
  }

  window.VSSAstro = {
    init: function (ctx) { X = ctx; },
    strip: function () { return VJ ? strip() : ''; },
    panchang: panchangPage, kundli: kundliPage, rashifal: rashifalPage, milan: milanPage,
    available: function () { return !!(window.VJ && window.Astronomy); }
  };
})();
