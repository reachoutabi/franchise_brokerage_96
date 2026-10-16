/**
 * VANGUARD BUSINESS BROKERS & FRANCHISE ADVISORS
 * Interactive Forms & Valuation Estimator (forms.js)
 */

const FormManager = {
  init() {
    this.setupInputSanitizers();
    this.initValuationEstimator();
    this.initMultiStepSellerForm();
    this.initContactForm();
    this.initConsultationModalForm();
    this.initNdaRequestForm();
    this.initBuyerRequirementsForm();
    this.initNewsletterForms();
  },

  // ==========================================================================
  // DATA TYPE VALIDATORS & ERROR UTILITIES
  // ==========================================================================
  validators: {
    // Legal Name: letters, spaces, hyphens, periods, apostrophes only. No digits!
    name(val) {
      if (!val || typeof val !== 'string') return { valid: false, message: 'Please enter a full legal name.' };
      const trimmed = val.trim();
      if (trimmed.length < 2) return { valid: false, message: 'Full name must be at least 2 characters.' };
      if (/\d/.test(trimmed)) return { valid: false, message: 'Name cannot contain numbers or digits.' };
      if (!/^[a-zA-Z\s'.-]+$/.test(trimmed)) return { valid: false, message: 'Name can only contain alphabetical letters, spaces, hyphens, and apostrophes.' };
      const letterCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
      if (letterCount < 2) return { valid: false, message: 'Name must contain at least 2 alphabetical letters.' };
      return { valid: true };
    },

    // Email: RFC-compliant standard format
    email(val) {
      if (!val || typeof val !== 'string') return { valid: false, message: 'Please enter a valid email address.' };
      const trimmed = val.trim();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(trimmed)) return { valid: false, message: 'Please enter a valid business email address (e.g. name@company.com).' };
      return { valid: true };
    },

    // Phone: only digits and phone characters. Must have 7 to 15 digits.
    phone(val) {
      if (!val || typeof val !== 'string') return { valid: false, message: 'Please enter a direct mobile phone number.' };
      const trimmed = val.trim();
      if (/[a-zA-Z]/.test(trimmed)) return { valid: false, message: 'Phone number cannot contain alphabetic letters.' };
      const digits = (trimmed.match(/\d/g) || []).join('');
      if (digits.length < 7 || digits.length > 15) return { valid: false, message: 'Please enter a valid phone number with 7 to 15 digits.' };
      return { valid: true };
    },

    // Positive Currency / Number
    positiveNumber(val, fieldName = 'figure', min = 1) {
      if (val === undefined || val === null || val === '') {
        return { valid: false, message: `Please enter a valid ${fieldName}.` };
      }
      const num = Number(val);
      if (isNaN(num)) return { valid: false, message: `${fieldName} must be a valid number.` };
      if (num < min) return { valid: false, message: `${fieldName} must be greater than or equal to $${min}.` };
      return { valid: true };
    },

    // Optional Positive Currency / Number
    optionalNumber(val, fieldName = 'figure', min = 0) {
      if (!val || val.toString().trim() === '') return { valid: true };
      const num = Number(val);
      if (isNaN(num)) return { valid: false, message: `${fieldName} must be a valid number.` };
      if (num < min) return { valid: false, message: `${fieldName} cannot be negative.` };
      return { valid: true };
    },

    // Location: letters, spaces, commas, periods, hyphens. No digits!
    location(val) {
      if (!val || typeof val !== 'string') return { valid: false, message: 'Please enter a location (City, State).' };
      const trimmed = val.trim();
      if (/\d/.test(trimmed)) return { valid: false, message: 'Location cannot contain numbers. Please enter City, State.' };
      if (trimmed.length < 2) return { valid: false, message: 'Location must be at least 2 characters.' };
      if (!/^[a-zA-Z\s,.'-]+$/.test(trimmed)) return { valid: false, message: 'Location can only contain letters, spaces, commas, and hyphens (e.g. Austin, TX).' };
      return { valid: true };
    },

    // Future Date: must be today or future date
    futureDate(val) {
      if (!val) return { valid: false, message: 'Please select a preferred consultation date.' };
      const selected = new Date(val + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(selected.getTime())) return { valid: false, message: 'Please select a valid calendar date.' };
      if (selected < today) return { valid: false, message: 'Consultation date cannot be in the past. Please select today or a future date.' };
      return { valid: true };
    }
  },

  markInvalid(el, message) {
    if (!el) return;
    el.classList.add('is-invalid', 'input-shake');
    setTimeout(() => el.classList.remove('input-shake'), 400);
    el.focus();
    if (window.VanguardApp) {
      window.VanguardApp.showToast(message, 'error');
    }
    const clearHandler = () => {
      el.classList.remove('is-invalid');
      el.removeEventListener('input', clearHandler);
      el.removeEventListener('change', clearHandler);
    };
    el.addEventListener('input', clearHandler);
    el.addEventListener('change', clearHandler);
  },

  clearInvalid(el) {
    if (el) el.classList.remove('is-invalid');
  },

  setupInputSanitizers() {
    // 1. Name inputs: strictly forbid digits in real-time
    const nameSelectors = [
      '#contact-name',
      '#seller-owner-name',
      '#consult-name',
      '#nda-name',
      '#buyer-req-name',
      'input[data-type="name"]'
    ].join(', ');

    document.querySelectorAll(nameSelectors).forEach(input => {
      input.setAttribute('autocomplete', 'name');
      input.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(e.key)) return;
        if (/^[0-9]$/.test(e.key)) {
          e.preventDefault();
          if (window.VanguardApp) window.VanguardApp.showToast('Names cannot contain numbers. Please type letters only.', 'info');
        }
      });

      input.addEventListener('input', (e) => {
        const cleaned = e.target.value.replace(/[^a-zA-Z\s'.-]/g, '');
        if (e.target.value !== cleaned) {
          e.target.value = cleaned;
        }
      });
    });

    // 2. Email inputs: strictly forbid spaces in real-time
    const emailSelectors = [
      '#contact-email',
      '#seller-owner-email',
      '#consult-email',
      '#nda-email',
      '#buyer-req-email',
      'input[type="email"]'
    ].join(', ');

    document.querySelectorAll(emailSelectors).forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
        }
      });
      input.addEventListener('input', (e) => {
        const cleaned = e.target.value.replace(/\s+/g, '');
        if (e.target.value !== cleaned) {
          e.target.value = cleaned;
        }
      });
    });

    // 3. Phone inputs: strictly forbid letters in real-time
    const phoneSelectors = [
      '#contact-phone',
      '#seller-owner-phone',
      '#consult-phone',
      '#nda-phone',
      '#buyer-req-phone',
      'input[type="tel"]'
    ].join(', ');

    document.querySelectorAll(phoneSelectors).forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(e.key)) return;
        if (/^[a-zA-Z]$/.test(e.key)) {
          e.preventDefault();
          if (window.VanguardApp) window.VanguardApp.showToast('Phone number cannot contain letters. Please enter numbers.', 'info');
        }
      });

      input.addEventListener('input', (e) => {
        const cleaned = e.target.value.replace(/[^0-9+\-()\s.]/g, '');
        if (e.target.value !== cleaned) {
          e.target.value = cleaned;
        }
      });
    });

    // 4. Financial and integer numeric inputs: block exponent 'e', '-', '+'
    const numericSelectors = [
      '#seller-revenue',
      '#seller-profit',
      '#seller-asking-price',
      '#seller-years',
      '#seller-employees',
      '#calc-revenue',
      '#calc-profit',
      '#calc-years',
      'input[data-type="currency"]',
      'input[data-type="positive-number"]'
    ].join(', ');

    document.querySelectorAll(numericSelectors).forEach(input => {
      input.setAttribute('min', '0');
      input.addEventListener('keydown', (e) => {
        if (['e', 'E', '+', '-'].includes(e.key)) {
          e.preventDefault();
        }
      });
      input.addEventListener('input', (e) => {
        if (e.target.value && Number(e.target.value) < 0) {
          e.target.value = Math.abs(Number(e.target.value));
        }
      });
    });

    // 5. Location inputs: forbid digits in real-time
    const locationSelectors = [
      '#home-search-location',
      '#seller-location',
      '#franchise-finder-territory',
      '#buyer-req-location',
      'input[data-type="location"]'
    ].join(', ');

    document.querySelectorAll(locationSelectors).forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(e.key)) return;
        if (/^[0-9]$/.test(e.key)) {
          e.preventDefault();
          if (window.VanguardApp) window.VanguardApp.showToast('Location cannot contain numbers. Please enter City, State.', 'info');
        }
      });
      input.addEventListener('input', (e) => {
        const cleaned = e.target.value.replace(/[0-9]/g, '');
        if (e.target.value !== cleaned) {
          e.target.value = cleaned;
        }
      });
    });

    // 6. Date inputs: set minimum to today
    const todayStr = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"], #consult-date').forEach(input => {
      input.setAttribute('min', todayStr);
    });
  },

  // ==========================================================================
  // 1. BUSINESS VALUATION ESTIMATOR (sell-your-business.html)
  // ==========================================================================
  initValuationEstimator() {
    const calcBtn = document.getElementById('btn-calc-valuation');
    if (!calcBtn) return;

    calcBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const revInput = document.getElementById('calc-revenue');
      const profInput = document.getElementById('calc-profit');
      const yearsInput = document.getElementById('calc-years');
      const industry = document.getElementById('calc-industry')?.value || 'services';
      const growth = document.getElementById('calc-growth')?.value || 'moderate';

      const revVal = revInput?.value ? parseFloat(revInput.value) : 0;
      const profVal = profInput?.value ? parseFloat(profInput.value) : 0;
      const yearsVal = yearsInput?.value ? parseInt(yearsInput.value) : 3;

      if (!revVal || revVal <= 0) {
        this.markInvalid(revInput, 'Please enter an annual gross revenue greater than $0.');
        return;
      }

      if (!profVal || profVal <= 0) {
        this.markInvalid(profInput, 'Please enter an annual net profit / cash flow greater than $0.');
        return;
      }

      if (profVal > revVal) {
        this.markInvalid(profInput, 'Annual net profit cannot exceed annual gross revenue.');
        return;
      }

      const revenue = revVal;
      const profit = profVal;
      const years = yearsVal;

      // Base multiples by sector
      const sectorMultiples = {
        'services': { low: 3.5, high: 4.8 },
        'manufacturing': { low: 4.2, high: 6.2 },
        'food': { low: 2.6, high: 3.8 },
        'retail': { low: 2.4, high: 3.5 },
        'health': { low: 3.8, high: 5.5 },
        'automotive': { low: 3.0, high: 4.4 },
        'ecommerce': { low: 2.8, high: 4.0 },
        'education': { low: 3.2, high: 4.6 }
      };

      const mult = sectorMultiples[industry] || sectorMultiples['services'];
      let lowMult = mult.low;
      let highMult = mult.high;

      // Adjust for growth trend
      if (growth === 'high') {
        lowMult *= 1.15;
        highMult *= 1.20;
      } else if (growth === 'declining') {
        lowMult *= 0.85;
        highMult *= 0.85;
      }

      // Adjust for longevity
      if (years >= 10) {
        lowMult *= 1.10;
        highMult *= 1.10;
      }

      const lowValuation = Math.round(profit * lowMult);
      const highValuation = Math.round(profit * highMult);

      const resultCard = document.getElementById('valuation-result-card');
      const lowValEl = document.getElementById('calc-res-low');
      const highValEl = document.getElementById('calc-res-high');
      const multipleEl = document.getElementById('calc-res-multiple');

      if (lowValEl) lowValEl.textContent = ListingConfig.formatCurrency(lowValuation);
      if (highValEl) highValEl.textContent = ListingConfig.formatCurrency(highValuation);
      if (multipleEl) multipleEl.textContent = `${lowMult.toFixed(1)}x – ${highMult.toFixed(1)}x SDE`;

      if (resultCard) {
        resultCard.classList.remove('hidden');
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      if (window.VanguardApp) {
        window.VanguardApp.showToast('Valuation estimate generated successfully', 'success');
      }

      // Store in memory for seller form pre-population
      window.lastCalculatedValuation = {
        revenue,
        profit,
        industry,
        years,
        lowValuation,
        highValuation,
        midValuation: Math.round((lowValuation + highValuation) / 2)
      };
    });

    // Button to pre-fill seller form from calculated valuation
    const applyToSellerBtn = document.getElementById('btn-apply-valuation-to-form');
    if (applyToSellerBtn) {
      applyToSellerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const sellerForm = document.getElementById('seller-multistep-form');
        if (sellerForm && window.lastCalculatedValuation) {
          const revInput = document.getElementById('seller-revenue');
          const profInput = document.getElementById('seller-profit');
          const askInput = document.getElementById('seller-asking-price');
          const indInput = document.getElementById('seller-industry');
          const yearsInput = document.getElementById('seller-years');

          if (revInput) revInput.value = window.lastCalculatedValuation.revenue;
          if (profInput) profInput.value = window.lastCalculatedValuation.profit;
          if (askInput) askInput.value = window.lastCalculatedValuation.midValuation;
          if (indInput) indInput.value = window.lastCalculatedValuation.industry;
          if (yearsInput) yearsInput.value = window.lastCalculatedValuation.years;

          sellerForm.scrollIntoView({ behavior: 'smooth' });
          if (window.VanguardApp) window.VanguardApp.showToast('Valuation figures pre-filled into listing form', 'info');
        }
      });
    }
  },

  // ==========================================================================
  // 2. MULTI-STEP SELLER FORM (sell-your-business.html)
  // ==========================================================================
  initMultiStepSellerForm() {
    const form = document.getElementById('seller-multistep-form');
    if (!form) return;

    let currentStep = 1;
    let maxStepReached = 1;
    const totalSteps = 4;

    const updateStepUI = (step, direction = 'forward') => {
      if (step > maxStepReached) {
        maxStepReached = step;
      }

      // Show/hide step contents with smooth slide & fade animation
      document.querySelectorAll('.seller-step-content').forEach(el => {
        const stepNum = parseInt(el.getAttribute('data-step'));
        if (stepNum === step) {
          el.classList.remove('hidden');
          el.classList.remove('step-animate-forward', 'step-animate-backward');
          // Force layout reflow to restart CSS animation reliably
          void el.offsetWidth;
          el.classList.add(direction === 'backward' ? 'step-animate-backward' : 'step-animate-forward');
        } else {
          el.classList.add('hidden');
          el.classList.remove('step-animate-forward', 'step-animate-backward');
        }
      });

      // Update animated connecting track progress bar
      const progressFill = document.getElementById('stepper-progress-fill');
      if (progressFill) {
        const percent = ((step - 1) / (totalSteps - 1)) * 100;
        progressFill.style.width = `${percent}%`;
      }

      // Update stepper header indicators with pop and check animations
      document.querySelectorAll('.step-item').forEach(item => {
        const stepNum = parseInt(item.getAttribute('data-step-target'));
        const numberEl = item.querySelector('.step-number');
        item.classList.remove('active', 'completed');

        if (stepNum === step) {
          item.classList.add('active');
          if (numberEl) numberEl.innerHTML = stepNum;
        } else if (stepNum < step) {
          item.classList.add('completed');
          if (numberEl) numberEl.innerHTML = '<i class="bi bi-check-lg"></i>';
        } else {
          if (numberEl) numberEl.innerHTML = stepNum;
        }

        if (stepNum <= maxStepReached) {
          item.classList.add('cursor-pointer');
        } else {
          item.classList.remove('cursor-pointer');
        }
      });

      // Step 4 is Review: build summary preview
      if (step === 4) {
        this.renderSellerReviewSummary();
      }
    };

    // Allow clicking on visited step indicators in header to navigate smoothly
    document.querySelectorAll('.step-item').forEach(item => {
      item.addEventListener('click', () => {
        const targetStep = parseInt(item.getAttribute('data-step-target'));
        if (targetStep && targetStep !== currentStep && targetStep <= maxStepReached) {
          const dir = targetStep > currentStep ? 'forward' : 'backward';
          currentStep = targetStep;
          updateStepUI(currentStep, dir);
        }
      });
    });

    // Step 1 -> 2: Validate Contact Details
    document.getElementById('seller-next-1')?.addEventListener('click', () => {
      const nameEl = document.getElementById('seller-owner-name');
      const emailEl = document.getElementById('seller-owner-email');
      const phoneEl = document.getElementById('seller-owner-phone');

      const nameCheck = this.validators.name(nameEl?.value);
      if (!nameCheck.valid) {
        this.markInvalid(nameEl, nameCheck.message);
        return;
      }

      const emailCheck = this.validators.email(emailEl?.value);
      if (!emailCheck.valid) {
        this.markInvalid(emailEl, emailCheck.message);
        return;
      }

      const phoneCheck = this.validators.phone(phoneEl?.value);
      if (!phoneCheck.valid) {
        this.markInvalid(phoneEl, phoneCheck.message);
        return;
      }

      currentStep = 2;
      updateStepUI(currentStep, 'forward');
    });

    // Step 2 -> 3: Validate Business Profile & Location
    document.getElementById('seller-next-2')?.addEventListener('click', () => {
      const bizNameEl = document.getElementById('seller-biz-name');
      const locEl = document.getElementById('seller-location');
      const yearsEl = document.getElementById('seller-years');
      const employeesEl = document.getElementById('seller-employees');

      if (!bizNameEl?.value || bizNameEl.value.trim().length < 2) {
        this.markInvalid(bizNameEl, 'Please provide your operating business entity name (at least 2 characters).');
        return;
      }

      const locCheck = this.validators.location(locEl?.value);
      if (!locCheck.valid) {
        this.markInvalid(locEl, locCheck.message);
        return;
      }

      if (yearsEl?.value) {
        const yearsCheck = this.validators.optionalNumber(yearsEl.value, 'Years Established', 0);
        if (!yearsCheck.valid) {
          this.markInvalid(yearsEl, yearsCheck.message);
          return;
        }
      }

      if (employeesEl?.value) {
        const empCheck = this.validators.optionalNumber(employeesEl.value, 'Total Full-Time Staff', 0);
        if (!empCheck.valid) {
          this.markInvalid(employeesEl, empCheck.message);
          return;
        }
      }

      currentStep = 3;
      updateStepUI(currentStep, 'forward');
    });

    // Step 2 Back
    document.getElementById('seller-back-2')?.addEventListener('click', () => {
      currentStep = 1;
      updateStepUI(currentStep, 'backward');
    });

    // Step 3 -> 4: Validate Financial Performance Figures
    document.getElementById('seller-next-3')?.addEventListener('click', () => {
      const revEl = document.getElementById('seller-revenue');
      const profEl = document.getElementById('seller-profit');
      const askEl = document.getElementById('seller-asking-price');

      const revCheck = this.validators.positiveNumber(revEl?.value, 'Annual Gross Revenue', 1);
      if (!revCheck.valid) {
        this.markInvalid(revEl, revCheck.message);
        return;
      }

      const profCheck = this.validators.positiveNumber(profEl?.value, 'Annual Net Cash Flow / SDE', 1);
      if (!profCheck.valid) {
        this.markInvalid(profEl, profCheck.message);
        return;
      }

      if (Number(profEl.value) > Number(revEl.value)) {
        this.markInvalid(profEl, 'Annual Net Cash Flow / SDE cannot exceed Annual Gross Revenue.');
        return;
      }

      if (askEl?.value && askEl.value.trim() !== '') {
        const askCheck = this.validators.positiveNumber(askEl.value, 'Target Asking Price', 1);
        if (!askCheck.valid) {
          this.markInvalid(askEl, askCheck.message);
          return;
        }
      }

      currentStep = 4;
      updateStepUI(currentStep, 'forward');
    });

    // Step 3 Back
    document.getElementById('seller-back-3')?.addEventListener('click', () => {
      currentStep = 2;
      updateStepUI(currentStep, 'backward');
    });

    // Step 4 Back
    document.getElementById('seller-back-4')?.addEventListener('click', () => {
      currentStep = 3;
      updateStepUI(currentStep, 'backward');
    });

    // Final Form Submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('seller-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="bi bi-arrow-repeat animate-spin"></i> Submitting Valuation Request...`;
      }

      setTimeout(() => {
        const refId = 'SELL-' + Math.floor(1000 + Math.random() * 9000);
        const submission = {
          refId,
          submittedAt: new Date().toISOString(),
          ownerName: document.getElementById('seller-owner-name')?.value,
          email: document.getElementById('seller-owner-email')?.value,
          phone: document.getElementById('seller-owner-phone')?.value,
          businessName: document.getElementById('seller-biz-name')?.value,
          industry: document.getElementById('seller-industry')?.value,
          location: document.getElementById('seller-location')?.value,
          revenue: document.getElementById('seller-revenue')?.value,
          netProfit: document.getElementById('seller-profit')?.value,
          askingPrice: document.getElementById('seller-asking-price')?.value,
          reason: document.getElementById('seller-reason')?.value
        };

        const existing = JSON.parse(localStorage.getItem('vanguard_seller_submissions') || '[]');
        existing.push(submission);
        localStorage.setItem('vanguard_seller_submissions', JSON.stringify(existing));

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Submit for Confidential Evaluation <i class="bi bi-check2-circle"></i>`;
        }

        // Show Confirmation Modal
        this.showConfirmationModal({
          title: 'Business Listing Submission Received',
          refId: refId,
          message: `Thank you, ${submission.ownerName}. Your confidential business profile has been securely transmitted to our senior M&A valuation practice under reference ID ${refId}. A senior managing broker will contact you within 24 business hours.`
        });

        // Reset form
        form.reset();
        currentStep = 1;
        updateStepUI(1);

        if (window.VanguardApp) window.VanguardApp.showToast(`Listing submitted successfully! Ref: ${refId}`, 'success');
      }, 1000);
    });
  },

  renderSellerReviewSummary() {
    const summaryEl = document.getElementById('seller-review-summary');
    if (!summaryEl) return;

    const name = document.getElementById('seller-owner-name')?.value || 'N/A';
    const email = document.getElementById('seller-owner-email')?.value || 'N/A';
    const phone = document.getElementById('seller-owner-phone')?.value || 'N/A';
    const biz = document.getElementById('seller-biz-name')?.value || 'N/A';
    const ind = document.getElementById('seller-industry')?.value || 'N/A';
    const loc = document.getElementById('seller-location')?.value || 'N/A';
    const rev = document.getElementById('seller-revenue')?.value || '0';
    const prof = document.getElementById('seller-profit')?.value || '0';
    const ask = document.getElementById('seller-asking-price')?.value || 'To be determined';

    summaryEl.innerHTML = `
      <div class="space-y-4 text-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-white/10">
          <div><span class="text-slate-400 block text-xs uppercase font-bold">Owner:</span> <strong class="text-white">${name}</strong></div>
          <div><span class="text-slate-400 block text-xs uppercase font-bold">Direct Contact:</span> <span class="text-emerald-400">${email}</span> • ${phone}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-white/10">
          <div><span class="text-slate-400 block text-xs uppercase font-bold">Business Name:</span> <strong class="text-white">${biz}</strong></div>
          <div><span class="text-slate-400 block text-xs uppercase font-bold">Industry & Location:</span> <span class="text-white">${ind}</span> • ${loc}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><span class="text-slate-400 block text-xs uppercase font-bold">Annual Revenue:</span> <span class="text-emerald-400 font-bold">${ListingConfig.formatCurrency(rev)}</span></div>
          <div><span class="text-slate-400 block text-xs uppercase font-bold">Net Profit / SDE:</span> <span class="text-emerald-400 font-bold">${ListingConfig.formatCurrency(prof)}</span></div>
          <div><span class="text-slate-400 block text-xs uppercase font-bold">Target Asking Price:</span> <span class="text-white font-bold">${isNaN(ask) ? ask : ListingConfig.formatCurrency(ask)}</span></div>
        </div>
      </div>
    `;
  },

  // ==========================================================================
  // 3. CONTACT FORM WITH PRE-FILL SUPPORT (contact.html)
  // ==========================================================================
  initContactForm() {
    const contactForm = document.getElementById('general-contact-form');
    if (!contactForm) return;

    // Check URL parameters for prefill: ?listing=BB-1042&title=... or ?interest=Due%20Diligence
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('listing');
    const listingTitle = urlParams.get('title');
    const interest = urlParams.get('interest');
    const brand = urlParams.get('brand');

    const topicSelect = document.getElementById('contact-interest');
    const messageArea = document.getElementById('contact-message');

    if (listingId || listingTitle) {
      if (topicSelect) topicSelect.value = 'Buying a Business';
      if (messageArea) {
        messageArea.value = `Hello Vanguard Brokerage Team,\n\nI am inquiring regarding listing ID ${listingId || ''}${listingTitle ? ' - ' + listingTitle : ''}. Please provide preliminary executive overview documentation and execution instructions for the confidential NDA.`;
      }
      if (window.VanguardApp) {
        window.VanguardApp.showToast(`Listing ${listingId || ''} pre-filled into enquiry form`, 'info');
      }
    } else if (interest) {
      if (topicSelect) {
        const decoded = decodeURIComponent(interest).toLowerCase();
        for (const opt of topicSelect.options) {
          const val = opt.value.toLowerCase();
          if (val === decoded || val.includes(decoded) || decoded.includes(val)) {
            topicSelect.value = opt.value;
            break;
          }
        }
      }
      if (messageArea && !messageArea.value) {
        const lower = interest.toLowerCase();
        if (lower.includes('due') || lower.includes('data')) {
          messageArea.value = `Hello Vanguard Team,\n\nI am requesting information regarding confidential Virtual Data Room (VDR) hosting and due diligence coordination services for M&A transactions. Please share details on audit preparation and access controls.`;
        } else if (lower.includes('advisor') || lower.includes('consult')) {
          messageArea.value = `Hello Vanguard Team,\n\nI would like to schedule a confidential advisory consultation with a senior managing broker regarding transaction advisory and exit strategy.`;
        } else if (lower.includes('closing') || lower.includes('escrow')) {
          messageArea.value = `Hello Vanguard Team,\n\nI would like to speak directly with an advisor regarding closing coordination, attorney escrow management, and transaction execution.`;
        } else if (lower.includes('franchise')) {
          messageArea.value = `Hello Vanguard Team,\n\nI am interested in franchise advisory${brand ? ' regarding ' + decodeURIComponent(brand) : ''}. Please provide details on expansion criteria and investment requirements.`;
        } else {
          messageArea.value = `Hello Vanguard Team,\n\nI am reaching out regarding ${decodeURIComponent(interest)}. Please have a managing advisor contact me.`;
        }
      }
      if (window.VanguardApp) {
        window.VanguardApp.showToast(`Inquiry topic pre-filled: ${decodeURIComponent(interest)}`, 'info');
      }
    }

    // Dynamic budget range visibility
    const interestSelect = document.getElementById('contact-interest');
    const budgetContainer = document.getElementById('contact-budget-wrap');
    if (interestSelect && budgetContainer) {
      interestSelect.addEventListener('change', () => {
        if (interestSelect.value === 'Buying a Business' || interestSelect.value === 'Franchise Consulting') {
          budgetContainer.classList.remove('hidden');
        } else {
          budgetContainer.classList.add('hidden');
        }
      });
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('contact-name');
      const emailEl = document.getElementById('contact-email');
      const phoneEl = document.getElementById('contact-phone');
      const msgEl = document.getElementById('contact-message');
      const consentEl = document.getElementById('contact-consent');

      // 1. Strict Name Validation (letters only, no numbers)
      const nameCheck = this.validators.name(nameEl?.value);
      if (!nameCheck.valid) {
        this.markInvalid(nameEl, nameCheck.message);
        return;
      }

      // 2. Strict Email Validation
      const emailCheck = this.validators.email(emailEl?.value);
      if (!emailCheck.valid) {
        this.markInvalid(emailEl, emailCheck.message);
        return;
      }

      // 3. Strict Phone Validation (no letters, valid digits)
      const phoneCheck = this.validators.phone(phoneEl?.value);
      if (!phoneCheck.valid) {
        this.markInvalid(phoneEl, phoneCheck.message);
        return;
      }

      // 4. Message Validation
      if (!msgEl?.value || msgEl.value.trim().length < 5) {
        this.markInvalid(msgEl, 'Please provide a detailed enquiry or listing reference (at least 5 characters).');
        return;
      }

      // 5. Consent Checkbox
      if (consentEl && !consentEl.checked) {
        this.markInvalid(consentEl, 'Please acknowledge the confidential broker privilege checkbox to proceed.');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="bi bi-arrow-repeat animate-spin"></i> Transmitting...`;

      setTimeout(() => {
        const enqId = 'ENQ-' + Math.floor(1000 + Math.random() * 9000);
        const payload = {
          id: enqId,
          submittedAt: new Date().toISOString(),
          name: nameEl.value.trim(),
          email: emailEl.value.trim(),
          phone: phoneEl.value.trim(),
          interest: document.getElementById('contact-interest')?.value,
          budget: document.getElementById('contact-budget')?.value || 'N/A',
          method: document.getElementById('contact-method')?.value || 'Phone',
          message: msgEl.value.trim()
        };

        const existing = JSON.parse(localStorage.getItem('vanguard_contact_enquiries') || '[]');
        existing.push(payload);
        localStorage.setItem('vanguard_contact_enquiries', JSON.stringify(existing));

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        this.showConfirmationModal({
          title: 'Enquiry Received',
          refId: enqId,
          message: `Thank you, ${payload.name}. Your enquiry [${enqId}] has been routed directly to our Managing Broker desk. You will receive an email confirmation and direct follow-up via your preferred method (${payload.method}).`
        });

        contactForm.reset();
        if (window.VanguardApp) window.VanguardApp.showToast(`Enquiry transmitted successfully! Ref: ${enqId}`, 'success');
      }, 1000);
    });
  },

  // ==========================================================================
  // 4. BOOK A CONSULTATION MODAL FORM
  // ==========================================================================
  initConsultationModalForm() {
    const consultForms = document.querySelectorAll('#modal-consultation-form, #consultation-form');
    if (!consultForms || consultForms.length === 0) return;

    consultForms.forEach(consultForm => {
      consultForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameEl = consultForm.querySelector('#consult-name');
        const emailEl = consultForm.querySelector('#consult-email');
        const phoneEl = consultForm.querySelector('#consult-phone');
        const dateEl = consultForm.querySelector('#consult-date');
        const timeEl = consultForm.querySelector('#consult-time');
        const topicEl = consultForm.querySelector('#consult-topic');
        const advisorEl = consultForm.querySelector('#consult-advisor');

        // 1. Strict Name Validation
        const nameCheck = this.validators.name(nameEl?.value);
        if (!nameCheck.valid) {
          this.markInvalid(nameEl, nameCheck.message);
          return;
        }

        // 2. Strict Email Validation
        const emailCheck = this.validators.email(emailEl?.value);
        if (!emailCheck.valid) {
          this.markInvalid(emailEl, emailCheck.message);
          return;
        }

        // 3. Strict Phone Validation
        const phoneCheck = this.validators.phone(phoneEl?.value);
        if (!phoneCheck.valid) {
          this.markInvalid(phoneEl, phoneCheck.message);
          return;
        }

        // 4. Future Date Validation
        const dateCheck = this.validators.futureDate(dateEl?.value);
        if (!dateCheck.valid) {
          this.markInvalid(dateEl, dateCheck.message);
          return;
        }

        const submitBtn = consultForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Confirm Consultation';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<i class="bi bi-arrow-repeat animate-spin"></i> Scheduling...`;
        }

        setTimeout(() => {
          const bookId = 'CONSULT-' + Math.floor(1000 + Math.random() * 9000);
          const booking = {
            id: bookId,
            name: nameEl.value.trim(),
            email: emailEl.value.trim(),
            phone: phoneEl.value.trim(),
            date: dateEl.value,
            time: timeEl?.value || '09:00 AM - 10:00 AM EST',
            topic: topicEl?.value || 'General Brokerage Advisory',
            advisor: advisorEl?.value || 'First Available Senior Broker'
          };

          const existing = JSON.parse(localStorage.getItem('vanguard_consultations') || '[]');
          existing.push(booking);
          localStorage.setItem('vanguard_consultations', JSON.stringify(existing));

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }

          // Close consultation modal
          const consultModal = document.getElementById('modal-consultation');
          if (consultModal) consultModal.classList.remove('active');

          // Open confirmation
          this.showConfirmationModal({
            title: 'Consultation Confirmed',
            refId: bookId,
            message: `Your private advisory session has been booked for ${booking.date} at ${booking.time} with ${booking.advisor}. An Outlook/Google calendar invite with secure Zoom link has been sent to ${booking.email}.`
          });

          consultForm.reset();
          if (window.VanguardApp) window.VanguardApp.showToast(`Session booked! Ref: ${bookId}`, 'success');
        }, 900);
      });
    });
  },

  // ==========================================================================
  // 5. NDA / FULL DETAILS REQUEST FORM
  // ==========================================================================
  initNdaRequestForm() {
    const ndaForm = document.getElementById('form-request-nda');
    if (!ndaForm) return;

    ndaForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('nda-name');
      const emailEl = document.getElementById('nda-email');
      const phoneEl = document.getElementById('nda-phone');

      const nameCheck = this.validators.name(nameEl?.value);
      if (!nameCheck.valid) {
        this.markInvalid(nameEl, nameCheck.message);
        return;
      }

      const emailCheck = this.validators.email(emailEl?.value);
      if (!emailCheck.valid) {
        this.markInvalid(emailEl, emailCheck.message);
        return;
      }

      const phoneCheck = this.validators.phone(phoneEl?.value);
      if (!phoneCheck.valid) {
        this.markInvalid(phoneEl, phoneCheck.message);
        return;
      }

      const submitBtn = ndaForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="bi bi-arrow-repeat animate-spin"></i> Processing NDA...`;

      setTimeout(() => {
        const ndaId = 'NDA-' + Math.floor(1000 + Math.random() * 9000);
        const listingId = document.getElementById('nda-listing-id')?.value || 'Active Listing';
        const req = {
          id: ndaId,
          listingId,
          name: nameEl.value.trim(),
          email: emailEl.value.trim(),
          phone: phoneEl.value.trim(),
          funds: document.getElementById('nda-funds')?.value,
          submittedAt: new Date().toISOString()
        };

        const existing = JSON.parse(localStorage.getItem('vanguard_nda_requests') || '[]');
        existing.push(req);
        localStorage.setItem('vanguard_nda_requests', JSON.stringify(existing));

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Close details modal
        const detailsModal = document.getElementById('modal-listing-details');
        if (detailsModal) detailsModal.classList.remove('active');

        this.showConfirmationModal({
          title: 'Confidentiality Agreement & CIM Sent',
          refId: ndaId,
          message: `Your NDA request [${ndaId}] for listing ${listingId} is registered. A DocuSign copy and confidential Confidential Information Memorandum (CIM) will be sent to ${req.email} following broker verification.`
        });

        ndaForm.reset();
        if (window.VanguardApp) window.VanguardApp.showToast(`NDA request submitted! Ref: ${ndaId}`, 'success');
      }, 900);
    });
  },

  // ==========================================================================
  // 6. BUYER REQUIREMENTS FORM (buy-a-business.html)
  // ==========================================================================
  initBuyerRequirementsForm() {
    const buyerForm = document.getElementById('form-buyer-requirements');
    if (!buyerForm) return;

    buyerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('buyer-req-name');
      const emailEl = document.getElementById('buyer-req-email');
      const phoneEl = document.getElementById('buyer-req-phone');
      const locEl = document.getElementById('buyer-req-location');

      const nameCheck = this.validators.name(nameEl?.value);
      if (!nameCheck.valid) {
        this.markInvalid(nameEl, nameCheck.message);
        return;
      }

      const emailCheck = this.validators.email(emailEl?.value);
      if (!emailCheck.valid) {
        this.markInvalid(emailEl, emailCheck.message);
        return;
      }

      const phoneCheck = this.validators.phone(phoneEl?.value);
      if (!phoneCheck.valid) {
        this.markInvalid(phoneEl, phoneCheck.message);
        return;
      }

      if (locEl && locEl.value && locEl.value.trim() !== '') {
        const locCheck = this.validators.location(locEl.value);
        if (!locCheck.valid) {
          this.markInvalid(locEl, locCheck.message);
          return;
        }
      }

      const submitBtn = buyerForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="bi bi-arrow-repeat animate-spin"></i> Submitting...`;

      setTimeout(() => {
        const reqId = 'BUYER-' + Math.floor(1000 + Math.random() * 9000);
        const buyerData = {
          id: reqId,
          name: nameEl.value.trim(),
          email: emailEl.value.trim(),
          phone: phoneEl.value.trim(),
          industry: document.getElementById('buyer-req-industry')?.value,
          budget: document.getElementById('buyer-req-budget')?.value,
          location: locEl?.value.trim() || 'Any',
          timeline: document.getElementById('buyer-req-timeline')?.value,
          liquidCapital: document.getElementById('buyer-req-capital')?.value
        };

        const existing = JSON.parse(localStorage.getItem('vanguard_buyer_requirements') || '[]');
        existing.push(buyerData);
        localStorage.setItem('vanguard_buyer_requirements', JSON.stringify(existing));

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        const modal = document.getElementById('modal-buyer-requirements');
        if (modal) modal.classList.remove('active');

        this.showConfirmationModal({
          title: 'Buyer Mandate Registered',
          refId: reqId,
          message: `Your acquisition criteria have been added to our off-market Deal Matching Network under ID ${reqId}. When new vetted opportunities matching your parameters arise, you will receive exclusive 48-hour advance notice.`
        });

        buyerForm.reset();
        if (window.VanguardApp) window.VanguardApp.showToast(`Buyer mandate registered! Ref: ${reqId}`, 'success');
      }, 900);
    });
  },

  // ==========================================================================
  // 7. NEWSLETTER SUBSCRIPTION
  // ==========================================================================
  initNewsletterForms() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = input?.value.trim();

        const emailCheck = this.validators.email(email);
        if (!emailCheck.valid) {
          this.markInvalid(input, emailCheck.message);
          return;
        }

        const list = JSON.parse(localStorage.getItem('vanguard_newsletter') || '[]');
        if (!list.includes(email)) list.push(email);
        localStorage.setItem('vanguard_newsletter', JSON.stringify(list));

        input.value = '';
        if (window.VanguardApp) window.VanguardApp.showToast('Subscribed! You will receive our monthly M&A Deal Digest.', 'success');
      });
    });
  },


  // Helper: Confirmation Modal
  showConfirmationModal({ title, refId, message }) {
    const modal = document.getElementById('modal-confirmation');
    if (!modal) {
      alert(`${title}\nReference ID: ${refId}\n\n${message}`);
      return;
    }

    const titleEl = document.getElementById('confirmation-modal-title');
    const refEl = document.getElementById('confirmation-modal-ref');
    const msgEl = document.getElementById('confirmation-modal-message');

    if (titleEl) titleEl.textContent = title;
    if (refEl) refEl.textContent = `Reference ID: ${refId}`;
    if (msgEl) msgEl.textContent = message;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  FormManager.init();
});
