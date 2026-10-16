/**
 * VANGUARD BUSINESS BROKERS & FRANCHISE ADVISORS
 * Theme & RTL Controller (theme.js)
 */

const ThemeManager = {
  themeKey: 'vanguard_theme_preference',
  rtlKey: 'vanguard_rtl_preference',

  init() {
    this.applyTheme(this.getTheme());
    this.applyRTL(this.isRTL());
    this.bindEvents();
  },

  getTheme() {
    return localStorage.getItem(this.themeKey) || 'light';
  },

  isRTL() {
    return localStorage.getItem(this.rtlKey) === 'true';
  },

  applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark');
    }
    localStorage.setItem(this.themeKey, theme);
    this.updateThemeIcons(theme);
  },

  toggleTheme() {
    const current = this.getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    if (window.VanguardApp && typeof window.VanguardApp.showToast === 'function') {
      window.VanguardApp.showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    }
  },

  updateThemeIcons(theme) {
    document.querySelectorAll('.theme-toggle-btn i').forEach(icon => {
      if (theme === 'light') {
        icon.className = 'bi bi-moon-stars-fill text-amber-500';
      } else {
        icon.className = 'bi bi-sun-fill text-amber-400';
      }
    });
  },

  applyRTL(rtlState) {
    if (rtlState) {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.classList.add('rtl');
      BiDiManager.normalize();
    } else {
      document.documentElement.removeAttribute('dir');
      document.documentElement.classList.remove('rtl');
      BiDiManager.restore();
    }
    localStorage.setItem(this.rtlKey, rtlState);
    this.updateRTLButtons(rtlState);

    // Auto-close and safely reset mobile drawer position on direction change
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    if (drawer) {
      drawer.classList.remove('open', 'active');
      if (rtlState) {
        drawer.classList.add('translate-x-full');
        drawer.classList.remove('-translate-x-full');
      } else {
        drawer.classList.add('-translate-x-full');
        drawer.classList.remove('translate-x-full');
      }
    }
    if (backdrop) {
      backdrop.classList.add('hidden');
      backdrop.classList.remove('open', 'active');
    }
    document.body.style.overflow = '';
  },

  toggleRTL() {
    const nextState = !this.isRTL();
    this.applyRTL(nextState);
    if (window.VanguardApp && typeof window.VanguardApp.showToast === 'function') {
      window.VanguardApp.showToast(`Layout changed to ${nextState ? 'RTL (Right-to-Left)' : 'LTR (Left-to-Right)'}`, 'info');
    }
  },

  updateRTLButtons(rtlState) {
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      if (rtlState) {
        btn.classList.add('active');
        btn.setAttribute('title', 'Switch to LTR Layout');
        btn.setAttribute('aria-label', 'Switch to left-to-right layout');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('title', 'Switch to RTL Layout');
        btn.setAttribute('aria-label', 'Switch to right-to-left layout');
      }
      let icon = btn.querySelector('i');
      if (!icon) {
        btn.innerHTML = '<i class="bi bi-arrow-left-right text-base"></i>';
      } else {
        icon.className = 'bi bi-arrow-left-right text-base';
      }
    });
  },

  bindEvents() {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
      });
    });

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleRTL();
      });
    });

    // Automatically normalize BiDi on modals and dynamic drawers
    document.addEventListener('click', (e) => {
      if (this.isRTL()) {
        const trigger = e.target.closest('[class*="btn-open-"], [data-modal-target], [id*="modal"]');
        if (trigger) {
          setTimeout(() => BiDiManager.normalize(), 50);
          setTimeout(() => BiDiManager.normalize(), 200);
        }
      }
    });
  }
};

/**
 * BiDi Unicode Normalizer
 * Ensures fullstops, colons, commas, asterisks, hashtags, and stars stay at the right end of text in RTL.
 */
const BiDiManager = {
  LRM: '\u200E',

  normalize(root = document.body) {
    if (!root) return;

    // 1. Mandatory asterisks and indicators in labels
    root.querySelectorAll('label').forEach(label => {
      label.querySelectorAll('span.text-rose-500, span.text-red-500, .mandatory-star').forEach(ast => {
        if (!ast.textContent.includes(this.LRM)) {
          ast.textContent = ast.textContent.trim() + this.LRM;
        }
      });
      label.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE && /[\*\:\.]$/.test(child.nodeValue)) {
          if (!child.nodeValue.endsWith(this.LRM)) {
            child.nodeValue = child.nodeValue + this.LRM;
          }
        }
      });
    });

    // 2. Select options with times, colons, or ranges
    root.querySelectorAll('option').forEach(opt => {
      if (/[\.\:\,\*\#\★\+\)\%\-]/.test(opt.textContent) && !opt.textContent.endsWith(this.LRM)) {
        opt.textContent = opt.textContent + this.LRM;
      }
    });

    // 3. Headings, paragraphs, disclaimers, badges ending with punctuation or symbols
    const elements = root.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .hero-badge, .badge, .stat-counter, .price-tag, blockquote, dt, dd, .modal-body, .modal-header');
    elements.forEach(el => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
      let lastNode = null;
      let node;
      while (node = walker.nextNode()) {
        lastNode = node;
      }
      if (lastNode && lastNode.nodeValue) {
        const trimmed = lastNode.nodeValue.trimEnd();
        if (/[\.\:\,\*\#\★\+\)\%]$/.test(trimmed) && !lastNode.nodeValue.endsWith(this.LRM)) {
          lastNode.nodeValue = lastNode.nodeValue + this.LRM;
        }
      }
    });
  },

  restore(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
      if (node.nodeValue.includes(this.LRM)) {
        node.nodeValue = node.nodeValue.replaceAll(this.LRM, '');
      }
    }
  }
};

// Initialize early to prevent theme flicker
ThemeManager.applyTheme(ThemeManager.getTheme());
ThemeManager.applyRTL(ThemeManager.isRTL());

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  if (ThemeManager.isRTL()) {
    BiDiManager.normalize();
  }
});
