/* वैदिक शोध संस्थान — public site */
(function () {
  'use strict';

  /* ---------------- UI text ---------------- */
  var UI = {
    hi: {
      nav_home: 'मुखपृष्ठ', nav_services: 'पूजा सेवाएँ', nav_jyotish: 'ज्योतिष', nav_fest: 'आगामी पर्व', nav_track: 'मेरी बुकिंग', nav_contact: 'संपर्क',
      lang_btn: 'English', book_puja: 'पूजा बुक करें', choose_svc: 'पूजा चुनें', our_glimpse: 'हमारे अनुष्ठान की झलक', qa_h: 'प्रश्नोत्तर', about: 'संस्था परिचय', simple_note: 'बुकिंग भेजते ही पंडित जी आपको फ़ोन करके मुहूर्त, तिथि और दक्षिणा की जानकारी देंगे।', e_svc: 'कृपया पहले पूजा चुनें', call: 'कॉल करें', whatsapp: 'व्हाट्सऐप', call_now: 'अभी कॉल करें',
      show_all: 'सभी {n} सेवाएँ देखें', nav_panchang: 'पंचांग', nav_kundli: 'कुंडली', nav_rashifal: 'राशिफल', nav_milan: 'कुंडली मिलान', nav_tirth: 'तीर्थ दर्शन', nav_mandal: 'पूजा मंडल', nav_books: 'पुस्तकालय', books_h: 'कर्मकांड पुस्तकालय', books_p: 'नित्यकर्म-पूजाप्रकाश, दुर्गासप्तशती, रुद्राष्टाध्यायी, वास्तु व गृहप्रवेश पद्धति — प्रामाणिक स्रोतों से, निःशुल्क पढ़ें।', books_btn: 'सभी पुस्तकें देखें', ey_books: 'ग्रंथ संग्रह', mandal_h: 'पूजा के मंडल', mandal_p: 'सर्वतोभद्र, नवग्रह, षोडश मातृका, वास्तु — वेदी पर बनने वाले हर मंडल की रचना, रंग और आवाहित देवता, स्रोत सहित।', mandal_btn: 'सभी मंडल देखें', ey_mandal: 'वेदी व मंडल', tirth_h: 'तीर्थ दर्शन', tirth_p: 'द्वादश ज्योतिर्लिंग, अष्टविनायक और 51 शक्तिपीठ — कथा, स्थान व विशेषताएँ प्रामाणिक स्रोतों सहित।',
      nav_gallery: 'गैलरी', gallery_h: 'झलकियाँ', gallery_p: 'हमारे अनुष्ठानों, हवन और संस्कारों की कुछ झलकियाँ।',
      premium_cta: 'महा-अनुष्ठान बुक करें', premium_enquire: 'विशेष अनुष्ठान हेतु पूछें',
      email_sent: 'बुकिंग का विवरण हमारे ईमेल पर पहुँच गया है।', email_fail: 'ईमेल अपने-आप नहीं जा सका — नीचे दिए बटन से अपने ईमेल ऐप द्वारा भेज दें।',
      send_email: 'विवरण ईमेल से भेजें', email_btn: 'ईमेल', email_subject: 'पूजा बुकिंग',
      search_ph: 'पूजा खोजें — जैसे गृह प्रवेश, हवन, सुंदरकांड…', search: 'खोजें', all: 'सभी',
      services_h: 'पूजा, हवन, यज्ञ व ज्योतिष सेवाएँ', services_p: 'पूजा चुनें, पैकेज चुनें और तिथि भरें — पंडित जी का मुहूर्त व विवरण हम फ़ोन पर पक्का करेंगे।',
      from: 'दक्षिणा', starting: 'से आरंभ', details: 'विवरण देखें', price_note: 'दक्षिणा व पूजन सामग्री की पूरी जानकारी पंडित जी फ़ोन पर देंगे — बुकिंग अभी नि:शुल्क है।', photo: 'फ़ोटो', credits: 'फ़ोटो साभार', credits_p: 'इस वेबसाइट की तस्वीरें विकिमीडिया कॉमन्स से मुक्त लाइसेंस के अंतर्गत ली गई हैं। सभी फ़ोटोग्राफ़रों का आभार।', eyebrow_hero: 'शास्त्रोक्त वैदिक अनुष्ठान', ey_services: 'हमारी सेवाएँ', ey_steps: 'सरल प्रक्रिया', ey_trust: 'हमारा संकल्प', ey_fest: 'आगामी पर्व', ey_gallery: 'झलकियाँ', ey_faq: 'जिज्ञासा', ey_purpose: 'मनोकामना अनुसार', ey_tirth: 'तीर्थ दर्शन', h_s1: 'नाम-गोत्र से संकल्प', h_s2: 'आपके घर, आपके मुहूर्त पर', h_s3: 'हिंदी व संस्कृत में विधि', svc_count: 'अनुष्ठान व सेवाएँ', book: 'बुक करें', popular: 'लोकप्रिय', duration: 'अवधि',
      no_results: 'इस खोज से कोई पूजा नहीं मिली। दूसरा शब्द लिखें या हमें कॉल करें — हर प्रकार का कर्मकांड कराया जाता है।',
      purpose_h: 'किस कामना हेतु पूजा करानी है?', purpose_p: 'अपनी आवश्यकता चुनें, उसके अनुसार उपयुक्त अनुष्ठान देखें।',
      steps_h: 'बुकिंग कैसे होती है',
      s1h: 'पूजा चुनें', s1p: 'सेवा व पैकेज — सामग्री सहित या बिना सामग्री।',
      s2h: 'विवरण भरें', s2p: 'नाम, गोत्र, पता और अपनी पसंद की तिथि।',
      s3h: 'मुहूर्त पक्का', s3p: 'पंडित जी पंचांग देखकर कॉल पर मुहूर्त व समय तय करेंगे।',
      s4h: 'पूजा सम्पन्न', s4p: 'पंडित जी नियत समय पर आपके घर या वीडियो कॉल पर।',
      promise_h: 'हमारा संकल्प',
      fest_h: 'आगामी पर्व व शुभ अवसर', fest_p: 'इन तिथियों के लिए बुकिंग पहले से कर लें — पर्व के दिन पंडित जी की माँग अधिक रहती है।', fest_book: 'इस पर्व हेतु बुक करें',
      pandits_h: 'हमारे विद्वान पंडित जी', exp: 'वर्ष अनुभव',
      testi_h: 'यजमानों की राय',
      faq_h: 'अक्सर पूछे जाने वाले प्रश्न',
      contact_h: 'संपर्क करें', address: 'पता', phone: 'फ़ोन', hours: 'समय', email: 'ईमेल', area: 'सेवा क्षेत्र',
      foot_links: 'पूजा श्रेणियाँ', foot_info: 'जानकारी', terms: 'नियम व शर्तें', refund: 'रद्दीकरण व धनवापसी', privacy: 'गोपनीयता नीति', admin: 'प्रबंधन',
      rights: 'सर्वाधिकार सुरक्षित',
      home: 'मुखपृष्ठ', benefits: 'लाभ', samagri: 'मुख्य पूजन सामग्री', choose_pkg: 'पैकेज चुनें', book_this: 'यह पूजा बुक करें', ask_wa: 'व्हाट्सऐप पर पूछें',
      related: 'संबंधित पूजाएँ', not_found: 'यह पूजा नहीं मिली।', back_home: 'मुखपृष्ठ पर जाएँ',
      mode: 'पूजा कहाँ होगी?', mode_home: 'मेरे घर/स्थान पर', mode_online: 'ऑनलाइन (वीडियो कॉल)', mode_phone: 'फ़ोन / वीडियो कॉल', mode_visit: 'प्रत्यक्ष भेंट',
      date: 'पसंदीदा तिथि', time: 'समय', t_morning: 'प्रातः', t_noon: 'मध्याह्न', t_evening: 'सायं', t_muhurat: 'मुहूर्त अनुसार',
      name: 'यजमान का नाम', mobile: 'मोबाइल नंबर', email_opt: 'ईमेल', optional: '(वैकल्पिक)', gotra: 'गोत्र', gotra_hint: 'पता न हो तो “कश्यप” लिखा जाता है',
      addr: 'पूरा पता', city: 'शहर', pincode: 'पिन कोड', lang_pref: 'पंडित जी की भाषा', notes: 'विशेष निवेदन',
      dob: 'जन्म तिथि', tob: 'जन्म समय', pob: 'जन्म स्थान', question: 'आपका प्रश्न', partner: 'दूसरे व्यक्ति का जन्म विवरण (कुंडली मिलान हेतु)',
      next: 'आगे बढ़ें', back: 'पीछे', send: 'बुकिंग भेजें', sending: 'भेजी जा रही है…',
      review: 'बुकिंग की जाँच करें', consent: 'मैं सहमत हूँ कि पंडित जी की उपलब्धता व मुहूर्त की पुष्टि फ़ोन पर होगी।',
      e_req: 'यह भरना आवश्यक है', e_mobile: '10 अंकों का सही मोबाइल नंबर लिखें', e_pin: '6 अंकों का पिन कोड लिखें', e_date: 'आज या आगे की तिथि चुनें', e_consent: 'आगे बढ़ने के लिए सहमति दें',
      done_h: 'आपकी बुकिंग प्राप्त हो गई', done_p: 'हमारी टीम शीघ्र ही कॉल करके मुहूर्त व विवरण पक्का करेगी।',
      booking_id: 'बुकिंग संख्या', send_wa: 'विवरण व्हाट्सऐप पर भेजें', close: 'बंद करें', pay_upi: 'UPI से अग्रिम दक्षिणा दें', advance: 'अग्रिम',
      upi_note: 'अग्रिम भुगतान वैकल्पिक है — मुहूर्त पक्का होने के बाद भी दे सकते हैं।',
      track_h: 'मेरी बुकिंग', track_p: 'इस फ़ोन/ब्राउज़र से की गई बुकिंग यहाँ दिखती हैं।', track_empty: 'अभी कोई बुकिंग नहीं है।', check_status: 'स्थिति जानें',
      st_new: 'नई', st_confirmed: 'पक्की', st_done: 'सम्पन्न', st_cancelled: 'रद्द', status: 'स्थिति',
      package: 'पैकेज', service: 'सेवा', wa_greet: 'नमस्ते पंडित जी, मैं यह पूजा बुक करना चाहता/चाहती हूँ:',
      wa_ask: 'नमस्ते, मुझे इस पूजा के बारे में जानकारी चाहिए:', fallback_jyotish: 'ज्योतिष',
      preview_bar: 'पूर्वावलोकन — यह डैशबोर्ड का बिना-प्रकाशित ड्राफ़्ट है'
    },
    en: {
      nav_home: 'Home', nav_services: 'Puja services', nav_jyotish: 'Jyotish', nav_fest: 'Festivals', nav_track: 'My bookings', nav_contact: 'Contact',
      lang_btn: 'हिंदी', book_puja: 'Book a puja', choose_svc: 'Choose a puja', our_glimpse: 'Glimpses from our rituals', qa_h: 'Questions & answers', about: 'About us', simple_note: 'Once you send this, Pandit ji will call you to fix the muhurat, date and dakshina.', e_svc: 'Please choose a puja first', call: 'Call', whatsapp: 'WhatsApp', call_now: 'Call now',
      show_all: 'See all {n} services', nav_panchang: 'Panchang', nav_kundli: 'Kundli', nav_rashifal: 'Horoscope', nav_milan: 'Kundli Milan', nav_tirth: 'Tirthas', nav_mandal: 'Puja Mandals', nav_books: 'Library', books_h: 'Karmkand library', books_p: 'Nitya Karma Puja Prakash, Durga Saptashati, Rudrashtadhyayi, Vastu and Griha Pravesh paddhatis — from authentic sources, free to read.', books_btn: 'See all books', ey_books: 'Granth Sangrah', mandal_h: 'The mandals of puja', mandal_p: 'Sarvatobhadra, Navagraha, Shodash Matrika, Vastu — the layout, colours and deities of every mandal drawn on the vedi, with sources.', mandal_btn: 'See all mandals', ey_mandal: 'Vedi & Mandal', tirth_h: 'Sacred Tirthas', tirth_p: 'The 12 Jyotirlingas, Ashtavinayak and 51 Shakti Peethas — legends, locations and highlights with sources.',
      nav_gallery: 'Gallery', gallery_h: 'Glimpses', gallery_p: 'A few glimpses of our rituals, havans and sanskars.',
      premium_cta: 'Book a Maha-Anushthan', premium_enquire: 'Enquire about special rituals',
      email_sent: 'Your booking details have reached our email.', email_fail: 'The email could not be sent automatically — use the button below to send it from your email app.',
      send_email: 'Send details by email', email_btn: 'Email', email_subject: 'Puja booking',
      search_ph: 'Search a puja — e.g. Griha Pravesh, havan, Sundarkand…', search: 'Search', all: 'All',
      services_h: 'Puja, havan, yagya & jyotish', services_p: 'Pick a puja and package and enter a date — we confirm Pandit ji’s muhurat and details on the phone.',
      from: 'Dakshina', starting: 'onwards', details: 'View details', price_note: 'Pandit ji will share dakshina and samagri details on the phone — booking is free.', photo: 'Photo', credits: 'Photo credits', credits_p: 'Photos on this site come from Wikimedia Commons under free licences. Our thanks to every photographer.', eyebrow_hero: 'Vedic rituals, as the shastras prescribe', ey_services: 'Our services', ey_steps: 'Simple process', ey_trust: 'Our promise', ey_fest: 'Upcoming festivals', ey_gallery: 'Glimpses', ey_faq: 'Questions', ey_purpose: 'By wish', ey_tirth: 'Pilgrimage', h_s1: 'Sankalp in your name & gotra', h_s2: 'At your home, on your muhurat', h_s3: 'Rituals in Hindi & Sanskrit', svc_count: 'rituals & services', book: 'Book', popular: 'Popular', duration: 'Duration',
      no_results: 'No puja matches that search. Try another word or call us — every kind of karmkand is performed.',
      purpose_h: 'What is the puja for?', purpose_p: 'Pick your need and see the rituals suited to it.',
      steps_h: 'How booking works',
      s1h: 'Choose a puja', s1p: 'Service and package — with or without samagri.',
      s2h: 'Fill details', s2p: 'Name, gotra, address and your preferred date.',
      s3h: 'Muhurat confirmed', s3p: 'Pandit ji checks the panchang and fixes the time on a call.',
      s4h: 'Puja performed', s4p: 'Pandit ji arrives on time at your home, or joins on video.',
      promise_h: 'Our commitment',
      fest_h: 'Upcoming festivals & occasions', fest_p: 'Book early for these dates — pandits are in high demand on festival days.', fest_book: 'Book for this festival',
      pandits_h: 'Our learned pandits', exp: 'years experience',
      testi_h: 'What yajmans say',
      faq_h: 'Frequently asked questions',
      contact_h: 'Contact us', address: 'Address', phone: 'Phone', hours: 'Hours', email: 'Email', area: 'Service area',
      foot_links: 'Puja categories', foot_info: 'Information', terms: 'Terms & conditions', refund: 'Cancellation & refund', privacy: 'Privacy policy', admin: 'Admin',
      rights: 'All rights reserved',
      home: 'Home', benefits: 'Benefits', samagri: 'Main puja samagri', choose_pkg: 'Choose a package', book_this: 'Book this puja', ask_wa: 'Ask on WhatsApp',
      related: 'Related pujas', not_found: 'This puja was not found.', back_home: 'Go to home',
      mode: 'Where will the puja happen?', mode_home: 'At my home / place', mode_online: 'Online (video call)', mode_phone: 'Phone / video call', mode_visit: 'In-person visit',
      date: 'Preferred date', time: 'Time', t_morning: 'Morning', t_noon: 'Midday', t_evening: 'Evening', t_muhurat: 'As per muhurat',
      name: 'Yajman’s name', mobile: 'Mobile number', email_opt: 'Email', optional: '(optional)', gotra: 'Gotra', gotra_hint: 'If unknown, “Kashyap” is used',
      addr: 'Full address', city: 'City', pincode: 'PIN code', lang_pref: 'Pandit ji’s language', notes: 'Special request',
      dob: 'Date of birth', tob: 'Time of birth', pob: 'Place of birth', question: 'Your question', partner: 'Second person’s birth details (for matching)',
      next: 'Continue', back: 'Back', send: 'Send booking', sending: 'Sending…',
      review: 'Review your booking', consent: 'I agree that pandit availability and muhurat will be confirmed on the phone.',
      e_req: 'This is required', e_mobile: 'Enter a valid 10-digit mobile number', e_pin: 'Enter a 6-digit PIN code', e_date: 'Choose today or a later date', e_consent: 'Please agree to continue',
      done_h: 'Your booking is received', done_p: 'Our team will call shortly to confirm the muhurat and details.',
      booking_id: 'Booking number', send_wa: 'Send details on WhatsApp', close: 'Close', pay_upi: 'Pay advance via UPI', advance: 'Advance',
      upi_note: 'Advance payment is optional — you can also pay after the muhurat is confirmed.',
      track_h: 'My bookings', track_p: 'Bookings made from this phone/browser appear here.', track_empty: 'No bookings yet.', check_status: 'Check status',
      st_new: 'New', st_confirmed: 'Confirmed', st_done: 'Completed', st_cancelled: 'Cancelled', status: 'Status',
      package: 'Package', service: 'Service', wa_greet: 'Namaste Pandit ji, I would like to book this puja:',
      wa_ask: 'Namaste, I would like to know about this puja:', fallback_jyotish: 'Jyotish',
      preview_bar: 'Preview — this is an unpublished draft from the dashboard'
    }
  };

  var ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/></svg>',
    fire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3c3 4 6 6.5 6 10.5a6 6 0 0 1-12 0C6 10 8 8 9 6c.5 2 1.5 3 3 3-1-2 0-4 0-6z"/><path d="M4 21h16"/></svg>',
    kalash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M8 7h8"/><path d="M9 7c-3 2-4 5-3 8s3 5 6 5 5-2 6-5-0-6-3-8"/><path d="M12 7V4M9 4c1 1 5 1 6 0"/><circle cx="12" cy="13" r="1.5"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1z"/><path d="M12 6v14"/></svg>',
    planet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="5"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-20 12 12)"/></svg>',
    diya: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 14h18c-1 4-5 6-9 6s-8-2-9-6z"/><path d="M12 4c2 2.5 3 4 3 5.5a3 3 0 0 1-6 0C9 8 10 6.5 12 4z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.1-.1z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>'
  };

  /* ---------------- state ---------------- */
  var D = null;
  var lang = localStorage.getItem('vss_lang') || 'hi';
  var state = { cat: 'all', q: '' };
  var params = new URLSearchParams(location.search);
  var PREVIEW = params.get('preview') === '1';

  function u(k) { return (UI[lang] && UI[lang][k]) || UI.hi[k] || k; }
  function t(o) { if (o == null) return ''; if (typeof o === 'string') return o; return o[lang] || o.hi || o.en || ''; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function heroTitle(x) { var p = String(x || '').split(/\s+[—–-]\s+/); return p.length > 1 ? esc(p[0]) + '<span class="h1-sub">' + esc(p.slice(1).join(' — ')) + '</span>' : esc(x); }
  function showP() { return D && D.settings && D.settings.showPrices === true; }
  function pr(n, pre) { return showP() ? (pre || '') + inr(n) : ''; }
  function credOk(o) { return !!(o && o.imgCredit && o.imgCredit.file && String(o.image || o.src || '').indexOf(encodeURIComponent(o.imgCredit.file)) > -1); }
  function credit(c) { if (!c || !c.file) return ''; return u('photo') + ': <a href="https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(c.file.replace(/ /g, '_')) + '" target="_blank" rel="noopener">' + esc(c.artist || 'Wikimedia Commons') + '</a>, ' + esc(c.license || '') + ' — Wikimedia Commons'; }
  function eyebrow(k, cls) { return '<span class="eyebrow' + (cls ? ' ' + cls : '') + '">' + u(k) + '</span>'; }
  function inr(n) { n = Number(n) || 0; return '₹' + n.toLocaleString('en-IN'); }
  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function digits(s) { return String(s || '').replace(/\D/g, ''); }
  function telHref() { return 'tel:+91' + digits(D.settings.phone).slice(-10); }
  function waHref(text) { var n = digits(D.settings.whatsapp || ('91' + D.settings.phone)); return 'https://wa.me/' + n + (text ? '?text=' + encodeURIComponent(text) : ''); }
  function bookEmail() { return (D.settings.bookingEmail || D.settings.email || '').trim(); }
  function mailHref(b) { return 'mailto:' + bookEmail() + '?subject=' + encodeURIComponent(u('email_subject') + ' ' + b.id + ' — ' + b.serviceName) + '&body=' + encodeURIComponent(waText(b)); }
  function svc(id) { return D.services.find(function (s) { return s.id === id && s.active !== false; }); }
  function cat(id) { return D.categories.find(function (c) { return c.id === id; }) || { name: { hi: '', en: '' }, icon: 'star' }; }
  function minPrice(s) { var p = (s.packages || []).map(function (x) { return Number(x.price) || 0; }).filter(Boolean); return p.length ? Math.min.apply(null, p) : Number(s.price) || 0; }
  function lines(o) { return t(o).split(/\n|•/).map(function (x) { return x.trim(); }).filter(Boolean); }
  function toast(msg) { var el = document.createElement('div'); el.className = 'toast'; el.textContent = msg; document.body.appendChild(el); setTimeout(function () { el.remove(); }, 2600); }
  function isJyotish(s) { return s && s.cat === 'jyotish'; }
  function todayISO() { var d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); }

  /* ---------------- load data ---------------- */
  function load() {
    if (PREVIEW) {
      try { var draft = JSON.parse(localStorage.getItem('vss_draft') || 'null'); if (draft) return Promise.resolve(draft); } catch (e) {}
    }
    return fetch('data/site-data.json?v=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .catch(function () { return window.DEFAULT_DATA; });
  }

  /* ---------------- chrome ---------------- */
  function chrome() {
    document.documentElement.lang = lang;
    document.title = t(D.settings.siteName) + ' — ' + t(D.settings.tagline);
    $$('[data-t]').forEach(function (el) { el.textContent = t(D.settings[el.getAttribute('data-t')]); });
    $$('[data-ui]').forEach(function (el) { el.textContent = u(el.getAttribute('data-ui')); });
    $('#langBtn').textContent = u('lang_btn');
    $('#ticker').textContent = t(D.settings.ticker);
    var ph = $('#top-phone'); ph.href = telHref(); ph.textContent = '☎ ' + D.settings.phone;
    $('#fab-call').href = telHref(); $('#fab-call').innerHTML = ICONS.phone;
    $('#fab-wa').href = waHref(); $('#fab-wa').innerHTML = ICONS.wa;
    $('#mb-call').href = telHref(); $('#mb-call').textContent = u('call');
    $('#mb-wa').href = waHref(); $('#mb-wa').textContent = u('whatsapp');
    $('#foot-addr').innerHTML = esc(t(D.settings.address)) + '<br><a href="' + telHref() + '">' + esc(D.settings.phone) + '</a>' + (D.settings.email ? ' • <a href="mailto:' + esc(D.settings.email) + '">' + esc(D.settings.email) + '</a>' : '');
    var so = D.settings.social || {}, sl = [];
    if (so.facebook) sl.push('<a href="' + esc(so.facebook) + '" target="_blank" rel="noopener">Facebook</a>');
    if (so.instagram) sl.push('<a href="' + esc(so.instagram) + '" target="_blank" rel="noopener">Instagram</a>');
    if (so.youtube) sl.push('<a href="' + esc(so.youtube) + '" target="_blank" rel="noopener">YouTube</a>');
    $('#foot-social').innerHTML = sl.join(' • ');
    $('#foot-cats').innerHTML = D.categories.map(function (c) { return '<li><a href="#/cat/' + esc(c.id) + '">' + esc(t(c.name)) + '</a></li>'; }).join('');
    $('#copy').textContent = '© ' + new Date().getFullYear() + ' ' + t(D.settings.siteName) + ' — ' + u('rights');
    if (PREVIEW && !$('#pv')) {
      var b = document.createElement('div'); b.id = 'pv';
      b.style.cssText = 'background:#F2B705;color:#231815;text-align:center;padding:6px;font-weight:600';
      b.textContent = u('preview_bar'); document.body.prepend(b);
    } else if ($('#pv')) $('#pv').textContent = u('preview_bar');
  }

  /* ---------------- views ---------------- */
  var YANTRA = '<svg class="yantra" viewBox="0 0 400 400" aria-hidden="true">' +
    '<g class="spin" fill="none" stroke="#9E1B1B" stroke-width="1.4">' +
    (function () { var s = ''; for (var i = 0; i < 16; i++) { s += '<path transform="rotate(' + (i * 22.5) + ' 200 200)" d="M200 26c18 26 18 52 0 72-18-20-18-46 0-72z" fill="#E8871E" fill-opacity=".14"/>'; } return s; })() +
    '<circle cx="200" cy="200" r="150"/><circle cx="200" cy="200" r="142"/>' +
    (function () { var s = ''; for (var i = 0; i < 8; i++) { s += '<path transform="rotate(' + (i * 45) + ' 200 200)" d="M200 66c12 16 12 32 0 44-12-12-12-28 0-44z" fill="#F2B705" fill-opacity=".35"/>'; } return s; })() +
    '</g>' +
    '<g fill="none" stroke-width="2"><path d="M200 92 L302 268 L98 268 Z" stroke="#9E1B1B"/><path d="M200 308 L98 132 L302 132 Z" stroke="#9E1B1B"/>' +
    '<path d="M200 130 L262 236 L138 236 Z" stroke="#2E6B3A"/><path d="M200 270 L138 164 L262 164 Z" stroke="#2E6B3A"/></g>' +
    '<rect x="70" y="70" width="260" height="260" fill="none" stroke="#7A1313" stroke-width="2"/>' +
    '<path d="M180 70h40v-10h-40zM180 330h40v10h-40zM70 180v40H60v-40zM330 180v40h10v-40z" fill="#7A1313"/>' +
    '<g class="flame"><path d="M200 162c12 16 20 26 20 40a20 20 0 0 1-40 0c0-14 8-24 20-40z" fill="#E8871E"/><path d="M200 182c6 8 10 13 10 20a10 10 0 0 1-20 0c0-7 4-12 10-20z" fill="#F2B705"/></g>' +
    '<path d="M174 226h52l-6 12h-40z" fill="#7A1313"/></svg>';

  function svcCard(s) {
    var c = cat(s.cat);
    return '<article class="svc" data-cat="' + esc(s.cat) + '">' +
      '<div class="svc-img">' + (s.image ? '<img loading="lazy" src="' + esc(s.image) + '" alt="' + esc(t(s.name)) + '"' + (s.imgPos ? ' style="object-position:' + esc(s.imgPos) + '"' : '') + '>' : '<span class="svc-ph">' + (ICONS[c.icon] || ICONS.star) + '</span>') +
      '<span class="svc-cat">' + esc(t(c.name)) + '</span>' + (s.popular ? '<span class="tag">' + u('popular') + '</span>' : '') + '</div>' +
      '<div class="svc-body">' +
      '<h3><a href="#/seva/' + esc(s.id) + '">' + esc(t(s.name)) + '</a></h3>' +
      (s.duration ? '<span class="meta">' + ICONS.clock.replace('<svg', '<svg width="15" height="15"') + esc(s.duration) + '</span>' : '') +
      '<p>' + esc(t(s.desc)) + '</p>' +
      '<div class="foot">' + (showP() ? '<span class="price">' + inr(minPrice(s)) + '</span>' : '<span class="more">' + u('details') + ' <i aria-hidden="true">→</i></span>') +
      '<button class="btn btn-primary btn-sm" data-book="' + esc(s.id) + '">' + u('book') + '</button></div></div></article>';
  }

  function filtered() {
    var q = state.q.trim().toLowerCase();
    return D.services.filter(function (s) {
      if (s.active === false) return false;
      if (state.cat !== 'all' && s.cat !== state.cat) return false;
      if (!q) return true;
      var hay = [s.name.hi, s.name.en, s.desc.hi, s.desc.en, t(cat(s.cat).name)].join(' ').toLowerCase();
      return hay.indexOf(q) > -1;
    });
  }

  function renderServices() {
    var list = filtered(), more = '';
    if (state.cat === 'all' && !state.q.trim() && !state.all && list.length > 8) {
      var pop = list.filter(function (s) { return s.popular; });
      var show = pop.concat(list.filter(function (s) { return !s.popular; })).slice(0, 8);
      more = '<div style="grid-column:1/-1;text-align:center"><button class="btn btn-ghost" id="showAll" type="button">' + u('show_all').replace('{n}', list.length) + '</button></div>';
      list = show;
    }
    $('#svcGrid').innerHTML = (list.length ? list.map(svcCard).join('') : '<div class="empty" style="grid-column:1/-1">' + u('no_results') + '</div>') + more;
    if ($('#showAll')) $('#showAll').onclick = function () { state.all = true; renderServices(); };
    $$('.cat').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-cat') === state.cat ? 'true' : 'false'); });
  }

  function premiumHTML() {
    var P = D.premium; if (!P) return '';
    var items = (P.services || []).map(svc).filter(Boolean);
    if (!items.length) return '';
    return '<section class="premium" id="premium"><div class="wrap prem-grid">' +
      '<figure class="prem-art"><img src="' + esc(P.image || 'assets/img/gallery/havan-kund.svg') + '" alt="" loading="lazy">' + (false ? '<figcaption>' + credit(P.imgCredit) + '</figcaption>' : '') + '</figure>' +
      '<div><span class="eyebrow">' + (lang === 'en' ? 'Premium anushthan' : 'विशेष अनुष्ठान') + '</span><h2>' + esc(t(P.title)) + '</h2><p class="prem-sub">' + esc(t(P.subtitle)) + '</p>' +
      ((P.features || []).length ? '<ul class="prem-feat">' + P.features.map(function (f) { return '<li>' + ICONS.check + '<span>' + esc(t(f)) + '</span></li>'; }).join('') + '</ul>' : '') +
      '<div class="prem-list">' + items.map(function (s) {
        return '<div class="prem-item"><div><a href="#/seva/' + esc(s.id) + '">' + esc(t(s.name)) + '</a><small>' + esc(s.duration || '') + '</small></div>' +
          (showP() ? '<span class="prem-price">' + inr(minPrice(s)) + '</span>' : '') +
          '<button class="btn btn-gold btn-sm" data-book="' + esc(s.id) + '">' + u('book') + '</button></div>';
      }).join('') + '</div>' +
      '<a class="btn btn-ghost-light" href="tel:+91' + digits(D.settings.phone).slice(-10) + '">' + u('premium_enquire') + ' — ' + esc(D.settings.phone) + '</a>' +
      '</div></div></section>';
  }

  function galleryHTML() {
    var G = (D.gallery || []).filter(function (g) { return g.src; });
    if (!G.length) return '<span id="gallery"></span>';
    return '<section class="alt" id="gallery"><div class="wrap"><div class="sec-head"><div>' + eyebrow('ey_gallery') + '<h2>' + u('gallery_h') + '</h2><p>' + u('gallery_p') + '</p></div></div>' +
      '<div class="gallery">' + G.map(function (g, i) {
        var rem = (G.length + 3) % 4, span = (i === G.length - 1 && G.length > 1 && rem) ? ' style="grid-column:span ' + (5 - rem) + '"' : '';
        return '<figure class="gi' + (i === 0 ? ' big' : '') + '"' + span + '><button type="button" data-lb="' + i + '" aria-label="' + esc(t(g.caption)) + '"><img loading="lazy" src="' + esc(g.src) + '" alt="' + esc(t(g.caption)) + '"></button><figcaption>' + esc(t(g.caption)) + '</figcaption></figure>';
      }).join('') + '</div></div></section>';
  }

  function openLightbox(i) {
    var G = (D.gallery || []).filter(function (g) { return g.src; }), dlg = $('#lbDlg');
    var show = function () { var g = G[i]; $('#lbImg').src = g.src; $('#lbImg').alt = t(g.caption); $('#lbCap').innerHTML = esc(t(g.caption)) + '  (' + (i + 1) + '/' + G.length + ')'; };
    show();
    $('#lbPrev').onclick = function () { i = (i - 1 + G.length) % G.length; show(); };
    $('#lbNext').onclick = function () { i = (i + 1) % G.length; show(); };
    $('#lbClose').onclick = function () { dlg.close(); };
    dlg.onclick = function (e) { if (e.target === dlg) dlg.close(); };
    dlg.onkeydown = function (e) { if (e.key === 'ArrowLeft') $('#lbPrev').click(); if (e.key === 'ArrowRight') $('#lbNext').click(); };
    dlg.showModal();
  }

  function home(anchor) {
    var today = todayISO();
    var fests = (D.festivals || []).filter(function (f) { return f.date >= today; }).sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var pandits = D.pandits || [], testi = D.testimonials || [];
    var mapSrc = 'https://maps.google.com/maps?q=' + encodeURIComponent(D.settings.mapQuery || t(D.settings.address)) + '&z=15&output=embed';

    var html =
      '<section class="hero' + (D.hero.image ? ' has-photo' : '') + '">' +
        (D.hero.image ? '<img class="hero-bg" src="' + esc(D.hero.image) + '" alt="" fetchpriority="high">' : '') +
        '<div class="wrap"><div class="hero-copy">' +
        '<span class="eyebrow light">॥ ' + u('eyebrow_hero') + ' ॥</span>' +
        '<h1>' + heroTitle(t(D.hero.title)) + '</h1><p class="lead">' + esc(t(D.hero.subtitle)) + '</p>' +
        '<form class="finder" id="finder" role="search"><label class="sr" for="q">' + u('search') + '</label><input id="q" type="search" placeholder="' + esc(u('search_ph')) + '" value="' + esc(state.q) + '"><button class="btn btn-gold btn-sm">' + u('search') + '</button></form>' +
        '<div class="ctas"><a class="btn btn-gold" href="#/book" data-book="">' + u('book_puja') + '</a><a class="btn btn-ghost-light" href="' + telHref() + '">' + ICONS.phone.replace('<svg', '<svg width="18" height="18"') + ' ' + esc(D.settings.phone) + '</a></div>' +
        '<ul class="hero-trust"><li><b>' + D.services.filter(function (x) { return x.active !== false; }).length + '+</b> ' + u('svc_count') + '</li><li>' + u('h_s1') + '</li><li>' + u('h_s2') + '</li><li>' + u('h_s3') + '</li></ul>' +
        '</div></div>' +
              '</section>' +
      '<div class="area-band"><div class="wrap">' + ICONS.pin.replace('<svg', '<svg width="18" height="18"') + '<span>' + esc(t(D.settings.serviceArea)) + '</span></div></div>' +

      (window.VSSAstro ? astroCtx() && window.VSSAstro.strip() : '') +

      '<section id="sevaen"><div class="wrap">' +
        '<div class="sec-head center"><div>' + eyebrow('ey_services') + '<h2>' + u('services_h') + '</h2><p>' + u('services_p') + '</p></div></div>' +
        '<div class="cats" role="toolbar">' +
          '<button class="cat" data-cat="all">' + ICONS.kalash + u('all') + '</button>' +
          D.categories.map(function (c) { return '<button class="cat" data-cat="' + esc(c.id) + '">' + (c.image ? '<img class="cat-img" src="' + esc(c.image) + '" alt="" loading="lazy">' : (ICONS[c.icon] || ICONS.star)) + esc(t(c.name)) + '</button>'; }).join('') +
        '</div>' +
        '<div class="services" id="svcGrid" aria-live="polite"></div>' +
      '</div></section>' +

      premiumHTML() +

      '<section class="tirth-teaser"><div class="wrap"><div class="sec-head"><div>' + eyebrow('ey_tirth') + '<h2>' + u('tirth_h') + '</h2><p>' + u('tirth_p') + '</p></div></div><div class="tt-grid">' +
        [['jyotirling', lang === 'en' ? '12 Jyotirlingas' : '12 ज्योतिर्लिंग', lang === 'en' ? 'Somnath to Grishneshwar' : 'सोमनाथ से घृष्णेश्वर तक'],
         ['ashtavinayak', lang === 'en' ? 'Ashtavinayak' : 'अष्टविनायक', lang === 'en' ? 'Eight swayambhu Ganesh shrines' : 'आठ स्वयंभू गणपति'],
         ['shaktipeeth', lang === 'en' ? '51 Shakti Peethas' : '51 शक्तिपीठ', lang === 'en' ? 'From Hinglaj to Kamakhya' : 'हिंगलाज से कामाख्या तक']].map(function (x) {
          var ph = { jyotirling: 'Somanath_mandir_(cropped).jpg', ashtavinayak: 'Siddhi_Vinayak_at_Siddhatek.jpg', shaktipeeth: 'Kamakhya_Temple_-_DEV_8829.jpg' }; return '<a class="tt-card tt-' + x[0] + '" href="#/tirth/' + x[0] + '"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(ph[x[0]]) + '?width=700" alt="" loading="lazy"><b>' + x[1] + '</b><span>' + x[2] + '</span></a>'; }).join('') +
      '</div></div></section>' +

      '<section class="mandal-teaser"><div class="wrap mt-in"><div>' + eyebrow('ey_mandal', 'light') + '<h2>' + u('mandal_h') + '</h2><p>' + u('mandal_p') + '</p><a class="btn btn-gold" href="#/mandal">' + u('mandal_btn') + '</a></div><div class="mt-chips">' +
        [['sarvatobhadra', 'सर्वतोभद्र मंडल', 'Sarvatobhadra'], ['lingatobhadra', 'लिंगतोभद्र मंडल', 'Lingatobhadra'], ['navgrah', 'नवग्रह मंडल', 'Navagraha'], ['shodash_matrika', 'षोडश मातृका', 'Shodasha Matrika'], ['saptaghrit_matrika', 'सप्तघृत मातृका', 'Saptaghrita Matrika'], ['vastu', 'वास्तु मंडल', 'Vastu Mandal'], ['kshetrapal', 'क्षेत्रपाल मंडल', 'Kshetrapal'], ['yogini', 'चौंसठ योगिनी', '64 Yoginis'], ['lokpal', 'दशदिक्पाल', 'Dashadikpala']].map(function (x) { return '<a href="#/mandal/' + x[0] + '">' + (lang === 'en' ? x[2] : x[1]) + '</a>'; }).join('') +
      '</div></div></section>' +

      '<section class="books-teaser"><div class="wrap"><div class="sec-head"><div>' + eyebrow('ey_books') + '<h2>' + u('books_h') + '</h2><p>' + u('books_p') + '</p></div><a class="btn btn-ghost" href="#/pustak">' + u('books_btn') + '</a></div><div class="bt-row" id="btRow"></div></div></section>' +

      ((D.purposes || []).length ? '<section class="alt" id="kamna"><div class="wrap"><div class="sec-head"><div>' + eyebrow('ey_purpose') + '<h2>' + u('purpose_h') + '</h2><p>' + u('purpose_p') + '</p></div></div><div class="purposes">' +
        D.purposes.map(function (p) {
          var items = (p.services || []).map(svc).filter(Boolean);
          if (!items.length) return '';
          return '<div class="purpose"><h3>' + esc(t(p.name)) + '</h3><ul>' + items.map(function (s) { return '<li><a href="#/seva/' + esc(s.id) + '">' + esc(t(s.name)) + '</a></li>'; }).join('') + '</ul></div>';
        }).join('') + '</div></div></section>' : '') +

      '<section class="steps-sec"><div class="wrap"><div class="sec-head center"><div>' + eyebrow('ey_steps') + '<h2>' + u('steps_h') + '</h2></div></div><ol class="steps">' +
        [1, 2, 3, 4].map(function (i) { return '<li><h3>' + u('s' + i + 'h') + '</h3><p>' + u('s' + i + 'p') + '</p></li>'; }).join('') +
      '</ol></div></section>' +

      ((D.promises || []).length ? '<section class="alt promise-sec"><div class="wrap"><div class="sec-head"><div>' + eyebrow('ey_trust') + '<h2>' + u('promise_h') + '</h2></div></div><ul class="promises">' +
        D.promises.map(function (p) { return '<li>' + ICONS.check + '<span>' + esc(t(p)) + '</span></li>'; }).join('') + '</ul></div></section>' : '') +

      (fests.length ? '<section id="festivals"><div class="wrap"><div class="sec-head"><div>' + eyebrow('ey_fest') + '<h2>' + u('fest_h') + '</h2><p>' + u('fest_p') + '</p></div></div><div class="fests">' +
        fests.map(function (f) {
          var d = new Date(f.date + 'T00:00:00');
          var mon = d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { month: 'short', year: 'numeric' });
          return '<div class="fest"><div class="d"><b>' + d.getDate() + '</b><span>' + esc(mon) + '</span></div><div><h3>' + esc(t(f.name)) + '</h3><p>' + esc(t(f.note)) + '</p>' +
            (f.service && svc(f.service) ? '<a href="#/seva/' + esc(f.service) + '">' + u('fest_book') + '</a>' : '') + '</div></div>';
        }).join('') + '</div></div></section>' : '<span id="festivals"></span>') +

      galleryHTML() +

      (pandits.length ? '<section class="alt"><div class="wrap"><h2>' + u('pandits_h') + '</h2><div class="people">' +
        pandits.map(function (p) { return '<div class="person"><div class="ph"' + (p.photo ? ' style="background-image:url(\'' + esc(p.photo) + '\')"' : '') + '></div><h3>' + esc(t(p.name)) + '</h3><p>' + esc(t(p.spec)) + '</p>' + (p.exp ? '<p>' + esc(p.exp) + ' ' + u('exp') + '</p>' : '') + '</div>'; }).join('') +
        '</div></div></section>' : '') +

      (testi.length ? '<section><div class="wrap"><h2>' + u('testi_h') + '</h2><div class="people">' +
        testi.map(function (q) { return '<blockquote class="quote"><div class="stars" aria-label="' + (q.rating || 5) + '/5">' + '★★★★★'.slice(0, q.rating || 5) + '</div><p>' + esc(t(q.text)) + '</p><footer>' + esc(q.name) + (q.city ? ', ' + esc(q.city) : '') + '</footer></blockquote>'; }).join('') +
        '</div></div></section>' : '') +

      '<section class="alt" id="contact"><div class="wrap two-col">' +
        '<div class="faq">' + eyebrow('ey_faq') + '<h2>' + u('faq_h') + '</h2>' + (D.faqs || []).map(function (f) { return '<details><summary>' + esc(t(f.q)) + '</summary><p>' + esc(t(f.a)) + '</p></details>'; }).join('') + '</div>' +
        '<div style="display:grid;gap:18px"><div class="contact-card"><h3 style="margin:0;font-family:var(--f-display);font-size:1.6rem">' + u('contact_h') + '</h3>' +
          '<div class="row">' + ICONS.pin + '<div><b>' + u('address') + '</b><br>' + esc(t(D.settings.address)) + '</div></div>' +
          '<div class="row">' + ICONS.phone + '<div><b>' + u('phone') + '</b><br><a href="' + telHref() + '">' + esc(D.settings.phone) + '</a> • <a href="' + waHref() + '" target="_blank" rel="noopener">' + u('whatsapp') + '</a></div></div>' +
          (D.settings.email ? '<div class="row">' + ICONS.mail + '<div><b>' + u('email') + '</b><br><a href="mailto:' + esc(D.settings.email) + '">' + esc(D.settings.email) + '</a></div></div>' : '') +
          '<div class="row">' + ICONS.clock + '<div><b>' + u('hours') + '</b><br>' + esc(t(D.settings.hours)) + '</div></div>' +
          '<div class="row">' + ICONS.globe + '<div><b>' + u('area') + '</b><br>' + esc(t(D.settings.serviceArea)) + '</div></div>' +
        '</div><iframe class="map" title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="' + mapSrc + '"></iframe></div>' +
      '</div></section>';

    $('#main').innerHTML = html;
    renderServices();
    if (window.VSSBooks) { window.VSSBooks.init({ D: D, lang: lang, t: t, u: u, esc: esc, $: $, $$: $$ }); window.VSSBooks.load().then(function (d) { var r = $('#btRow'); if (r) r.innerHTML = d.books.map(function (b) { return '<a class="bt-item" href="#/pustak/' + b.id + '">' + window.VSSBooks.cover(b) + '<span>' + esc(lang === 'en' ? b.title_en : b.title_hi) + '</span></a>'; }).join(''); }).catch(function () {}); }
    $('#finder').addEventListener('submit', function (e) { e.preventDefault(); state.q = $('#q').value; state.cat = 'all'; renderServices(); $('#sevaen').scrollIntoView(); });
    $('#q').addEventListener('input', function () { state.q = this.value; renderServices(); });
    $$('.cat').forEach(function (b) { b.addEventListener('click', function () { state.cat = b.getAttribute('data-cat'); renderServices(); }); });
    if (anchor) { var el = document.getElementById(anchor); if (el) setTimeout(function () { el.scrollIntoView(); }, 30); }
    else window.scrollTo(0, 0);
  }

  function detail(id) {
    var s = svc(id);
    if (!s) { $('#main').innerHTML = '<div class="wrap detail"><p>' + u('not_found') + '</p><a class="btn btn-primary" href="#/">' + u('back_home') + '</a></div>'; return; }
    var c = cat(s.cat), ben = lines(s.benefits), sam = lines(s.samagri);
    var rel = D.services.filter(function (x) { return x.cat === s.cat && x.id !== s.id && x.active !== false; }).slice(0, 3);
    document.title = t(s.name) + ' — ' + t(D.settings.siteName);
    $('#main').innerHTML = '<div class="wrap detail">' +
      '<nav class="crumbs"><a href="#/">' + u('home') + '</a> / <a href="#/cat/' + esc(s.cat) + '">' + esc(t(c.name)) + '</a> / ' + esc(t(s.name)) + '</nav>' +
      '<div class="detail-grid"><div>' +
        '<h1>' + esc(t(s.name)) + '</h1>' +
        (s.image ? '<figure class="hero-img"><img src="' + esc(s.image) + '" alt="' + esc(t(s.name)) + '"' + (s.imgPos ? ' style="object-position:' + esc(s.imgPos) + '"' : '') + '></figure>' : '<div class="hero-img">' + (ICONS[c.icon] || ICONS.star) + '</div>') +
        ((s.video || (s.photos || []).length) ? '<div class="svc-media"><h2>' + u('our_glimpse') + '</h2><div class="sm-grid">' +
          (s.video ? '<video class="sm-video' + (s.videoPortrait ? ' portrait' : '') + '" src="' + esc(s.video) + '"' + (s.videoPoster ? ' poster="' + esc(s.videoPoster) + '"' : '') + ' controls playsinline preload="metadata"></video>' : '') +
          (s.photos || []).map(function (ph) { return '<img class="sm-photo" loading="lazy" src="' + esc(ph) + '" alt="' + esc(t(s.name)) + '">'; }).join('') +
        '</div></div>' : '') +
        '<p style="font-size:1.1rem">' + esc(t(s.desc)) + '</p>' +
        (s.duration ? '<p><b>' + u('duration') + ':</b> ' + esc(s.duration) + '</p>' : '') +
        (ben.length ? '<h2 style="font-size:1.5rem">' + u('benefits') + '</h2><ul class="list">' + ben.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' : '') +
        (sam.length ? '<h2 style="font-size:1.5rem">' + u('samagri') + '</h2><p>' + sam.map(esc).join(', ') + '</p>' : '') +
        '<div class="faq svc-qa"><h2 style="font-size:1.5rem">' + u('qa_h') + '</h2>' + svcQA(s, ben, sam).map(function (f) { return '<details><summary>' + esc(f[0]) + '</summary><p>' + esc(f[1]) + '</p></details>'; }).join('') + '</div>' +
      '</div><aside class="pkg-box"><h2 style="font-size:1.4rem">' + u('choose_pkg') + '</h2><form id="pkgForm">' +
        (s.packages || []).map(function (p, i) {
          return '<label class="pkg"><input type="radio" name="pkg" value="' + esc(p.id) + '"' + ((p.popular || (i === 0 && !(s.packages || []).some(function (x) { return x.popular; }))) ? ' checked' : '') + '>' +
            '<span class="top"><span>' + esc(t(p.name)) + (p.popular ? '<span class="pop">' + u('popular') + '</span>' : '') + '</span><span>' + pr(p.price) + '</span></span>' +
            '<small>' + esc(t(p.features)) + '</small></label>';
        }).join('') +
        (showP() ? '' : '<p class="price-note">' + u('price_note') + '</p>') +
        '<button class="btn btn-primary" style="width:100%;margin-top:6px" type="submit">' + u('book_this') + '</button>' +
        '<a class="btn btn-wa" style="width:100%;margin-top:10px" target="_blank" rel="noopener" href="' + waHref(u('wa_ask') + ' ' + t(s.name)) + '">' + u('ask_wa') + '</a>' +
      '</form></aside></div>' +
      (rel.length ? '<section style="padding:48px 0 0"><h2>' + u('related') + '</h2><div class="services">' + rel.map(svcCard).join('') + '</div></section>' : '') +
    '</div>';
    $('#pkgForm').addEventListener('submit', function (e) { e.preventDefault(); var v = (new FormData(this)).get('pkg'); openBooking(s.id, v); });
    window.scrollTo(0, 0);
  }

  function credits() {
    var rows = [];
    var add = function (label, c) { if (c && c.file) rows.push('<li><b>' + esc(label) + '</b> — ' + credit(c) + '</li>'); };
    if (credOk(D.hero)) add(lang === 'en' ? 'Home banner' : 'मुखपृष्ठ बैनर', D.hero.imgCredit);
    D.services.forEach(function (s) { if (s.active !== false && credOk(s)) add(t(s.name), s.imgCredit); });
    if (D.premium && credOk(D.premium)) add(t(D.premium.title), D.premium.imgCredit);
    (D.gallery || []).forEach(function (g) { if (g.credit) add(t(g.caption), g.credit); });
    var draw = function () { $('#main').innerHTML = '<div class="wrap detail page-text"><nav class="crumbs"><a href="#/">' + u('home') + '</a></nav><h1>' + u('credits') + '</h1><p>' + u('credits_p') + '</p><ul class="credits">' + rows.join('') + '</ul></div>'; };
    draw();
    Promise.all([fetch('data/tirth.json?v=2').then(function (r) { return r.json(); }).catch(function () { return null; }), fetch('data/mandal.json?v=2').then(function (r) { return r.json(); }).catch(function () { return null; })]).then(function (x) {
      var T = x[0], M = x[1];
      if (T) ['jyotirling', 'ashtavinayak', 'shaktipeeth'].forEach(function (g) { (T[g].items || []).forEach(function (it) { if (it.img) add(lang === 'en' ? (it.name_en || it.name_hi) : (it.name_hi || it.name_en), it.img); }); });
      if (M && M.banner) add(u('nav_mandal'), M.banner);
      if ((location.hash || window.VSS_ROUTE || '').indexOf('credits') > -1) draw();
    });
    window.scrollTo(0, 0);
  }

  // पूजा-विशेष प्रश्नोत्तर (AI सर्च व Google के लिए साफ़ उत्तर; वही पाठ उपयोगकर्ता को भी दिखता है)
  function svcQA(s, ben, sam) {
    var n = t(s.name), hi = lang !== 'en', ph = (D.settings.phone || '9625004090');
    var area = hi ? 'दिल्ली, नई दिल्ली, गुरुग्राम, नोएडा, फ़रीदाबाद व गाज़ियाबाद' : 'Delhi, New Delhi, Gurugram, Noida, Faridabad and Ghaziabad';
    var q = [];
    q.push([hi ? n + ' क्या है?' : 'What is ' + n + '?', t(s.desc)]);
    if (s.duration) q.push([hi ? n + ' में कितना समय लगता है?' : 'How long does ' + n + ' take?', hi ? 'सामान्यतः लगभग ' + s.duration + '। सही समय विधि के विस्तार, यजमान की संख्या और मुहूर्त पर निर्भर करता है।' : 'Usually about ' + s.duration + '. The exact time depends on the extent of the vidhi and the muhurat.']);
    if (ben.length) q.push([hi ? n + ' के क्या लाभ माने जाते हैं?' : 'What are the benefits of ' + n + '?', ben.join('; ') + (hi ? '।' : '.')]);
    if (sam.length) q.push([hi ? n + ' के लिए कौन-सी पूजन सामग्री चाहिए?' : 'What samagri is needed for ' + n + '?', (hi ? 'मुख्य सामग्री: ' : 'Main samagri: ') + sam.join(', ') + (hi ? '। “सामग्री सहित” पैकेज में सम्पूर्ण सामग्री पंडित जी स्वयं लाते हैं।' : '. In the “With samagri” package Pandit ji brings everything.')]);
    q.push([hi ? 'दिल्ली-एनसीआर में ' + n + ' के लिए पंडित जी कैसे बुक करें?' : 'How to book a pandit for ' + n + ' in Delhi NCR?', hi ? 'वैदिक शोध संस्थान (छतरपुर एक्सटेंशन, नई दिल्ली) ' + area + ' में घर पर शास्त्रोक्त विधि से ' + n + ' कराता है, और विदेश में रहने वालों के लिए ऑनलाइन पूजा भी। वेबसाइट पर “पूजा बुक करें” दबाकर नाम, मोबाइल व पता भेजें या ' + ph + ' पर कॉल/व्हाट्सऐप करें — पंडित जी मुहूर्त व दक्षिणा बताने हेतु कॉल करेंगे।' : 'Vaidik Shodh Sansthan (Chhatarpur Extension, New Delhi) performs ' + n + ' at home across ' + area + ', and online for families abroad. Press “Book a puja” and send your name, mobile and address, or call/WhatsApp ' + ph + ' — Pandit ji will call to fix the muhurat and dakshina.']);
    return q;
  }

  var ABOUT = {
    hi: 'वैदिक शोध संस्थान नई दिल्ली (F-171/27, छतरपुर एक्सटेंशन, छतरपुर, नई दिल्ली 110074) स्थित एक कर्मकांड व ज्योतिष सेवा संस्था है। संस्थान के अनुभवी वैदिक पंडित जी शास्त्रोक्त विधि से घर, दुकान, कार्यालय या मंदिर में पूजा, हवन, यज्ञ, संस्कार व अनुष्ठान कराते हैं।\nसेवा क्षेत्र: दिल्ली, नई दिल्ली, गुरुग्राम, नोएडा, फ़रीदाबाद व गाज़ियाबाद (दिल्ली-एनसीआर) में घर पर; भारत व विदेश में रहने वालों के लिए ऑनलाइन (वीडियो कॉल) पूजा।\nप्रमुख सेवाएँ: गृह प्रवेश पूजा, वास्तु शांति, भूमि पूजन, कार्यालय/दुकान उद्घाटन पूजा, नवग्रह शांति हवन, महामृत्युंजय हवन व जाप, रुद्राभिषेक, लक्ष्मी-कुबेर हवन, गायत्री यज्ञ, चंडी पाठ, सत्यनारायण कथा, सुंदरकांड पाठ, अखंड रामायण, नामकरण, मुंडन, जनेऊ (उपनयन), विवाह संस्कार, श्राद्ध, तेरहवीं, कालसर्प दोष, मांगलिक दोष, पितृ दोष, गंडमूल व शनि शांति पूजा, तथा कुंडली विश्लेषण, कुंडली मिलान, मुहूर्त व वास्तु परामर्श।\nबुकिंग: वेबसाइट पर “पूजा बुक करें” फ़ॉर्म, या फ़ोन/व्हाट्सऐप 9625004090, ईमेल karmkand0000@gmail.com। समय: प्रतिदिन सुबह 7 से रात 9 बजे।\nवेबसाइट पर निःशुल्क सामग्री: आज का पंचांग, जन्म कुंडली, कुंडली मिलान, दैनिक राशिफल, 12 ज्योतिर्लिंग, अष्टविनायक व 51 शक्तिपीठों की जानकारी, सभी पूजा मंडलों (सर्वतोभद्र, नवग्रह, षोडश मातृका, वास्तु आदि) के चित्र व रचना, तथा कर्मकांड की प्रामाणिक पुस्तकों का पुस्तकालय।',
    en: 'Vaidik Shodh Sansthan is a karmkand and Vedic astrology service based at F-171/27, Chhatarpur Extension, Chhatarpur, New Delhi 110074. Its experienced Vedic pandits perform puja, havan, yagya, sanskars and anushthans by the shastric method at homes, shops, offices and temples.\nService area: at home across Delhi, New Delhi, Gurugram, Noida, Faridabad and Ghaziabad (Delhi NCR); online (video call) puja for families elsewhere in India and abroad.\nMain services: Griha Pravesh, Vastu Shanti, Bhoomi Pujan, office/shop opening puja, Navagraha Shanti havan, Mahamrityunjay havan and jaap, Rudrabhishek, Lakshmi-Kuber havan, Gayatri yagya, Chandi path, Satyanarayan katha, Sundarkand path, Akhand Ramayan, Namkaran, Mundan, Janeu (Upanayan), Vivah, Shraddh, Terahvi, Kaal Sarp, Manglik, Pitra dosh, Gandmool and Shani shanti puja, plus kundli analysis, kundli matching, muhurat and Vastu consultation.\nBooking: the “Book a puja” form on the website, or phone/WhatsApp 9625004090, email karmkand0000@gmail.com. Hours: daily 7 am to 9 pm.\nFree on the website: daily Panchang, birth chart, kundli matching, daily rashifal, the 12 Jyotirlingas, Ashtavinayak and 51 Shaktipeeths, diagrams and structure of all puja mandals (Sarvatobhadra, Navagraha, Shodash Matrika, Vastu and more), and a library of authentic karmkand books.'
  };

  function page(key) {
    if (key === 'credits') return credits();
    var titles = { terms: u('terms'), refund: u('refund'), privacy: u('privacy'), about: u('about') };
    var txt = D.pages && D.pages[key] ? t(D.pages[key]) : (key === 'about' ? t(ABOUT) : '');
    $('#main').innerHTML = '<div class="wrap detail page-text"><nav class="crumbs"><a href="#/">' + u('home') + '</a></nav><h1>' + esc(titles[key] || '') + '</h1>' +
      txt.split(/\n+/).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>';
    window.scrollTo(0, 0);
  }

  function myBookings() { try { return JSON.parse(localStorage.getItem('vss_my_bookings') || '[]'); } catch (e) { return []; } }

  function track() {
    var list = myBookings();
    $('#main').innerHTML = '<div class="wrap detail page-text"><h1>' + u('track_h') + '</h1><p>' + u('track_p') + '</p><div class="track-list">' +
      (list.length ? list.slice().reverse().map(function (b) {
        return '<div class="track-item" data-id="' + esc(b.id) + '"><b class="bid" style="font-size:1.2rem">' + esc(b.id) + '</b><br>' +
          esc(b.serviceName) + (b.packageName ? ' — ' + esc(b.packageName) : '') + (showP() && b.price ? ' (' + inr(b.price) + ')' : '') + '<br>' + [b.date, b.time].filter(Boolean).map(esc).join(' • ') +
          '<br><span class="st">' + u('status') + ': <b>' + u('st_' + (b.status || 'new')) + '</b></span> ' +
          (D.settings.bookingEndpoint ? '<button class="btn btn-ghost btn-sm" data-check="' + esc(b.id) + '" data-phone="' + esc(b.phone) + '">' + u('check_status') + '</button>' : '') +
          ' <a class="btn btn-ghost btn-sm" href="' + mailHref(b) + '">' + u('email_btn') + '</a></div>';
      }).join('') : '<div class="empty">' + u('track_empty') + ' <a href="#/book" data-book="">' + u('book_puja') + '</a></div>') +
      '</div></div>';
    $$('[data-check]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-check');
        fetch(D.settings.bookingEndpoint + '?action=status&id=' + encodeURIComponent(id) + '&phone=' + encodeURIComponent(btn.getAttribute('data-phone')))
          .then(function (r) { return r.json(); })
          .then(function (j) {
            if (j && j.status) {
              var all = myBookings(); all.forEach(function (b) { if (b.id === id) b.status = j.status; });
              localStorage.setItem('vss_my_bookings', JSON.stringify(all)); track();
            }
          }).catch(function () { toast('—'); });
      });
    });
    window.scrollTo(0, 0);
  }

  /* ---------------- booking wizard ---------------- */
  var B = null;
  function newId() {
    var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
    return 'VSS' + String(d.getFullYear()).slice(2) + p(d.getMonth() + 1) + p(d.getDate()) + '-' + Math.floor(1000 + Math.random() * 9000);
  }

  function openGeneral() {
    B = { step: 1, s: null, general: true, data: { time: 'muhurat', lang: 'हिंदी' } };
    $('#bookTitle').textContent = u('book_puja');
    drawStep();
    var dlg = $('#bookDlg');
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }
  function pickService(id) {
    var s = svc(id); if (!s) return;
    var pk = (s.packages || []).find(function (p) { return p.popular; }) || (s.packages || [])[0] || { id: 'std' };
    collect(); B.s = s; B.data.pkg = pk.id; B.data.mode = isJyotish(s) ? 'phone' : 'home';
    $('#bookTitle').textContent = t(s.name); setErr('svcPick', '');
  }
  function svcPicker() {
    var list = D.services.filter(function (x) { return x.active !== false; });
    return '<label class="f full svc-pick"><b>' + u('choose_svc') + '</b><select name="svcPick" id="svcPick" required><option value="">— ' + u('choose_svc') + ' —</option>' +
      D.categories.map(function (c) {
        var items = list.filter(function (x) { return x.cat === c.id; }); if (!items.length) return '';
        return '<optgroup label="' + esc(t(c.name)) + '">' + items.map(function (x) { return '<option value="' + esc(x.id) + '"' + (B.s && B.s.id === x.id ? ' selected' : '') + '>' + esc(t(x.name)) + '</option>'; }).join('') + '</optgroup>';
      }).join('') + '</select><span class="err" data-err="svcPick"></span></label>';
  }

  function openBooking(id, pkgId, prefill) {
    if (!id) return openGeneral();
    var s = svc(id); if (!s) return;
    var pk = (s.packages || []).find(function (p) { return p.id === pkgId; }) || (s.packages || []).find(function (p) { return p.popular; }) || (s.packages || [])[0] || { id: 'std', name: { hi: 'मानक', en: 'Standard' }, price: s.price };
    B = { step: 1, s: s, data: { pkg: pk.id, mode: isJyotish(s) ? 'phone' : 'home', time: 'muhurat', lang: 'हिंदी' } };
    if (prefill) Object.keys(prefill).forEach(function (k) { B.data[k] = prefill[k]; });
    $('#bookTitle').textContent = t(s.name);
    drawStep();
    var dlg = $('#bookDlg');
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }

  function field(name, label, type, opts) {
    opts = opts || {};
    var v = B.data[name] != null ? B.data[name] : '';
    var lab = '<label class="f' + (opts.full ? ' full' : '') + '">' + label + (opts.optional ? ' <span class="opt">' + u('optional') + '</span>' : '');
    var input;
    if (type === 'textarea') input = '<textarea name="' + name + '" rows="3">' + esc(v) + '</textarea>';
    else if (type === 'select') input = '<select name="' + name + '">' + opts.options.map(function (o) { return '<option' + (o === v ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join('') + '</select>';
    else input = '<input name="' + name + '" type="' + type + '" value="' + esc(v) + '"' + (opts.attrs || '') + '>';
    return lab + input + (opts.hint ? '<span class="opt" style="font-weight:400;color:var(--ink-2);font-size:.82rem">' + opts.hint + '</span>' : '') + '<span class="err" data-err="' + name + '"></span></label>';
  }

  function seg(name, items) {
    return '<div class="seg" role="radiogroup">' + items.map(function (it) {
      return '<label><input type="radio" name="' + name + '" value="' + it[0] + '"' + (B.data[name] === it[0] ? ' checked' : '') + '>' + it[1] + '</label>';
    }).join('') + '</div>';
  }

  function curPkg() { return (B.s.packages || []).find(function (p) { return p.id === B.data.pkg; }) || { name: { hi: 'मानक', en: 'Standard' }, price: B.s.price }; }

  function drawStep() {
    var s = B.s, jy = s ? isJyotish(s) : false, body = '';
    var prog = '<div class="progress">' + [1, 2, 3].map(function (i) { return '<i class="' + (i <= B.step ? 'on' : '') + '"></i>'; }).join('') + '</div>';
    if (B.step < 4) {
      prog = '';
      body = '<form id="stepForm" novalidate><div class="form-grid">' + svcPicker() +
        field('name', u('name'), 'text', { full: true, attrs: ' autocomplete="name" required' }) +
        field('phone', u('mobile'), 'tel', { full: true, attrs: ' inputmode="numeric" autocomplete="tel" maxlength="13" required' }) +
        field('address', u('addr'), 'textarea', { full: true }) +
        '</div><p class="form-note">' + u('simple_note') + '</p><div class="dlg-actions"><span></span><button class="btn btn-primary" type="submit" id="sendBtn">' + u('send') + '</button></div></form>';
    } else {
      var b = B.saved, pp = curPkg(), adv = Math.round((Number(pp.price) || 0) * (Number(D.settings.advancePercent) || 0) / 100);
      var upi = D.settings.upiId ? 'upi://pay?pa=' + encodeURIComponent(D.settings.upiId) + '&pn=' + encodeURIComponent(t(D.settings.siteName)) + '&am=' + adv + '&cu=INR&tn=' + encodeURIComponent(b.id) : '';
      body = '<div class="done"><div class="ok">' + ICONS.check.replace('<svg', '<svg width="40" height="40"') + '</div><h3 style="font-size:1.5rem">' + u('done_h') + '</h3>' +
        '<p>' + u('booking_id') + '</p><p class="bid">' + esc(b.id) + '</p><p style="color:var(--ink-2)">' + u('done_p') + '</p>' +
        '<p class="mailst ' + (B.mailed ? 'is-ok' : 'is-warn') + '">' + (B.mailed ? ICONS.check.replace('<svg', '<svg width="20" height="20"') + ' ' + u('email_sent') : u('email_fail')) + '</p>' +
        (bookEmail() && !B.mailed ? '<a class="btn ' + (B.mailed ? 'btn-ghost' : 'btn-primary') + '" style="width:100%" href="' + mailHref(b) + '">' + ICONS.mail.replace('<svg', '<svg width="20" height="20"') + ' ' + u('send_email') + '</a>' : '') +
        (upi && adv && showP() ? '<div class="upi"><b>' + u('advance') + ': ' + inr(adv) + '</b> — UPI: ' + esc(D.settings.upiId) + '<br><a class="btn btn-ghost btn-sm" style="margin-top:8px" href="' + upi + '">' + u('pay_upi') + '</a><br><small>' + u('upi_note') + '</small></div>' : '') +
        '<div class="dlg-actions" style="justify-content:center"><button class="btn btn-ghost" type="button" id="doneClose">' + u('close') + '</button></div></div>';
    }
    $('#dlgBody').innerHTML = prog + body;
    var f = $('#stepForm');
    if (f) {
      f.addEventListener('submit', onStep);
      f.addEventListener('change', function (e) { if (e.target.name === 'svcPick') { if (e.target.value) pickService(e.target.value); return; } if (e.target.name === 'pkg' || e.target.name === 'mode') B.data[e.target.name] = e.target.value; });
    }
    if ($('#backBtn')) $('#backBtn').addEventListener('click', function () { collect(); B.step--; drawStep(); });
    if ($('#doneClose')) $('#doneClose').addEventListener('click', closeDlg);
    var first = $('#dlgBody input:not([type=radio]), #dlgBody select'); if (first && B.step === 2) first.focus();
  }

  function collect() {
    var f = $('#stepForm'); if (!f) return;
    var fd = new FormData(f);
    fd.forEach(function (v, k) { B.data[k] = typeof v === 'string' ? v.trim() : v; });
    if (B.step === 3) B.data.consent = !!f.consent.checked;
  }

  function setErr(name, msg) { var el = $('[data-err="' + name + '"]'); if (el) el.textContent = msg || ''; }

  function onStep(e) {
    e.preventDefault(); collect();
    var d = B.data, ok = true;
    $$('[data-err]').forEach(function (el) { el.textContent = ''; });
    if (!B.s) { setErr('svcPick', u('e_svc')); ok = false; }
    if (!d.name) { setErr('name', u('e_req')); ok = false; }
    var ph = digits(d.phone); if (ph.length > 10 && ph.indexOf('91') === 0) ph = ph.slice(2);
    if (!/^[6-9]\d{9}$/.test(ph)) { setErr('phone', u('e_mobile')); ok = false; } else d.phone = ph;
    if (!d.address) { setErr('address', u('e_req')); ok = false; }
    if (!ok) { var firstErr = $$('[data-err]').find(function (el) { return el.textContent; }); if (firstErr) firstErr.parentNode.scrollIntoView({ block: 'center' }); return; }
    submit();
  }

  function waText(b) {
    var L = [u('wa_greet'), '', u('booking_id') + ': ' + b.id, u('service') + ': ' + b.serviceName, u('package') + ': ' + b.packageName + (showP() ? ' (' + inr(b.price) + ')' : ''),
      u('date') + ': ' + b.date + ' • ' + b.time, u('mode') + ': ' + b.mode, u('name') + ': ' + b.name, u('mobile') + ': ' + b.phone];
    if (b.gotra) L.push(u('gotra') + ': ' + b.gotra);
    if (b.dob) L.push(u('dob') + ': ' + b.dob + ' ' + (b.tob || '') + ' ' + (b.pob || ''));
    if (b.partner) L.push(u('partner') + ': ' + b.partner);
    if (b.address) L.push(u('addr') + ': ' + b.address + ', ' + (b.city || '') + ' ' + (b.pincode || ''));
    if (b.question) L.push(u('question') + ': ' + b.question);
    if (b.notes) L.push(u('notes') + ': ' + b.notes);
    return L.join('\n');
  }

  function submit() {
    var btn = $('#sendBtn'); btn.disabled = true; btn.textContent = u('sending');
    var d = B.data, s = B.s, p = curPkg();
    var timeLbl = { muhurat: UI.hi.t_muhurat, morning: UI.hi.t_morning, noon: UI.hi.t_noon, evening: UI.hi.t_evening }[d.time];
    var modeLbl = { home: UI.hi.mode_home, online: UI.hi.mode_online, phone: UI.hi.mode_phone, visit: UI.hi.mode_visit }[d.mode];
    var b = {
      id: newId(), createdAt: new Date().toISOString(), type: isJyotish(s) ? 'jyotish' : 'puja',
      serviceId: s.id, serviceName: s.name.hi, packageName: '', price: 0,
      mode: '', date: d.date || '', time: '', name: d.name, phone: d.phone, email: d.email || '', gotra: d.gotra || '',
      address: d.address || '', city: d.city || '', pincode: d.pincode || '', lang: '',
      dob: d.dob || '', tob: d.tob || '', pob: d.pob || '', partner: d.partner || '', question: d.question || '', notes: d.notes || '',
      status: 'new', source: location.hostname || 'local'
    };
    var all = myBookings(); all.push(b); localStorage.setItem('vss_my_bookings', JSON.stringify(all));
    B.mailed = false;
    var done = function () { B.saved = b; B.step = 4; drawStep(); };
    var jobs = [];
    if (D.settings.bookingEndpoint && !PREVIEW) {
      jobs.push(fetch(D.settings.bookingEndpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(b) }).catch(function () {}));
    }
    if (bookEmail() && !PREVIEW) {
      var mail = { _subject: 'नई बुकिंग ' + b.id + ' — ' + b.serviceName + ' — ' + b.name, _template: 'table', _captcha: 'false' };
      var lab = { id: 'बुकिंग संख्या', serviceName: 'पूजा', packageName: 'पैकेज', price: 'दक्षिणा (₹)', mode: 'स्थान', date: 'तिथि', time: 'समय', name: 'यजमान', phone: 'मोबाइल', email: 'ईमेल', gotra: 'गोत्र', address: 'पता', city: 'शहर', pincode: 'पिन', lang: 'भाषा', dob: 'जन्म तिथि', tob: 'जन्म समय', pob: 'जन्म स्थान', partner: 'दूसरा व्यक्ति', question: 'प्रश्न', notes: 'निवेदन' };
      Object.keys(lab).forEach(function (k) { if (b[k]) mail[lab[k]] = String(b[k]); });
      if (b.email) mail._replyto = b.email;
      jobs.push(fetch('https://formsubmit.co/ajax/' + encodeURIComponent(bookEmail()), { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(mail) })
        .then(function (r) { return r.json(); }).then(function (j) { B.mailed = j && (j.success === true || j.success === 'true'); }).catch(function () {}));
    }
    Promise.all(jobs).then(done, done);
  }

  function closeDlg() { var dlg = $('#bookDlg'); if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); }

  function astroCtx() {
    if (!window.VSSAstro || !window.VSSAstro.available()) return false;
    window.VSSAstro.init({ D: D, lang: lang, t: t, u: u, esc: esc, $: $, $$: $$, openBooking: openBooking, toast: toast });
    return true;
  }
  function qsOf(h) { var o = {}, i = h.indexOf('?'); if (i > -1) new URLSearchParams(h.slice(i + 1)).forEach(function (v, k) { o[k] = v; }); return o; }

  /* ---------------- router ---------------- */
  // स्थिर SEO पेजों पर (जैसे /seva/griha-pravesh/) पेज का SEO शीर्षक बना रहे
  var SEO_TITLE = window.VSS_ROUTE ? document.title : null;
  function route() {
    routeInner();
    if (SEO_TITLE && !location.hash) { document.title = SEO_TITLE; setTimeout(function () { if (!location.hash) document.title = SEO_TITLE; }, 1500); }
  }
  function routeInner() {
    var h = location.hash || window.VSS_ROUTE || '#/';
    if (/^#\/tirth/.test(h) && window.VSSTirth) {
      $('#nav').classList.remove('open');
      window.VSSTirth.init({ D: D, lang: lang, t: t, u: u, esc: esc, $: $, $$: $$ });
      document.title = u('nav_tirth') + ' — ' + t(D.settings.siteName);
      return window.VSSTirth.route(h);
    }
    if (/^#\/pustak/.test(h) && window.VSSBooks) {
      $('#nav').classList.remove('open');
      window.VSSBooks.init({ D: D, lang: lang, t: t, u: u, esc: esc, $: $, $$: $$ });
      document.title = u('nav_books') + ' — ' + t(D.settings.siteName);
      return window.VSSBooks.route(h);
    }
    if (/^#\/mandal/.test(h) && window.VSSMandal) {
      $('#nav').classList.remove('open');
      window.VSSMandal.init({ D: D, lang: lang, t: t, u: u, esc: esc, $: $, $$: $$ });
      document.title = u('nav_mandal') + ' — ' + t(D.settings.siteName);
      return window.VSSMandal.route(h);
    }
    var am = h.match(/^#\/(panchang|kundli|rashifal|milan)/);
    if (am) {
      $('#nav').classList.remove('open');
      if (astroCtx()) { document.title = u('nav_' + am[1]) + ' — ' + t(D.settings.siteName); return window.VSSAstro[am[1]](qsOf(h)); }
    }
    $('#nav').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded', 'false');
    var m;
    if ((m = h.match(/^#\/seva\/([\w-]+)/))) return detail(m[1]);
    if (h === '#/book') { if (!$('#main').innerHTML.trim()) home(); setTimeout(openGeneral, 0); history.replaceState(null, '', '#/'); return; }
    if ((m = h.match(/^#\/cat\/([\w-]+)/))) { state.cat = m[1]; state.q = ''; return home('sevaen'); }
    if ((m = h.match(/^#\/page\/(\w+)/))) return page(m[1]);
    if (h.indexOf('#/track') === 0) return track();
    if ((m = h.match(/^#\/#([\w-]+)/))) return home(m[1]);
    if (/^#[\w-]+$/.test(h) && h !== '#/') { var el = document.getElementById(h.slice(1)); if (el) { el.scrollIntoView(); return; } return home(h.slice(1)); }
    document.title = t(D.settings.siteName) + ' — ' + t(D.settings.tagline);
    home();
  }

  /* ---------------- boot ---------------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-book]');
    if (b) { e.preventDefault(); openBooking(b.getAttribute('data-book')); return; }
    var lb = e.target.closest('[data-lb]');
    if (lb) openLightbox(+lb.getAttribute('data-lb'));
  });
  $('#dlgClose').addEventListener('click', closeDlg);
  $('#bookDlg').addEventListener('click', function (e) { if (e.target === this) closeDlg(); });
  $('#menuBtn').addEventListener('click', function () { var n = $('#nav'); n.classList.toggle('open'); this.setAttribute('aria-expanded', n.classList.contains('open')); });
  $('#langBtn').addEventListener('click', function () { lang = lang === 'hi' ? 'en' : 'hi'; localStorage.setItem('vss_lang', lang); chrome(); route(); });
  window.addEventListener('hashchange', route);

  load().then(function (data) {
    D = data || window.DEFAULT_DATA;
    D.services = D.services || []; D.categories = D.categories || [];
    chrome(); route();
  });
})();
