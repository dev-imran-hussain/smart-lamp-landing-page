/**
 * AuraThinker™ Luxury Landing Page Interactive Controls
 * Fully Integrated with 3 External CDN Cloudinary Figurine Variants:
 * - Focus Mode (6500K Cool White) -> https://res.cloudinary.com/dfz1dlwnz/image/upload/v1790681303/lamp-cool_p1mjve.png
 * - Reading Mode (4000K Neutral Warm) -> https://res.cloudinary.com/dfz1dlwnz/image/upload/v1790681308/lamp_rohpz1.png
 * - Sleep Mode (2700K Candle Warm) -> https://res.cloudinary.com/dfz1dlwnz/image/upload/v1790681302/lamp-amber_fdxaqr.png
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const heroSunGlow = document.getElementById('hero-sun-glow');
  const heroLampImg = document.getElementById('main-lamp-img');
  const ambientGlow = document.getElementById('ambient-glow');
  const cartModal = document.getElementById('cart-modal');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const openCartBtn = document.getElementById('open-cart-btn');
  const ctaBuyBtns = document.querySelectorAll('.cta-buy-btn, .mobile-buy-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const orderForm = document.getElementById('order-form');
  const submitOrderBtn = document.getElementById('submit-order-btn');

  // Smart Modes Showcase elements
  const modeCards = document.querySelectorAll('.mode-card');
  const showcaseLampImg = document.getElementById('showcase-lamp-img');
  const showcaseBulbGlow = document.getElementById('showcase-bulb-glow');
  const showcaseStage = document.getElementById('showcase-stage');
  const liveIndicatorDot = document.getElementById('live-indicator-dot');
  const liveModeLabel = document.getElementById('live-mode-label');
  const liveKelvinLabel = document.getElementById('live-kelvin-label');

  // Mode selector pills (Hero + Showcase)
  const heroModePills = document.querySelectorAll('.mode-pill');
  const showcaseModePills = document.querySelectorAll('.showcase-mode-pill');

  // 1. Navbar Glassmorphism on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('py-2');
      navbar.classList.remove('pt-4');
    } else {
      navbar.classList.remove('py-2');
      navbar.classList.add('pt-4');
    }
  });

  // Mobile Menu Toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 2. Smart Modes Configuration with High-Resolution Asset Paths
  const modesData = {
    focus: {
      name: 'Focus Mode Active',
      kelvin: '6500 Kelvin',
      image: 'https://res.cloudinary.com/dfz1dlwnz/image/upload/v1790681303/lamp-cool_p1mjve.png',
      dotColor: 'bg-cyan-400',
      glowClass: 'mode-focus-glow',
      pillActiveBg: '#38bdf8',
      ambientBg: 'radial-gradient(circle, rgba(103, 232, 249, 0.16) 0%, rgba(56, 189, 248, 0.04) 45%, rgba(11, 11, 12, 0) 70%)',
      heroGlow: 'radial-gradient(circle, rgba(230, 248, 255, 0.9) 0%, rgba(103, 232, 249, 0.6) 35%, rgba(11, 11, 12, 0) 75%)',
    },
    reading: {
      name: 'Reading Mode Active',
      kelvin: '4000 Kelvin',
      image: 'https://res.cloudinary.com/dfz1dlwnz/image/upload/v1790681308/lamp_rohpz1.png',
      dotColor: 'bg-amber-300',
      glowClass: 'mode-reading-glow',
      pillActiveBg: '#dfbe7d',
      ambientBg: 'radial-gradient(circle, rgba(223, 190, 125, 0.18) 0%, rgba(200, 160, 80, 0.05) 45%, rgba(11, 11, 12, 0) 70%)',
      heroGlow: 'radial-gradient(circle, rgba(255, 245, 215, 0.85) 0%, rgba(254, 215, 140, 0.55) 30%, rgba(223, 190, 125, 0.25) 55%, rgba(11, 11, 12, 0) 75%)',
    },
    sleep: {
      name: 'Sleep Mode Active',
      kelvin: '2700 Kelvin',
      image: 'https://res.cloudinary.com/dfz1dlwnz/image/upload/v1790681302/lamp-amber_fdxaqr.png',
      dotColor: 'bg-orange-400',
      glowClass: 'mode-sleep-glow',
      pillActiveBg: '#fb923c',
      ambientBg: 'radial-gradient(circle, rgba(251, 146, 60, 0.18) 0%, rgba(234, 88, 12, 0.05) 45%, rgba(11, 11, 12, 0) 70%)',
      heroGlow: 'radial-gradient(circle, rgba(254, 215, 170, 0.85) 0%, rgba(251, 146, 60, 0.55) 35%, rgba(11, 11, 12, 0) 75%)',
    }
  };

  // Preload Images for instantaneous switching without lag
  Object.values(modesData).forEach(mode => {
    const preloader = new Image();
    preloader.src = mode.image;
  });

  // Crossfade Image Transition Helper
  function switchLampImage(imgElement, targetSrc) {
    if (!imgElement) return;
    
    // Check if target already active
    const currentSrc = imgElement.getAttribute('src');
    if (currentSrc === targetSrc) return;

    imgElement.classList.add('lamp-img-fade-out');

    setTimeout(() => {
      imgElement.src = targetSrc;
      
      const onImageReady = () => {
        imgElement.classList.remove('lamp-img-fade-out');
        imgElement.removeEventListener('load', onImageReady);
      };

      if (imgElement.complete) {
        setTimeout(() => {
          imgElement.classList.remove('lamp-img-fade-out');
        }, 50);
      } else {
        imgElement.addEventListener('load', onImageReady);
      }
    }, 180);
  }

  // Master Function to set Mode across Section 5 & Hero
  function applyMode(modeKey, updateHeroToo = true) {
    const config = modesData[modeKey];
    if (!config) return;

    // 1. Update active cards in Section 5
    modeCards.forEach(card => {
      if (card.dataset.mode === modeKey) {
        card.classList.add('active-mode');
      } else {
        card.classList.remove('active-mode');
      }
    });

    // 2. Update Showcase Lamp Image & Glow
    if (showcaseLampImg) {
      switchLampImage(showcaseLampImg, config.image);
    }
    if (showcaseBulbGlow) {
      showcaseBulbGlow.className = `showcase-bulb-glow ${config.glowClass}`;
    }

    // 3. Update Hero Lamp Image & Glow if requested
    if (updateHeroToo) {
      if (heroLampImg) {
        switchLampImage(heroLampImg, config.image);
      }
      if (heroSunGlow) {
        heroSunGlow.style.background = config.heroGlow;
      }
      // Sync hero pills
      heroModePills.forEach(pill => {
        if (pill.dataset.theme === modeKey) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });
    }

    // Sync showcase pills if present
    showcaseModePills.forEach(pill => {
      if (pill.dataset.theme === modeKey) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // 4. Update Live Indicator HUD
    if (liveIndicatorDot) {
      liveIndicatorDot.className = `w-2 h-2 rounded-full ${config.dotColor} animate-pulse`;
    }
    if (liveModeLabel) {
      liveModeLabel.textContent = config.name;
    }
    if (liveKelvinLabel) {
      liveKelvinLabel.textContent = config.kelvin;
    }

    // 5. Shift global ambient background glow
    if (ambientGlow) {
      ambientGlow.style.background = config.ambientBg;
    }
  }

  // Bind click handlers to Mode Cards in Section 5
  modeCards.forEach(card => {
    card.addEventListener('click', () => {
      const mode = card.dataset.mode;
      applyMode(mode, true);
    });
  });

  // Hero Mode Pills click handler
  heroModePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const theme = pill.dataset.theme;
      applyMode(theme, true);
    });
  });

  // Showcase Mode Quick Buttons
  showcaseModePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const theme = pill.dataset.theme;
      applyMode(theme, true);
    });
  });

  // 3. Cart & Order Modal Controls
  function openCart() {
    if (cartModal) {
      cartModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    if (cartModal) {
      cartModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);

  ctaBuyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  });

  // Close modal when clicking outside drawer
  if (cartModal) {
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) {
        closeCart();
      }
    });
  }

  // Toast Helper
  function showToast(msg) {
    if (!toast) return;
    toastMessage.textContent = msg;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 4500);
  }

  // Order Submission Handler
  if (submitOrderBtn && orderForm) {
    submitOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!orderForm.checkValidity()) {
        orderForm.reportValidity();
        return;
      }

      submitOrderBtn.disabled = true;
      submitOrderBtn.textContent = 'Securing Your AuraThinker...';

      setTimeout(() => {
        submitOrderBtn.disabled = false;
        submitOrderBtn.textContent = 'Complete Purchase (COD / UPI / Cards)';
        closeCart();
        showToast('✨ Order Reserved! Our concierge will WhatsApp you dispatch details.');
      }, 1200);
    });
  }

  // Cart Preset Selector
  const cartPresetBtns = document.querySelectorAll('.cart-preset-btn');
  const cartPreviewImg = document.getElementById('cart-preview-img');
  cartPresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cartPresetBtns.forEach(b => b.classList.remove('border-gold-400', 'bg-gold-500/20', 'text-pearl'));
      btn.classList.add('border-gold-400', 'bg-gold-500/20', 'text-pearl');
      const m = btn.dataset.preset;
      if (cartPreviewImg && modesData[m]) {
        cartPreviewImg.src = modesData[m].image;
      }
    });
  });

  // 4. Information & Policy Modal Logic
  const infoModal = document.getElementById('info-modal');
  const closeInfoBtn = document.getElementById('close-info-btn');
  const infoModalTitle = document.getElementById('info-modal-title');
  const infoModalContent = document.getElementById('info-modal-content');

  const policiesData = {
    'contact-modal': {
      title: 'Contact AuraThinker Concierge',
      content: `
        <p><strong>Customer Support:</strong> support@aurathinker.com</p>
        <p><strong>WhatsApp Concierge:</strong> +91 98765 43210 (Mon–Sat, 10 AM – 7 PM IST)</p>
        <p><strong>Design Studio:</strong> Indiranagar, Bengaluru, Karnataka 560038, India.</p>
        <p class="text-xs text-pearl-muted pt-2 border-t border-white/5">For bulk corporate gifting, architectural collaborations, or studio inquiries, reach us directly via email.</p>
      `
    },
    'shipping-modal': {
      title: 'Free Express Shipping Policy',
      content: `
        <p><strong>Coverage:</strong> All pin codes across India via BlueDart, Delhivery, and DTDC Express.</p>
        <p><strong>Dispatch Window:</strong> Orders placed before 3 PM IST are securely packaged and dispatched the same business day.</p>
        <p><strong>Delivery Time:</strong> Metro cities: 2–3 business days. Rest of India: 3–5 business days.</p>
        <p><strong>Transit Insurance:</strong> All shipments are 100% insured against transit damage or loss.</p>
      `
    },
    'return-modal': {
      title: '7-Day Return &amp; 1-Year Guarantee',
      content: `
        <p><strong>7-Day Trial:</strong> Experience AuraThinker on your desk for 7 days. If it doesn't transform your creative flow, request a doorstep return and 100% refund.</p>
        <p><strong>1-Year Comprehensive Warranty:</strong> Covers all internal LED diodes, capacitive touch controllers, and USB-C power circuitry with zero-cost doorstep replacement.</p>
      `
    },
    'privacy-modal': {
      title: 'Privacy &amp; Data Security',
      content: `
        <p><strong>Zero Data Brokering:</strong> AuraThinker does not sell, trade, or monetize your personal or payment data.</p>
        <p><strong>Payment Security:</strong> 256-bit TLS bank-grade encrypted checkouts processed via RBI-compliant gateways (Razorpay, UPI, Cards).</p>
      `
    }
  };

  document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetHash = link.getAttribute('href').replace('#', '');
      const data = policiesData[targetHash];
      if (data && infoModal) {
        infoModalTitle.innerHTML = data.title;
        infoModalContent.innerHTML = data.content;
        infoModal.classList.remove('opacity-0', 'pointer-events-none');
        infoModal.classList.add('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeInfoModal() {
    if (infoModal) {
      infoModal.classList.remove('opacity-100', 'pointer-events-auto');
      infoModal.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  }

  if (closeInfoBtn) closeInfoBtn.addEventListener('click', closeInfoModal);
  if (infoModal) {
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) closeInfoModal();
    });
  }

  // Initial setup: Reading Mode as hero default
  applyMode('reading', false);
});
