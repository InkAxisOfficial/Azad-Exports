// ==========================================================================
// Azad Exports site script
// Each feature block below is wrapped in its own try/catch so that if one
// block fails for any reason, it logs the error to the console instead of
// silently stopping every feature that comes after it in the file.
// ==========================================================================

// ---- Page switching (click-only navigation, no scrolling between sections) ----
try {
  const pages = document.querySelectorAll('.page');
  const pageLinks = document.querySelectorAll('.page-link');
  const mobileMenuEl = document.getElementById('mobileMenu');
  const siteFooter = document.querySelector('footer');

  function showPage(name) {
    pages.forEach(p => p.classList.toggle('active', p.id === 'page-' + name));
    pageLinks.forEach(link => {
      link.classList.toggle('active-link', link.dataset.page === name);
    });
    if (siteFooter) siteFooter.classList.toggle('visible', name === 'contact');
    const activePage = document.getElementById('page-' + name);
    if (activePage) { activePage.querySelectorAll('.reveal').forEach(el => el.classList.add('in')); }
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (mobileMenuEl) mobileMenuEl.classList.remove('open');
  }
  window.showPage = showPage;

  pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(link.dataset.page);
    });
  });

  showPage('home');
} catch (err) { console.error('[page-switching] failed:', err); }

// ---- 3D tilt on product + cert cards ----
try {
  const tiltCards = document.querySelectorAll('.product-card, .cert-card, .stat-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left; const y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -10;
      const ry = ((x / r.width) - 0.5) * 10;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
} catch (err) { console.error('[tilt-cards] failed:', err); }

// ---- Mobile menu toggle ----
try {
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }
} catch (err) { console.error('[mobile-menu] failed:', err); }

// ---- Header shrink on scroll ----
try {
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 40 ? '0 6px 24px rgba(14,42,71,0.08)' : 'none';
    });
  }
} catch (err) { console.error('[header-scroll] failed:', err); }

// ---- Quote modal ----
try {
  const overlay = document.getElementById('quoteOverlay');
  const openBtn = document.getElementById('openQuoteBtn');
  const closeBtn = document.getElementById('closeQuoteBtn');
  const quoteForm = document.getElementById('quoteForm');

  if (overlay && openBtn && closeBtn && quoteForm) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('open');
    });
    closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.classList.remove('open'); });

    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('q_name').value.trim();
      const company = document.getElementById('q_company').value.trim();
      const product = document.getElementById('q_product').value;
      const qty = document.getElementById('q_qty').value.trim();
      const msg = document.getElementById('q_msg').value.trim();

      let text = `Hello Azad Exports, I'd like a quote.%0A`;
      text += `Name: ${encodeURIComponent(name)}%0A`;
      text += `Company/Country: ${encodeURIComponent(company)}%0A`;
      text += `Product: ${encodeURIComponent(product)}%0A`;
      if (qty) text += `Quantity: ${encodeURIComponent(qty)}%0A`;
      if (msg) text += `Message: ${encodeURIComponent(msg)}%0A`;

      window.open(`https://wa.me/919493474206?text=${text}`, '_blank');
      overlay.classList.remove('open');
      quoteForm.reset();
    });
  } else {
    console.warn('[quote-modal] one or more elements missing:', { overlay: !!overlay, openBtn: !!openBtn, closeBtn: !!closeBtn, quoteForm: !!quoteForm });
  }
} catch (err) { console.error('[quote-modal] failed:', err); }

