/* वैदिक शोध संस्थान — पूजा मंडलों के चित्र (SVG)
   हर मंडल का कोष्ठ-विन्यास प्रचलित कर्मकांड पद्धति के चक्रों का अध्ययन करके बनाया गया है:
   सर्वतोभद्र 18×18 (324 कोष्ठ), चतुर्लिंगतोभद्र 17×17, वास्तु 81 पद, नवग्रह 3×3,
   षोडश मातृका 4×4, सप्तघृत मातृका (वसोर्धारा), क्षेत्रपाल 3×3 (49), चौंसठ योगिनी 3+64, दशदिक्पाल। */
(function () {
  'use strict';
  var C = { w: '#FFFDF6', R: '#C62828', G: '#2E8B3A', Y: '#F4C20D', k: '#1C1A19', L: '#FFFDF6', line: '#9C8B76', ink: '#2A1810', gold: '#B88A3B', maroon: '#7E1F1A' };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function svg(vb, body, label) { return '<svg viewBox="' + vb + '" class="md-svg" role="img"' + (label ? ' aria-label="' + esc(label) + '"' : '') + ' xmlns="http://www.w3.org/2000/svg">' + body + '</svg>'; }
  function rect(x, y, w, h, fill, extra) { return '<rect x="' + x.toFixed(2) + '" y="' + y.toFixed(2) + '" width="' + w.toFixed(2) + '" height="' + h.toFixed(2) + '" fill="' + fill + '"' + (extra || '') + '/>'; }
  function txt(x, y, s, cls, extra) { return '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" text-anchor="middle" class="' + cls + '"' + (extra || '') + '>' + esc(s) + '</text>'; }
  function star(cx, cy, n, r1, r2, fill, stroke) {
    var p = [];
    for (var i = 0; i < n * 2; i++) { var a = -Math.PI / 2 + i * Math.PI / n, r = i % 2 ? r2 : r1; p.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1)); }
    return '<polygon points="' + p.join(' ') + '" fill="' + fill + '" stroke="' + (stroke || 'none') + '" stroke-width="1.5"/>';
  }
  function lotus(cx, cy, r, petal, stroke, karnika) {
    var s = '';
    for (var i = 0; i < 8; i++) {
      var a = i * 45;
      s += '<path d="M ' + cx + ' ' + cy + ' C ' + (cx - r * 0.42) + ' ' + (cy - r * 0.45) + ', ' + (cx - r * 0.28) + ' ' + (cy - r * 0.9) + ', ' + cx + ' ' + (cy - r) + ' C ' + (cx + r * 0.28) + ' ' + (cy - r * 0.9) + ', ' + (cx + r * 0.42) + ' ' + (cy - r * 0.45) + ', ' + cx + ' ' + cy + ' Z" fill="' + petal + '" stroke="' + stroke + '" stroke-width="1.6" transform="rotate(' + a + ' ' + cx + ' ' + cy + ')"/>';
    }
    return s + '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.3) + '" fill="' + karnika + '" stroke="' + stroke + '" stroke-width="1.6"/>';
  }
  // three outer bands: white (सत्त्व), red (रज), black (तम)
  function bands(x, y, s) {
    var b = s * 0.035;
    return rect(x - 3 * b, y - 3 * b, s + 6 * b, s + 6 * b, C.k) + rect(x - 2 * b, y - 2 * b, s + 4 * b, s + 4 * b, C.R) + rect(x - b, y - b, s + 2 * b, s + 2 * b, C.w);
  }
  function grid(rows, x0, y0, size) {
    var n = rows.length, c = size / n, s = '';
    for (var j = 0; j < n; j++) for (var i = 0; i < n; i++) {
      var ch = rows[j][i]; if (ch === 'L') continue;
      s += rect(x0 + i * c, y0 + j * c, c, c, C[ch] || C.w, ' stroke="' + C.line + '" stroke-width="' + (c * 0.035).toFixed(2) + '"');
    }
    return s;
  }

  /* ---------- सर्वतोभद्र (18×18) ---------- */
  var SARVA = ['wwGRRRRRwwRRRRRGww', 'wkGGRRRwwwwRRRGGkw', 'GGkGGRwwwwwwRGGkGG', 'RGGkGGwwwwwwGGkGGR', 'RRGGkGGwwwwGGkGGRR', 'RRRGGkGGwwGGkGGRRR', 'RRwwGGYYYYYYGGwwRR', 'RwwwwGYLLLLYGwwwwR', 'wwwwwwYLLLLYwwwwww', 'wwwwwwYLLLLYwwwwww', 'RwwwwGYLLLLYGwwwwR', 'RRwwGGYYYYYYGGwwRR', 'RRRGGkGGwwGGkGGRRR', 'RRGGkGGwwwwGGkGGRR', 'RGGkGGwwwwwwGGkGGR', 'GGkGGRwwwwwwRGGkGG', 'wkGGRRRwwwwRRRGGkw', 'wwGRRRRRwwRRRRRGww'];
  function sarvatobhadra() {
    var x = 40, s = 400, c = s / 18, b = bands(x, x, s) + grid(SARVA, x, x, s);
    b += rect(x + 7 * c, x + 7 * c, 4 * c, 4 * c, C.Y, ' stroke="' + C.line + '" stroke-width=".8"');
    b += lotus(x + 9 * c, x + 9 * c, 1.9 * c, C.w, C.R, C.Y);
    return svg('0 0 480 480', b);
  }
  /* ---------- चतुर्लिंगतोभद्र (17×17) ---------- */
  var LINGA = ['wwGRRRkkkkkRRRGww', 'wkGGRYwkkkwYRGGkw', 'GGkGGwwwkwwwGGkGG', 'RGGkGGwkkkwGGkGGR', 'RRGGYYkkkkkYYGGRR', 'RYwGYRRRkRRRYGwYR', 'kwwwkRYYYYYRkwwwk', 'kkwkkRYLLLYRkkwkk', 'kkkkkkYLLLYkkkkkk', 'kkwkkRYLLLYRkkwkk', 'kwwwkRYYYYYRkwwwk', 'RYwGYRRRkRRRYGwYR', 'RRGGYYkkkkkYYGGRR', 'RGGkGGwkkkwGGkGGR', 'GGkGGwwwkwwwGGkGG', 'wkGGRYwkkkwYRGGkw', 'wwGRRRkkkkkRRRGww'];
  function lingatobhadra() {
    var x = 40, s = 400, c = s / 17, b = bands(x, x, s) + grid(LINGA, x, x, s);
    b += rect(x + 7 * c, x + 7 * c, 3 * c, 3 * c, C.w, ' stroke="' + C.R + '" stroke-width="3"');
    b += star(x + 8.5 * c, x + 8.5 * c, 8, 1.25 * c, 0.42 * c, C.R, '#7A1010') + '<circle cx="' + (x + 8.5 * c) + '" cy="' + (x + 8.5 * c) + '" r="' + (0.3 * c) + '" fill="' + C.Y + '" stroke="#7A1010"/>';
    return svg('0 0 480 480', b);
  }

  /* ---------- नवग्रह (3×3, पूर्व ऊपर) ---------- */
  function nvShape(kind, cx, cy, r) {
    var ink = ' stroke="#2A1810" stroke-width="2"';
    switch (kind) {
      case 'sun': return star(cx, cy, 12, r * 1.05, r * 0.72, C.R, '#8E1616') + '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.62) + '" fill="#E53935" stroke="#F4C20D" stroke-width="2"/>';
      case 'moon': return '<path d="M ' + (cx + r * 0.35) + ' ' + (cy - r * 0.95) + ' A ' + r + ' ' + r + ' 0 1 0 ' + (cx + r * 0.35) + ' ' + (cy + r * 0.95) + ' A ' + (r * 0.78) + ' ' + (r * 0.78) + ' 0 1 1 ' + (cx + r * 0.35) + ' ' + (cy - r * 0.95) + ' Z" fill="#FFFFFF"' + ink + '/>';
      case 'triangle': return '<polygon points="' + (cx - r * 0.75) + ',' + (cy - r) + ' ' + (cx + r) + ',' + cy + ' ' + (cx - r * 0.75) + ',' + (cy + r) + '" fill="' + C.R + '"' + ink + '/>';
      case 'arrow': return '<g fill="' + C.G + '"' + ink + '><polygon points="' + (cx - r * 1.1) + ',' + cy + ' ' + (cx - r * 0.5) + ',' + (cy - r * 0.5) + ' ' + (cx - r * 0.5) + ',' + (cy - r * 0.12) + ' ' + (cx + r * 0.55) + ',' + (cy - r * 0.12) + ' ' + (cx + r * 1.05) + ',' + (cy - r * 0.55) + ' ' + (cx + r * 0.85) + ',' + cy + ' ' + (cx + r * 1.05) + ',' + (cy + r * 0.55) + ' ' + (cx + r * 0.55) + ',' + (cy + r * 0.12) + ' ' + (cx - r * 0.5) + ',' + (cy + r * 0.12) + ' ' + (cx - r * 0.5) + ',' + (cy + r * 0.5) + '"/></g>';
      case 'rect': return rect(cx - r * 1.05, cy - r * 0.68, r * 2.1, r * 1.36, C.Y, ink);
      case 'hex': var p = []; for (var i = 0; i < 6; i++) { var a = i * Math.PI / 3; p.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1)); } return '<polygon points="' + p.join(' ') + '" fill="#FFFFFF"' + ink + '/>';
      case 'bow': return '<path d="M ' + (cx - r) + ' ' + (cy - r * 0.35) + ' Q ' + cx + ' ' + (cy + r * 1.25) + ' ' + (cx + r) + ' ' + (cy - r * 0.35) + '" fill="none" stroke="' + C.k + '" stroke-width="' + (r * 0.28) + '" stroke-linecap="round"/><line x1="' + (cx - r) + '" y1="' + (cy - r * 0.35) + '" x2="' + (cx + r) + '" y2="' + (cy - r * 0.35) + '" stroke="' + C.k + '" stroke-width="2"/>';
      case 'winnow': return '<polygon points="' + (cx - r * 0.8) + ',' + (cy - r * 0.55) + ' ' + (cx + r * 0.95) + ',' + (cy - r * 0.95) + ' ' + (cx + r * 0.95) + ',' + (cy + r * 0.95) + ' ' + (cx - r * 0.8) + ',' + (cy + r * 0.55) + '" fill="' + C.k + '"' + ink + '/>';
      case 'flag': return '<line x1="' + (cx - r * 0.8) + '" y1="' + (cy - r) + '" x2="' + (cx - r * 0.8) + '" y2="' + (cy + r * 1.05) + '" stroke="' + C.k + '" stroke-width="3"/><polygon points="' + (cx - r * 0.8) + ',' + (cy - r) + ' ' + (cx + r) + ',' + (cy - r * 0.2) + ' ' + (cx - r * 0.8) + ',' + (cy + r * 0.55) + '" fill="#3B3B3B"' + ink + '/>';
    }
    return '';
  }
  var NV = [ // [col,row] with East at top
    { k: 'arrow', c: 0, r: 0, hi: 'बुध', en: 'Budha' }, { k: 'hex', c: 1, r: 0, hi: 'शुक्र', en: 'Shukra' }, { k: 'moon', c: 2, r: 0, hi: 'चन्द्र', en: 'Chandra' },
    { k: 'rect', c: 0, r: 1, hi: 'बृहस्पति', en: 'Guru' }, { k: 'sun', c: 1, r: 1, hi: 'सूर्य', en: 'Surya' }, { k: 'triangle', c: 2, r: 1, hi: 'मंगल', en: 'Mangala' },
    { k: 'flag', c: 0, r: 2, hi: 'केतु', en: 'Ketu' }, { k: 'bow', c: 1, r: 2, hi: 'शनि', en: 'Shani' }, { k: 'winnow', c: 2, r: 2, hi: 'राहु', en: 'Rahu' }
  ];
  function dirs(o, s, en) {
    var m = o + s / 2, z = 13;
    return txt(m, o - 12, en ? 'East' : 'पूर्व', 'md-dir') + txt(m, o + s + 24, en ? 'West' : 'पश्चिम', 'md-dir') +
      txt(o - 14, m, en ? 'North' : 'उत्तर', 'md-dir', ' transform="rotate(-90 ' + (o - 14) + ' ' + m + ')"') + txt(o + s + 14, m, en ? 'South' : 'दक्षिण', 'md-dir', ' transform="rotate(90 ' + (o + s + 14) + ' ' + m + ')"');
  }
  function navgrah(o) {
    var x = 40, s = 400, c = s / 3, b = rect(x - 8, x - 8, s + 16, s + 16, C.R) + rect(x - 3, x - 3, s + 6, s + 6, C.w);
    NV.forEach(function (g) {
      var cx = x + g.c * c + c / 2, cy = x + g.r * c + c / 2;
      b += rect(x + g.c * c, x + g.r * c, c, c, g.k === 'sun' ? '#FFF4D6' : '#FFFDF6', ' stroke="' + C.line + '" stroke-width="1.2"');
      b += nvShape(g.k, cx, cy - (o.labels ? 10 : 0), c * 0.27);
      if (o.labels) b += txt(cx, cy + c * 0.4, o.en ? g.en : g.hi, 'md-lbl');
    });
    if (o.labels) b += dirs(x, s, o.en);
    return svg(o.labels ? '0 0 480 490' : '0 0 480 480', b);
  }

  /* ---------- वास्तु 81 पद (पूर्व ऊपर) ---------- */
  // [number, col, row, colspan, rowspan]
  var VA = [[1,0,0,1,1],[2,1,0,1,1],[3,2,0,1,2],[4,3,0,1,2],[5,4,0,1,2],[6,5,0,1,2],[7,6,0,1,2],[8,7,0,1,1],[9,8,0,1,1],
    [32,0,1,1,1],[33,1,1,1,1],[37,7,1,1,1],[10,8,1,1,1],
    [31,0,2,2,1],[34,2,2,1,1],[35,3,2,3,1],[36,6,2,1,1],[11,7,2,2,1],
    [30,0,3,2,1],[44,2,3,1,3],[45,3,3,3,3],[38,6,3,1,3],[12,7,3,2,1],
    [29,0,4,2,1],[13,7,4,2,1],[28,0,5,2,1],[14,7,5,2,1],
    [27,0,6,2,1],[42,2,6,1,1],[41,3,6,3,1],[39,6,6,1,1],[15,7,6,2,1],
    [26,0,7,1,1],[43,1,7,1,1],[23,2,7,1,2],[22,3,7,1,2],[21,4,7,1,2],[20,5,7,1,2],[19,6,7,1,2],[40,7,7,1,1],[16,8,7,1,1],
    [25,0,8,1,1],[24,1,8,1,1],[18,7,8,1,1],[17,8,8,1,1]];
  var VNAME = { 1: 'ईश', 2: 'पर्जन्य', 3: 'जयन्त', 4: 'महेन्द्र', 5: 'सूर्य', 6: 'सत्य', 7: 'भृश', 8: 'आकाश', 9: 'वायु', 10: 'पूषा', 11: 'वितथ', 12: 'गृहक्षत', 13: 'यम', 14: 'गन्धर्व', 15: 'भृङ्गराज', 16: 'मृग', 17: 'पितृ', 18: 'नन्दी', 19: 'सुग्रीव', 20: 'पुष्पदन्त', 21: 'वरुण', 22: 'असुर', 23: 'शेष', 24: 'पाप', 25: 'रोग', 26: 'नाग', 27: 'मुख्य', 28: 'भल्लाट', 29: 'सोम', 30: 'सर्प', 31: 'अदिति', 32: 'दिति', 33: 'आप', 34: 'आपवत्स', 35: 'अर्यमा', 36: 'सावित्र', 37: 'सविता', 38: 'विवस्वान्', 39: 'विबुधाधिप', 40: 'जय', 41: 'मित्र', 42: 'राजयक्ष्मा', 43: 'रुद्र', 44: 'पृथ्वीधर', 45: 'ब्रह्मा' };
  var VEN = { 1: 'Isha', 2: 'Parjanya', 3: 'Jayanta', 4: 'Mahendra', 5: 'Surya', 6: 'Satya', 7: 'Bhrisha', 8: 'Akasha', 9: 'Vayu', 10: 'Pusha', 11: 'Vitatha', 12: 'Grihakshata', 13: 'Yama', 14: 'Gandharva', 15: 'Bhringaraja', 16: 'Mriga', 17: 'Pitri', 18: 'Nandi', 19: 'Sugriva', 20: 'Pushpadanta', 21: 'Varuna', 22: 'Asura', 23: 'Shesha', 24: 'Papa', 25: 'Roga', 26: 'Naga', 27: 'Mukhya', 28: 'Bhallata', 29: 'Soma', 30: 'Sarpa', 31: 'Aditi', 32: 'Diti', 33: 'Apa', 34: 'Apavatsa', 35: 'Aryama', 36: 'Savitra', 37: 'Savita', 38: 'Vivasvan', 39: 'Vibudhadhipa', 40: 'Jaya', 41: 'Mitra', 42: 'Rajayakshma', 43: 'Rudra', 44: 'Prithvidhara', 45: 'Brahma' };
  var VOUT = [[46, 'चरकी', 'Charaki', 'tl'], [47, 'विदारिका', 'Vidarika', 'tr'], [48, 'पूतना', 'Putana', 'br'], [49, 'पापराक्षसी', 'Paparakshasi', 'bl'], [50, 'स्कन्द', 'Skanda', 't'], [51, 'अर्यमा', 'Aryama', 'r'], [52, 'जृम्भक', 'Jrimbhaka', 'b'], [53, 'पिलिपिच्छ', 'Pilipichha', 'l']];
  function vastuFill(n) {
    if (n === 45) return '#FFF1C9';
    if (n >= 33 && n <= 44) return [35, 38, 41, 44].indexOf(n) > -1 ? '#F7D9CF' : '#FBE9B7';
    return n % 2 ? '#FFFDF6' : '#F6EBDD';
  }
  function vastu(o) {
    var x = 52, s = 376, c = s / 9, en = o.en, b = rect(x - 10, x - 10, s + 20, s + 20, C.k) + rect(x - 6, x - 6, s + 12, s + 12, C.R) + rect(x - 2, x - 2, s + 4, s + 4, C.w);
    VA.forEach(function (v) {
      var n = v[0], X0 = x + v[1] * c, Y0 = x + v[2] * c, W = v[3] * c, H = v[4] * c;
      b += rect(X0, Y0, W, H, vastuFill(n), ' stroke="' + C.line + '" stroke-width="1"');
      if (n === 45) {
        b += star(X0 + W / 2, Y0 + H / 2, 8, W * 0.44, W * 0.2, C.R, '#8E1616') + '<circle cx="' + (X0 + W / 2) + '" cy="' + (Y0 + H / 2) + '" r="' + (W * 0.17) + '" fill="#FFF8E1" stroke="' + C.Y + '" stroke-width="3"/>';
        if (o.labels) b += txt(X0 + W / 2, Y0 + H / 2 - 2, '45', 'md-vn') + txt(X0 + W / 2, Y0 + H / 2 + 12, en ? VEN[45] : VNAME[45], 'md-vt');
        return;
      }
      if (!o.labels) return;
      var vertical = H > W, cx = X0 + W / 2, cy = Y0 + H / 2;
      b += txt(cx, cy - (vertical ? 8 : 2), String(n), 'md-vn') + txt(cx, cy + (vertical ? 10 : 12), en ? VEN[n] : VNAME[n], 'md-vt' + ((en ? VEN[n] : VNAME[n]).length > 8 ? ' xs' : ''));
    });
    if (o.labels) {
      VOUT.forEach(function (v) {
        var p = { tl: [x - 22, x - 22], tr: [x + s + 22, x - 22], br: [x + s + 22, x + s + 30], bl: [x - 22, x + s + 30], t: [x + s / 2, x - 18], b: [x + s / 2, x + s + 30], l: [x - 26, x + s / 2], r: [x + s + 26, x + s / 2] }[v[3]];
        var rot = v[3] === 'l' ? ' transform="rotate(-90 ' + p[0] + ' ' + p[1] + ')"' : v[3] === 'r' ? ' transform="rotate(90 ' + p[0] + ' ' + p[1] + ')"' : '';
        b += txt(p[0], p[1], v[0] + ' ' + (en ? v[2] : v[1]), 'md-vo', rot);
      });
    }
    return svg('0 0 480 480', b);
  }

  /* ---------- षोडश मातृका (4×4) ---------- */
  // reading order on the chart: right column bottom→top = 1–4, next column 5–8, … ; Ganapati with Gauri
  var SM = [[16, 12, 8, 4], [15, 11, 7, 3], [14, 10, 6, 2], [13, 9, 5, 1]];
  var SMN = { 1: 'गौरी', 2: 'पद्मा', 3: 'शची', 4: 'मेधा', 5: 'सावित्री', 6: 'विजया', 7: 'जया', 8: 'देवसेना', 9: 'स्वधा', 10: 'स्वाहा', 11: 'मातृ', 12: 'लोकमातृ', 13: 'धृति', 14: 'पुष्टि', 15: 'तुष्टि', 16: 'आत्मनः कुलदेवता' };
  var SME = { 1: 'Gauri', 2: 'Padma', 3: 'Shachi', 4: 'Medha', 5: 'Savitri', 6: 'Vijaya', 7: 'Jaya', 8: 'Devasena', 9: 'Swadha', 10: 'Swaha', 11: 'Matri', 12: 'Lokamatri', 13: 'Dhriti', 14: 'Pushti', 15: 'Tushti', 16: 'Kuladevata' };
  function shodash(o) {
    var x = 40, s = 400, c = s / 4, b = rect(x - 8, x - 8, s + 16, s + 16, '#1E3A8A');
    for (var j = 0; j < 4; j++) for (var i = 0; i < 4; i++) {
      var n = SM[j][i], red = (i + j) % 2 === 0, X0 = x + i * c, Y0 = x + j * c;
      b += rect(X0 + 4, Y0 + 4, c - 8, c - 8, red ? C.R : C.Y, ' rx="4"');
      // wheat/rice heap
      b += '<ellipse cx="' + (X0 + c / 2) + '" cy="' + (Y0 + c * (o.labels ? 0.36 : 0.5)) + '" rx="' + (c * 0.2) + '" ry="' + (c * 0.11) + '" fill="#F3E2B3" stroke="#8C6424" stroke-width="1.2"/>';
      if (o.labels) {
        var nm = o.en ? SME[n] : SMN[n], cls = 'md-sm' + (red ? ' lt' : '');
        if (n === 16 && !o.en) b += txt(X0 + c / 2, Y0 + c * 0.62, '16. आत्मनः', cls) + txt(X0 + c / 2, Y0 + c * 0.8, 'कुलदेवता', cls);
        else b += txt(X0 + c / 2, Y0 + c * 0.66, n + '. ' + nm, cls + (nm.length > 9 ? ' xs' : ''));
      }
      if (n === 1) {
        b += rect(X0 + 4, Y0 + c * 0.72, c - 8, c * 0.28 - 4, C.Y, ' stroke="' + C.R + '" stroke-width="2"');
        if (o.labels) b += txt(X0 + c / 2, Y0 + c * 0.9, o.en ? 'Ganapati' : 'गणपति', 'md-sm');
      }
    }
    return svg('0 0 480 480', b);
  }

  /* ---------- सप्तघृत मातृका / वसोर्धारा ---------- */
  function saptaghrit(o) {
    var b = rect(0, 0, 480, 480, '#FFF8EC') + rect(40, 30, 400, 420, '#FFFDF6', ' stroke="' + C.gold + '" stroke-width="2" rx="10"');
    b += txt(240, 82, '॥ श्रीः ॥', 'md-shri');
    var top = 112, gap = 38;
    for (var r = 1; r <= 7; r++) for (var k = 0; k < r; k++) {
      var cx = 240 + (k - (r - 1) / 2) * 44, cy = top + (r - 1) * gap;
      b += '<circle cx="' + cx + '" cy="' + cy + '" r="13" fill="#D32F2F"/><circle cx="' + (cx - 4) + '" cy="' + (cy - 4) + '" r="4" fill="#FF8A80" opacity=".7"/>';
    }
    if (o.labels) b += txt(240, 420, o.en ? 'Vasordhara' : 'वसोर्धारा', 'md-lbl');
    return svg('0 0 480 480', b);
  }

  /* ---------- क्षेत्रपाल (3×3, 49) ---------- */
  function kshetrapal(o) {
    var x = 40, s = 400, c = s / 3, b = rect(x - 10, x - 10, s + 20, s + 20, C.R), cols = ['#FFFFFF', '#F4C20D', '#E91E8C', '#1E3A8A', '#1F9D55'];
    for (var j = 0; j < 3; j++) for (var i = 0; i < 3; i++) {
      var X0 = x + i * c + 8, Y0 = x + j * c + 8, w = c - 16, cx = X0 + w / 2, cy = Y0 + w / 2;
      b += rect(X0, Y0, w, w, '#3A2A22', ' rx="3"');
      if (i === 1 && j === 1) {
        b += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (w * 0.22) + '" fill="#E53935" stroke="#7A1010" stroke-width="2"/>';
        if (o.labels) b += txt(cx, cy + 6, '1', 'md-kn');
        continue;
      }
      for (var p = 0; p < 5; p++) { var a = -Math.PI / 2 + p * 2 * Math.PI / 5; b += '<circle cx="' + (cx + w * 0.24 * Math.cos(a)).toFixed(1) + '" cy="' + (cy + w * 0.24 * Math.sin(a)).toFixed(1) + '" r="' + (w * 0.13) + '" fill="' + cols[p] + '"/>'; }
      b += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (w * 0.14) + '" fill="#E53935"/>';
    }
    return svg('0 0 480 480', b);
  }

  /* ---------- चौंसठ योगिनी (3 + 8×8) ---------- */
  function yogini(o) {
    var x = 60, w = 360, b = rect(x - 8, 22, w + 16, 446, '#C62828') + rect(x, 30, w, 430, C.Y);
    var bigH = 86;
    for (var i = 0; i < 3; i++) {
      var bx = x + i * (w / 3);
      b += '<polygon points="' + bx + ',30 ' + (bx + w / 3) + ',30 ' + (bx + w / 6) + ',' + (30 + bigH) + '" fill="' + C.R + '" stroke="#8E1616" stroke-width="1.5"/>';
      if (o.labels) b += txt(bx + w / 6, 62, String(3 - i), 'md-yb');
    }
    var cw = w / 8, rh = (430 - bigH - 6) / 8;
    for (var r = 0; r < 8; r++) for (var cI = 0; cI < 8; cI++) {
      var tx = x + cI * cw, ty = 30 + bigH + 6 + r * rh, n = (7 - cI) * 8 + (8 - r);
      b += '<polygon points="' + (tx + 2) + ',' + ty + ' ' + (tx + cw - 2) + ',' + ty + ' ' + (tx + cw / 2) + ',' + (ty + rh - 3) + '" fill="' + C.R + '"/>';
      if (o.labels) b += txt(tx + cw / 2, ty + rh * 0.42, String(n), 'md-yn');
    }
    return svg('0 0 480 480', b);
  }

  /* ---------- दशदिक्पाल ---------- */
  var DK = [['इन्द्र', 'Indra', 240, 70, '#F4C20D'], ['अग्नि', 'Agni', 400, 92, '#E53935'], ['यम', 'Yama', 420, 240, '#1C1A19'], ['निर्ऋति', 'Nirriti', 400, 388, '#1E3A8A'], ['वरुण', 'Varuna', 240, 410, '#1C1A19'], ['वायु', 'Vayu', 80, 388, '#8A8A8A'], ['कुबेर', 'Kubera', 60, 240, '#F4C20D'], ['ईशान', 'Ishana', 80, 92, '#FFFFFF'], ['ब्रह्मा', 'Brahma', 160, 70, '#F4C20D'], ['अनन्त', 'Ananta', 320, 410, '#1E3A8A']];
  function lokpal(o) {
    var b = rect(0, 0, 480, 480, '#FFF8EC') + rect(110, 110, 260, 260, '#FFFDF6', ' stroke="' + C.maroon + '" stroke-width="3"');
    b += '<g opacity=".9">' + NV.map(function (g) { return rect(110 + g.c * 86.7, 110 + g.r * 86.7, 86.7, 86.7, 'none', ' stroke="' + C.line + '" stroke-width="1"') + nvShape(g.k, 110 + g.c * 86.7 + 43, 110 + g.r * 86.7 + 43, 20); }).join('') + '</g>';
    DK.forEach(function (d) {
      b += '<circle cx="' + d[2] + '" cy="' + d[3] + '" r="16" fill="' + d[4] + '" stroke="#2A1810" stroke-width="1.5"/>';
      if (o.labels) b += txt(d[2], d[3] + (d[3] > 240 ? 34 : -24), o.en ? d[1] : d[0], 'md-lbl sm');
    });
    return svg('0 0 480 480', b);
  }

  var DRAW = { sarvatobhadra: sarvatobhadra, lingatobhadra: lingatobhadra, navgrah: navgrah, vastu: vastu, shodash_matrika: shodash, saptaghrit_matrika: saptaghrit, kshetrapal: kshetrapal, yogini: yogini, lokpal: lokpal };
  window.VSSMandalArt = {
    has: function (id) { return !!DRAW[id]; },
    draw: function (id, opts) { opts = opts || {}; return DRAW[id] ? DRAW[id]({ labels: !!opts.labels, en: !!opts.en }) : ''; }
  };
})();
