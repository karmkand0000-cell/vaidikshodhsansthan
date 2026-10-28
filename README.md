# वैदिक शोध संस्थान — वेबसाइट व डैशबोर्ड

कर्मकांड, गृह प्रवेश, यज्ञ, हवन और ज्योतिष की बुकिंग वेबसाइट।
मुख्य भाषा हिंदी, एक क्लिक में English। पूरी तरह **मुफ़्त** सेवाओं पर चलती है — GitHub Pages (होस्टिंग) + Google Sheet (बुकिंग)।

| फ़ाइल | काम |
|---|---|
| `index.html` | वेबसाइट (यजमानों के लिए) |
| `admin.html` | आपका डैशबोर्ड — पूजा, दक्षिणा, पर्व, संपर्क, बुकिंग सब यहीं से |
| `data/site-data.json` | वेबसाइट की सारी सामग्री (डैशबोर्ड इसे बदलता है) |
| `apps-script/Code.gs` | बुकिंग को Google Sheet में सहेजने वाला कोड |
| `assets/` | डिज़ाइन, स्क्रिप्ट और (आपकी) फ़ोटो |

---

## चरण 1 — वेबसाइट GitHub पर लाइव करें (10 मिनट)

1. [github.com](https://github.com) पर मुफ़्त खाता बनाएँ (जैसे यूज़रनेम `vaidikshodhsansthan`)।
2. ऊपर **+ → New repository** → नाम रखें **`vaidikshodhsansthan.github.io`** (यूज़रनेम + `.github.io`) → **Public** → Create।
   - इस नाम से वेबसाइट का पता होगा: `https://vaidikshodhsansthan.github.io`
3. Repository में **Add file → Upload files** → इस ZIP को खोलकर उसके **अंदर की सभी फ़ाइलें व फ़ोल्डर** खींचकर डालें (`index.html` सबसे ऊपर दिखना चाहिए) → **Commit changes**।
4. **Settings → Pages** → Source: *Deploy from a branch* → Branch: **main** / **(root)** → Save।
5. 1–2 मिनट बाद वेबसाइट खुल जाएगी। ✅

> अपना डोमेन (जैसे `vaidikshodhsansthan.in`) बाद में Settings → Pages → Custom domain में जोड़ सकते हैं (डोमेन ख़रीदना पड़ता है, होस्टिंग मुफ़्त रहेगी)।

## चरण 2 — डैशबोर्ड चालू करें

1. खोलें: `https://<आपकी-साइट>/admin.html`
2. पहली बार **नया पासवर्ड** बनाएँ (कम से कम 8 अक्षर)।
3. **प्रकाशन व बैकअप** टैब → GitHub से जोड़ें:
   - GitHub पर **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**
   - Repository access: *Only select repositories* → अपनी वेबसाइट वाली repo
   - Permissions → **Contents: Read and write** → Generate → token कॉपी करें
   - डैशबोर्ड में यूज़रनेम, repo नाम, `main` और token डालें → **कनेक्शन जाँचें**
4. ऊपर **“वेबसाइट पर प्रकाशित करें”** दबाएँ — इससे आपका पासवर्ड भी लागू हो जाएगा।

अब से: डैशबोर्ड में कुछ भी बदलें → **पूर्वावलोकन** में देखें → **प्रकाशित करें** → 1–2 मिनट में वेबसाइट पर।

## चरण 3 — बुकिंग Google Sheet में (मुफ़्त)

बिना इस चरण के भी बुकिंग चलती है — यजमान को “विवरण व्हाट्सऐप पर भेजें” बटन मिलता है जो सारा विवरण 9625004090 पर भेज देता है। Sheet जोड़ने से हर बुकिंग अपने-आप सहेजी जाती है और डैशबोर्ड में दिखती है।

1. [sheets.google.com](https://sheets.google.com) पर नई Sheet बनाएँ, नाम: *VSS Bookings*।
2. **Extensions → Apps Script** → जो कोड दिखे उसे हटाकर `apps-script/Code.gs` का पूरा कोड पेस्ट करें।
3. सबसे ऊपर `ADMIN_KEY` को अपनी लंबी गुप्त कुंजी से बदलें। (ईमेल पर सूचना चाहिए तो `NOTIFY_EMAIL` में अपना ईमेल लिखें।) **Save** 💾
4. **Deploy → New deployment** → ⚙️ *Web app* →
   - Execute as: **Me**
   - Who has access: **Anyone**
   - **Deploy** → Google अनुमति माँगेगा → *Advanced → Go to project → Allow*
5. मिला हुआ **Web app URL** (`…/exec`) कॉपी करें।
6. डैशबोर्ड → **प्रकाशन व बैकअप** → “बुकिंग वेब-ऐप लिंक” में URL और “गुप्त कुंजी” में वही ADMIN_KEY → सहेजें → **प्रकाशित करें**।
7. वेबसाइट से एक परीक्षण बुकिंग करें — वह Sheet और डैशबोर्ड के **बुकिंग** टैब में दिखेगी।

> Apps Script का कोड बाद में बदलें तो **Deploy → Manage deployments → Edit → New version** करें, ताकि URL वही रहे।

## रोज़ का काम

- **बुकिंग** टैब: नई बुकिंग देखें → कॉल/व्हाट्सऐप करें → स्थिति *नई → पक्की → सम्पन्न* करें। CSV डाउनलोड भी।
- **पूजा सेवाएँ**: नई पूजा जोड़ें, दक्षिणा/पैकेज बदलें, किसी पूजा को छिपाएँ, क्रम बदलें।
- **आगामी पर्व**: हर महीने आने वाले त्योहार जोड़ें (बीती तिथियाँ वेबसाइट पर अपने-आप छिप जाती हैं)। *डिफ़ॉल्ट तिथियाँ एक बार पंचांग से मिला लें।*
- **पंडित जी / यजमानों की राय**: असली जानकारी व अनुमति के साथ ही जोड़ें — खाली रहने पर ये भाग वेबसाइट पर नहीं दिखते।
- **वेबसाइट सेटिंग**: फ़ोन, पता, सूचना पट्टी, UPI आईडी, सोशल लिंक, नीतियाँ।
- **फ़ोटो**: GitHub repo में `assets/img/` फ़ोल्डर में फ़ोटो अपलोड करें, फिर पूजा के “फ़ोटो का लिंक” में `assets/img/griha-pravesh.jpg` जैसा लिखें।

## सुरक्षा — ज़रूर पढ़ें

- डैशबोर्ड का पासवर्ड केवल डैशबोर्ड का ताला है। **असली सुरक्षा** GitHub token और ADMIN_KEY हैं — ये केवल आपके ब्राउज़र में रहते हैं, वेबसाइट या repo में कभी नहीं जाते। इन्हें किसी को न दें।
- मुफ़्त GitHub Pages पर repo सार्वजनिक होता है, इसलिए `site-data.json` (वेबसाइट की सार्वजनिक सामग्री) कोई भी देख सकता है — इसमें कोई निजी जानकारी न लिखें।
- यजमानों की बुकिंग (नाम, फ़ोन, पता) केवल आपकी निजी Google Sheet में रहती है।
- नए फ़ोन/कंप्यूटर पर डैशबोर्ड खोलें तो GitHub token व गुप्त कुंजी दोबारा डालनी होगी।
- बड़े बदलाव से पहले **बैकअप डाउनलोड** करें।

## English (short)

Static site for GitHub Pages. `admin.html` edits `data/site-data.json` and publishes it via the GitHub Contents API with a fine-grained token stored only in the admin's browser. Bookings POST to a Google Apps Script web app (`apps-script/Code.gs`) that appends to a Google Sheet; the dashboard reads/updates them with a secret key. Every booking also produces a prefilled WhatsApp message. No paid services, no build step.
