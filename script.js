// ---- Page switching (click-only navigation, no scrolling between sections) ----
  const pages = document.querySelectorAll('.page');
  const pageLinks = document.querySelectorAll('.page-link');
  const mobileMenuEl = document.getElementById('mobileMenu');
  const siteFooter = document.querySelector('footer');

  function showPage(name){
    pages.forEach(p=> p.classList.toggle('active', p.id === 'page-' + name));
    pageLinks.forEach(link=>{
      link.classList.toggle('active-link', link.dataset.page === name);
    });
    siteFooter.classList.toggle('visible', name === 'contact');
    // reveal cards instantly for the page just shown (no scroll-triggered fade needed anymore)
    const activePage = document.getElementById('page-' + name);
    if(activePage){ activePage.querySelectorAll('.reveal').forEach(el=> el.classList.add('in')); }
    window.scrollTo({top:0, behavior:'instant'});
    mobileMenuEl.classList.remove('open');
  }

  pageLinks.forEach(link=>{
    link.addEventListener('click', (e)=>{
      e.preventDefault();
      showPage(link.dataset.page);
    });
  });

  // show home page reveals on load (none currently, but safe if added later)
  showPage('home');

  // 3D tilt on product + cert cards
  const tiltCards = document.querySelectorAll('.product-card, .cert-card, .stat-card');
  tiltCards.forEach(card=>{
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left; const y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -10;
      const ry = ((x / r.width) - 0.5) * 10;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // Mobile menu toggle
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', ()=>{
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> mobileMenu.classList.remove('open'));
  });

  // header shrink on scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 40){ header.style.boxShadow = '0 6px 24px rgba(14,42,71,0.08)'; }
    else{ header.style.boxShadow = 'none'; }
  });

  // Quote modal
  const overlay = document.getElementById('quoteOverlay');
  const openBtn = document.getElementById('openQuoteBtn');
  const closeBtn = document.getElementById('closeQuoteBtn');
  const quoteForm = document.getElementById('quoteForm');

  openBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    overlay.classList.add('open');
  });
  closeBtn.addEventListener('click', ()=> overlay.classList.remove('open'));
  overlay.addEventListener('click', (e)=>{ if(e.target === overlay) overlay.classList.remove('open'); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') overlay.classList.remove('open'); });

  quoteForm.addEventListener('submit', (e)=>{
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
    if(qty) text += `Quantity: ${encodeURIComponent(qty)}%0A`;
    if(msg) text += `Message: ${encodeURIComponent(msg)}%0A`;

    window.open(`https://wa.me/919493474206?text=${text}`, '_blank');
    overlay.classList.remove('open');
    quoteForm.reset();
  });