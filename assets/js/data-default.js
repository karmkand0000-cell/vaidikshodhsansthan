/* वैदिक शोध संस्थान — डिफ़ॉल्ट वेबसाइट डेटा
   यह फ़ाइल केवल "बैकअप" है। असली डेटा data/site-data.json में रहता है,
   जिसे आप डैशबोर्ड (admin.html) से बदलते हैं। */
(function () {
  function r100(x) { return Math.round(x / 100) * 100; }
  function pk(base) {
    return [
      { id: 'basic', name: { hi: 'सामान्य', en: 'Basic' }, price: base,
        features: { hi: '1 पंडित जी • पूर्ण वैदिक विधि • सामग्री यजमान द्वारा', en: '1 Pandit ji • Full Vedic vidhi • Samagri by yajman' } },
      { id: 'samagri', name: { hi: 'सामग्री सहित', en: 'With samagri' }, price: r100(base * 1.45), popular: true,
        features: { hi: '1–2 पंडित जी • सम्पूर्ण पूजन सामग्री हम लाएँगे • हवन कुंड', en: '1–2 Pandits • Complete samagri brought by us • Havan kund' } },
      { id: 'vishesh', name: { hi: 'विशेष अनुष्ठान', en: 'Vishesh' }, price: r100(base * 2.2),
        features: { hi: '3+ पंडित जी • सामग्री सहित • विस्तृत जाप व हवन • प्रसाद व्यवस्था', en: '3+ Pandits • Samagri included • Extended jaap & havan • Prasad arrangement' } }
    ];
  }
  function s(id, cat, hi, en, price, dur, dhi, den, opts) {
    var o = {
      id: id, cat: cat, active: true, popular: false, image: '',
      name: { hi: hi, en: en }, desc: { hi: dhi, en: den },
      duration: dur, price: price, packages: pk(price),
      benefits: { hi: '', en: '' }, samagri: { hi: '', en: '' }
    };
    if (opts) for (var k in opts) o[k] = opts[k];
    return o;
  }
  var consult = function (base) {
    return [{ id: 'phone', name: { hi: 'फ़ोन / वीडियो परामर्श', en: 'Phone / video call' }, price: base, popular: true,
      features: { hi: '30 मिनट • कुंडली विश्लेषण • उपाय', en: '30 min • Chart reading • Remedies' } },
      { id: 'report', name: { hi: 'लिखित रिपोर्ट + परामर्श', en: 'Written report + call' }, price: r100(base * 2) + 0,
        features: { hi: 'विस्तृत PDF रिपोर्ट • 45 मिनट परामर्श', en: 'Detailed PDF report • 45 min call' } }];
  };

  window.DEFAULT_DATA = {
    version: 1,
    settings: {
      siteName: { hi: 'वैदिक शोध संस्थान', en: 'Vaidik Shodh Sansthan' },
      tagline: { hi: 'कर्मकांड • यज्ञ • हवन • ज्योतिष', en: 'Karmkand • Yagya • Havan • Jyotish' },
      phone: '9625004090',
      whatsapp: '919625004090',
      email: 'karmkand0000@gmail.com',
      bookingEmail: 'karmkand0000@gmail.com',
      address: { hi: 'एफ-171/27, छतरपुर एक्सटेंशन, छतरपुर, नई दिल्ली – 110074', en: 'F-171/27, Chhatarpur Extension, Chhatarpur, New Delhi – 110074' },
      hours: { hi: 'प्रतिदिन प्रातः 7 बजे से रात्रि 9 बजे तक', en: 'Daily, 7 am to 9 pm' },
      serviceArea: { hi: 'दिल्ली-एनसीआर में घर पर पूजा • पूरे विश्व में ऑनलाइन (वीडियो) पूजा', en: 'Home puja across Delhi-NCR • Online (video) puja worldwide' },
      bookingEndpoint: '',
      showPrices: false,
      upiId: '',
      advancePercent: 25,
      mapQuery: 'Chhatarpur Extension, New Delhi 110074',
      social: { facebook: '', instagram: '', youtube: '' },
      adminHash: '',
      ticker: {
        hi: 'दीपावली लक्ष्मी पूजन की बुकिंग आरंभ • गृह प्रवेश हेतु शुभ मुहूर्त जानने के लिए कॉल करें • सभी पूजाओं में यजमान के नाम व गोत्र से संकल्प',
        en: 'Diwali Lakshmi Pujan bookings open • Call to know auspicious Griha Pravesh muhurat • Every puja begins with sankalp in your name and gotra'
      }
    },
    hero: {
      title: { hi: 'आपके घर, आपके मुहूर्त पर — शास्त्रोक्त विधि से पूजा', en: 'Puja at your home, on your muhurat — performed by the shastras' },
      subtitle: { hi: 'गृह प्रवेश, हवन, यज्ञ, संस्कार और ज्योतिष परामर्श। विद्वान पंडित जी आपके नाम-गोत्र से संकल्प लेकर सम्पूर्ण वैदिक विधि से अनुष्ठान कराएँगे।', en: 'Griha Pravesh, havan, yagya, sanskars and astrology. Learned pandits perform the complete Vedic ritual with sankalp in your name and gotra.' }
    },
    categories: [
      { id: 'griha', icon: 'home', name: { hi: 'गृह प्रवेश व वास्तु', en: 'Griha Pravesh & Vastu' } },
      { id: 'yagya', icon: 'fire', name: { hi: 'यज्ञ एवं हवन', en: 'Yagya & Havan' } },
      { id: 'karmkand', icon: 'kalash', name: { hi: 'कर्मकांड व संस्कार', en: 'Karmkand & Sanskar' } },
      { id: 'path', icon: 'book', name: { hi: 'पाठ एवं जाप', en: 'Path & Jaap' } },
      { id: 'dosh', icon: 'planet', name: { hi: 'दोष निवारण', en: 'Dosh Nivaran' } },
      { id: 'festival', icon: 'diya', name: { hi: 'त्योहार पूजा', en: 'Festival Puja' } },
      { id: 'jyotish', icon: 'star', name: { hi: 'ज्योतिष परामर्श', en: 'Jyotish Consultation' } }
    ],
    services: [
      s('griha-pravesh', 'griha', 'गृह प्रवेश पूजा', 'Griha Pravesh Puja', 5100, '3–4 घंटे',
        'नए घर में प्रथम प्रवेश के समय गणेश पूजन, कलश स्थापना, नवग्रह पूजन, वास्तु पूजन और हवन। घर में सुख, शांति व समृद्धि के लिए।',
        'Ganesh pujan, kalash sthapana, Navagraha and Vastu pujan with havan when entering a new home — for peace and prosperity.',
        { popular: true,
          benefits: { hi: 'घर की नकारात्मक ऊर्जा का शमन\nवास्तु दोषों की शांति\nपरिवार के सुख-समृद्धि हेतु आशीर्वाद', en: 'Clears negative energy\nPacifies vastu doshas\nBlessings for family prosperity' },
          samagri: { hi: 'कलश, आम के पत्ते, नारियल, रोली, मौली, अक्षत, हवन सामग्री, घी, समिधा, पंचमेवा, फल, फूल-माला', en: 'Kalash, mango leaves, coconut, roli, moli, akshat, havan samagri, ghee, samidha, dry fruits, fruits, flowers' } }),
      s('vastu-shanti', 'griha', 'वास्तु शांति पूजा', 'Vastu Shanti Puja', 7100, '3–4 घंटे',
        'घर या कार्यालय के वास्तु दोषों के शमन हेतु वास्तु पुरुष पूजन, नवग्रह शांति एवं हवन।',
        'Vastu Purush pujan, Navagraha shanti and havan to pacify vastu defects of a home or office.'),
      s('bhoomi-pujan', 'griha', 'भूमि पूजन', 'Bhoomi Pujan', 3100, '1–2 घंटे',
        'निर्माण कार्य आरंभ करने से पहले धरती माता, गणेश जी व वास्तु देवता का पूजन।',
        'Worship of Mother Earth, Ganesh ji and Vastu Devta before starting construction.'),
      s('office-pujan', 'griha', 'दुकान / कार्यालय उद्घाटन पूजा', 'Shop / Office Opening Puja', 5100, '2–3 घंटे',
        'नए व्यापार, दुकान या कार्यालय के शुभारंभ पर गणेश-लक्ष्मी पूजन व हवन।',
        'Ganesh-Lakshmi pujan and havan for the opening of a new business, shop or office.'),

      s('navgrah-havan', 'yagya', 'नवग्रह शांति हवन', 'Navagraha Shanti Havan', 5100, '2–3 घंटे',
        'नौ ग्रहों की शांति हेतु वैदिक मंत्रों से पूजन व हवन। ग्रहों की प्रतिकूलता दूर करने के लिए।',
        'Vedic pujan and havan for all nine planets to ease adverse planetary influences.', { popular: true }),
      s('mahamrityunjay-havan', 'yagya', 'महामृत्युंजय हवन', 'Maha Mrityunjaya Havan', 11000, '3–4 घंटे',
        'भगवान शिव के महामृत्युंजय मंत्र से जाप व हवन — आरोग्य, दीर्घायु और संकट निवारण हेतु।',
        'Jaap and havan with the Maha Mrityunjaya mantra of Lord Shiva — for health, long life and protection.', { popular: true }),
      s('rudrabhishek', 'yagya', 'रुद्राभिषेक', 'Rudrabhishek', 5100, '2–3 घंटे',
        'शिवलिंग का दूध, दही, घी, शहद, गंगाजल आदि से रुद्री पाठ सहित अभिषेक।',
        'Abhishek of the Shivling with milk, curd, ghee, honey and Gangajal along with Rudri path.', { popular: true }),
      s('lakshmi-kuber-havan', 'yagya', 'लक्ष्मी-कुबेर हवन', 'Lakshmi-Kuber Havan', 7100, '2–3 घंटे',
        'धन, व्यापार वृद्धि और आर्थिक स्थिरता के लिए माँ लक्ष्मी व कुबेर देव का हवन।',
        'Havan for Maa Lakshmi and Kuber Dev for wealth, business growth and financial stability.'),
      s('gayatri-yagya', 'yagya', 'गायत्री महायज्ञ', 'Gayatri Mahayagya', 21000, '5–6 घंटे',
        'गायत्री मंत्र के जाप व आहुतियों के साथ सामूहिक यज्ञ — बुद्धि, शुद्धि और लोक-कल्याण हेतु।',
        'Gayatri mantra jaap and offerings in a grand yagya — for wisdom, purification and collective welfare.'),
      s('chandi-path-havan', 'yagya', 'दुर्गा सप्तशती पाठ एवं चंडी हवन', 'Durga Saptashati & Chandi Havan', 11000, '4–5 घंटे',
        'माँ दुर्गा की कृपा, शत्रु बाधा व भय निवारण के लिए सप्तशती पाठ और चंडी हवन।',
        'Saptashati path and Chandi havan for Maa Durga’s grace and protection from fear and obstacles.'),

      s('satyanarayan-katha', 'karmkand', 'श्री सत्यनारायण कथा', 'Shri Satyanarayan Katha', 2100, '2 घंटे',
        'पूर्णिमा, गृह प्रवेश, जन्मदिन या किसी भी शुभ अवसर पर भगवान सत्यनारायण की कथा एवं पूजन।',
        'Katha and pujan of Lord Satyanarayan on Purnima, a new home, birthday or any auspicious occasion.', { popular: true }),
      s('namkaran', 'karmkand', 'नामकरण संस्कार', 'Namkaran Sanskar', 2100, '1–2 घंटे',
        'नवजात शिशु का नक्षत्र के अनुसार नाम अक्षर निकालकर नामकरण संस्कार।',
        'Naming ceremony of a newborn with the name syllable chosen from the birth nakshatra.'),
      s('mundan', 'karmkand', 'मुंडन संस्कार', 'Mundan Sanskar', 2100, '1–2 घंटे',
        'शिशु के प्रथम केश कर्तन का शास्त्रीय संस्कार, शुभ मुहूर्त सहित।',
        'The shastric first-haircut sanskar of a child, on an auspicious muhurat.'),
      s('janeu', 'karmkand', 'यज्ञोपवीत (जनेऊ) संस्कार', 'Yagyopavit (Janeu) Sanskar', 11000, '4–5 घंटे',
        'उपनयन संस्कार — गायत्री दीक्षा, यज्ञोपवीत धारण व हवन।',
        'Upanayan sanskar — Gayatri diksha, wearing of the sacred thread and havan.'),
      s('vivah', 'karmkand', 'विवाह संस्कार', 'Vivah Sanskar', 21000, '4–6 घंटे',
        'वैदिक रीति से सम्पूर्ण विवाह — गणेश पूजन, कन्यादान, सप्तपदी, फेरे। कुंडली मिलान अलग से उपलब्ध।',
        'Complete Vedic wedding — Ganesh pujan, kanyadan, saptapadi, pheras. Kundli matching available separately.'),
      s('pitra-shraddh', 'karmkand', 'श्राद्ध एवं पितृ पूजा', 'Shraddh & Pitru Puja', 5100, '2–3 घंटे',
        'पितरों की शांति हेतु श्राद्ध, तर्पण, पिंडदान एवं ब्राह्मण भोजन की व्यवस्था।',
        'Shraddh, tarpan, pind daan and Brahmin bhoj for the peace of ancestors.'),
      s('terahvi', 'karmkand', 'शांति पाठ एवं तेरहवीं', 'Shanti Path & Terahvi', 11000, '3–4 घंटे',
        'दिवंगत आत्मा की शांति हेतु गरुड़ पुराण पाठ, शांति हवन एवं तेरहवीं के सभी कर्म।',
        'Garud Puran path, shanti havan and all Terahvi rites for the peace of the departed soul.'),

      s('sundarkand', 'path', 'सुंदरकांड पाठ', 'Sundarkand Path', 3100, '3 घंटे',
        'संगीतमय सुंदरकांड पाठ — संकट निवारण और हनुमान जी की कृपा हेतु।',
        'Musical Sundarkand path — for removal of troubles and Hanuman ji’s blessings.', { popular: true }),
      s('akhand-ramayan', 'path', 'अखंड रामायण पाठ', 'Akhand Ramayan Path', 11000, '24 घंटे',
        'श्री रामचरितमानस का 24 घंटे निरंतर पाठ, समापन पर हवन व आरती।',
        'Continuous 24-hour recital of Shri Ramcharitmanas, ending with havan and aarti.'),
      s('hanuman-chalisa-108', 'path', 'हनुमान चालीसा 108 पाठ', 'Hanuman Chalisa 108 Path', 2100, '3 घंटे',
        'हनुमान चालीसा के 108 पाठ — मंगलवार या शनिवार को विशेष फलदायी।',
        '108 recitations of Hanuman Chalisa — especially fruitful on Tuesday or Saturday.'),
      s('mahamrityunjay-jaap', 'path', 'महामृत्युंजय जाप (सवा लाख)', 'Maha Mrityunjaya Jaap (1.25 lakh)', 51000, '7–11 दिन',
        'सवा लाख महामृत्युंजय मंत्र जाप, दशांश हवन सहित — गंभीर रोग व संकट में।',
        '1.25 lakh Maha Mrityunjaya mantra jaap with dashansh havan — during serious illness or crisis.'),

      s('kaalsarp', 'dosh', 'कालसर्प दोष निवारण पूजा', 'Kaal Sarp Dosh Nivaran', 7100, '3 घंटे',
        'जन्म कुंडली में कालसर्प योग होने पर राहु-केतु शांति, नाग पूजन व हवन।',
        'Rahu-Ketu shanti, Naag pujan and havan when Kaal Sarp yoga is present in the birth chart.', { popular: true }),
      s('manglik', 'dosh', 'मांगलिक दोष शांति', 'Manglik Dosh Shanti', 5100, '2–3 घंटे',
        'विवाह में बाधा देने वाले मंगल दोष की शांति हेतु मंगल पूजन, जाप व हवन।',
        'Mangal pujan, jaap and havan to pacify Manglik dosh that delays marriage.'),
      s('pitra-dosh', 'dosh', 'पितृ दोष निवारण', 'Pitru Dosh Nivaran', 7100, '3 घंटे',
        'पितृ दोष के शमन हेतु नारायण बलि, तर्पण एवं विशेष हवन।',
        'Narayan Bali, tarpan and special havan to pacify Pitru dosh.'),
      s('gandmool', 'dosh', 'गंडमूल नक्षत्र शांति', 'Gandmool Nakshatra Shanti', 5100, '2–3 घंटे',
        'गंडमूल नक्षत्र में जन्मे शिशु के लिए 27वें दिन या शुभ मुहूर्त में शांति पूजा।',
        'Shanti puja for a child born in a Gandmool nakshatra, on the 27th day or an auspicious muhurat.'),
      s('shani-shanti', 'dosh', 'शनि साढ़ेसाती / ढैय्या शांति', 'Shani Sade Sati / Dhaiya Shanti', 5100, '2–3 घंटे',
        'शनि देव के तेलाभिषेक, जाप व हवन द्वारा साढ़ेसाती और ढैय्या के कष्टों में राहत।',
        'Relief from Sade Sati and Dhaiya through Shani Dev tel-abhishek, jaap and havan.'),

      s('diwali-lakshmi', 'festival', 'दीपावली लक्ष्मी-गणेश पूजन', 'Diwali Lakshmi-Ganesh Pujan', 5100, '2 घंटे',
        'प्रदोष काल / स्थिर लग्न में घर या दुकान पर लक्ष्मी-गणेश, कुबेर व बही-खाता पूजन।',
        'Lakshmi-Ganesh, Kuber and account-book pujan at home or shop in the auspicious lagna.', { popular: true }),
      s('navratri-path', 'festival', 'नवरात्रि घट स्थापना व पाठ', 'Navratri Ghat Sthapana & Path', 7100, '9 दिन',
        'घट स्थापना से कन्या पूजन तक नवरात्रि के नौ दिन दुर्गा सप्तशती पाठ।',
        'Durga Saptashati path for all nine days of Navratri, from ghat sthapana to kanya pujan.'),

      s('kundli-vishleshan', 'jyotish', 'जन्म कुंडली विश्लेषण', 'Birth Chart Analysis', 1100, '30 मिनट',
        'आपकी जन्म कुंडली का विस्तृत अध्ययन — करियर, विवाह, स्वास्थ्य, धन व ग्रह दशा और उपाय।',
        'Detailed study of your birth chart — career, marriage, health, wealth, dashas and remedies.',
        { packages: consult(1100), popular: true }),
      s('kundli-milan', 'jyotish', 'कुंडली मिलान (गुण मिलान)', 'Kundli Matching', 1100, '30 मिनट',
        'वर-वधू की कुंडली का 36 गुण मिलान, मांगलिक विचार और विवाह मुहूर्त सुझाव।',
        '36-guna matching of bride and groom charts, Manglik check and wedding muhurat suggestions.',
        { packages: consult(1100) }),
      s('muhurat', 'jyotish', 'शुभ मुहूर्त निकलवाएँ', 'Get an Auspicious Muhurat', 501, '15 मिनट',
        'गृह प्रवेश, विवाह, वाहन क्रय, व्यापार आरंभ आदि के लिए पंचांग से शुभ मुहूर्त।',
        'Auspicious muhurat from the panchang for griha pravesh, marriage, vehicle purchase, new business etc.',
        { packages: [{ id: 'phone', name: { hi: 'मुहूर्त परामर्श', en: 'Muhurat consultation' }, price: 501, popular: true, features: { hi: 'एक कार्य हेतु मुहूर्त • फ़ोन / व्हाट्सऐप पर', en: 'Muhurat for one event • On phone / WhatsApp' } }] }),
      s('vastu-paramarsh', 'jyotish', 'वास्तु परामर्श', 'Vastu Consultation', 2100, '45 मिनट',
        'घर/कार्यालय के नक्शे या साइट विज़िट द्वारा वास्तु दोष पहचान और बिना तोड़-फोड़ उपाय।',
        'Vastu defects identified from your floor plan or a site visit, with no-demolition remedies.',
        { packages: consult(2100) })
    ],
    purposes: [
      { id: 'p-home', name: { hi: 'नए घर में सुख-शांति', en: 'Peace in a new home' }, services: ['griha-pravesh', 'vastu-shanti', 'satyanarayan-katha'] },
      { id: 'p-health', name: { hi: 'आरोग्य व दीर्घायु', en: 'Health & long life' }, services: ['mahamrityunjay-havan', 'mahamrityunjay-jaap', 'rudrabhishek'] },
      { id: 'p-wealth', name: { hi: 'धन व व्यापार वृद्धि', en: 'Wealth & business' }, services: ['lakshmi-kuber-havan', 'office-pujan', 'diwali-lakshmi'] },
      { id: 'p-marriage', name: { hi: 'विवाह बाधा निवारण', en: 'Marriage obstacles' }, services: ['manglik', 'kundli-milan', 'vivah'] },
      { id: 'p-planets', name: { hi: 'ग्रह शांति', en: 'Planetary peace' }, services: ['navgrah-havan', 'shani-shanti', 'kaalsarp'] },
      { id: 'p-ancestors', name: { hi: 'पितरों की शांति', en: 'Peace of ancestors' }, services: ['pitra-shraddh', 'pitra-dosh', 'terahvi'] },
      { id: 'p-child', name: { hi: 'शिशु के संस्कार', en: 'Child sanskars' }, services: ['namkaran', 'mundan', 'gandmool'] },
      { id: 'p-protection', name: { hi: 'संकट व भय निवारण', en: 'Protection from troubles' }, services: ['sundarkand', 'hanuman-chalisa-108', 'chandi-path-havan'] }
    ],
    festivals: [
      { id: 'f1', date: '2026-11-06', name: { hi: 'धनतेरस', en: 'Dhanteras' }, note: { hi: 'धन्वंतरि व कुबेर पूजन', en: 'Dhanvantari & Kuber pujan' }, service: 'lakshmi-kuber-havan' },
      { id: 'f2', date: '2026-11-08', name: { hi: 'दीपावली', en: 'Diwali' }, note: { hi: 'लक्ष्मी-गणेश पूजन', en: 'Lakshmi-Ganesh pujan' }, service: 'diwali-lakshmi' },
      { id: 'f3', date: '2026-11-20', name: { hi: 'देवउठनी एकादशी / तुलसी विवाह', en: 'Dev Uthani Ekadashi / Tulsi Vivah' }, note: { hi: 'मांगलिक कार्यों का आरंभ', en: 'Auspicious ceremonies resume' }, service: 'satyanarayan-katha' },
      { id: 'f4', date: '2026-11-24', name: { hi: 'कार्तिक पूर्णिमा', en: 'Kartik Purnima' }, note: { hi: 'सत्यनारायण कथा व दीपदान', en: 'Satyanarayan katha & deep daan' }, service: 'satyanarayan-katha' },
      { id: 'f5', date: '2026-12-23', name: { hi: 'मार्गशीर्ष पूर्णिमा', en: 'Margashirsha Purnima' }, note: { hi: 'सत्यनारायण पूजन', en: 'Satyanarayan pujan' }, service: 'satyanarayan-katha' },
      { id: 'f6', date: '2027-01-14', name: { hi: 'मकर संक्रांति', en: 'Makar Sankranti' }, note: { hi: 'सूर्य पूजन व दान', en: 'Surya pujan & daan' }, service: 'navgrah-havan' }
    ],
    promises: [
      { hi: 'यजमान के नाम व गोत्र से विधिवत संकल्प', en: 'Proper sankalp in the yajman’s name and gotra' },
      { hi: 'शास्त्रोक्त वैदिक विधि, बिना जल्दबाज़ी', en: 'Shastric Vedic vidhi, never rushed' },
      { hi: 'सामग्री सहित या बिना सामग्री — आपकी पसंद', en: 'With or without samagri — your choice' },
      { hi: 'पंचांग देखकर शुभ मुहूर्त का निर्धारण', en: 'Muhurat fixed from the panchang' },
      { hi: 'घर पर या ऑनलाइन वीडियो पर पूजा', en: 'At your home or over video' },
      { hi: 'पहले से स्पष्ट दक्षिणा, कोई छिपा शुल्क नहीं', en: 'Dakshina stated upfront, no hidden charges' }
    ],
    premium: {
      title: { hi: 'विशेष महा-अनुष्ठान', en: 'Premium Maha-Anushthan' },
      subtitle: { hi: 'बड़े संकल्पों के लिए विद्वान पंडितों की टोली, सम्पूर्ण सामग्री और शास्त्रोक्त पूर्णाहुति — घर, मंदिर या आपके चुने स्थान पर।', en: 'For major sankalps: a team of learned pandits, complete samagri and a shastric purnahuti — at your home, a temple or a venue you choose.' },
      features: [
        { hi: 'अनुभवी पंडितों की टोली', en: 'A team of experienced pandits' },
        { hi: 'सम्पूर्ण पूजन सामग्री व हवन कुंड', en: 'Complete samagri & havan kund' },
        { hi: 'संकल्प से पूर्णाहुति तक विधिवत', en: 'Full vidhi from sankalp to purnahuti' },
        { hi: 'प्रसाद व ब्राह्मण भोजन की व्यवस्था (अनुरोध पर)', en: 'Prasad & Brahmin bhoj on request' }
      ],
      services: ['gayatri-yagya', 'mahamrityunjay-jaap', 'akhand-ramayan', 'chandi-path-havan']
    },
    gallery: [
      { id: 'g1', src: 'assets/img/gallery/havan-kund.svg', caption: { hi: 'हवन — अग्नि देव को आहुति', en: 'Havan — offerings to Agni Dev' } },
      { id: 'g2', src: 'assets/img/gallery/kalash-sthapana.svg', caption: { hi: 'कलश स्थापना', en: 'Kalash sthapana' } },
      { id: 'g3', src: 'assets/img/gallery/griha-pravesh.svg', caption: { hi: 'गृह प्रवेश — तोरण व रंगोली', en: 'Griha Pravesh — toran & rangoli' } },
      { id: 'g4', src: 'assets/img/gallery/rudrabhishek.svg', caption: { hi: 'रुद्राभिषेक', en: 'Rudrabhishek' } },
      { id: 'g5', src: 'assets/img/gallery/deepawali-diye.svg', caption: { hi: 'दीपावली दीपोत्सव', en: 'Deepawali deepotsav' } },
      { id: 'g6', src: 'assets/img/gallery/navgrah.svg', caption: { hi: 'नवग्रह शांति', en: 'Navagraha shanti' } },
      { id: 'g7', src: 'assets/img/gallery/rangoli.svg', caption: { hi: 'मांगलिक रंगोली', en: 'Auspicious rangoli' } },
      { id: 'g8', src: 'assets/img/gallery/kundli.svg', caption: { hi: 'जन्म कुंडली विश्लेषण', en: 'Birth chart analysis' } }
    ],
    rashifal: { date: '', items: {} },
    pandits: [],
    testimonials: [],
    faqs: [
      { q: { hi: 'पूजा की बुकिंग कैसे करें?', en: 'How do I book a puja?' },
        a: { hi: 'पूजा चुनें, पैकेज चुनें, तिथि व पता भरें और “बुकिंग भेजें” दबाएँ। हमारी टीम 2 घंटे के भीतर कॉल करके मुहूर्त व विवरण पक्का करेगी।', en: 'Choose the puja and package, fill the date and address, and press “Send booking”. Our team calls within 2 hours to confirm the muhurat and details.' } },
      { q: { hi: 'क्या पूजा सामग्री आप लाएँगे?', en: 'Will you bring the samagri?' },
        a: { hi: '“सामग्री सहित” पैकेज में सम्पूर्ण सामग्री हम लाते हैं। “सामान्य” पैकेज में हम आपको सामग्री सूची भेज देते हैं।', en: 'In the “With samagri” package we bring everything. With “Basic” we send you the samagri list.' } },
      { q: { hi: 'मुहूर्त कौन निकालेगा?', en: 'Who decides the muhurat?' },
        a: { hi: 'पंडित जी पंचांग व आपकी जन्म राशि देखकर शुभ मुहूर्त बताते हैं। यह बुकिंग में शामिल है।', en: 'Pandit ji checks the panchang and your rashi to suggest the muhurat. This is included with the booking.' } },
      { q: { hi: 'क्या ऑनलाइन पूजा हो सकती है?', en: 'Can the puja be done online?' },
        a: { hi: 'हाँ। दिल्ली-एनसीआर के बाहर या विदेश में रहने वाले यजमान वीडियो कॉल पर संकल्प लेकर पूजा में शामिल हो सकते हैं।', en: 'Yes. Yajmans outside Delhi-NCR or abroad can take sankalp and join over a video call.' } },
      { q: { hi: 'भुगतान कैसे करें?', en: 'How do I pay?' },
        a: { hi: 'बुकिंग पक्की होने पर अग्रिम राशि UPI से और शेष दक्षिणा पूजा के दिन दी जा सकती है।', en: 'Pay the advance by UPI once the booking is confirmed; the remaining dakshina can be given on the puja day.' } },
      { q: { hi: 'बुकिंग रद्द करनी हो तो?', en: 'What if I need to cancel?' },
        a: { hi: 'पूजा से 48 घंटे पहले सूचना देने पर तिथि बदली जा सकती है या अग्रिम राशि लौटाई जाती है।', en: 'With 48 hours’ notice we can reschedule or refund the advance.' } }
    ],
    pages: {
      terms: { hi: 'बुकिंग पंडित जी की उपलब्धता व मुहूर्त की पुष्टि के बाद ही पक्की मानी जाएगी। दक्षिणा पैकेज अनुसार है; दूरी अधिक होने पर यात्रा व्यय अलग से बताया जाएगा।', en: 'A booking is confirmed only after pandit availability and muhurat are confirmed. Dakshina is as per package; travel cost for long distances is informed separately.' },
      refund: { hi: 'पूजा से 48 घंटे पहले रद्द करने पर अग्रिम राशि पूरी लौटाई जाएगी या तिथि बदली जाएगी। 48 घंटे से कम समय में रद्द करने पर सामग्री का व्यय काटा जा सकता है।', en: 'Cancel 48 hours before the puja for a full advance refund or a new date. Within 48 hours, samagri costs may be deducted.' },
      privacy: { hi: 'आपका नाम, फ़ोन, पता व जन्म विवरण केवल पूजा/परामर्श हेतु उपयोग होता है और किसी अन्य को नहीं दिया जाता।', en: 'Your name, phone, address and birth details are used only for the puja/consultation and are never shared.' }
    }
  };

  /* ---- असली फ़ोटो (Wikimedia Commons, मुक्त लाइसेंस, फ़ोटोग्राफ़र का नाम साथ में) ---- */
  var IMG = {
 "griha-pravesh": {
  "file": "Griha-Pravesh-ritual.JPG",
  "license": "CC BY-SA 3.0",
  "artist": "Aruna at ml.wikipedia"
 },
 "vastu-shanti": {
  "file": "Griha Pravesh Puja Ceremony.jpg",
  "license": "CC0",
  "artist": "AditiChintarevula"
 },
 "bhoomi-pujan": {
  "file": "Bhoomi Pooja 3.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "Yakshitha"
 },
 "office-pujan": {
  "file": "Vishwakarma Puja Celebrations 2024 at Oil India Limited, Human Resources Office, Duliajan 03.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "AjayDas"
 },
 "navgrah-havan": {
  "file": "Navgrah idols at Maa Durga Sai Baba Temple in Orlando.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "Kiran891"
 },
 "manglik": {
  "file": "Mangal Graha (Mars) at Navagraha mandapam, Shani Shingnapur.jpg",
  "license": "CC0",
  "artist": "K.Venkataramana"
 },
 "mahamrityunjay-havan": {
  "file": "1 Brahmin performing homa fire yajna sacrifice, offerings in a Hindu ritual.jpg",
  "license": "CC BY 2.0",
  "artist": "Onkar Hoysala"
 },
 "rudrabhishek": {
  "file": "Rudrabhishake Structure.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "Anush Singh"
 },
 "chandi-path-havan": {
  "file": "16th-century, Devi Mahatmya Narayani Stutti, Sanskrit, Devanagari, Det Kongelige Bibliotek, Copenhagen University, Denmark.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "Ms Sarah Welch"
 },
 "gayatri-yagya": {
  "file": "Gayatri yagya.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "Anjalikaushal1910"
 },
 "satyanarayan-katha": {
  "file": "Shree Satyanarayan Bhagwan Puja.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "Subhmanish"
 },
 "namkaran": {
  "file": "NoolKettu.JPG",
  "license": "CC BY-SA 3.0",
  "artist": "Sandeepndas"
 },
 "mundan": {
  "file": "MundanOfMathil.jpg",
  "license": "Public domain",
  "artist": "Anand Jha"
 },
 "janeu": {
  "file": "A yagyopaveet sanskar upanayana samskara.jpg",
  "license": "CC BY 2.0",
  "artist": "vinodbahal from Shimla, India"
 },
 "vivah": {
  "file": "Saat phere.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "Bhumish143"
 },
 "pitra-shraddh": {
  "file": "A man and a Brahmin performing Shraddha ceremony in Nepal.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "9n2nk"
 },
 "pitra-dosh": {
  "file": "Perform Pinda Dana.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "TAPAS KUMAR HALDER"
 },
 "terahvi": {
  "file": "Ghats of Varanasi and Hindu rituals 40.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "Goutam1962"
 },
 "sundarkand": {
  "file": "Sundarkand 02.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "The open draft"
 },
 "akhand-ramayan": {
  "file": "Ramcharitmanas Verses - III.jpg",
  "license": "CC BY-SA 3.0",
  "artist": "Nmisra"
 },
 "hanuman-chalisa-108": {
  "file": "Hanuman Chalisa at Hanuman Jayanti.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "Suyash Dwivedi"
 },
 "mahamrityunjay-jaap": {
  "file": "108+1 five mukhi Rudraksha mala.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "शिव साहिल"
 },
 "shani-shanti": {
  "file": "Pouring Til oil on the Shani idol at Shani Shingnapur, maharastra.jpg",
  "license": "CC0",
  "artist": "K.Venkataramana"
 },
 "diwali-lakshmi": {
  "file": "Diwali Lakshmi Poojan.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "Tamilmama"
 },
 "lakshmi-kuber-havan": {
  "file": "Lakshmi Pujan.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "Harshada raut"
 },
 "kaalsarp": {
  "file": "20.17b Nagakal Kaladi.png",
  "license": "CC BY-SA 4.0",
  "artist": "Kharmacher"
 },
 "navratri-path": {
  "file": "घटस्थापना.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "उज्ज्वला संजय पवार"
 },
 "gandmool": {
  "file": "Kalash puja.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "Abhya2022"
 },
 "kundli-vishleshan": {
  "file": "Horoscope of Lehna Singh Majithia, folio of the work 'Sarvasiddhāntatattva-cuḍāmaṇi' (“The Jewel of the Essence of All Sciences”), 1840.jpg",
  "license": "Public domain",
  "artist": "अज्ञात (1840)"
 },
 "muhurat": {
  "file": "Tamil panchangam inside.JPG",
  "license": "CC BY-SA 3.0",
  "artist": "Azhagiya manavalan"
 },
 "vastu-paramarsh": {
  "file": "A folio from Vastu sastra hiti dayeka manuscript, water spout design, Sanskrit language, Newari script - 3.jpg",
  "license": "CC0",
  "artist": "Ms Sarah Welch"
 },
 "kundli-milan": {
  "file": "Astrologer of the Brahmin caste, India, c 1825 Wellcome L0035997.jpg",
  "license": "CC BY 4.0",
  "artist": "Wellcome Collection"
 },
 "x_hero": {
  "file": "Brahmana performing fire sacrifice.JPG",
  "license": "CC BY-SA 3.0",
  "artist": "Ilya Mauter"
 },
 "x_homam4": {
  "file": "Homam for lord Ganesha.jpg",
  "license": "CC BY-SA 4.0",
  "artist": "Chandu7299"
 }
};
  function cu(c, w) { return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(c.file) + '?width=' + (w || 960); }
  var DD = window.DEFAULT_DATA;
  DD.services.forEach(function (s) { var c = IMG[s.id]; if (c) { s.image = cu(c); s.imgCredit = c; } });
  var CATIMG = { griha: 'griha-pravesh', yagya: 'gayatri-yagya', karmkand: 'satyanarayan-katha', path: 'sundarkand', dosh: 'navgrah-havan', festival: 'diwali-lakshmi', jyotish: 'kundli-vishleshan' };
  DD.categories.forEach(function (c) { var k = IMG[CATIMG[c.id]]; if (k) { c.image = cu(k, 640); c.imgCredit = k; } });
  DD.hero.image = cu(IMG.x_hero, 1920); DD.hero.imgCredit = IMG.x_hero;
  DD.premium.image = cu(IMG.x_homam4, 1100); DD.premium.imgCredit = IMG.x_homam4;
  DD.gallery = [
 {
  "id": "g1",
  "src": "",
  "credit": {
   "file": "Homam (246246081).jpg",
   "license": "CC BY-SA 2.0",
   "artist": "Rakesh from Bangalore"
  },
  "caption": {
   "hi": "घर पर हवन — अग्नि देव को आहुति",
   "en": "Havan at home — offerings to Agni"
  }
 },
 {
  "id": "g2",
  "src": "",
  "credit": {
   "file": "Overflowing boiling milk during gruhapravesam.jpg",
   "license": "CC BY-SA 4.0",
   "artist": "Bssasidhar"
  },
  "caption": {
   "hi": "गृह प्रवेश — नए घर में दूध उफनाने की रस्म",
   "en": "Griha Pravesh — the milk-boiling ritual"
  }
 },
 {
  "id": "g3",
  "src": "",
  "credit": {
   "file": "Satyanarayan Pooja.jpg",
   "license": "CC BY-SA 3.0",
   "artist": "Coolgama"
  },
  "caption": {
   "hi": "सत्यनारायण पूजा की वेदी",
   "en": "Satyanarayan puja altar"
  }
 },
 {
  "id": "g4",
  "src": "",
  "credit": {
   "file": "Pooja ki thaal rudrabhishek.jpg",
   "license": "CC BY-SA 4.0",
   "artist": "Saumya.st"
  },
  "caption": {
   "hi": "रुद्राभिषेक की पूजा थाली",
   "en": "Puja thali for Rudrabhishek"
  }
 },
 {
  "id": "g5",
  "src": "",
  "credit": {
   "file": "Samuhik Yagya.jpg",
   "license": "CC BY-SA 3.0",
   "artist": "All World Gayatri Pariwar, Shantikunj"
  },
  "caption": {
   "hi": "सामूहिक यज्ञ",
   "en": "Collective yagya"
  }
 },
 {
  "id": "g6",
  "src": "",
  "credit": {
   "file": "Diwali Oil lamps Darjeeling.jpg",
   "license": "CC BY-SA 3.0",
   "artist": "Benoy"
  },
  "caption": {
   "hi": "दीपावली के दीप",
   "en": "Diwali lamps"
  }
 },
 {
  "id": "g7",
  "src": "",
  "credit": {
   "file": "Devi jawaraa.png",
   "license": "CC BY-SA 4.0",
   "artist": "Kim Hyul Seok"
  },
  "caption": {
   "hi": "नवरात्रि — जवारे",
   "en": "Navratri — jawara"
  }
 },
 {
  "id": "g8",
  "src": "",
  "credit": {
   "file": "Sacred Flames of Devotion – The Ganga Aarti at Dashashwamedh Ghat.jpg",
   "license": "CC BY-SA 4.0",
   "artist": "Subhranilbasak0"
  },
  "caption": {
   "hi": "गंगा आरती, काशी",
   "en": "Ganga Aarti, Kashi"
  }
 }
];
  DD.gallery.forEach(function (g) { g.src = cu(g.credit, 1280); });
})();
