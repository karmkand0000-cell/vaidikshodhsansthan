/* वैदिक शोध संस्थान — पंचांग व कुंडली गणना (ब्राउज़र में, मुफ़्त)
   निर्भर: astronomy-engine (MIT) — window.Astronomy
   सायन → निरयन: लाहिड़ी अयनांश */
(function (root) {
  'use strict';
  var A = root.Astronomy || (typeof require !== 'undefined' ? require('astronomy-engine') : null);
  var D2R = Math.PI / 180, R2D = 180 / Math.PI;
  function norm(x) { x %= 360; return x < 0 ? x + 360 : x; }
  function T(date) { return (A.MakeTime(date).tt) / 36525; } // Julian centuries from J2000 (TT)
  function ayanamsa(date) { return 23.857092 + 1.396971 * T(date); }
  function precession(t) { return 1.396971 * t + 0.0003086 * t * t; }

  /* tropical (of date) ecliptic longitude */
  function tropLon(body, date) {
    var t = A.MakeTime(date);
    if (body === 'Rahu' || body === 'Ketu') {
      var tc = t.tt / 36525;
      var om = norm(125.0445479 - 1934.1362891 * tc + 0.0020754 * tc * tc);
      return body === 'Rahu' ? om : norm(om + 180);
    }
    if (body === 'Sun') return A.SunPosition(t).elon;
    if (body === 'Moon') return A.EclipticGeoMoon(t).lon;
    var v = A.GeoVector(body, t, true);
    return norm(A.Ecliptic(v).elon); // true ecliptic of date
  }
  function sidLon(body, date) { return norm(tropLon(body, date) - ayanamsa(date)); }

  function ascendant(date, lat, lon) {
    var t = A.MakeTime(date), tc = t.tt / 36525;
    var ramc = norm(A.SiderealTime(t) * 15 + lon) * D2R;
    var eps = (23.4392911 - 0.0130042 * tc) * D2R, phi = lat * D2R;
    var asc = Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) * R2D;
    return norm(norm(asc) - ayanamsa(date));
  }

  /* ---------- names ---------- */
  var N = {
    rashi: { hi: ['मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'], en: ['Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)', 'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchika (Scorpio)', 'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'] },
    nak: { hi: ['अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा', 'पुनर्वसु', 'पुष्य', 'आश्लेषा', 'मघा', 'पूर्वा फाल्गुनी', 'उत्तरा फाल्गुनी', 'हस्त', 'चित्रा', 'स्वाति', 'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूल', 'पूर्वाषाढ़ा', 'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्वा भाद्रपद', 'उत्तरा भाद्रपद', 'रेवती'],
      en: ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'] },
    tithi: { hi: ['प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा', 'अमावस्या'],
      en: ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima', 'Amavasya'] },
    paksha: { hi: ['शुक्ल पक्ष', 'कृष्ण पक्ष'], en: ['Shukla Paksha', 'Krishna Paksha'] },
    yoga: { hi: ['विष्कुम्भ', 'प्रीति', 'आयुष्मान', 'सौभाग्य', 'शोभन', 'अतिगण्ड', 'सुकर्मा', 'धृति', 'शूल', 'गण्ड', 'वृद्धि', 'ध्रुव', 'व्याघात', 'हर्षण', 'वज्र', 'सिद्धि', 'व्यतीपात', 'वरीयान', 'परिघ', 'शिव', 'सिद्ध', 'साध्य', 'शुभ', 'शुक्ल', 'ब्रह्म', 'इन्द्र', 'वैधृति'],
      en: ['Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyana', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'] },
    karana: { hi: ['किंस्तुघ्न', 'बव', 'बालव', 'कौलव', 'तैतिल', 'गर', 'वणिज', 'विष्टि (भद्रा)', 'शकुनि', 'चतुष्पद', 'नाग'], en: ['Kimstughna', 'Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti (Bhadra)', 'Shakuni', 'Chatushpada', 'Naga'] },
    vaar: { hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'], en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
    masa: { hi: ['चैत्र', 'वैशाख', 'ज्येष्ठ', 'आषाढ़', 'श्रावण', 'भाद्रपद', 'आश्विन', 'कार्तिक', 'मार्गशीर्ष', 'पौष', 'माघ', 'फाल्गुन'], en: ['Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada', 'Ashwin', 'Kartik', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna'] },
    graha: { hi: { Sun: 'सूर्य', Moon: 'चंद्र', Mars: 'मंगल', Mercury: 'बुध', Jupiter: 'गुरु', Venus: 'शुक्र', Saturn: 'शनि', Rahu: 'राहु', Ketu: 'केतु', Lagna: 'लग्न' },
      en: { Sun: 'Sun', Moon: 'Moon', Mars: 'Mars', Mercury: 'Mercury', Jupiter: 'Jupiter', Venus: 'Venus', Saturn: 'Saturn', Rahu: 'Rahu', Ketu: 'Ketu', Lagna: 'Ascendant' } },
    short: { hi: { Sun: 'सू', Moon: 'चं', Mars: 'मं', Mercury: 'बु', Jupiter: 'गु', Venus: 'शु', Saturn: 'श', Rahu: 'रा', Ketu: 'के' }, en: { Sun: 'Su', Moon: 'Mo', Mars: 'Ma', Mercury: 'Me', Jupiter: 'Ju', Venus: 'Ve', Saturn: 'Sa', Rahu: 'Ra', Ketu: 'Ke' } }
  };
  var PLANETS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
  var NAKLEN = 360 / 27;

  /* ---------- panchang elements at a moment ---------- */
  function elements(date) {
    var s = tropLon('Sun', date), m = tropLon('Moon', date), ay = ayanamsa(date);
    var diff = norm(m - s), ss = norm(s - ay), ms = norm(m - ay);
    var k = Math.floor(diff / 6);
    var kar = k === 0 ? 0 : k >= 57 ? k - 49 : ((k - 1) % 7) + 1;
    return {
      tithi: Math.floor(diff / 12), diff: diff, karana: kar, karanaIdx: k,
      nak: Math.floor(ms / NAKLEN), pada: Math.floor((ms % NAKLEN) / (NAKLEN / 4)) + 1,
      yoga: Math.floor(norm(ss + ms) / NAKLEN), sunRashi: Math.floor(ss / 30), moonRashi: Math.floor(ms / 30), sunSid: ss, moonSid: ms
    };
  }

  /* time when f(date) changes from its value at `from` (search ahead up to maxH hours) */
  function nextChange(from, f, maxH) {
    var v0 = f(from), t0 = from.getTime(), step = 3600e3, t = t0, hi = null;
    for (var i = 0; i < (maxH || 40); i++) { t += step; if (f(new Date(t)) !== v0) { hi = t; break; } }
    if (hi === null) return null;
    var lo = hi - step;
    while (hi - lo > 30e3) { var mid = (lo + hi) / 2; if (f(new Date(mid)) === v0) lo = mid; else hi = mid; }
    return new Date(hi);
  }

  /* local day helpers — tz in hours east of UTC */
  function localMidnightUTC(y, mo, d, tz) { return new Date(Date.UTC(y, mo, d) - tz * 3600e3); }
  function riseSet(body, start, lat, lon, dir) {
    var obs = new A.Observer(lat, lon, 0);
    var r = A.SearchRiseSet(body, obs, dir, start, 1.2);
    return r ? r.date : null;
  }

  function amantaMonth(date) {
    var nm = A.SearchMoonPhase(0, new Date(date.getTime() - 31 * 864e5), 32); // last new moon before date
    var last = nm.date;
    while (true) { var n2 = A.SearchMoonPhase(0, new Date(last.getTime() + 864e5), 32); if (!n2 || n2.date > date) break; last = n2.date; }
    var next = A.SearchMoonPhase(0, new Date(last.getTime() + 864e5), 32).date;
    var r1 = Math.floor(sidLon('Sun', last) / 30), r2 = Math.floor(sidLon('Sun', next) / 30);
    return { idx: (r1 + 1) % 12, adhik: r1 === r2, newMoon: last };
  }

  /* full daily panchang for a date (y, month0, d) at place */
  function panchang(y, mo, d, place) {
    var tz = place.tz, lat = place.lat, lon = place.lon;
    var mid = localMidnightUTC(y, mo, d, tz);
    var sunrise = riseSet('Sun', mid, lat, lon, +1) || new Date(mid.getTime() + 6 * 3600e3);
    var sunset = riseSet('Sun', sunrise, lat, lon, -1) || new Date(mid.getTime() + 18 * 3600e3);
    var nextRise = riseSet('Sun', new Date(sunset.getTime() + 3600e3), lat, lon, +1) || new Date(sunrise.getTime() + 864e5);
    var moonrise = riseSet('Moon', mid, lat, lon, +1), moonset = riseSet('Moon', mid, lat, lon, -1);
    if (moonrise && moonrise - mid > 864e5) moonrise = null; if (moonset && moonset - mid > 864e5) moonset = null;
    var e = elements(sunrise);
    var tithiEnd = nextChange(sunrise, function (t) { return elements(t).tithi; }, 30);
    var nakEnd = nextChange(sunrise, function (t) { return elements(t).nak; }, 30);
    var yogaEnd = nextChange(sunrise, function (t) { return elements(t).yoga; }, 30);
    var karEnd = nextChange(sunrise, function (t) { return elements(t).karanaIdx; }, 16);
    var weekday = new Date(Date.UTC(y, mo, d)).getUTCDay();
    var dayLen = sunset - sunrise, part = dayLen / 8;
    var seg = function (n) { return [new Date(sunrise.getTime() + (n - 1) * part), new Date(sunrise.getTime() + n * part)]; };
    var noon = new Date(sunrise.getTime() + dayLen / 2), mu = dayLen / 15;
    var am = amantaMonth(sunrise);
    var paksha = e.tithi < 15 ? 0 : 1;
    var pm = paksha === 1 ? (am.idx + 1) % 12 : am.idx;
    var vs = (am.idx <= 8 || mo >= 3) && !(am.idx >= 9 && mo <= 3) ? y + 57 : y + 56;
    // sankranti today?
    var sank = Math.floor(sidLon('Sun', sunrise) / 30) !== Math.floor(sidLon('Sun', nextRise) / 30) ? Math.floor(sidLon('Sun', nextRise) / 30) : -1;
    return {
      date: { y: y, m: mo, d: d }, weekday: weekday, sunrise: sunrise, sunset: sunset, moonrise: moonrise, moonset: moonset,
      tithi: e.tithi, tithiEnd: tithiEnd, paksha: paksha, nak: e.nak, nakEnd: nakEnd, yoga: e.yoga, yogaEnd: yogaEnd,
      karana: e.karana, karanaEnd: karEnd, sunRashi: e.sunRashi, moonRashi: e.moonRashi,
      amanta: am.idx, purnimanta: pm, adhik: am.adhik, vikram: vs, shaka: vs - 135,
      rahu: seg([8, 2, 7, 5, 6, 4, 3][weekday]), yamaganda: seg([5, 4, 3, 2, 1, 7, 6][weekday]), gulika: seg([7, 6, 5, 4, 3, 2, 1][weekday]),
      abhijit: [new Date(noon.getTime() - mu / 2), new Date(noon.getTime() + mu / 2)],
      sankranti: sank, ayanamsa: ayanamsa(sunrise)
    };
  }

  /* ---------- festivals & vrat for a range of days ---------- */
  // rule: [amantaMonthIdx, tithiIdx(0..29), when, nameHi, nameEn]; when: 'rise' | 'set' | 'night' | 'moon'
  var FEST = [
    [0, 0, 'rise', 'चैत्र नवरात्रि आरंभ / नव संवत्सर', 'Chaitra Navratri begins / Hindu New Year'],
    [0, 8, 'rise', 'राम नवमी', 'Ram Navami'],
    [0, 14, 'rise', 'हनुमान जयंती', 'Hanuman Jayanti'],
    [1, 2, 'rise', 'अक्षय तृतीया', 'Akshaya Tritiya'],
    [3, 10, 'rise', 'देवशयनी एकादशी', 'Devshayani Ekadashi'],
    [3, 14, 'rise', 'गुरु पूर्णिमा', 'Guru Purnima'],
    [4, 4, 'rise', 'नाग पंचमी', 'Nag Panchami'],
    [4, 14, 'rise', 'रक्षा बंधन', 'Raksha Bandhan'],
    [4, 22, 'night', 'श्री कृष्ण जन्माष्टमी', 'Krishna Janmashtami'],
    [5, 2, 'rise', 'हरतालिका तीज', 'Hartalika Teej'],
    [5, 3, 'noon', 'गणेश चतुर्थी', 'Ganesh Chaturthi'],
    [5, 13, 'rise', 'अनंत चतुर्दशी', 'Anant Chaturdashi'],
    [5, 29, 'rise', 'सर्वपितृ अमावस्या', 'Sarvapitri Amavasya'],
    [6, 0, 'rise', 'शारदीय नवरात्रि आरंभ', 'Sharad Navratri begins'],
    [6, 7, 'rise', 'दुर्गा अष्टमी', 'Durga Ashtami'],
    [6, 9, 'apar', 'विजयादशमी (दशहरा)', 'Vijayadashami (Dussehra)'],
    [6, 14, 'set', 'शरद पूर्णिमा', 'Sharad Purnima'],
    [6, 18, 'moon', 'करवा चौथ', 'Karwa Chauth'],
    [6, 27, 'set', 'धनतेरस', 'Dhanteras'],
    [6, 29, 'set', 'दीपावली — लक्ष्मी पूजन', 'Diwali — Lakshmi Pujan'],
    [7, 0, 'rise', 'गोवर्धन पूजा', 'Govardhan Puja'],
    [7, 1, 'rise', 'भाई दूज', 'Bhai Dooj'],
    [7, 5, 'rise', 'छठ पूजा', 'Chhath Puja'],
    [7, 10, 'rise', 'देवउठनी एकादशी / तुलसी विवाह', 'Dev Uthani Ekadashi / Tulsi Vivah'],
    [7, 14, 'rise', 'कार्तिक पूर्णिमा / देव दीपावली', 'Kartik Purnima / Dev Deepawali'],
    [10, 4, 'rise', 'वसंत पंचमी', 'Vasant Panchami'],
    [10, 28, 'night', 'महाशिवरात्रि', 'Maha Shivratri'],
    [11, 14, 'set', 'होलिका दहन', 'Holika Dahan'],
    [11, 15, 'rise', 'होली', 'Holi']
  ];

  function tithiAt(date) { return elements(date).tithi; }

  /* list of events between start (y,m0,d) for n days */
  function events(y, mo, d, n, place) {
    var days = [], i, tz = place.tz;
    for (i = 0; i <= n; i++) {
      var dt = new Date(Date.UTC(y, mo, d + i)), Y = dt.getUTCFullYear(), M = dt.getUTCMonth(), Dd = dt.getUTCDate();
      var mid = localMidnightUTC(Y, M, Dd, tz);
      var rise = riseSet('Sun', mid, place.lat, place.lon, +1) || new Date(mid.getTime() + 6 * 3600e3);
      var set = riseSet('Sun', rise, place.lat, place.lon, -1) || new Date(mid.getTime() + 18 * 3600e3);
      var night = new Date(mid.getTime() + 864e5); // local midnight at end of day
      var moon = new Date(set.getTime() + 2 * 3600e3), len = set - rise;
      var noon = new Date(rise.getTime() + len / 2), apar = new Date(rise.getTime() + len * 0.7);
      var amd = amantaMonth(rise);
      days.push({ y: Y, m: M, d: Dd, rise: rise, t: { rise: tithiAt(rise), set: tithiAt(set), night: tithiAt(night), moon: tithiAt(moon), noon: tithiAt(noon), apar: tithiAt(apar) }, am: amd.adhik ? -1 : amd.idx, amx: amd, sunR: Math.floor(sidLon('Sun', rise) / 30) });
    }
    var out = [];
    for (i = 0; i < n; i++) {
      var a = days[i], b = days[i + 1], list = [];
      var amx = a.amx, am = a.am;
      var tr = a.t.rise;
      var hit = function (target, when) {
        var t0 = a.t[when], t1 = b.t[when];
        if (t0 === target) return !(i > 0 && days[i - 1].t[when] === target) ? 'a' : false; // first day only
        var dist = function (x) { return (x - target + 30) % 30; };
        return (dist(t0) > 15 && dist(t1) < 15 && t1 !== target && dist(t1) > 0) ? 'k' : false; // tithi skipped (kshaya)
      };
      FEST.forEach(function (f) { var h = hit(f[1], f[2]); if (h && f[0] === (h === 'k' && f[1] < 15 ? b.am : am)) list.push({ hi: f[3], en: f[4], major: true }); });
      if (tr === 10 || tr === 25) list.push({ hi: 'एकादशी व्रत', en: 'Ekadashi vrat' });
      if (tr === 14) list.push({ hi: 'पूर्णिमा', en: 'Purnima' });
      if (tr === 29) list.push({ hi: 'अमावस्या', en: 'Amavasya' });
      if (a.t.moon === 18 && hit(18, 'moon')) list.push({ hi: 'संकष्टी चतुर्थी', en: 'Sankashti Chaturthi' });
      if (a.t.set === 12 || a.t.set === 27) { if (hit(a.t.set, 'set')) list.push({ hi: 'प्रदोष व्रत', en: 'Pradosh vrat' }); }
      if (a.t.night === 28 && hit(28, 'night') && !list.some(function (x) { return x.major && /शिवरात्रि/.test(x.hi); })) list.push({ hi: 'मासिक शिवरात्रि', en: 'Masik Shivratri' });
      if (a.sunR !== b.sunR) list.push({ hi: (b.sunR === 9 ? 'मकर संक्रांति' : N.rashi.hi[b.sunR] + ' संक्रांति'), en: (b.sunR === 9 ? 'Makar Sankranti' : N.rashi.en[b.sunR].split(' ')[0] + ' Sankranti'), major: b.sunR === 9 });
      // de-dup ekadashi when named ekadashi present
      if (list.some(function (x) { return x.major && /एकादशी/.test(x.hi); })) list = list.filter(function (x) { return x.hi !== 'एकादशी व्रत'; });
      if (list.some(function (x) { return x.major && /पूर्णिमा/.test(x.hi); })) list = list.filter(function (x) { return x.hi !== 'पूर्णिमा'; });
      if (list.some(function (x) { return x.major && /अमावस्या|दीपावली/.test(x.hi); })) list = list.filter(function (x) { return x.hi !== 'अमावस्या'; });
      out.push({ y: a.y, m: a.m, d: a.d, tithi: tr, amanta: amx.idx, adhik: amx.adhik, events: list });
    }
    return out;
  }

  /* ---------- kundli ---------- */
  var DASHA = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
  var DYRS = [7, 20, 6, 10, 7, 18, 16, 19, 17];
  function kundli(birthUTC, lat, lon) {
    var asc = ascendant(birthUTC, lat, lon), lagna = Math.floor(asc / 30);
    var pl = PLANETS.map(function (p) {
      var L = sidLon(p, birthUTC), retro = false;
      if (p !== 'Sun' && p !== 'Moon' && p !== 'Rahu' && p !== 'Ketu') {
        var a = sidLon(p, new Date(birthUTC.getTime() - 6 * 3600e3)), b = sidLon(p, new Date(birthUTC.getTime() + 6 * 3600e3));
        retro = norm(b - a + 180) - 180 < 0;
      }
      if (p === 'Rahu' || p === 'Ketu') retro = true;
      var r = Math.floor(L / 30);
      return { id: p, lon: L, rashi: r, deg: L % 30, nak: Math.floor(L / NAKLEN), pada: Math.floor((L % NAKLEN) / (NAKLEN / 4)) + 1, house: ((r - lagna + 12) % 12) + 1, retro: retro };
    });
    var moon = pl[1], nk = moon.nak, lordIdx = nk % 9, frac = (moon.lon % NAKLEN) / NAKLEN;
    var dashas = [], start = new Date(birthUTC.getTime() - frac * DYRS[lordIdx] * 365.25 * 864e5);
    for (var i = 0; i < 9; i++) {
      var li = (lordIdx + i) % 9, end = new Date(start.getTime() + DYRS[li] * 365.25 * 864e5);
      dashas.push({ lord: DASHA[li], start: start, end: end }); start = end;
    }
    var mars = pl[2];
    var manglik = [1, 4, 7, 8, 12].indexOf(mars.house) > -1;
    var manglikMoon = [1, 4, 7, 8, 12].indexOf(((mars.rashi - moon.rashi + 12) % 12) + 1) > -1;
    return { asc: asc, lagna: lagna, planets: pl, moonRashi: moon.rashi, nak: nk, pada: moon.pada, sunRashi: pl[0].rashi, dashas: dashas, manglik: manglik, manglikMoon: manglikMoon, ayanamsa: ayanamsa(birthUTC) };
  }

  /* moon rashi right now — for rashifal */
  function moonNow(date) { var L = sidLon('Moon', date || new Date()); return { rashi: Math.floor(L / 30), nak: Math.floor(L / NAKLEN), lon: L }; }

  /* timezone offset (hours) for an IANA zone at a given wall-clock date */
  function tzOffset(zone, y, mo, d, h, mi) {
    if (!zone) return 5.5;
    try {
      var guess = Date.UTC(y, mo, d, h, mi);
      var f = new Intl.DateTimeFormat('en-US', { timeZone: zone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' });
      var get = function (ts) { var p = {}; f.formatToParts(new Date(ts)).forEach(function (x) { p[x.type] = +x.value; }); return (Date.UTC(p.year, p.month - 1, p.day, p.hour % 24, p.minute) - ts) / 3600e3; };
      var off = get(guess); return get(guess - off * 3600e3);
    } catch (e) { return 5.5; }
  }


  /* ---------- अष्टकूट गुण मिलान ---------- */
  var VARNA = [1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0]; // 0 ब्राह्मण 1 क्षत्रिय 2 वैश्य 3 शूद्र (by rashi)
  var VARNA_N = { hi: ['ब्राह्मण', 'क्षत्रिय', 'वैश्य', 'शूद्र'], en: ['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra'] };
  function vashyaOf(lon) { var r = Math.floor(lon / 30), d = lon % 30;
    if (r === 8) return d < 15 ? 1 : 0; if (r === 9) return d < 15 ? 0 : 2;
    return [0, 0, 1, 2, 3, 1, 1, 4, 0, 0, 1, 2][r]; }
  var VASHYA_N = { hi: ['चतुष्पद', 'मानव', 'जलचर', 'वनचर', 'कीट'], en: ['Chatushpad', 'Manav', 'Jalchar', 'Vanchar', 'Keet'] };
  var VASHYA_T = [[2, 1, 1, 0.5, 1], [1, 2, 0.5, 0, 1], [1, 0.5, 2, 1, 1], [0.5, 0, 1, 2, 0], [1, 1, 1, 0, 2]];
  var YONI = [0, 1, 2, 3, 3, 4, 5, 2, 5, 6, 6, 7, 8, 9, 8, 9, 10, 10, 4, 11, 12, 11, 13, 0, 13, 7, 1];
  var YONI_N = { hi: ['अश्व', 'गज', 'मेष', 'सर्प', 'श्वान', 'मार्जार', 'मूषक', 'गौ', 'महिष', 'व्याघ्र', 'मृग', 'वानर', 'नकुल', 'सिंह'], en: ['Horse', 'Elephant', 'Sheep', 'Serpent', 'Dog', 'Cat', 'Rat', 'Cow', 'Buffalo', 'Tiger', 'Deer', 'Monkey', 'Mongoose', 'Lion'] };
  var YONI_T = [[4,2,2,3,2,2,2,1,0,1,3,3,2,1],[2,4,3,3,2,2,2,2,3,1,2,3,2,0],[2,3,4,2,1,2,1,3,3,1,2,0,3,1],[3,3,2,4,2,1,1,1,1,2,2,2,0,2],[2,2,1,2,4,2,1,2,2,1,0,2,1,1],[2,2,2,1,2,4,0,2,2,1,3,3,2,1],[2,2,1,1,1,0,4,2,2,2,2,2,1,2],[1,2,3,1,2,2,2,4,3,0,3,2,2,1],[0,3,3,1,2,2,2,3,4,1,2,2,2,1],[1,1,1,2,1,1,2,0,1,4,1,1,2,1],[3,2,2,2,0,3,2,3,2,1,4,2,2,1],[3,3,0,2,2,3,2,2,2,1,2,4,3,2],[2,2,3,0,1,2,1,2,2,2,2,3,4,2],[1,0,1,2,1,1,2,1,1,1,1,2,2,4]];
  var LORD = [2, 5, 3, 1, 0, 3, 5, 2, 4, 6, 6, 4]; // Sun0 Moon1 Mars2 Merc3 Jup4 Ven5 Sat6
  var LORD_ID = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  var MAITRI_T = [[5,5,5,4,5,0,0],[5,5,4,1,4,0.5,0.5],[5,4,5,0.5,5,3,0.5],[4,1,0.5,5,0.5,5,4],[5,4,5,0.5,5,0.5,3],[0,0.5,3,5,0.5,5,5],[0,0.5,0.5,4,3,5,5]];
  var GANA = [0,1,2,1,0,1,0,0,2,2,1,1,0,2,0,2,0,2,2,1,1,0,2,2,1,1,0];
  var GANA_N = { hi: ['देव', 'मनुष्य', 'राक्षस'], en: ['Deva', 'Manushya', 'Rakshasa'] };
  var GANA_T = [[6, 5, 1], [6, 6, 0], [1, 0, 6]]; // वर (row) × वधू (col)
  var NADI = [0,1,2,2,1,0,0,1,2,2,1,0,0,1,2,2,1,0,0,1,2,2,1,0,0,1,2];
  var NADI_N = { hi: ['आदि', 'मध्य', 'अन्त्य'], en: ['Aadi', 'Madhya', 'Antya'] };

  function milan(boy, girl) {
    var bL = boy.planets[1].lon, gL = girl.planets[1].lon;
    var bR = Math.floor(bL / 30), gR = Math.floor(gL / 30), bN = Math.floor(bL / NAKLEN), gN = Math.floor(gL / NAKLEN);
    var K = [];
    // 1 वर्ण
    K.push({ id: 'varna', max: 1, got: VARNA[bR] <= VARNA[gR] ? 1 : 0, b: VARNA_N, bi: VARNA[bR], gi: VARNA[gR] });
    // 2 वश्य
    var bv = vashyaOf(bL), gv = vashyaOf(gL);
    K.push({ id: 'vashya', max: 2, got: VASHYA_T[bv][gv], b: VASHYA_N, bi: bv, gi: gv });
    // 3 तारा
    var t1 = ((bN - gN + 27) % 27 + 1) % 9, t2 = ((gN - bN + 27) % 27 + 1) % 9;
    var bad = function (x) { return x === 3 || x === 5 || x === 7; };
    K.push({ id: 'tara', max: 3, got: (bad(t1) ? 0 : 1.5) + (bad(t2) ? 0 : 1.5), b: null, bi: t2 === 0 ? 9 : t2, gi: t1 === 0 ? 9 : t1 });
    // 4 योनि
    K.push({ id: 'yoni', max: 4, got: YONI_T[YONI[bN]][YONI[gN]], b: YONI_N, bi: YONI[bN], gi: YONI[gN] });
    // 5 ग्रह मैत्री
    var maitri = MAITRI_T[LORD[bR]][LORD[gR]];
    K.push({ id: 'maitri', max: 5, got: maitri, lord: true, bi: LORD[bR], gi: LORD[gR] });
    // 6 गण
    K.push({ id: 'gana', max: 6, got: GANA_T[GANA[bN]][GANA[gN]], b: GANA_N, bi: GANA[bN], gi: GANA[gN] });
    // 7 भकूट
    var d1 = ((bR - gR + 12) % 12) + 1, d2 = ((gR - bR + 12) % 12) + 1, pair = [Math.min(d1, d2), Math.max(d1, d2)].join('-');
    var bhakootDosh = ['2-12', '5-9', '6-8'].indexOf(pair) > -1;
    var bhakootParihar = bhakootDosh && (LORD[bR] === LORD[gR] || maitri >= 4);
    K.push({ id: 'bhakoot', max: 7, got: bhakootDosh ? 0 : 7, dosh: bhakootDosh, parihar: bhakootParihar, bi: d1, gi: d2, rashi: true });
    // 8 नाड़ी
    var nadiDosh = NADI[bN] === NADI[gN];
    var nadiParihar = nadiDosh && ((bR === gR && bN !== gN) || (bN === gN && bR !== gR));
    K.push({ id: 'nadi', max: 8, got: nadiDosh ? 0 : 8, dosh: nadiDosh, parihar: nadiParihar, b: NADI_N, bi: NADI[bN], gi: NADI[gN] });
    var total = K.reduce(function (a, k) { return a + k.got; }, 0);
    return { kootas: K, total: total, boy: { rashi: bR, nak: bN, manglik: boy.manglik || boy.manglikMoon }, girl: { rashi: gR, nak: gN, manglik: girl.manglik || girl.manglikMoon }, LORD_ID: LORD_ID };
  }

  var api = { N: N, PLANETS: PLANETS, ayanamsa: ayanamsa, sidLon: sidLon, tropLon: tropLon, ascendant: ascendant, elements: elements, panchang: panchang, events: events, kundli: kundli, moonNow: moonNow, tzOffset: tzOffset, amantaMonth: amantaMonth, milan: milan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.VJ = api;
})(typeof window !== 'undefined' ? window : globalThis);
