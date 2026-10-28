/**
 * वैदिक शोध संस्थान — बुकिंग बैकएंड (Google Apps Script, पूरी तरह मुफ़्त)
 *
 * लगाने का तरीका (README.md में चित्र-सहित विस्तार है):
 * 1. नई Google Sheet बनाएँ → Extensions → Apps Script
 * 2. यह पूरी फ़ाइल वहाँ पेस्ट करें, नीचे ADMIN_KEY बदलें, Save करें
 * 3. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone → Deploy
 * 4. मिला हुआ Web app URL डैशबोर्ड के “प्रकाशन व बैकअप” टैब में डालें
 */

// ⚠️ इसे अपनी लंबी गुप्त कुंजी से बदलें (कम से कम 16 अक्षर, किसी को न बताएँ)
var ADMIN_KEY = 'BADLEN-apni-gupt-kunji-2026';

// नई बुकिंग की सूचना ईमेल पर चाहिए तो अपना ईमेल लिखें, नहीं तो खाली छोड़ें
var NOTIFY_EMAIL = '';

var SHEET_NAME = 'Bookings';
var COLS = ['id', 'createdAt', 'status', 'type', 'serviceId', 'serviceName', 'packageName', 'price', 'mode', 'date', 'time',
  'name', 'phone', 'email', 'gotra', 'address', 'city', 'pincode', 'lang', 'dob', 'tob', 'pob', 'partner', 'question', 'notes', 'source'];
var STATUSES = ['new', 'confirmed', 'done', 'cancelled'];

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.getRange(1, 1, sh.getMaxRows(), COLS.length).setNumberFormat('@'); // सब कुछ सादा टेक्स्ट
    sh.appendRow(COLS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, COLS.length).setFontWeight('bold').setBackground('#EFE3CF');
  }
  return sh;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// Sheet में फ़ॉर्मूला-इंजेक्शन से बचाव
function clean_(v, max) {
  var s = String(v == null ? '' : v).slice(0, max || 500);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var b = JSON.parse(e.postData.contents || '{}');
    var phone = String(b.phone || '').replace(/\D/g, '').slice(-10);
    if (!b.id || !b.name || !/^[6-9]\d{9}$/.test(phone)) return json_({ ok: false, error: 'invalid' });
    b.phone = phone;
    b.status = 'new';
    b.createdAt = b.createdAt || new Date().toISOString();

    var sh = sheet_();
    var ids = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(function (r) { return r[0]; }) : [];
    if (ids.indexOf(b.id) > -1) return json_({ ok: true, duplicate: true });

    sh.appendRow(COLS.map(function (c) { return clean_(b[c], c === 'notes' || c === 'question' || c === 'address' || c === 'partner' ? 1500 : 300); }));

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, 'नई बुकिंग: ' + b.serviceName + ' — ' + b.name,
        COLS.filter(function (c) { return b[c]; }).map(function (c) { return c + ': ' + b[c]; }).join('\n'));
    }
    return json_({ ok: true, id: b.id });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  var p = e.parameter || {};
  var sh = sheet_();
  var last = sh.getLastRow();
  var data = last > 1 ? sh.getRange(2, 1, last - 1, COLS.length).getValues() : [];

  // यजमान अपनी बुकिंग की स्थिति देख सके (बुकिंग संख्या + फ़ोन दोनों मिलने पर ही)
  if (p.action === 'status') {
    var ph = String(p.phone || '').replace(/\D/g, '').slice(-10);
    for (var i = 0; i < data.length; i++) {
      if (data[i][0] === p.id && String(data[i][COLS.indexOf('phone')]).slice(-10) === ph) return json_({ ok: true, status: data[i][2] });
    }
    return json_({ ok: false, error: 'not found' });
  }

  if (p.key !== ADMIN_KEY) return json_({ ok: false, error: 'गुप्त कुंजी गलत है' });

  if (p.action === 'list') {
    var rows = data.map(function (r) { var o = {}; COLS.forEach(function (c, i) { o[c] = r[i] instanceof Date ? Utilities.formatDate(r[i], 'Asia/Kolkata', 'yyyy-MM-dd') : String(r[i]).replace(/^'/, ''); }); return o; });
    return json_({ ok: true, rows: rows });
  }

  if (p.action === 'update') {
    if (STATUSES.indexOf(p.status) < 0) return json_({ ok: false, error: 'bad status' });
    for (var j = 0; j < data.length; j++) {
      if (data[j][0] === p.id) { sh.getRange(j + 2, 3).setValue(p.status); return json_({ ok: true }); }
    }
    return json_({ ok: false, error: 'not found' });
  }

  return json_({ ok: false, error: 'unknown action' });
}
