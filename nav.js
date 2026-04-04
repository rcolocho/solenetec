/**
 * nav.js — Solenetec Shared Navigation Component
 *
 * Usage: Add to every page's <head>:
 *   <script src="nav.js"></script>
 *
 * Then place these two empty elements in your <body> right after <body> opens:
 *   <div id="solenetec-nav"></div>
 *   <div id="solenetec-mobile-menu"></div>
 *
 * And this at the end of <body> before </body>:
 *   <div id="schedule-modal" class="modal-overlay" onclick="if(event.target===this)closeScheduleModal()"></div>
 *
 * To mark a nav item as active for the current page, set a data attribute on your
 * <html> tag: data-page="home|technologies|rebates|process|schedule"
 *
 * Example: <html lang="en" data-page="technologies">
 */

(function () {

  /* ─────────────────────────────────────────────
     1. SHARED CSS  (injected once into <head>)
  ───────────────────────────────────────────── */
  const css = `
    /* ── Nav base ── */
    #solenetec-nav-header {
      background-color: #1f2937;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,.4);
      position: fixed;
      top: 0; width: 100%; z-index: 50;
    }
    #solenetec-nav-header nav { max-width:80rem; margin:0 auto; padding:0 1rem; }
    #solenetec-nav-header .nav-inner { display:flex; justify-content:space-between; align-items:center; height:5rem; }
    #solenetec-nav-header .brand-link { display:flex; align-items:center; gap:.75rem; text-decoration:none; }
    #solenetec-nav-header .brand-logo { height:3rem; width:3rem; }
    #solenetec-nav-header .brand-name { font-size:1.875rem; font-weight:800; color:#60a5fa; transition:color .2s; }
    #solenetec-nav-header .brand-name:hover { color:#93c5fd; }

    /* ── Desktop links ── */
    #solenetec-nav-header .desktop-links {
      display:none; align-items:center; gap:1.5rem;
    }
    @media(min-width:768px){ #solenetec-nav-header .desktop-links { display:flex; } }

    .sn-nav-link {
      color:#d1d5db; font-size:1.125rem; font-weight:500;
      padding:.5rem .75rem; border-radius:.5rem;
      text-decoration:none; display:flex; align-items:center; gap:.25rem;
      transition:background-color .15s, color .15s;
      white-space:nowrap;
    }
    .sn-nav-link:hover { background-color:#4b5563; color:#fff; }
    .sn-nav-link.active { background-color:#2563eb; color:#fff; font-weight:700; }

    .sn-get-started {
      background-color:#2563eb; color:#fff;
      padding:.5rem 1.25rem; border-radius:9999px;
      font-weight:600; font-size:1rem;
      text-decoration:none; cursor:pointer; border:none;
      transition:background-color .2s; white-space:nowrap; margin-left:.5rem;
    }
    .sn-get-started:hover { background-color:#1d4ed8; }

    /* ── Dropdown menus ── */
    .sn-dropdown-group { position:relative; }

    .sn-mega-menu {
      position:absolute; top:100%; left:50%;
      transform:translate(-50%,-10px);
      opacity:0; pointer-events:none;
      transition:opacity .25s ease, transform .25s ease;
      z-index:100; padding-top:1rem;
      width:95vw; max-width:600px;
    }
    .sn-mega-menu.visible {
      opacity:1; transform:translate(-50%,0); pointer-events:auto;
    }
    .sn-menu-panel {
      background:#fff; border:1px solid #e5e7eb;
      border-radius:.75rem; box-shadow:0 10px 25px rgba(0,0,0,.35);
      padding:1.5rem; overflow:hidden;
    }
    .sn-menu-title {
      font-size:1.125rem; font-weight:700; color:#2563eb;
      border-bottom:1px solid #e5e7eb; padding-bottom:.75rem; margin-bottom:.75rem;
    }
    .sn-menu-grid { display:grid; grid-template-columns:1fr 1fr; gap:.75rem; }
    .sn-menu-item {
      display:flex; align-items:flex-start; gap:.75rem;
      padding:.5rem .75rem; border-radius:.5rem;
      text-decoration:none; color:#4b5563;
      transition:background-color .15s, color .15s;
    }
    .sn-menu-item:hover { background-color:#eff6ff; color:#2563eb; }
    .sn-menu-icon {
      display:inline-flex; align-items:center; justify-content:center;
      width:2.5rem; height:2.5rem; border-radius:9999px;
      font-size:1.125rem; flex-shrink:0;
    }
    .sn-menu-item-title { font-weight:700; color:#111827; font-size:.9rem; }
    .sn-menu-item-desc { font-size:.8rem; color:#6b7280; margin-top:.1rem; }

    /* ── Narrow menus (rebates, process) ── */
    .sn-mega-menu.narrow { max-width:400px; }

    /* ── Hamburger (mobile) ── */
    #sn-hamburger { display:flex; background:none; border:none; cursor:pointer; padding:.5rem; color:#d1d5db; }
    @media(min-width:768px){ #sn-hamburger { display:none; } }

    /* ── Mobile menu ── */
    #sn-mobile-menu {
      display:none; position:fixed; top:5rem; left:0; width:100%;
      background:#fff; box-shadow:0 4px 6px rgba(0,0,0,.1); z-index:49;
    }
    #sn-mobile-menu.open { display:block; }
    #sn-mobile-menu nav { display:flex; flex-direction:column; gap:0; padding:.5rem 1rem 1rem; }
    .sn-mobile-link {
      display:block; padding:.75rem .5rem;
      font-size:1.0625rem; font-weight:500; color:#374151;
      text-decoration:none; border-bottom:1px solid #f3f4f6;
      transition:color .15s;
    }
    .sn-mobile-link:hover { color:#2563eb; }
    .sn-mobile-link.active { color:#2563eb; font-weight:700; }
    .sn-mobile-cta {
      margin-top:.75rem; display:inline-block;
      background:#2563eb; color:#fff;
      padding:.625rem 1.25rem; border-radius:9999px;
      font-weight:600; text-align:center; text-decoration:none;
      transition:background-color .2s;
    }
    .sn-mobile-cta:hover { background:#1d4ed8; }

    /* ── Schedule Modal ── */
    .modal-overlay {
      position:fixed; inset:0; background:rgba(0,0,0,.55);
      z-index:1000; display:flex; align-items:center; justify-content:center;
      opacity:0; visibility:hidden;
      transition:opacity .3s ease, visibility .3s ease;
    }
    .modal-overlay.active { opacity:1; visibility:visible; }
    .sn-modal-box {
      background:#fff; border-radius:.75rem; padding:2rem;
      width:90%; max-width:620px; position:relative;
      box-shadow:0 20px 40px rgba(0,0,0,.3);
      max-height:90vh; overflow-y:auto;
    }
    .sn-modal-close {
      position:absolute; top:1rem; right:1rem;
      background:none; border:none; font-size:1.5rem;
      cursor:pointer; color:#6b7280; line-height:1;
    }
    .sn-modal-close:hover { color:#ef4444; }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);


  /* ─────────────────────────────────────────────
     2. DETERMINE ACTIVE PAGE
  ───────────────────────────────────────────── */
  const page = document.documentElement.dataset.page || 'home';

  function isActive(id) {
    return page === id ? ' active' : '';
  }


  /* ─────────────────────────────────────────────
     3. TECH DROPDOWN ITEMS (shared)
  ───────────────────────────────────────────── */
  const techPrefix = page === 'technologies' ? '#' : 'technologies.html#';

  const techItems = [
    { href: `${techPrefix}hp-water-heaters-section`, icon: 'fa-shower',             bg: '#2563eb', color: '#fff',     title: 'HP Water Heaters',          desc: 'The most efficient way to heat domestic water.' },
    { href: `${techPrefix}hp-hvac-section`,          icon: 'fa-fan',                bg: '#10b981', color: '#fff',     title: 'Heat Pumps HVAC',           desc: 'All-in-one climate control, replacing your furnace/AC.' },
    { href: `${techPrefix}solar-battery-section`,    icon: 'fa-solar-panel',        bg: '#facc15', color: '#111827',  title: 'Solar & Battery Storage',   desc: 'Ensures backup power and energy independence.' },
    { href: `${techPrefix}induction-cooking-section',icon: 'fa-kitchen-set',        bg: '#f97316', color: '#fff',     title: 'Induction Cooking',         desc: 'Faster, safer, cleaner cooking without combustion gases.' },
    { href: `${techPrefix}solar-inverters-section`,  icon: 'fa-microchip',          bg: '#a855f7', color: '#fff',     title: 'Inverters',                 desc: 'The critical component for converting DC to usable AC power.' },
    { href: `${techPrefix}ev-charging-section`,      icon: 'fa-charging-station',   bg: '#2dd4bf', color: '#fff',     title: 'EV Charging',               desc: 'Dedicated high-speed home charging and energy management.' },
    { href: `${techPrefix}v2h-v2l-section`,          icon: 'fa-house-chimney-crack',bg: '#ef4444', color: '#fff',     title: 'Vehicle-to-Home (V2H/V2L)', desc: "Use your EV's battery as a massive source of backup power." },
    { href: `${techPrefix}smart-panels-section`,     icon: 'fa-plug-circle-bolt',   bg: '#6b7280', color: '#fff',     title: 'Smart Electrical Panels',   desc: 'The brain for real-time monitoring, load control, and optimization.' },
  ];

  function renderTechItems() {
    return techItems.map(item => `
      <a href="${item.href}" class="sn-menu-item">
        <div class="sn-menu-icon" style="background:${item.bg};color:${item.color}">
          <i class="fa-solid ${item.icon}"></i>
        </div>
        <div>
          <div class="sn-menu-item-title">${item.title}</div>
          <div class="sn-menu-item-desc">${item.desc}</div>
        </div>
      </a>`).join('');
  }


  /* ─────────────────────────────────────────────
     4. NAV HTML
  ───────────────────────────────────────────── */
  const navHTML = `
  <header id="solenetec-nav-header">
    <nav>
      <div class="nav-inner">

        <!-- Brand -->
        <a href="index.html" class="brand-link">
          <img src="logo.svg" alt="Solenetec Logo" class="brand-logo">
          <span class="brand-name">Solenetec</span>
        </a>

        <!-- Desktop links -->
        <div class="desktop-links">

          <a href="index.html#why" class="sn-nav-link${isActive('home')}">Why Electrify?</a>

          <!-- Technologies dropdown -->
          <div class="sn-dropdown-group" id="sn-tech-group">
            <a href="technologies.html" id="sn-tech-trigger"
               class="sn-nav-link${isActive('technologies')}">
              Technologies <span style="font-size:.8rem;margin-left:.2rem;">&#9662;</span>
            </a>
            <div id="sn-tech-menu" class="sn-mega-menu">
              <div class="sn-menu-panel">
                <div class="sn-menu-grid">${renderTechItems()}</div>
              </div>
            </div>
          </div>

          <!-- Rebate Calculator dropdown -->
          <div class="sn-dropdown-group" id="sn-rebate-group">
            <a href="rebates.html" id="sn-rebate-trigger"
               class="sn-nav-link${isActive('rebates')}">
              Rebate Calculator <span style="font-size:.8rem;margin-left:.2rem;">&#9662;</span>
            </a>
            <div id="sn-rebate-menu" class="sn-mega-menu narrow">
              <div class="sn-menu-panel">
                <div class="sn-menu-title">Financial Tools</div>
                <a href="rebates.html#rebate-calculator-section" class="sn-menu-item">
                  <div class="sn-menu-icon" style="background:#2563eb;color:#fff;font-size:1.25rem;">&#128187;</div>
                  <div>
                    <div class="sn-menu-item-title">Personalized Rebate Estimator</div>
                    <div class="sn-menu-item-desc">Calculate Federal and State incentives based on your eligibility.</div>
                  </div>
                </a>
                <a href="rebates.html#gemini-qa-section" class="sn-menu-item" style="margin-top:.5rem;">
                  <div class="sn-menu-icon" style="background:#2563eb;color:#fff;font-size:1.25rem;">&#x1F4DD;</div>
                  <div>
                    <div class="sn-menu-item-title">Incentive Lookup &amp; Eligibility</div>
                    <div class="sn-menu-item-desc">Get grounded answers on program rules and eligibility requirements.</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- Our Process dropdown -->
          <div class="sn-dropdown-group" id="sn-process-group">
            <a href="process.html" id="sn-process-trigger"
               class="sn-nav-link${isActive('process')}">
              Our Process <span style="font-size:.8rem;margin-left:.2rem;">&#9662;</span>
            </a>
            <div id="sn-process-menu" class="sn-mega-menu narrow">
              <div class="sn-menu-panel">
                <div class="sn-menu-title">Our 4-Step Methodology</div>
                ${[
                  ['&#x2318;',  'Discovery &amp; Audit',     'Comprehensive assessment of your home and energy needs.'],
                  ['&#x1F4B0;', 'Incentive Maximize',        'Design and secure all available rebates and tax credits.'],
                  ['&#x2699;',  'Certified Installation',    'Expert, licensed installation with minimum disruption.'],
                  ['&#x1F4DD;', 'Final Handover &amp; Filing','System commissioning and completion of all official paperwork.'],
                ].map(([icon, title, desc]) => `
                  <a href="process.html#process" class="sn-menu-item">
                    <div class="sn-menu-icon" style="background:#2563eb;color:#fff;font-size:1.25rem;">${icon}</div>
                    <div>
                      <div class="sn-menu-item-title">${title}</div>
                      <div class="sn-menu-item-desc">${desc}</div>
                    </div>
                  </a>`).join('')}
              </div>
            </div>
          </div>

          <button class="sn-get-started" onclick="openScheduleModal()">Get Started</button>
        </div>

        <!-- Hamburger -->
        <button id="sn-hamburger" aria-label="Open menu" onclick="toggleMobileMenu()">
          <i class="fa-solid fa-bars" style="font-size:1.5rem;"></i>
        </button>
      </div>
    </nav>
  </header>

  <!-- Mobile menu -->
  <div id="sn-mobile-menu">
    <nav>
      <a href="index.html#why" class="sn-mobile-link${isActive('home')}">Why Electrify?</a>
      <a href="technologies.html" class="sn-mobile-link${isActive('technologies')}">Technologies</a>
      <a href="rebates.html"     class="sn-mobile-link${isActive('rebates')}">Rebate Calculator</a>
      <a href="process.html"     class="sn-mobile-link${isActive('process')}">Our Process</a>
      <a href="schedule.html"    class="sn-mobile-link${isActive('schedule')}">Schedule</a>
      <a href="#" class="sn-mobile-cta" onclick="openScheduleModal();return false;">Get Started</a>
    </nav>
  </div>

  <!-- Schedule Modal (shared across all pages) -->
  <div id="schedule-modal" class="modal-overlay" onclick="if(event.target===this)closeScheduleModal()">
    <div class="sn-modal-box">
      <button class="sn-modal-close" onclick="closeScheduleModal()" aria-label="Close">&times;</button>
      <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:.5rem;text-align:center;">Schedule Your Consultation</h2>
      <p style="color:#6b7280;text-align:center;margin-bottom:1.5rem;">Select a time to discuss your home's energy future.</p>
      <!-- Replace the Calendly URL below with your actual link -->
      <div class="calendly-inline-widget"
           data-url="YOUR_CALENDLY_URL"
           style="min-width:280px;height:630px;"></div>
      <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async><\/script>
    </div>
  </div>
  `;


  /* ─────────────────────────────────────────────
     5. INJECT NAV
  ───────────────────────────────────────────── */
  function inject() {
    // Insert nav before the first child of <body>
    const wrapper = document.createElement('div');
    wrapper.innerHTML = navHTML;
    document.body.insertBefore(wrapper, document.body.firstChild);
    initDropdowns();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }


  /* ─────────────────────────────────────────────
     6. DROPDOWN LOGIC
  ───────────────────────────────────────────── */
  function initDropdowns() {
    const groups = [
      { groupId: 'sn-tech-group',    menuId: 'sn-tech-menu'    },
      { groupId: 'sn-rebate-group',  menuId: 'sn-rebate-menu'  },
      { groupId: 'sn-process-group', menuId: 'sn-process-menu' },
    ];

    groups.forEach(({ groupId, menuId }) => {
      const group = document.getElementById(groupId);
      const menu  = document.getElementById(menuId);
      if (!group || !menu) return;

      let timer;
      const open  = () => { clearTimeout(timer); menu.classList.add('visible'); };
      const close = () => { timer = setTimeout(() => menu.classList.remove('visible'), 120); };

      group.addEventListener('mouseenter', open);
      group.addEventListener('mouseleave', close);
      menu.addEventListener('mouseenter',  open);
      menu.addEventListener('mouseleave',  close);
    });
  }


  /* ─────────────────────────────────────────────
     7. GLOBAL HELPERS (modal + mobile menu)
  ───────────────────────────────────────────── */
  window.openScheduleModal = function (e) {
    if (e) e.preventDefault();
    const m = document.getElementById('schedule-modal');
    if (m) { m.classList.add('active'); document.body.style.overflow = 'hidden'; }
  };

  window.closeScheduleModal = function () {
    const m = document.getElementById('schedule-modal');
    if (m) { m.classList.remove('active'); document.body.style.overflow = ''; }
  };

  window.toggleMobileMenu = function () {
    const m = document.getElementById('sn-mobile-menu');
    if (m) m.classList.toggle('open');
  };

  // Close mobile menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      const m = document.getElementById('sn-mobile-menu');
      if (m) m.classList.remove('open');
    }
  });

})();
