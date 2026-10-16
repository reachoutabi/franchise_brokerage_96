/**
 * VANGUARD BUSINESS BROKERS & FRANCHISE ADVISORS
 * Main Application Orchestrator (main.js)
 */

const VanguardApp = {
  favoritesKey: 'vanguard_favorites',

  init() {
    this.initHeaderScroll();
    this.initDropdownMenus();
    this.initMobileMenu();
    this.initFavorites();
    this.initListingInteractions();
    this.initHomeFeaturedListings();
    this.initHomeFranchiseSpotlight();
    this.initArticles();
    this.initStatCounters();
    this.initAccordions();
    this.initBackToTop();
    this.initGlobalModals();
    this.initHeroAnimations();
    this.initTimelineScrollAnimation();
    this.initHashScroll();
  },

  // Smooth scroll support for cross-page hash anchors
  initHashScroll() {
    if (window.location.hash) {
      const scrollToHash = () => {
        try {
          const target = document.querySelector(window.location.hash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        } catch (e) {}
      };
      setTimeout(scrollToHash, 100);
      window.addEventListener('load', () => setTimeout(scrollToHash, 200), { once: true });
    }
  },

  // ==========================================================================
  // 1. STICKY HEADER & SCROLL
  // ==========================================================================
  initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  },

  // ==========================================================================
  // 2. MOBILE NAVIGATION DRAWER (Section 15.8)
  // ==========================================================================
  initMobileMenu() {
    const hamburgerBtn = document.getElementById('btn-mobile-menu-toggle');
    const closeBtn = document.getElementById('btn-close-mobile-menu');
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-nav-backdrop');

    if (!drawer) return;

    const openMenu = () => {
      drawer.classList.add('open', 'active');
      drawer.classList.remove('-translate-x-full', 'translate-x-full');
      if (backdrop) {
        backdrop.classList.remove('hidden');
        backdrop.classList.add('open', 'active');
      }
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      drawer.classList.remove('open', 'active');
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRtl) {
        drawer.classList.add('translate-x-full');
        drawer.classList.remove('-translate-x-full');
      } else {
        drawer.classList.add('-translate-x-full');
        drawer.classList.remove('translate-x-full');
      }
      if (backdrop) {
        backdrop.classList.add('hidden');
        backdrop.classList.remove('open', 'active');
      }
      document.body.style.overflow = '';
    };

    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openMenu();
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenu();
      });
    }
    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }

    // Close when clicking nav links inside mobile menu
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeMenu();
      }
    });

    // Auto-close if resized to desktop (>= 1024px)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && drawer.classList.contains('open')) {
        closeMenu();
      }
    }, { passive: true });

    // Toggle mobile dropdown submenus (e.g. Home dropdown)
    drawer.querySelectorAll('.mobile-dropdown-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const targetId = btn.getAttribute('data-target');
        const submenu = document.getElementById(targetId);
        const chevron = btn.querySelector('.mobile-submenu-chevron');
        if (submenu) {
          const isHidden = submenu.classList.contains('hidden');
          if (isHidden) {
            submenu.classList.remove('hidden');
            btn.setAttribute('aria-expanded', 'true');
            if (chevron) chevron.classList.add('rotate-180');
          } else {
            submenu.classList.add('hidden');
            btn.setAttribute('aria-expanded', 'false');
            if (chevron) chevron.classList.remove('rotate-180');
          }
        }
      });
    });

    this.closeMobileMenu = closeMenu;
  },

  // ==========================================================================
  // 2.1 DESKTOP DROPDOWN MENUS
  // ==========================================================================
  initDropdownMenus() {
    document.querySelectorAll('.nav-dropdown-wrapper').forEach(wrapper => {
      const trigger = wrapper.querySelector('.nav-dropdown-trigger');
      if (!trigger) return;

      // Handle click or touch toggle
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        wrapper.classList.toggle('open');
      });

      const chevron = trigger.querySelector('.dropdown-chevron');
      if (chevron) {
        chevron.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('open');
        });
      }

      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          wrapper.classList.add('open');
          const firstLink = wrapper.querySelector('.nav-dropdown-item');
          if (firstLink) firstLink.focus();
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown-wrapper')) {
        document.querySelectorAll('.nav-dropdown-wrapper.open').forEach(w => w.classList.remove('open'));
      }
    });
  },

  // ==========================================================================
  // 3. FAVORITES / SAVED LISTINGS (LocalStorage)
  // ==========================================================================
  getFavorites() {
    return JSON.parse(localStorage.getItem(this.favoritesKey) || '[]');
  },

  isFavorite(id) {
    return this.getFavorites().includes(id);
  },

  toggleFavorite(id) {
    let favs = this.getFavorites();
    const index = favs.indexOf(id);
    let added = false;

    if (index > -1) {
      favs.splice(index, 1);
      added = false;
    } else {
      favs.push(id);
      added = true;
    }

    localStorage.setItem(this.favoritesKey, JSON.stringify(favs));
    this.updateFavoritesCount();
    this.updateListingCardHeartIcons();

    const listing = (typeof businessListingsData !== 'undefined') 
      ? businessListingsData.find(item => item.id === id) 
      : null;
    const title = listing ? listing.title : `Listing ${id}`;

    if (added) {
      this.showToast(`Saved "${title}" to your favorites`, 'success');
    } else {
      this.showToast(`Removed "${title}" from favorites`, 'info');
    }
  },

  updateFavoritesCount() {
    const count = this.getFavorites().length;
    document.querySelectorAll('.saved-counter-badge').forEach(badge => {
      badge.textContent = count;
      badge.classList.toggle('hidden', count === 0);
    });
  },

  updateListingCardHeartIcons() {
    const favs = this.getFavorites();
    document.querySelectorAll('.btn-save-listing').forEach(btn => {
      const id = btn.getAttribute('data-id');
      const icon = btn.querySelector('i');
      if (icon) {
        if (favs.includes(id)) {
          icon.className = 'bi bi-heart-fill text-rose-500';
        } else {
          icon.className = 'bi bi-heart';
        }
      }
    });
  },

  initFavorites() {
    this.updateFavoritesCount();

    // Trigger open saved listings drawer
    document.querySelectorAll('.btn-open-saved-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openSavedListingsModal();
      });
    });
  },

  openSavedListingsModal() {
    const modal = document.getElementById('modal-saved-listings');
    const container = document.getElementById('saved-listings-list-container');
    if (!modal || !container) return;

    const favIds = this.getFavorites();
    if (favIds.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center text-slate-400">
          <i class="bi bi-heart text-4xl mb-3 block text-slate-600"></i>
          <p class="font-semibold text-white mb-1">No Saved Businesses Yet</p>
          <p class="text-sm">Click the heart icon on any listing card to save opportunities for side-by-side review.</p>
          <a href="buy-a-business.html" class="btn btn-primary btn-sm mt-4">
            Browse All Businesses <i class="bi bi-arrow-right"></i>
          </a>
        </div>
      `;
    } else {
      const items = (typeof businessListingsData !== 'undefined')
        ? businessListingsData.filter(b => favIds.includes(b.id))
        : [];

      container.innerHTML = items.map(item => `
        <div class="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-900 border border-white/10 mb-3">
          <img src="${item.images[0]}" alt="${item.title}" class="w-24 h-20 rounded-lg object-cover" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';">
          <div class="flex-1 text-start">
            <span class="text-xs font-bold text-emerald-400 uppercase">${item.category} • ID: ${item.id}</span>
            <h4 class="font-bold text-white text-base">${item.title}</h4>
            <div class="flex items-center gap-3 text-xs text-slate-300 mt-1">
              <span>Ask: <strong class="text-white">${ListingConfig.formatCurrency(item.askingPrice)}</strong></span>
              <span>Cash Flow: <strong class="text-emerald-400">${ListingConfig.formatCurrency(item.netProfit)}</strong></span>
            </div>
          </div>
          <div class="flex sm:flex-col gap-2 shrink-0">
            <button class="btn btn-outline btn-sm btn-view-details" data-id="${item.id}">View</button>
            <button class="btn btn-secondary btn-sm text-rose-400 hover:text-rose-300" onclick="VanguardApp.toggleFavorite('${item.id}'); VanguardApp.openSavedListingsModal();">
              Remove
            </button>
          </div>
        </div>
      `).join('');
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.bindListingInteractions();
  },

  // ==========================================================================
  // 4. LISTING CARD INTERACTIONS & DETAILS MODAL
  // ==========================================================================
  initListingInteractions() {
    this.bindListingInteractions();

    // Document-level delegation ensures buttons on newly-rendered pages (Page 2, 3, etc.) always work
    if (!this._listingDelegationBound) {
      this._listingDelegationBound = true;
      document.addEventListener('click', (e) => {
        const detailsBtn = e.target.closest('.btn-view-details');
        if (detailsBtn) {
          e.preventDefault();
          const id = detailsBtn.getAttribute('data-id');
          if (id) {
            this.openListingDetailsModal(id);
          }
          return;
        }

        const saveBtn = e.target.closest('.btn-save-listing');
        if (saveBtn) {
          e.preventDefault();
          e.stopPropagation();
          const id = saveBtn.getAttribute('data-id');
          if (id) {
            this.toggleFavorite(id);
          }
          return;
        }
      });
    }
  },

  bindListingInteractions() {
    // Save (Heart) Buttons
    document.querySelectorAll('.btn-save-listing').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        this.toggleFavorite(id);
      };
    });

    // View Details Buttons
    document.querySelectorAll('.btn-view-details').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        this.openListingDetailsModal(id);
      };
    });
  },

  openListingDetailsModal(id) {
    if (typeof businessListingsData === 'undefined') return;
    const item = businessListingsData.find(b => b.id === id);
    if (!item) return;

    const modal = document.getElementById('modal-listing-details');
    if (!modal) return;

    // Set modal elements
    const titleEl = document.getElementById('modal-listing-title');
    const badgeEl = document.getElementById('modal-listing-badge-wrap');
    const priceEl = document.getElementById('modal-listing-price');
    const revenueEl = document.getElementById('modal-listing-revenue');
    const profitEl = document.getElementById('modal-listing-profit');
    const establishedEl = document.getElementById('modal-listing-established');
    const employeesEl = document.getElementById('modal-listing-employees');
    const descEl = document.getElementById('modal-listing-desc');
    const facilityEl = document.getElementById('modal-listing-facility');
    const leaseEl = document.getElementById('modal-listing-lease');
    const invEl = document.getElementById('modal-listing-inventory');
    const reasonEl = document.getElementById('modal-listing-reason');
    const highlightsEl = document.getElementById('modal-listing-highlights');
    const mainImgEl = document.getElementById('modal-listing-main-img');
    const thumbsContainer = document.getElementById('modal-listing-thumbs');
    const ndaHiddenInput = document.getElementById('nda-listing-id');
    const enquireBtn = document.getElementById('modal-listing-enquire-btn');
    const shareBtn = document.getElementById('modal-listing-share-btn');

    if (titleEl) titleEl.textContent = item.title;
    if (priceEl) priceEl.textContent = ListingConfig.formatCurrency(item.askingPrice);
    if (revenueEl) revenueEl.textContent = ListingConfig.formatCurrency(item.annualRevenue);
    if (profitEl) profitEl.textContent = ListingConfig.formatCurrency(item.netProfit);
    if (establishedEl) establishedEl.textContent = `${item.yearEstablished} (${new Date().getFullYear() - item.yearEstablished} yrs operation)`;
    if (employeesEl) employeesEl.textContent = `${item.employees} Full/Part-Time Personnel`;
    if (descEl) descEl.textContent = item.description;
    if (facilityEl) facilityEl.textContent = item.facility;
    if (leaseEl) leaseEl.textContent = item.leaseTerms;
    if (invEl) invEl.textContent = item.inventoryIncluded;
    if (reasonEl) reasonEl.textContent = item.reasonForSale;
    if (ndaHiddenInput) ndaHiddenInput.value = `${item.id} - ${item.title}`;

    if (enquireBtn) {
      enquireBtn.href = `contact.html?listing=${item.id}&title=${encodeURIComponent(item.title)}`;
    }

    if (shareBtn) {
      shareBtn.onclick = () => {
        const shareUrl = `${window.location.origin}${window.location.pathname}?listing=${item.id}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
          this.showToast('Listing link copied to clipboard!', 'success');
        }).catch(() => {
          this.showToast(`Listing ID: ${item.id}`, 'info');
        });
      };
    }

    if (badgeEl) {
      badgeEl.innerHTML = `
        <span class="badge-type">${item.type}</span>
        <span class="text-xs font-bold text-emerald-400">${item.category} • ID: ${item.id}</span>
        ${item.badges?.includes('Verified') ? '<span class="badge-verified"><i class="bi bi-patch-check-fill"></i> Verified</span>' : ''}
      `;
    }

    if (highlightsEl) {
      highlightsEl.innerHTML = item.highlights.map(h => `
        <li class="flex items-start gap-2 text-sm text-slate-300">
          <i class="bi bi-check-circle-fill text-emerald-400 mt-1 shrink-0"></i>
          <span>${h}</span>
        </li>
      `).join('');
    }

    // Gallery
    const fallbackImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';
    if (mainImgEl) {
      mainImgEl.src = (item.images && item.images.length > 0) ? item.images[0] : fallbackImage;
      mainImgEl.onerror = function() {
        this.onerror = null;
        this.src = fallbackImage;
      };
    }
    if (thumbsContainer) {
      const imagesList = (item.images && item.images.length > 0) ? item.images : [fallbackImage];
      thumbsContainer.innerHTML = imagesList.map((img, i) => `
        <button type="button" class="w-16 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === 0 ? 'border-emerald-500' : 'border-transparent opacity-60 hover:opacity-100'}" onclick="const mainImg = document.getElementById('modal-listing-main-img'); if (mainImg) mainImg.src='${img}'; document.querySelectorAll('#modal-listing-thumbs button').forEach(b => b.classList.remove('border-emerald-500')); this.classList.add('border-emerald-500');">
          <img src="${img}" alt="Thumbnail ${i+1}" class="w-full h-full object-cover" loading="lazy" onerror="this.onerror=null; this.src='${fallbackImage}';">
        </button>
      `).join('');
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  // ==========================================================================
  // 5. HOME PAGE FEATURED LISTINGS & LOAD MORE
  // ==========================================================================
  initHomeFeaturedListings() {
    const container = document.getElementById('home-featured-listings-grid');
    if (!container || typeof businessListingsData === 'undefined') return;

    let itemsShown = 6;

    const render = () => {
      const activeChip = document.querySelector('.home-filter-chip.active');
      const cat = activeChip ? activeChip.getAttribute('data-category') : 'all';

      let list = businessListingsData;
      if (cat && cat !== 'all') {
        list = list.filter(item => item.category.toLowerCase() === cat.toLowerCase());
      }

      const visibleSlice = list.slice(0, itemsShown);

      container.innerHTML = visibleSlice.map(item => `
        <div class="card-brokerage h-full flex flex-col">
          <div class="card-image-wrap w-full h-[210px] overflow-hidden bg-slate-800 relative flex-shrink-0">
            <img src="${item.images[0]}" alt="${item.title}" class="w-full h-full object-cover" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';">
            <button class="btn-save-listing absolute top-4 left-4 start-4 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:text-rose-400 transition-colors z-10" data-id="${item.id}" aria-label="Save listing">
              <i class="bi ${this.isFavorite(item.id) ? 'bi-heart-fill text-rose-500' : 'bi-heart'}"></i>
            </button>
          </div>
          <div class="card-content flex flex-col flex-1 p-5">
            <div class="listing-badges-wrap flex items-center gap-1.5 mb-2.5">
              <span class="badge-type">${item.type}</span>
              ${item.badges?.includes('Verified') ? '<span class="badge-verified"><i class="bi bi-patch-check-fill"></i> Verified</span>' : ''}
              ${item.badges?.includes('New') ? '<span class="badge-type text-amber-300 border-amber-500/40">New</span>' : ''}
            </div>
            <div class="listing-meta-row flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span class="text-emerald-400 uppercase tracking-wider font-bold">${item.category}</span>
              <span class="font-mono text-slate-500">ID: ${item.id}</span>
            </div>
            <h3 class="listing-title-pinned text-lg font-bold text-white line-clamp-2 mb-1 leading-snug" title="${item.title}">${item.title}</h3>
            <p class="listing-location-row text-xs text-slate-400 flex items-center gap-1 mb-4">
              <i class="bi bi-geo-alt"></i> ${item.location} • Est. ${item.yearEstablished}
            </p>

            <div class="grid grid-cols-2 gap-3 card-stats-grid p-3 rounded-xl mb-4 text-xs">
              <div>
                <span class="text-slate-400 block text-[11px]">Asking Price</span>
                <span class="text-base font-extrabold text-white num-tabular font-mono">${ListingConfig.formatCurrency(item.askingPrice)}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[11px]">Net Cash Flow</span>
                <span class="text-base font-extrabold text-emerald-400 num-tabular font-mono">${ListingConfig.formatCurrency(item.netProfit)}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[11px]">Annual Revenue</span>
                <span class="font-semibold text-slate-200 num-tabular font-mono">${ListingConfig.formatCurrency(item.annualRevenue)}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[11px]">Employees</span>
                <span class="font-semibold text-slate-200">${item.employees} Staff</span>
              </div>
            </div>

            <div class="card-footer-pinned mt-auto pt-3 border-t border-white/10 flex items-center gap-2">
              <button type="button" class="btn btn-outline btn-sm flex-1 btn-view-details" data-id="${item.id}">
                View Details <i class="bi bi-arrow-right"></i>
              </button>
              <a href="contact.html?listing=${item.id}&title=${encodeURIComponent(item.title)}" class="btn btn-primary btn-sm flex-1">
                Enquire <i class="bi bi-chat-text"></i>
              </a>
            </div>
          </div>
        </div>
      `).join('');

      this.bindListingInteractions();

    };

    render();

    // Category filter chips on Home
    document.querySelectorAll('.home-filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.home-filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        itemsShown = 6;
        render();
      });
    });

    // Home Sort dropdown
    const homeSortSelect = document.getElementById('home-sort-select');
    if (homeSortSelect) {
      homeSortSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === 'price-asc') {
          businessListingsData.sort((a, b) => a.askingPrice - b.askingPrice);
        } else if (val === 'price-desc') {
          businessListingsData.sort((a, b) => b.askingPrice - a.askingPrice);
        } else if (val === 'revenue-desc') {
          businessListingsData.sort((a, b) => b.annualRevenue - a.annualRevenue);
        } else {
          businessListingsData.sort((a, b) => b.id.localeCompare(a.id));
        }
        render();
      });
    }

  },

  // ==========================================================================
  // 6. FRANCHISE SPOTLIGHTS ON HOME PAGE
  // ==========================================================================
  initHomeFranchiseSpotlight() {
    const container = document.getElementById('franchise-spotlight-grid');
    if (!container || typeof franchiseSpotlightsData === 'undefined') return;

    container.innerHTML = franchiseSpotlightsData.map(f => `
      <a href="contact.html?interest=Franchise%20Consulting&brand=${encodeURIComponent(f.name)}" class="card-brokerage h-full flex flex-col group block transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-amber-500/30">
        <div class="card-image-wrap w-full h-[190px] overflow-hidden bg-slate-800 flex-shrink-0 relative">
          <img src="${f.image}" alt="${f.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';">
        </div>
        <div class="card-content flex flex-col flex-1 p-5">
          <div class="franchise-badges flex items-center gap-1.5 mb-2.5 whitespace-nowrap" style="height: 26px;">
            <span class="badge-verified text-[11px] whitespace-nowrap"><i class="bi bi-patch-check-fill"></i> Verified Brand</span>
            <span class="badge-type text-[11px] whitespace-nowrap text-amber-300 border-amber-500/30">Franchise</span>
          </div>
          <span class="franchise-category text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1" style="height: 34px; line-height: 17px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${f.industry}</span>
          <h3 class="franchise-title text-lg font-bold text-white mb-2 leading-snug group-hover:text-amber-400 transition-colors" style="height: 52px; line-height: 26px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;" title="${f.name}">${f.name}</h3>
          <p class="franchise-desc text-xs text-slate-400 mb-3.5 leading-relaxed" style="height: 42px; line-height: 21px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${f.description}</p>

          <div class="space-y-2 p-3.5 rounded-xl card-stats-grid text-xs" style="height: 155px; display: flex; flex-direction: column; justify-content: space-between;">
            <div class="flex justify-between items-center gap-2"><span class="text-slate-400 shrink-0">Total Investment:</span> <strong class="text-white font-mono text-end truncate">${f.investmentRange}</strong></div>
            <div class="flex justify-between items-center gap-2"><span class="text-slate-400 shrink-0">Min. Liquid Capital:</span> <strong class="text-slate-200 font-mono text-end">${f.liquidCapitalRequired}</strong></div>
            <div class="flex justify-between items-center gap-2"><span class="text-slate-400 shrink-0">Expected ROI:</span> <strong class="text-emerald-400 font-bold font-mono text-end">${f.expectedROI}</strong></div>
            <div class="flex justify-between items-center gap-2"><span class="text-slate-400 shrink-0">Current Footprint:</span> <strong class="text-slate-200 text-end truncate">${f.outlets}</strong></div>
          </div>
        </div>
      </a>
    `).join('');
  },

  // ==========================================================================
  // 7. ARTICLES & MODAL READER (Section 15.6 - No Dead Links)
  // ==========================================================================
  initArticles() {
    document.querySelectorAll('.btn-read-article').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const artId = btn.getAttribute('data-article-id');
        this.openArticleModal(artId);
      });
    });
  },

  openArticleModal(artId) {
    if (typeof articlesData === 'undefined') return;
    const article = articlesData.find(a => a.id === artId);
    if (!article) return;

    const modal = document.getElementById('modal-article-reader');
    if (!modal) return;

    document.getElementById('modal-article-title').textContent = article.title;
    document.getElementById('modal-article-meta').textContent = `${article.category} • ${article.date} • ${article.readTime}`;
    document.getElementById('modal-article-img').src = article.image;
    document.getElementById('modal-article-content').innerHTML = article.content;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  // ==========================================================================
  // 8. ANIMATED STATISTIC COUNTERS (Section 15.4)
  // ==========================================================================
  initStatCounters() {
    const counterElements = document.querySelectorAll('.stat-counter');
    if (counterElements.length === 0) return;

    const parseCounterData = (el) => {
      let targetAttr = el.getAttribute('data-target');
      let prefix = el.getAttribute('data-prefix') || '';
      let suffix = el.getAttribute('data-suffix') || '';
      let decimals = el.getAttribute('data-decimals') !== null ? parseInt(el.getAttribute('data-decimals')) : 0;
      let target = 0;

      if (targetAttr === null || targetAttr === undefined || isNaN(parseFloat(targetAttr))) {
        // Fallback: intelligently extract number, prefix, and suffix from existing text
        const text = el.textContent.trim();
        const match = text.match(/^([^0-9.]*)([0-9,]+(?:\.[0-9]+)?)(.*)$/);
        if (match) {
          prefix = match[1] || '';
          const numStr = match[2].replace(/,/g, '');
          target = parseFloat(numStr) || 0;
          suffix = match[3] || '';
          if (numStr.includes('.')) {
            decimals = numStr.split('.')[1].length;
          }
        }
      } else {
        target = parseFloat(targetAttr);
      }

      return { target, prefix, suffix, decimals };
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const { target, prefix, suffix, decimals } = parseCounterData(el);
          const duration = 1800;
          const startTime = performance.now();

          el.classList.add('counting');

          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ultra-smooth easeOutQuart
            const ease = progress === 1 ? 1 : 1 - Math.pow(1 - progress, 4);
            const currentVal = target * ease;

            const formatted = decimals > 0
              ? currentVal.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
              : Math.round(currentVal).toLocaleString('en-US');

            el.textContent = `${prefix}${formatted}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              const finalFormatted = decimals > 0
                ? target.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
                : target.toLocaleString('en-US');
              el.textContent = `${prefix}${finalFormatted}${suffix}`;
              el.classList.remove('counting');
              el.classList.add('counted');
            }
          };

          requestAnimationFrame(updateCount);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    counterElements.forEach(el => observer.observe(el));
  },

  // ==========================================================================
  // 9. ACCORDION ENGINE (Section 15.4 & 15.7)
  // ==========================================================================
  initAccordions() {
    const accordions = document.querySelectorAll('.accordion-header');
    if (!accordions.length) return;

    // Enforce that at most only one accordion item is open initially
    let hasActive = false;
    accordions.forEach(h => {
      const body = h.nextElementSibling;
      const icon = h.querySelector('i');
      if (h.classList.contains('active') && !hasActive) {
        hasActive = true;
        if (body) body.classList.add('open');
        if (icon) icon.className = 'bi bi-dash-lg';
      } else {
        h.classList.remove('active');
        if (body) body.classList.remove('open');
        if (icon) icon.className = 'bi bi-plus-lg';
      }
    });

    accordions.forEach(header => {
      header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        const isOpen = header.classList.contains('active');
        const container = header.closest('.accordion-group') || document;

        // Close all accordion items so at any time only one item can be open
        container.querySelectorAll('.accordion-header').forEach(h => {
          h.classList.remove('active');
          if (h.nextElementSibling) h.nextElementSibling.classList.remove('open');
          const icon = h.querySelector('i');
          if (icon) icon.className = 'bi bi-plus-lg';
        });

        // Toggle open if it was previously closed
        if (!isOpen) {
          header.classList.add('active');
          if (body) body.classList.add('open');
          const icon = header.querySelector('i');
          if (icon) icon.className = 'bi bi-dash-lg';
        }
      });
    });
  },

  // ==========================================================================
  // 10. BACK TO TOP BUTTON (Section 15.8)
  // ==========================================================================
  initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  // ==========================================================================
  // 11. GLOBAL MODAL CONTROLLERS
  // ==========================================================================
  initGlobalModals() {
    // Close modal triggers
    document.querySelectorAll('.btn-close-modal, .modal-backdrop').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop') || e.target.closest('.btn-close-modal')) {
          document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
          document.body.style.overflow = '';
        }
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
        document.body.style.overflow = '';
      }
    });

    // Consultation triggers
    document.querySelectorAll('.btn-open-consultation-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.getElementById('modal-consultation');
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Buyer requirements modal trigger
    document.querySelectorAll('.btn-open-buyer-req-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.getElementById('modal-buyer-requirements');
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });
  },

  // ==========================================================================
  // 12. TOAST NOTIFICATION SYSTEM
  // ==========================================================================
  showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const iconClass = type === 'success' 
      ? 'bi-check-circle-fill text-emerald-400' 
      : (type === 'error' ? 'bi-exclamation-triangle-fill text-rose-400' : 'bi-info-circle-fill text-blue-400');

    toast.innerHTML = `
      <i class="bi ${iconClass} text-xl shrink-0"></i>
      <span class="text-sm font-medium flex-1">${message}</span>
      <button type="button" class="text-slate-400 hover:text-white transition-colors" onclick="this.parentElement.remove()">
        <i class="bi bi-x text-lg"></i>
      </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  // ==========================================================================
  // HERO IMAGE ANIMATIONS & INTERACTIVE PARALLAX
  // ==========================================================================
  initHeroAnimations() {
    const heroSections = document.querySelectorAll('.page-hero');
    heroSections.forEach(hero => {
      // Progressive enhancement: extract background-image to .page-hero-bg if not already present
      let bg = hero.querySelector('.page-hero-bg');
      if (!bg) {
        const computedStyle = window.getComputedStyle(hero);
        const bgImg = hero.style.backgroundImage || computedStyle.backgroundImage;
        if (bgImg && bgImg !== 'none') {
          bg = document.createElement('div');
          bg.className = 'page-hero-bg';
          bg.style.backgroundImage = bgImg;
          hero.style.backgroundImage = 'none';
          hero.insertBefore(bg, hero.firstChild);
        }
      }

      // Smooth interactive mouse parallax for desktop users
      if (bg && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let rafId = null;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const updateParallax = () => {
          currentX += (targetX - currentX) * 0.08;
          currentY += (targetY - currentY) * 0.08;
          bg.style.setProperty('--parallax-x', `${currentX.toFixed(2)}px`);
          bg.style.setProperty('--parallax-y', `${currentY.toFixed(2)}px`);

          if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
            rafId = requestAnimationFrame(updateParallax);
          } else {
            rafId = null;
          }
        };

        hero.addEventListener('mousemove', (e) => {
          const rect = hero.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          targetX = relX * -18; // smooth subtle shift up to 9px in opposite direction
          targetY = relY * -14;

          if (!rafId) {
            rafId = requestAnimationFrame(updateParallax);
          }
        }, { passive: true });

        hero.addEventListener('mouseleave', () => {
          targetX = 0;
          targetY = 0;
          if (!rafId) {
            rafId = requestAnimationFrame(updateParallax);
          }
        });
      }
    });
  },

  // ==========================================================================
  // 13. INTERACTIVE SCROLL-DRIVEN CONNECTED TIMELINE (about.html)
  // ==========================================================================
  initTimelineScrollAnimation() {
    const container = document.getElementById('timeline-interactive-container');
    const progressBar = document.getElementById('timeline-progress-bar');
    if (!container || !progressBar) return;

    const rows = container.querySelectorAll('.timeline-row');
    const nodes = container.querySelectorAll('.timeline-node');
    if (!nodes.length) return;

    let ticking = false;

    const updateTimeline = () => {
      const windowHeight = window.innerHeight;
      // Trigger threshold: active viewport focus point (60% down the screen)
      const triggerY = windowHeight * 0.60;

      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      if (!firstNode || !lastNode) return;

      const firstRect = firstNode.getBoundingClientRect();
      const lastRect = lastNode.getBoundingClientRect();

      const totalDistance = lastRect.top - firstRect.top;

      // Distance from first node to the scroll trigger position
      const scrolledDist = triggerY - firstRect.top;
      const progress = totalDistance > 0 ? Math.min(Math.max(scrolledDist / totalDistance, 0), 1) : 0;

      // Set the dynamic height of the glowing connecting beam
      const currentBeamHeight = progress * totalDistance;
      progressBar.style.height = `${currentBeamHeight}px`;

      // Check each green tick node and connect it when the beam reaches it
      nodes.forEach((node, idx) => {
        const nodeRect = node.getBoundingClientRect();
        const nodeOffset = nodeRect.top - firstRect.top;
        const row = rows[idx];

        // Activate when the beam is at or past the node center (with 6px buffer)
        if (currentBeamHeight >= nodeOffset - 6) {
          if (!node.classList.contains('is-connected')) {
            node.classList.add('is-connected');
            if (row) row.classList.add('is-connected');
          }
        } else {
          if (node.classList.contains('is-connected')) {
            node.classList.remove('is-connected');
            if (row) row.classList.remove('is-connected');
          }
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateTimeline);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Allow clicking on any tick to smoothly scroll to that milestone
    nodes.forEach((node, idx) => {
      node.style.cursor = 'pointer';
      node.setAttribute('title', `Milestone ${idx + 1}`);
      node.addEventListener('click', () => {
        const row = rows[idx];
        if (row) {
          row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });

    // Run once on initialization
    updateTimeline();
  }
};

// Expose VanguardApp on global window object for other scripts (filters.js, forms.js, theme.js)
window.VanguardApp = VanguardApp;

document.addEventListener('DOMContentLoaded', () => {
  VanguardApp.init();
});