// ---- Product variety detail modal ----
try {
  const productData = {
    basmati: {
      title: 'Basmati Rice — Varieties',
      intro: 'Two grades of long-grain rice, graded and packed to export specification.',
      items: [
        { img: 'assets/basmati.jpg', name: 'Basmati Rice', note: 'Aromatic, extra-long grain — aged for length and fragrance.' },
        { img: 'assets/nonbasmati.jpg', name: 'Non-Basmati Rice', note: 'Regular long/medium grain white rice for bulk export orders.' }
      ]
    },
    groundnuts: {
      title: 'Groundnuts — Varieties',
      intro: 'Sourced and sorted for size uniformity and oil content.',
      items: [
        { img: 'assets/groundnuts-raw.jpg', name: 'Raw Groundnuts', note: 'Sun-dried, hand and machine sorted, bold kernel size.' },
        { img: 'assets/groundnuts-hps.jpg', name: 'HPS Groundnuts', note: 'Hand-picked & selected grade for premium confectionery use.' }
      ]
    },
    onions: {
      title: 'Fresh Onions — Varieties',
      intro: 'Graded by size and cured for a longer shelf life in transit.',
      items: [
        { img: 'assets/onion-red.jpg', name: 'Red Onions', note: 'The most requested export variety — firm and long-storing.' },
        { img: 'assets/onion-white.jpg', name: 'White Onions', note: 'Milder flavour, popular with Middle East & EU buyers.' }
      ]
    },
    freshveg: {
      title: 'Fresh Fruits & Vegetables — Range',
      intro: 'A rotating seasonal lineup sourced fresh from regional growers.',
      items: [
        { img: 'assets/mango.jpg', name: 'Mangoes', note: 'Seasonal export mangoes, harvested and graded for firmness.' },
        { img: 'assets/pomegranate.jpg', name: 'Pomegranate', note: 'Export-grade pomegranates, sorted for size and colour.' },
        { img: 'assets/tomatoes.jpg', name: 'Tomatoes', note: 'Fresh-graded tomatoes packed for short transit windows.' },
        { img: 'assets/green-chillies.jpg', name: 'Green Chillies', note: 'Farm-fresh, sorted for size and colour consistency.' },
        { img: 'assets/potatoes.jpg', name: 'Potatoes', note: 'Table-grade potatoes, cured and size-graded.' }
      ]
    },
    ricebran: {
      title: 'De-Oiled Rice Bran — Grades',
      intro: 'Supplied in bulk depending on end use.',
      items: [
        { img: 'assets/ricebran.jpg', name: 'Feed Grade', note: 'Nutrient-rich bran for animal feed manufacturers.' },
        { img: 'assets/ricebran.jpg', name: 'Industrial Grade', note: 'Bulk supply for industrial and oil-extraction use.' }
      ]
    },
    seeds: {
      title: 'Vegetable Seeds — Varieties',
      intro: 'Quality-tested seed stock handled with strict batch traceability.',
      items: [
        { img: 'assets/seeds-tomato.jpg', name: 'Tomato Seeds', note: 'High-germination seed stock for commercial growers.' },
        { img: 'assets/seeds-chilli.jpg', name: 'Chilli Seeds', note: 'Selected for consistent yield and disease resistance.' },
        { img: 'assets/seeds-okra.jpg', name: 'Okra Seeds', note: 'Popular export line for tropical & sub-tropical climates.' }
      ]
    }
  };

  const detailOverlay = document.getElementById('detailOverlay');
  const closeDetailBtn = document.getElementById('closeDetailBtn');
  const productCards = document.querySelectorAll('.product-card');

  console.log('[product-modal] found', productCards.length, 'product cards; overlay present:', !!detailOverlay);

  function openProductDetail(key) {
    console.log('[product-modal] opening detail for key:', key);
    const data = productData[key];
    if (!data) { console.warn('[product-modal] no data for key:', key); return; }
    document.getElementById('detail_title').textContent = data.title;
    document.getElementById('detail_intro').textContent = data.intro;
    const grid = document.getElementById('detail_grid');
    grid.innerHTML = data.items.map(it => `
      <div class="variety-card">
        ${it.img
        ? `<img class="variety-photo" src="${it.img}" alt="${it.name}" onerror="this.outerHTML='<span class=\\'variety-emoji\\'>🖼️</span>'">`
        : `<span class="variety-emoji">${it.emoji}</span>`}
        <h4>${it.name}</h4>
        <p>${it.note}</p>
      </div>
    `).join('');
    detailOverlay.classList.add('open');
  }

  if (detailOverlay && closeDetailBtn) {
    productCards.forEach(card => {
      card.addEventListener('click', () => openProductDetail(card.dataset.detail));
      card.addEventListener('keypress', (e) => { if (e.key === 'Enter') openProductDetail(card.dataset.detail); });
    });
    closeDetailBtn.addEventListener('click', () => detailOverlay.classList.remove('open'));
    detailOverlay.addEventListener('click', (e) => { if (e.target === detailOverlay) detailOverlay.classList.remove('open'); });
  } else {
    console.warn('[product-modal] missing #detailOverlay or #closeDetailBtn in the HTML');
  }
} catch (err) { console.error('[product-modal] failed:', err); }

// ---- Certificate lightbox modal ----
try {
  const certData = {
    fssai: {
      title: 'FSSAI Central License',
      img: 'assets/certificate-fssai.jpg',
      meta: [['License No.', '10126999000353'], ['Issued', '16 June 2026'], ['Valid Through', '15 June 2027']]
    },
    apeda: {
      title: 'APEDA Registration-cum-Membership Certificate',
      img: 'assets/certificate-apeda.jpg',
      meta: [['RCMC No.', 'RCMC/APEDA/29985/2026-2027'], ['Issued', '15 June 2026'], ['Valid Through', '15 June 2031']]
    },
    iec: {
      title: 'DGFT Importer-Exporter Code',
      img: 'assets/certificate-iec.jpg',
      meta: [['IEC', 'CZAPS1679G'], ['Issued', '18 April 2026']]
    }
  };

  const certOverlay = document.getElementById('certOverlay');
  const closeCertBtn = document.getElementById('closeCertBtn');
  const certCards = document.querySelectorAll('.cert-card');

  console.log('[cert-modal] found', certCards.length, 'cert cards; overlay present:', !!certOverlay);

  function openCertDetail(key) {
    console.log('[cert-modal] opening cert for key:', key);
    const data = certData[key];
    if (!data) { console.warn('[cert-modal] no data for key:', key); return; }
    document.getElementById('cert_title').textContent = data.title;
    document.getElementById('cert_img').src = data.img;
    document.getElementById('cert_meta').innerHTML = data.meta.map(([k, v]) => `<span>${k}: <strong>${v}</strong></span>`).join('');
    certOverlay.classList.add('open');
  }

  if (certOverlay && closeCertBtn) {
    certCards.forEach(card => {
      card.addEventListener('click', () => openCertDetail(card.dataset.cert));
      card.addEventListener('keypress', (e) => { if (e.key === 'Enter') openCertDetail(card.dataset.cert); });
    });
    closeCertBtn.addEventListener('click', () => certOverlay.classList.remove('open'));
    certOverlay.addEventListener('click', (e) => { if (e.target === certOverlay) certOverlay.classList.remove('open'); });
  } else {
    console.warn('[cert-modal] missing #certOverlay or #closeCertBtn in the HTML');
  }
} catch (err) { console.error('[cert-modal] failed:', err); }
