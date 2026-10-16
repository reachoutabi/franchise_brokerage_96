/**
 * VANGUARD BUSINESS BROKERS & FRANCHISE ADVISORS
 * Advanced Filtering, Sorting & Pagination (filters.js)
 */

const FilterManager = {
  state: {
    category: 'all',
    searchQuery: '',
    location: '',
    minPrice: 0,
    maxPrice: 10000000,
    minRevenue: 0,
    minProfit: 0,
    type: 'all',
    verifiedOnly: false,
    sortBy: 'newest',
    viewMode: 'grid', // 'grid' or 'list'
    currentPage: 1,
    itemsPerPage: 9
  },

  init() {
    this.parseUrlParams();
    this.bindHomeQuickSearch();
    this.bindCategoryChips();
    this.bindSearchInput();
    this.bindSidebarFilters();
    this.bindSortDropdown();
    this.bindViewToggle();
    this.applyFilters();
  },

  parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('category')) this.state.category = params.get('category');
    if (params.get('search')) this.state.searchQuery = params.get('search');
    if (params.get('location')) this.state.location = params.get('location');
    if (params.get('type')) this.state.type = params.get('type');
    if (params.get('maxPrice')) this.state.maxPrice = parseInt(params.get('maxPrice')) || 10000000;
  },

  bindHomeQuickSearch() {
    const homeSearchForm = document.getElementById('home-quick-search-form');
    if (!homeSearchForm) return;

    homeSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const industry = document.getElementById('home-search-industry')?.value || '';
      const locEl = document.getElementById('home-search-location');
      const location = locEl?.value.trim() || '';
      const price = document.getElementById('home-search-price')?.value || '';

      if (location && /\d/.test(location)) {
        if (locEl) {
          locEl.classList.add('is-invalid', 'input-shake');
          setTimeout(() => locEl.classList.remove('input-shake'), 400);
          locEl.focus();
        }
        if (window.VanguardApp) {
          window.VanguardApp.showToast('Location cannot contain numbers. Please enter City, State.', 'error');
        }
        return;
      }

      const queryParams = new URLSearchParams();
      if (industry && industry !== 'all') queryParams.set('category', industry);
      if (location) queryParams.set('location', location);
      if (price) queryParams.set('maxPrice', price);

      window.location.href = `buy-a-business.html?${queryParams.toString()}`;
    });
  },

  bindCategoryChips() {
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.state.category = chip.getAttribute('data-category') || 'all';
        this.state.currentPage = 1;
        this.applyFilters();
      });
    });
  },

  bindSearchInput() {
    const searchInputs = document.querySelectorAll('.listing-search-input');
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        this.state.searchQuery = e.target.value.toLowerCase().trim();
        this.state.currentPage = 1;
        this.applyFilters();
      });
    });
  },

  bindSidebarFilters() {
    // Category Select
    const catSelect = document.getElementById('filter-category-select');
    if (catSelect) {
      if (this.state.category !== 'all') catSelect.value = this.state.category;
      catSelect.addEventListener('change', (e) => {
        this.state.category = e.target.value;
        this.state.currentPage = 1;
        this.applyFilters();
      });
    }

    // Location Select
    const locSelect = document.getElementById('filter-location-select');
    if (locSelect) {
      if (this.state.location) locSelect.value = this.state.location;
      locSelect.addEventListener('change', (e) => {
        this.state.location = e.target.value;
        this.state.currentPage = 1;
        this.applyFilters();
      });
    }

    // Type radio buttons
    document.querySelectorAll('input[name="filter-type"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.state.type = e.target.value;
        this.state.currentPage = 1;
        this.applyFilters();
      });
    });

    // Price Slider
    const priceSlider = document.getElementById('filter-price-slider');
    const priceValDisplay = document.getElementById('filter-price-display');
    if (priceSlider && priceValDisplay) {
      if (this.state.maxPrice < 10000000) {
        priceSlider.value = this.state.maxPrice;
        priceValDisplay.textContent = ListingConfig.formatCurrency(this.state.maxPrice);
      }
      priceSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        this.state.maxPrice = val;
        priceValDisplay.textContent = ListingConfig.formatCurrency(val);
        this.state.currentPage = 1;
        this.applyFilters();
      });
    }

    // Verified Only Checkbox
    const verifiedCheck = document.getElementById('filter-verified-only');
    if (verifiedCheck) {
      verifiedCheck.addEventListener('change', (e) => {
        this.state.verifiedOnly = e.target.checked;
        this.state.currentPage = 1;
        this.applyFilters();
      });
    }

    // Reset Filters Button
    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.resetFilters();
      });
    }
  },

  resetFilters() {
    this.state = {
      category: 'all',
      searchQuery: '',
      location: '',
      minPrice: 0,
      maxPrice: 10000000,
      minRevenue: 0,
      minProfit: 0,
      type: 'all',
      verifiedOnly: false,
      sortBy: 'newest',
      viewMode: this.state.viewMode,
      currentPage: 1,
      itemsPerPage: 9
    };

    // Reset UI controls
    document.querySelectorAll('.filter-chip').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-category') === 'all');
    });
    document.querySelectorAll('.listing-search-input').forEach(i => i.value = '');
    const catSelect = document.getElementById('filter-category-select');
    if (catSelect) catSelect.value = 'all';
    const locSelect = document.getElementById('filter-location-select');
    if (locSelect) locSelect.value = '';
    const priceSlider = document.getElementById('filter-price-slider');
    const priceDisplay = document.getElementById('filter-price-display');
    if (priceSlider) priceSlider.value = 5000000;
    if (priceDisplay) priceDisplay.textContent = '$5,000,000';
    const verifiedCheck = document.getElementById('filter-verified-only');
    if (verifiedCheck) verifiedCheck.checked = false;
    const allTypeRadio = document.querySelector('input[name="filter-type"][value="all"]');
    if (allTypeRadio) allTypeRadio.checked = true;

    this.applyFilters();
    if (window.VanguardApp) window.VanguardApp.showToast('All filters have been reset', 'info');
  },

  bindSortDropdown() {
    const sortSelect = document.getElementById('listing-sort-select');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', (e) => {
      this.state.sortBy = e.target.value;
      this.applyFilters();
    });
  },

  bindViewToggle() {
    const gridBtn = document.getElementById('btn-view-grid');
    const listBtn = document.getElementById('btn-view-list');
    const container = document.getElementById('listings-results-container');

    if (!gridBtn || !listBtn || !container) return;

    gridBtn.addEventListener('click', () => {
      this.state.viewMode = 'grid';
      gridBtn.classList.add('bg-emerald-500/20', 'text-emerald-400');
      gridBtn.classList.remove('text-slate-400');
      listBtn.classList.remove('bg-emerald-500/20', 'text-emerald-400');
      listBtn.classList.add('text-slate-400');
      container.classList.remove('listings-list-layout');
      container.classList.add('listings-grid-layout');
      this.renderCurrentListings();
    });

    listBtn.addEventListener('click', () => {
      this.state.viewMode = 'list';
      listBtn.classList.add('bg-emerald-500/20', 'text-emerald-400');
      listBtn.classList.remove('text-slate-400');
      gridBtn.classList.remove('bg-emerald-500/20', 'text-emerald-400');
      gridBtn.classList.add('text-slate-400');
      container.classList.remove('listings-grid-layout');
      container.classList.add('listings-list-layout');
      this.renderCurrentListings();
    });
  },

  applyFilters() {
    if (typeof businessListingsData === 'undefined') return;

    let filtered = businessListingsData.filter(item => {
      // Category
      if (this.state.category !== 'all' && item.category.toLowerCase() !== this.state.category.toLowerCase()) {
        return false;
      }
      // Search query (matches title, location, category, or ID)
      if (this.state.searchQuery) {
        const q = this.state.searchQuery;
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        const matchId = item.id.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        if (!matchTitle && !matchLoc && !matchId && !matchCat) return false;
      }
      // Location
      if (this.state.location && !item.location.toLowerCase().includes(this.state.location.toLowerCase())) {
        return false;
      }
      // Max Price
      if (item.askingPrice > this.state.maxPrice) {
        return false;
      }
      // Business Type
      if (this.state.type !== 'all' && item.type.toLowerCase() !== this.state.type.toLowerCase()) {
        return false;
      }
      // Verified Only
      if (this.state.verifiedOnly && (!item.badges || !item.badges.includes('Verified'))) {
        return false;
      }
      return true;
    });

    // Sort
    switch (this.state.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.askingPrice - b.askingPrice);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.askingPrice - a.askingPrice);
        break;
      case 'revenue-desc':
        filtered.sort((a, b) => b.annualRevenue - a.annualRevenue);
        break;
      case 'profit-desc':
        filtered.sort((a, b) => b.netProfit - a.netProfit);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    this.filteredData = filtered;
    this.renderCurrentListings();
  },

  renderCurrentListings() {
    const container = document.getElementById('listings-results-container');
    const countDisplay = document.getElementById('results-count-display');
    if (!container) return;

    const total = this.filteredData.length;
    if (countDisplay) {
      countDisplay.textContent = `Showing ${Math.min(total, this.state.currentPage * this.state.itemsPerPage)} of ${total} businesses`;
    }

    if (total === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <div class="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4 text-emerald-400 text-3xl">
            <i class="bi bi-search"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">No Matching Businesses Found</h3>
          <p class="text-slate-400 max-w-md mx-auto mb-6">We couldn't find any listings matching your specific filter parameters. Try adjusting your price range or resetting filters.</p>
          <button type="button" class="btn btn-outline" onclick="FilterManager.resetFilters()">
            <i class="bi bi-arrow-counterclockwise"></i> Reset All Filters
          </button>
        </div>
      `;
      this.renderPagination(0);
      return;
    }

    // Pagination slice
    const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
    const paginatedItems = this.filteredData.slice(startIndex, startIndex + this.state.itemsPerPage);

    container.innerHTML = paginatedItems.map(item => this.createListingCardHtml(item)).join('');

    // Re-bind click events for heart favorites and view details
    const app = window.VanguardApp || (typeof VanguardApp !== 'undefined' ? VanguardApp : null);
    if (app && typeof app.bindListingInteractions === 'function') {
      app.bindListingInteractions();
    }

    this.renderPagination(total);
  },

  createListingCardHtml(item) {
    const app = window.VanguardApp || (typeof VanguardApp !== 'undefined' ? VanguardApp : null);
    const isSaved = app ? app.isFavorite(item.id) : false;
    const isList = this.state.viewMode === 'list';

    if (isList) {
      return `
        <div class="card-brokerage col-span-full p-4 md:p-6 mb-4 flex-col lg:flex-row gap-6 items-stretch">
          <div class="w-full lg:w-72 shrink-0 h-52 relative rounded-xl overflow-hidden bg-slate-800">
            <img src="${item.images[0]}" alt="${item.title}" class="w-full h-full object-cover" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';">
            <button class="btn-save-listing absolute top-4 left-4 start-4 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:text-rose-400 transition-colors" data-id="${item.id}" onclick="if(window.VanguardApp) window.VanguardApp.toggleFavorite('${item.id}')" aria-label="Save listing">
              <i class="bi ${isSaved ? 'bi-heart-fill text-rose-500' : 'bi-heart'}"></i>
            </button>
          </div>
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap items-center gap-1.5 mb-2.5">
                <span class="badge-type">${item.type}</span>
                ${item.badges?.includes('Verified') ? '<span class="badge-verified"><i class="bi bi-patch-check-fill"></i> Verified</span>' : ''}
                ${item.badges?.includes('New') ? '<span class="badge-type text-amber-300 border-amber-500/40">New</span>' : ''}
              </div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">${item.category} • ID: ${item.id}</span>
                <span class="text-xs text-slate-400"><i class="bi bi-geo-alt"></i> ${item.location}</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">${item.title}</h3>
              <p class="text-sm text-slate-400 line-clamp-2 mb-4">${item.description}</p>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-y border-white/10 my-3">
              <div>
                <span class="text-xs text-slate-400 block font-medium">Asking Price</span>
                <strong class="text-lg font-bold text-white num-tabular">${ListingConfig.formatCurrency(item.askingPrice)}</strong>
              </div>
              <div>
                <span class="text-xs text-slate-400 block font-medium">Annual Revenue</span>
                <span class="text-sm font-semibold text-slate-200 num-tabular">${ListingConfig.formatCurrency(item.annualRevenue)}</span>
              </div>
              <div>
                <span class="text-xs text-slate-400 block font-medium">Net Cash Flow</span>
                <span class="text-sm font-semibold text-emerald-400 num-tabular">${ListingConfig.formatCurrency(item.netProfit)}</span>
              </div>
              <div>
                <span class="text-xs text-slate-400 block font-medium">Established</span>
                <span class="text-sm font-semibold text-slate-200">${item.yearEstablished} (${item.employees} staff)</span>
              </div>
            </div>
            <div class="flex items-center justify-end gap-3 pt-2">
              <button type="button" class="btn btn-outline btn-sm btn-view-details" data-id="${item.id}" onclick="if(window.VanguardApp) window.VanguardApp.openListingDetailsModal('${item.id}')">
                View Details <i class="bi bi-arrow-right"></i>
              </button>
              <a href="contact.html?listing=${item.id}&title=${encodeURIComponent(item.title)}" class="btn btn-primary btn-sm">
                Enquire <i class="bi bi-chat-text"></i>
              </a>
            </div>
          </div>
        </div>
      `;
    }

    // Grid View
    return `
      <div class="card-brokerage h-full flex flex-col">
        <div class="card-image-wrap w-full h-[210px] overflow-hidden bg-slate-800 relative flex-shrink-0">
          <img src="${item.images[0]}" alt="${item.title}" class="w-full h-full object-cover" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';">
          <button class="btn-save-listing absolute top-4 left-4 start-4 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:text-rose-400 transition-colors z-10" data-id="${item.id}" onclick="if(window.VanguardApp) window.VanguardApp.toggleFavorite('${item.id}')" aria-label="Save listing">
            <i class="bi ${isSaved ? 'bi-heart-fill text-rose-500' : 'bi-heart'}"></i>
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
            <button type="button" class="btn btn-outline btn-sm flex-1 btn-view-details" data-id="${item.id}" onclick="if(window.VanguardApp) window.VanguardApp.openListingDetailsModal('${item.id}')">
              View Details <i class="bi bi-arrow-right"></i>
            </button>
            <a href="contact.html?listing=${item.id}&title=${encodeURIComponent(item.title)}" class="btn btn-primary btn-sm flex-1">
              Enquire <i class="bi bi-chat-text"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  },

  renderPagination(totalItems) {
    const container = document.getElementById('pagination-container');
    if (!container) return;

    const totalPages = Math.ceil(totalItems / this.state.itemsPerPage);
    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    let html = `
      <div class="flex items-center justify-center gap-2 pt-8">
        <button class="btn btn-outline btn-sm ${this.state.currentPage === 1 ? 'opacity-40 cursor-not-allowed' : ''}" 
          ${this.state.currentPage === 1 ? 'disabled' : ''} onclick="FilterManager.goToPage(${this.state.currentPage - 1})">
          <i class="bi bi-chevron-left"></i> Prev
        </button>
    `;

    for (let p = 1; p <= totalPages; p++) {
      html += `
        <button class="w-10 h-10 rounded-xl font-bold text-sm border transition-all ${
          p === this.state.currentPage 
            ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/25' 
            : 'border-white/10 text-slate-300 hover:border-emerald-500/50 hover:bg-slate-800'
        }" onclick="FilterManager.goToPage(${p})">
          ${p}
        </button>
      `;
    }

    html += `
        <button class="btn btn-outline btn-sm ${this.state.currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : ''}" 
          ${this.state.currentPage === totalPages ? 'disabled' : ''} onclick="FilterManager.goToPage(${this.state.currentPage + 1})">
          Next <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    `;

    container.innerHTML = html;
  },

  goToPage(pageNum) {
    this.state.currentPage = pageNum;
    this.renderCurrentListings();
    document.getElementById('listings-results-container')?.scrollIntoView({ behavior: 'smooth' });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  FilterManager.init();
});
