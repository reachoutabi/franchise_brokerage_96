/**
 * VANGUARD BUSINESS BROKERS & FRANCHISE ADVISORS
 * Central Business Listings Sample Data & Configuration
 */

const ListingConfig = {
  currencySymbol: '$',
  formatCurrency: function (num) {
    if (isNaN(num)) return '$0';
    return this.currencySymbol + Number(num).toLocaleString('en-US');
  }
};

const businessListingsData = [
  {
    id: "BB-1042",
    title: "Gourmet Artisan Coffee & Bakery Franchise",
    category: "Food & Beverage",
    type: "Franchise",
    location: "Austin, TX",
    askingPrice: 850000,
    annualRevenue: 1650000,
    netProfit: 340000,
    yearEstablished: 2017,
    employees: 14,
    reasonForSale: "Owner focusing on out-of-state commercial real estate development",
    badges: ["Verified", "New"],
    highlights: [
      "Prime downtown corner location with drive-thru approval",
      "Consistent 18% YoY net revenue growth since 2021",
      "Fully trained general manager and head baker staying post-sale",
      "Exclusive territorial rights for adjacent submarket included"
    ],
    images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Exceptional turn-key opportunity to acquire a flagship artisan coffee and bakery franchise located in an affluent, rapid-growth lifestyle corridor in Austin. The unit features state-of-the-art Italian roasting and espresso equipment, custom architectural seating, and robust catering and subscription programs.",
    facility: "2,400 sq.ft. leased space with 48 indoor seats and private 30-seat covered patio.",
    leaseTerms: "5 years remaining on primary term with two 5-year extension options.",
    inventoryIncluded: "$38,000 in raw ingredients, branded merchandise, and packaging."
  },
  {
    id: "BB-1043",
    title: "Boutique High-Intensity Fitness Studio",
    category: "Health & Fitness",
    type: "Franchise",
    location: "Scottsdale, AZ",
    askingPrice: 520000,
    annualRevenue: 890000,
    netProfit: 215000,
    yearEstablished: 2019,
    employees: 8,
    reasonForSale: "Partnership dissolution due to retirement of majority stakeholder",
    badges: ["Verified"],
    highlights: [
      "420 active recurring monthly auto-pay memberships",
      "Top 10% performing franchise unit across North America",
      "All top-tier cardio and functional training gear paid off",
      "Established corporate wellness contracts with 6 local employers"
    ],
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Highly rated, community-centered boutique fitness franchise situated in high-income Scottsdale demographic. The studio operates with minimal owner oversight due to seasoned lead trainers and automated CRM systems.",
    facility: "3,100 sq.ft. acoustic-dampened studio with luxury showers and locker suites.",
    leaseTerms: "$9,200/mo triple net, current term extends through 2029.",
    inventoryIncluded: "$110,000 replacement value of commercial exercise equipment included."
  },
  {
    id: "BB-1044",
    title: "Certified Collision & European Auto Repair",
    category: "Automotive",
    type: "Independent",
    location: "Denver, CO",
    askingPrice: 1950000,
    annualRevenue: 3400000,
    netProfit: 620000,
    yearEstablished: 2008,
    employees: 18,
    reasonForSale: "Owner retiring after 35-year automotive career",
    badges: ["Verified", "Confidential"],
    highlights: [
      "OEM certifications for BMW, Porsche, Audi, and Mercedes-Benz",
      "12 hydraulic bays with 2 state-of-the-art downdraft paint booths",
      "Preferred direct repair tier-1 status with major insurance carriers",
      "Real estate option to purchase or secure favorable 10-year lease"
    ],
    images: [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Preeminent Denver European automotive repair and collision facility with pristine reputation and multi-million dollar annual cash flow. Robust corporate fleet contracts and deep private client backlog provide predictable revenue.",
    facility: "14,500 sq.ft. freestanding commercial industrial building with secure yard.",
    leaseTerms: "Owner owns building; willing to lease at fair market rate or sell property.",
    inventoryIncluded: "$240,000 in computerized diagnostic tooling, frame machines, and parts."
  },
  {
    id: "BB-1045",
    title: "STEM & Robotics Academy for Children",
    category: "Education",
    type: "Franchise",
    location: "Raleigh, NC",
    askingPrice: 395000,
    annualRevenue: 640000,
    netProfit: 175000,
    yearEstablished: 2020,
    employees: 6,
    reasonForSale: "Owner relocating internationally for family commitments",
    badges: ["Verified", "New"],
    highlights: [
      "Exclusive proprietary coding, AI, and robotics curriculum (Ages 5-16)",
      "320 enrolled student memberships with waiting list for weekend cohorts",
      "Turnkey after-school van transportation partnerships with 5 elementary schools",
      "High margin seasonal summer camps generating $140,000 in Q2/Q3"
    ],
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Thriving educational STEM enrichment center in Raleigh's booming Research Triangle corridor. Fully staffed with credentialed lead instructors and student lab assistants. High retention rates and pristine reputation among affluent tech families.",
    facility: "2,200 sq.ft. custom-designed interactive lab in premier retail center.",
    leaseTerms: "Assumable lease at $5,600/mo through November 2028.",
    inventoryIncluded: "$45,000 in high-performance laptops, 3D printers, and robotics kits."
  },
  {
    id: "BB-1046",
    title: "Precision CNC Machine & Defense Parts Manufacturer",
    category: "Manufacturing",
    type: "Independent",
    location: "Cleveland, OH",
    askingPrice: 3450000,
    annualRevenue: 5800000,
    netProfit: 1120000,
    yearEstablished: 1998,
    employees: 26,
    reasonForSale: "Planned retirement; complete transition support provided",
    badges: ["Verified", "Confidential"],
    highlights: [
      "ISO 9001:2015 and AS9100D aerospace & defense certifications",
      "Recurring contract backlog of $3.2M with tier-1 industrial clients",
      "Modern fleet of 11 multi-axis CNC mills and lathes with automated bar feeders",
      "Tenured engineering team and plant manager willing to remain indefinitely"
    ],
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Highly profitable, specialized precision machining enterprise serving aerospace, defense, and medical instrument original equipment manufacturers. Significant barriers to entry due to specialized certifications and custom machining tolerances.",
    facility: "22,000 sq.ft. climate-controlled heavy power industrial manufacturing plant.",
    leaseTerms: "Long term lease or building purchase option available.",
    inventoryIncluded: "$420,000 raw alloy bar stock and completed WIP contracts."
  },
  {
    id: "BB-1047",
    title: "Fast-Casual Mediterranean Grill Franchise (2 Units)",
    category: "Food & Beverage",
    type: "Franchise",
    location: "Tampa, FL",
    askingPrice: 1150000,
    annualRevenue: 2850000,
    netProfit: 460000,
    yearEstablished: 2018,
    employees: 28,
    reasonForSale: "Multi-unit franchisee consolidating geographically",
    badges: ["Verified"],
    highlights: [
      "Two top-tier performing stores in high-traffic lifestyle centers",
      "Clean books and records with audited financial statements",
      "Comprehensive corporate franchise training and local marketing support",
      "Streamlined digital ordering, delivery integrations, and loyalty program"
    ],
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Package of two profitable, well-managed fast-casual Mediterranean franchises in high-growth Tampa Bay suburban hubs. Both locations boast pristine health ratings, strong catering revenue, and modern interior build-outs.",
    facility: "2,600 sq.ft. and 2,800 sq.ft. prime retail end-cap sites.",
    leaseTerms: "Both sites feature 6+ years remaining with below-market escalations.",
    inventoryIncluded: "$45,000 combined inventory and prep supplies."
  },
  {
    id: "BB-1048",
    title: "Commercial Janitorial & Facility Maintenance B2B",
    category: "Services",
    type: "Independent",
    location: "Atlanta, GA",
    askingPrice: 1450000,
    annualRevenue: 2700000,
    netProfit: 510000,
    yearEstablished: 2012,
    employees: 34,
    reasonForSale: "Owner seeking semi-retirement and capital divestiture",
    badges: ["Verified", "Confidential"],
    highlights: [
      "94% recurring annual contract renewal rate with commercial offices and hospitals",
      "No customer concentration; largest account represents less than 8% of revenue",
      "Operations manager, dispatchers, and field supervisors handle daily execution",
      "Scalable infrastructure with GPS-tracked vehicle fleet included"
    ],
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Premier commercial cleaning, sanitation, and facility maintenance service firm covering greater metropolitan Atlanta. High cash generation, stable recession-resistant customer base, and turnkey operational structure.",
    facility: "3,500 sq.ft. administrative office and chemical storage depot.",
    leaseTerms: "$4,200/mo on month-to-month, can relocate or sign long term.",
    inventoryIncluded: "6 fully branded service vans and $65,000 in commercial scrubbers/supplies."
  },
  {
    id: "BB-1049",
    title: "Direct-to-Consumer Ergonomic Office Brand",
    category: "E-commerce",
    type: "Independent",
    location: "Salt Lake City, UT",
    askingPrice: 2200000,
    annualRevenue: 4600000,
    netProfit: 780000,
    yearEstablished: 2018,
    employees: 9,
    reasonForSale: "Founders seeking exit to launch software incubator",
    badges: ["Verified", "New"],
    highlights: [
      "Proprietary patented designs for active-seating and standing desk accessories",
      "Diversified sales: 65% direct Shopify, 35% Amazon Brand Registry",
      "Fully 3PL outsourced supply chain; can be operated 100% remotely",
      "High blended 62% gross margins with strong organic organic review moat"
    ],
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Explosive growth e-commerce brand operating in the thriving remote work and ergonomics category. Trademarked brand, excellent customer lifetime value, and significant whitespace in international distribution.",
    facility: "100% cloud-operated; 3PL distribution centers in Nevada and Ohio.",
    leaseTerms: "No physical real estate lease required.",
    inventoryIncluded: "$380,000 landed cost of finished inventory in 3PL warehouses."
  },
  {
    id: "BB-1050",
    title: "Veterinary Hospital & Luxury Pet Resort",
    category: "Services",
    type: "Independent",
    location: "Charlotte, NC",
    askingPrice: 2650000,
    annualRevenue: 3800000,
    netProfit: 740000,
    yearEstablished: 2011,
    employees: 22,
    reasonForSale: "Founding DVM retiring from clinical practice",
    badges: ["Verified", "Confidential"],
    highlights: [
      "3 Associate Veterinarians under multi-year employment agreements",
      "Complete surgical suite, digital X-ray, ultrasound, and in-house laboratory",
      "Attached 60-suite luxury boarding, daycare, and hydrotherapy spa",
      "Over 7,200 active patient files with 4.9-star rating across 1,100 reviews"
    ],
    images: [
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Rare opportunity to acquire a veterinary hospital and luxury pet resort with high cash flow in Charlotte's most affluent suburban expansion pocket. Turnkey management with high profitability across clinical and hospitality divisions.",
    facility: "8,500 sq.ft. purpose-built facility on 1.8 landscaped acres.",
    leaseTerms: "Real estate can be purchased alongside business or leased on 15-year term.",
    inventoryIncluded: "$95,000 medical supplies, pharmaceuticals, and retail inventory."
  },
  {
    id: "BB-1051",
    title: "Cosmetic & Family Dental Practice",
    category: "Services",
    type: "Independent",
    location: "Dallas, TX",
    askingPrice: 1750000,
    annualRevenue: 2900000,
    netProfit: 590000,
    yearEstablished: 2013,
    employees: 12,
    reasonForSale: "Practitioner transitioning to academic research",
    badges: ["Verified"],
    highlights: [
      "7 fully equipped modern operatories with 3D CBCT imaging and CEREC milling",
      "80% fee-for-service and PPO mix with negligible Medicaid exposure",
      "Over 3,400 active patients with average 38 new patient visits per month",
      "Experienced hygienists and office manager willing to remain"
    ],
    images: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Highly sought-after, contemporary cosmetic and general dentistry practice located in a premier medical pavilion in North Dallas. Advanced digital workflow allows for same-day crowns and clear aligner therapy.",
    facility: "3,200 sq.ft. designer clinical suite with private consultation rooms.",
    leaseTerms: "$8,900/mo all-in, 7 years remaining with renewal guarantees.",
    inventoryIncluded: "$140,000 in clinical dental materials, implants, and equipment."
  },
  {
    id: "BB-1052",
    title: "Turnkey High-Efficiency Commercial Laundromat",
    category: "Retail",
    type: "Independent",
    location: "Orlando, FL",
    askingPrice: 680000,
    annualRevenue: 980000,
    netProfit: 275000,
    yearEstablished: 2019,
    employees: 4,
    reasonForSale: "Owner divesting to fund larger multifamily development",
    badges: ["Verified"],
    highlights: [
      "Equipped with 48 high-spin Dexter express washers and dryers (installed 2021)",
      "Card-based digital payment system - no cash collection required",
      "Profitable drop-off wash & fold commercial service generating 35% of profit",
      "Long-term favorable lease with automatic 10-year option in anchor center"
    ],
    images: [
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Semi-absentee, high-margin modern laundromat with cutting-edge touchless card systems, automatic soap dispensers, and automated remote security controls. Located in a densely populated Orlando neighborhood with high demand.",
    facility: "3,800 sq.ft. end-cap space with ample front parking.",
    leaseTerms: "$6,500/mo through 2031 with two 5-year extensions.",
    inventoryIncluded: "$15,000 retail soap and vending inventory; all machinery included."
  },
  {
    id: "BB-1053",
    title: "Virtual Kitchen & Ghost Restaurant Collective",
    category: "Food & Beverage",
    type: "Independent",
    location: "Nashville, TN",
    askingPrice: 790000,
    annualRevenue: 1850000,
    netProfit: 360000,
    yearEstablished: 2021,
    employees: 16,
    reasonForSale: "Founders expanding SaaS ordering platform",
    badges: ["Verified", "New"],
    highlights: [
      "Operates 5 proprietary delivery brands out of single centralized kitchen",
      "Consistently ranked in top 3 on DoorDash & UberEats in Metro Nashville",
      "Average ticket size $38 with 68% repeat order frequency",
      "Low overhead with specialized line cooks and prep station optimization"
    ],
    images: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Highly optimized food-tech ghost kitchen operating multiple high-demand virtual dining concepts. Fully digitized kitchen display systems, consolidated bulk purchasing, and streamlined third-party courier dispatch.",
    facility: "3,000 sq.ft. commercial kitchen with heavy grease interceptor and walk-ins.",
    leaseTerms: "$5,100/mo, 4 years remaining on initial term.",
    inventoryIncluded: "$35,000 food stock, custom packaging, and cooking equipment."
  },
  {
    id: "BB-1054",
    title: "Specialty Compounding & Community Pharmacy",
    category: "Retail",
    type: "Independent",
    location: "Phoenix, AZ",
    askingPrice: 1350000,
    annualRevenue: 3900000,
    netProfit: 470000,
    yearEstablished: 2014,
    employees: 9,
    reasonForSale: "Pharmacist owner retiring from retail operations",
    badges: ["Verified", "Confidential"],
    highlights: [
      "USP 795 and 797 certified sterile compounding cleanroom",
      "Direct prescriber referral network with over 60 local medical specialists",
      "High-margin hormone therapy and veterinary compounding accounts",
      "Clean insurance audits and fully compliant pedigree tracking system"
    ],
    images: [
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Respected independent community pharmacy with specialized sterile and non-sterile compounding laboratories. Strong recurring patient base, excellent third-party payer contracts, and minimal big-box pharmacy competition.",
    facility: "2,500 sq.ft. retail pharmacy with certified cleanroom suites.",
    leaseTerms: "$5,800/mo triple net, lease secured through 2029.",
    inventoryIncluded: "$120,000 pharmaceutical stock at wholesale cost."
  },
  {
    id: "BB-1055",
    title: "Luxury MedSpa & Holistic Wellness Retreat",
    category: "Health & Fitness",
    type: "Independent",
    location: "San Diego, CA",
    askingPrice: 1600000,
    annualRevenue: 2750000,
    netProfit: 530000,
    yearEstablished: 2016,
    employees: 14,
    reasonForSale: "Owner moving into national aesthetic training advisory",
    badges: ["Verified"],
    highlights: [
      "Owned FDA-approved laser aesthetic machines, RF microneedling, and cryo chambers",
      "Medical director contract in place for seamless transition",
      "Over 650 active VIP membership subscription clients",
      "Flawless 5-star reputation in affluent coastal North County enclave"
    ],
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Prestigious destination MedSpa offering neurotoxins, dermal fillers, advanced body contouring, and medical-grade skincare. High client lifetime value, tenured aesthetic nurses, and serene luxury architectural finishes.",
    facility: "3,400 sq.ft. custom spa with 8 treatment rooms and relaxation lounge.",
    leaseTerms: "$11,500/mo, 6 years remaining on primary term.",
    inventoryIncluded: "$85,000 retail skincare and injectable stock."
  },
  {
    id: "BB-1056",
    title: "Commercial HVAC & Mechanical Services Contractor",
    category: "Services",
    type: "Independent",
    location: "Indianapolis, IN",
    askingPrice: 2850000,
    annualRevenue: 6200000,
    netProfit: 980000,
    yearEstablished: 2004,
    employees: 25,
    reasonForSale: "Retirement; willing to consult for 12 months post-acquisition",
    badges: ["Verified", "Confidential"],
    highlights: [
      "Over 220 commercial maintenance preventative service contracts",
      "Diverse customer base of schools, logistics hubs, and corporate parks",
      "Fleet of 18 fully equipped service trucks with GPS dispatch software",
      "Strong management team: General Manager, Dispatcher, and Service Leads"
    ],
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Prominent commercial mechanical contractor specializing in HVAC retrofits, preventative maintenance contracts, and industrial refrigeration. High recurring revenues, excellent reputation, and immense capacity for geographic expansion.",
    facility: "12,000 sq.ft. warehouse with fabrication shop and offices.",
    leaseTerms: "$7,800/mo lease or option to purchase commercial real estate.",
    inventoryIncluded: "Complete fleet of 18 vehicles and $210,000 in replacement parts."
  },
  {
    id: "BB-1057",
    title: "Organic Artisan Grocer & European Deli",
    category: "Retail",
    type: "Independent",
    location: "Portland, OR",
    askingPrice: 940000,
    annualRevenue: 2400000,
    netProfit: 310000,
    yearEstablished: 2015,
    employees: 15,
    reasonForSale: "Owner pursuing organic farming and agriculture full-time",
    badges: ["Verified"],
    highlights: [
      "Established community fixture with devoted local customer loyalty",
      "Full liquor, wine, and craft beer license included",
      "High-margin prepared food counter and artisanal cheese program",
      "Strong direct wholesale relationships with over 80 regional organic farms"
    ],
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Charming neighborhood grocery market and specialty European deli known for curated wines, farm-fresh organic produce, and chef-crafted ready meals. Consistent year-round foot traffic in vibrant pedestrian district.",
    facility: "4,200 sq.ft. retail space with commercial kitchen and walk-in coolers.",
    leaseTerms: "$8,400/mo, lease in place through 2030 with options.",
    inventoryIncluded: "$90,000 in dry goods, wines, and specialty provisions."
  },
  {
    id: "BB-1058",
    title: "B2B Performance Digital Marketing Agency",
    category: "Services",
    type: "Independent",
    location: "Chicago, IL",
    askingPrice: 1850000,
    annualRevenue: 3100000,
    netProfit: 680000,
    yearEstablished: 2017,
    employees: 12,
    reasonForSale: "Founders seeking liquidity after 8 years of bootstrap growth",
    badges: ["Verified", "New"],
    highlights: [
      "85% recurring monthly retainer revenue ($215,000/mo MRR)",
      "Premier Google, Meta, and HubSpot Certified Partner agency",
      "Average client tenure of 34 months across mid-market enterprise B2B tech",
      "Remote-first operations with documented SOPs and creative director in place"
    ],
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Highly reputable digital performance marketing firm delivering paid acquisition, SEO, and conversion rate optimization for enterprise clients. Clean balance sheet, high profit margins, and world-class client case studies.",
    facility: "Operates remote-first with downtown Chicago collaborative office space.",
    leaseTerms: "Flexible month-to-month co-working membership; can be 100% remote.",
    inventoryIncluded: "All proprietary project management systems, templates, and trademarks."
  },
  {
    id: "BB-1059",
    title: "Historic Coastal Boutique Inn & Event Venue",
    category: "Services",
    type: "Independent",
    location: "Savannah, GA",
    askingPrice: 4200000,
    annualRevenue: 2200000,
    netProfit: 710000,
    yearEstablished: 2006,
    employees: 16,
    reasonForSale: "Owners retiring after 20 years in hospitality",
    badges: ["Verified", "Confidential"],
    highlights: [
      "Includes prime fee-simple historic real estate parcel in landmark district",
      "14 luxury guest suites with private balconies and courtyard gardens",
      "Over 45 weddings and corporate retreats booked 12 months in advance",
      "91% average annual occupancy rate with exceptional RevPAR metrics"
    ],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Trophy hospitality asset in Savannah's world-renowned historic district. Combining authentic Southern architectural charm with modern amenities, luxury concierge services, and significant wedding and event revenues.",
    facility: "12,000 sq.ft. historic mansion across 3 levels with commercial event kitchen.",
    leaseTerms: "Real estate fee-simple ownership INCLUDED in asking price.",
    inventoryIncluded: "All antique furnishings, guest amenities, and event decor."
  },
  {
    id: "BB-1060",
    title: "Premier Early Learning & Childcare Franchise",
    category: "Education",
    type: "Franchise",
    location: "Minneapolis, MN",
    askingPrice: 1950000,
    annualRevenue: 2800000,
    netProfit: 540000,
    yearEstablished: 2016,
    employees: 24,
    reasonForSale: "Owner focusing on personal real estate holdings",
    badges: ["Verified"],
    highlights: [
      "Licensed for 145 children; consistently operating at 98% capacity",
      "Full waiting list spanning 18 months for infant and toddler rooms",
      "State certified curriculum, playground, and security fingerprint access",
      "Dedicated Center Director and Assistant Director handling all licensing"
    ],
    images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Outstanding turnkey childcare center franchise in an affluent Twin Cities suburb. High enrollment stability, subsidized government meal grants, and outstanding franchise parent brand reputation.",
    facility: "10,500 sq.ft. custom educational center with secure rubberized play fields.",
    leaseTerms: "$14,000/mo, 10-year lease extension recently executed.",
    inventoryIncluded: "$75,000 in classroom educational materials and infant nursery sets."
  },
  {
    id: "BB-1061",
    title: "Industrial Corrugated Packaging & Logistics Hub",
    category: "Manufacturing",
    type: "Independent",
    location: "Kansas City, MO",
    askingPrice: 3800000,
    annualRevenue: 7200000,
    netProfit: 1250000,
    yearEstablished: 2002,
    employees: 32,
    reasonForSale: "Intergenerational succession exit; owner retiring",
    badges: ["Verified", "Confidential"],
    highlights: [
      "Specializes in custom industrial crating, corrugated boxes, and foam inserts",
      "Diversified client base across automotive parts, medical devices, and e-com",
      "High speed box folder gluers and CAD sample cutting tables",
      "35,000 sq.ft. distribution facility with 4 recessed loading docks"
    ],
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Dominant regional custom packaging manufacturer and fulfillment distributor. Long-term commercial contracts with major Fortune 500 regional operations and pristine safety record.",
    facility: "35,000 sq.ft. clear-span industrial warehouse with rail spur access.",
    leaseTerms: "Real estate can be leased at $16,000/mo NNN or purchased directly.",
    inventoryIncluded: "$310,000 raw paperboard and finished stock."
  },
  {
    id: "BB-1062",
    title: "Fast-Casual Artisan Pizza Franchise (3 Units)",
    category: "Food & Beverage",
    type: "Franchise",
    location: "Houston, TX",
    askingPrice: 1750000,
    annualRevenue: 3950000,
    netProfit: 580000,
    yearEstablished: 2017,
    employees: 38,
    reasonForSale: "Franchisee retiring to focus on non-profit initiatives",
    badges: ["Verified"],
    highlights: [
      "Three prime units in high-income master planned suburbs of Houston",
      "High volume wood-fired stone hearth ovens in each location",
      "District manager oversees operations; semi-absentee owner",
      "Significant upside through local school fundraising and catering expansion"
    ],
    images: [
      "assets/images/listings/pizza-storefront-facade.jpg",
      "assets/images/listings/pizza-counter-service.jpg",
      "assets/images/listings/pizza-dining-interior.jpg"
    ],
    description: "Highly acclaimed multi-unit fast-casual artisan pizza franchise package. High customer loyalty, custom buildouts, digital kiosk ordering, and proven multi-unit management team.",
    facility: "Three retail units averaging 2,500 sq.ft. each.",
    leaseTerms: "Long-term commercial leases with competitive renewal terms.",
    inventoryIncluded: "$65,000 combined inventory and food supplies."
  },
  {
    id: "BB-1063",
    title: "Luxury Auto Detailing & Paint Protection Studio",
    category: "Automotive",
    type: "Independent",
    location: "Miami, FL",
    askingPrice: 620000,
    annualRevenue: 1100000,
    netProfit: 290000,
    yearEstablished: 2018,
    employees: 7,
    reasonForSale: "Owner pursuing international automotive racing series",
    badges: ["Verified", "New"],
    highlights: [
      "Authorized XPEL Paint Protection Film and Ceramic Pro installer",
      "Specializes in exotic supercars: Ferrari, Lamborghini, McLaren, Porsche",
      "Air-conditioned dust-free installation bays with specialized LED lighting",
      "Average ticket size over $2,400 with 3-week scheduling backlog"
    ],
    images: [
      "assets/images/listings/auto-detailing-ppf-installation.jpg",
      "assets/images/listings/auto-detailing-ppf-squeegee.jpg"
    ],
    description: "Bespoke automotive detailing and paint protection film studio located in Miami's luxury car district. High margins, elite celebrity and collector clientele, and state-of-the-art climate-controlled showroom.",
    facility: "4,000 sq.ft. cleanroom-style installation facility with lounge.",
    leaseTerms: "$7,200/mo, 5-year lease remaining with extensions.",
    inventoryIncluded: "$40,000 in bulk XPEL film rolls, ceramic coatings, and polishers."
  },
  {
    id: "BB-1064",
    title: "Craft Microbrewery, Taproom & Gastropub",
    category: "Food & Beverage",
    type: "Independent",
    location: "Asheville, NC",
    askingPrice: 1850000,
    annualRevenue: 2950000,
    netProfit: 520000,
    yearEstablished: 2014,
    employees: 21,
    reasonForSale: "Founding brewmaster retiring",
    badges: ["Verified", "Confidential"],
    highlights: [
      "15-barrel automated brewhouse with 8 fermentation tanks",
      "Award-winning flagship IPA distributed in over 240 regional retail locations",
      "Bustling 180-seat indoor/outdoor taproom and chef-driven gastropub",
      "Consistent winner of Great American Beer Festival medals"
    ],
    images: [
      "https://images.unsplash.com/photo-1518176258769-f227c798150e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Iconic craft brewery and destination taproom in the heart of Asheville's thriving culinary scene. Includes complete brewing infrastructure, canning line, distribution contracts, and vibrant year-round visitor traffic.",
    facility: "8,800 sq.ft. historical brick brewery and scenic biergarten.",
    leaseTerms: "$9,500/mo long-term lease with first right of refusal on building.",
    inventoryIncluded: "$110,000 beer inventory, hops, malt, and merchandise."
  },
  {
    id: "BB-1065",
    title: "Architectural Millwork & Custom Cabinetry Shop",
    category: "Manufacturing",
    type: "Independent",
    location: "Philadelphia, PA",
    askingPrice: 2100000,
    annualRevenue: 4300000,
    netProfit: 690000,
    yearEstablished: 2005,
    employees: 19,
    reasonForSale: "Owner retiring; seasoned shop superintendent managing daily production",
    badges: ["Verified"],
    highlights: [
      "Specializes in high-end commercial millwork for luxury hotels and law firms",
      "Contracted backlog of $2.4M extending over the next 14 months",
      "Equipped with modern CNC nested routers, automated edgebanders, and spray booth",
      "AWI (Architectural Woodwork Institute) certified manufacturing facility"
    ],
    images: [
      "assets/images/listings/millwork-cnc-facility.jpg",
      "assets/images/listings/millwork-craftsmen-measuring.jpg",
      "assets/images/listings/millwork-cabinetry-workshop.jpg"
    ],
    description: "Turnkey architectural custom millwork and commercial casework fabrication enterprise. High barriers to entry, blue-chip commercial general contractor relationships, and tenured craftsmen.",
    facility: "16,000 sq.ft. fully outfitted woodshop with loading docks.",
    leaseTerms: "Favorable $6,800/mo lease with 6 years remaining.",
    inventoryIncluded: "$160,000 in architectural hardwoods, veneers, and hardware."
  }
];

// Spotlight Franchise Opportunities (Section 4 - Page 1)
const franchiseSpotlightsData = [
  {
    name: "Artisan Brew & Roastery Co.",
    industry: "Specialty Coffee & Bakery",
    investmentRange: "$350,000 - $650,000",
    liquidCapitalRequired: "$150,000",
    expectedROI: "28% - 36% Year 2",
    outlets: "48 Open (16 in Development)",
    franchiseFee: "$45,000",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    description: "Award-winning specialty coffee franchise with streamlined drive-thru models and premium artisan bakery pairings."
  },
  {
    name: "PulseFit 360 Training",
    industry: "Boutique Health & Fitness",
    investmentRange: "$220,000 - $450,000",
    liquidCapitalRequired: "$100,000",
    expectedROI: "32% - 44% Year 2",
    outlets: "82 Open Across 14 States",
    franchiseFee: "$39,500",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    description: "High-yield functional group fitness franchise with proprietary wearable heart-rate integration and recurring auto-pay memberships."
  },
  {
    name: "CodeMasters STEM Labs",
    industry: "Children's Education & Robotics",
    investmentRange: "$140,000 - $280,000",
    liquidCapitalRequired: "$75,000",
    expectedROI: "35% - 48% Year 1",
    outlets: "64 Centers Nationwide",
    franchiseFee: "$32,000",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    description: "Leading after-school coding, gaming, and AI education franchise with year-round camps and parent subscriptions."
  },
  {
    name: "Apex AutoCare Precision Centers",
    industry: "Automotive Maintenance & Detailing",
    investmentRange: "$400,000 - $850,000",
    liquidCapitalRequired: "$200,000",
    expectedROI: "25% - 34% Year 2",
    outlets: "115 Locations Open",
    franchiseFee: "$50,000",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    description: "National fleet automotive service and ceramic coating franchise with recession-proof corporate accounts."
  }
];

// Market Insights / Articles Data (Section 4 - Home Page 11)
const articlesData = [
  {
    id: "art-1",
    title: "2026 Small Business Valuation Multiples by Sector",
    category: "Valuation & M&A",
    date: "October 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    summary: "Discover current EBITDA and SDE transaction multiples across HVAC, medical practices, e-commerce, and food service.",
    content: `
      <h3>Understanding Current Valuation Multiples</h3>
      <p>Entering the final quarter of 2026, private business valuations have stabilized around proven earnings metrics. Sellers with clean, verifiable tax returns and recurring revenue streams continue to command premium multiples across all primary industry sectors.</p>
      <div class="my-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm">
        <strong>Sector SDE Multiples Benchmark (2026):</strong>
        <ul class="list-disc pl-5 mt-2 space-y-1 text-slate-300">
          <li>Commercial Services & HVAC: 3.8x - 5.2x SDE</li>
          <li>Specialty Medical & Dental Practices: 4.2x - 6.5x EBITDA</li>
          <li>Franchise QSR & Coffee: 2.8x - 4.1x SDE</li>
          <li>Niche Manufacturing & Defense: 4.5x - 7.0x EBITDA</li>
          <li>D2C E-commerce Brands: 2.5x - 3.8x SDE</li>
        </ul>
      </div>
      <p>The single greatest multiplier driver remains management depth: businesses where the owner operates as CEO rather than daily operator trade at a 30% to 45% premium over owner-dependent peers.</p>
    `
  },
  {
    id: "art-2",
    title: "Buying an Independent Business vs. Franchising: 5 Critical Factors",
    category: "Buyer Strategy",
    date: "September 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    summary: "A practical framework analyzing cash flow immediacy, creative freedom, royalty overhead, and brand equity.",
    content: `
      <h3>Evaluating Your Entrepreneurial Archetype</h3>
      <p>When prospective business acquirers engage our advisory practice, the initial dilemma frequently centers on acquiring an existing independent business versus entering an established franchise network.</p>
      <h4>1. Immediate Cash Flow vs. Formulaic Growth</h4>
      <p>An established independent business produces cash flow from day one. You acquire historical audited revenue, existing staff, and an established client base. Conversely, a new franchise requires a ramp-up phase, though with a rigorously tested playbook.</p>
      <h4>2. Ongoing Royalties vs. Total Autonomy</h4>
      <p>Franchise models typically collect 4% to 8% of gross revenue in royalties and marketing fund contributions. In exchange, you receive national brand recognition, volume supply chain discounts, and continuous R&D.</p>
      <h4>3. Financing & SBA Approval Velocity</h4>
      <p>SBA lenders often express higher confidence in established franchise brands listed on the SBA Franchise Directory, occasionally requiring lower collateral thresholds than standalone independent acquisitions.</p>
    `
  },
  {
    id: "art-3",
    title: "Preparing Your Business for a Tax-Efficient Exit in 12 Months",
    category: "Seller Advisory",
    date: "September 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    summary: "How proactive EBITDA add-backs, clean financial audits, and customer diversification double your net exit take-home.",
    content: `
      <h3>Maximizing After-Tax Sale Proceeds</h3>
      <p>Selling your life's work is not merely about achieving the highest headline offer; it is about maximizing the net after-tax liquidity deposited in your accounts post-closing.</p>
      <h4>The 3 Pillars of Exit Preparation:</h4>
      <p><strong>Pillar 1: Financial Recasting & Add-Back Schedules:</strong> Ensure that personal expenses, non-recurring legal bills, and one-time capital expenditures are methodically documented with CPA-verified receipts.</p>
      <p><strong>Pillar 2: Eliminate Customer Concentration Risk:</strong> If a single client generates more than 15% of your annual revenue, buyers will discount the multiple or require an extensive earn-out structure.</p>
      <p><strong>Pillar 3: Assemble Your M&A Deal Team Early:</strong> Retaining a certified business broker, transaction attorney, and wealth advisor 12 months prior to listing ensures deal structure optimization (Asset Sale vs. Stock Sale) before entering negotiations.</p>
    `
  }
];
