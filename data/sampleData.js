/**
 * WedPlan - Default Sample Data
 * Pre-populated realistic wedding dataset for demonstration & testing
 */

const defaultWeddingData = {
  user: {
    id: "couple_demo_1",
    name: "Sophia & Alexander",
    email: "sophia.alexander@wedplan.demo",
    partner1: "Sophia Bennett",
    partner2: "Alexander Wright",
    weddingDate: "2027-06-18T16:00:00",
    venueName: "St. Clair Vineyards & Estate",
    location: "Napa Valley, California",
    totalBudget: 35000,
    theme: "Romantic Garden & Rose Gold Elegance",
    avatar1: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    avatar2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    websiteSettings: {
      tagline: "Together is our favorite place to be",
      story: "We met at an artisanal coffee shop in San Francisco on a rainy Tuesday morning in November 2021. What was supposed to be a twenty-minute coffee break turned into four hours of laughing and talking about travel, architecture, and favorite books. Three years, countless adventures, and one unforgettable sunset proposal on the cliffs of Big Sur later, we cannot wait to tie the knot surrounded by our cherished loved ones.",
      ceremonyTime: "4:00 PM - 5:00 PM",
      receptionTime: "5:30 PM - 11:30 PM",
      dressCode: "Black-Tie Optional / Romantic Elegance",
      rsvpDeadline: "2027-05-01",
      bannerImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
    }
  },

  vendors: [
    {
      id: "v1",
      name: "St. Clair Vineyards & Estate",
      category: "venues",
      categoryLabel: "Wedding Venue",
      rating: 4.9,
      reviewCount: 68,
      priceTier: "$$$$",
      priceRange: "$8,500 - $14,000",
      location: "Napa Valley, CA",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
      badge: "Featured Venue",
      bio: "Nestled among rolling hills and sun-drenched vine rows, St. Clair Vineyards offers panoramic terrace ceremonies, wine-cave cocktail receptions, and grand ballroom celebrations for up to 250 guests.",
      services: ["Outdoor Lawn Ceremony", "Wine Cellar Reception", "Bridal Dressing Suite", "On-site Culinary Kitchen", "Valet Parking"],
      packages: [
        { name: "Golden Sunset Package", price: 8500, desc: "Lawn ceremony, 6-hour estate access, bridal suite, tables & chairs for 150." },
        { name: "Grand Estate Celebration", price: 12500, desc: "Full weekend property access, cocktail cave, rehearsal dinner access, premium staffing." }
      ],
      reviews: [
        { user: "Claire & Marcus", rating: 5, date: "October 2026", comment: "The vineyard views at sunset were pure magic. Our guests are still raving about the wine cave cocktail hour!" },
        { user: "Elena & David", rating: 5, date: "August 2026", comment: "Outstanding service from start to finish. The bridal suite was spacious and photography backdrops are endless." }
      ],
      availability: "Available",
      booked: true
    },
    {
      id: "v2",
      name: "Luminary Fine Art Photography",
      category: "photographers",
      categoryLabel: "Photography",
      rating: 5.0,
      reviewCount: 94,
      priceTier: "$$$",
      priceRange: "$3,200 - $5,800",
      location: "San Francisco & Napa, CA",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
      badge: "Top Rated",
      bio: "We capture raw, candid, luminous moments that feel like cinematic poetry. Specializing in natural light, editorial portraits, and timeless emotional storytelling.",
      services: ["Full Day Coverage", "Second Shooter Included", "Drone Aerial Photography", "Online High-Res Gallery", "Handcrafted Leather Album"],
      packages: [
        { name: "Classic Storyteller (8 Hours)", price: 3400, desc: "8 hours coverage, 1 lead photographer, 600+ edited images, online gallery." },
        { name: "Heirloom Master Collection", price: 4800, desc: "10 hours, 2 shooters, engagement session, drone coverage, 30-page heirloom album." }
      ],
      reviews: [
        { user: "Jessica & Tyler", rating: 5, date: "September 2026", comment: "Julian and his team made us feel so relaxed in front of the lens. The photos took our breath away!" }
      ],
      availability: "Available",
      booked: true
    },
    {
      id: "v3",
      name: "Artisan Feast Catering Co.",
      category: "caterers",
      categoryLabel: "Catering",
      rating: 4.8,
      reviewCount: 52,
      priceTier: "$$$",
      priceRange: "$75 - $140 / guest",
      location: "Oakland & Bay Area, CA",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      badge: "Culinary Award",
      bio: "Farm-to-table culinary perfection crafted from seasonal Northern California ingredients. Bespoke multi-course plated dinners, interactive chef stations, and artisan cocktails.",
      services: ["Plated 3-Course Dinners", "Buffet & Family Style", "Cocktail Hour Canapés", "Sommelier Wine Pairings", "Late Night Bites Bar"],
      packages: [
        { name: "Harvest Plated Dinner", price: 85, desc: "Per guest: 3 passed appetizers, organic salad, choice of 2 mains, bread service." },
        { name: "California Reserve Feast", price: 120, desc: "Per guest: 5 luxury canapés, amuse-bouche, duo-plate filet & seabass, dessert trio." }
      ],
      reviews: [
        { user: "Maya & Neil", rating: 5, date: "November 2026", comment: "Every single dish was hot, beautifully presented, and utterly delicious. Dietary options were stellar." }
      ],
      availability: "Available",
      booked: true
    },
    {
      id: "v4",
      name: "Fleur & Petal Floral Design",
      category: "florists",
      categoryLabel: "Floral & Decor",
      rating: 4.9,
      reviewCount: 43,
      priceTier: "$$",
      priceRange: "$2,200 - $4,800",
      location: "San Jose, CA",
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
      badge: "Eco-Friendly",
      bio: "Romantic, garden-style organic blooms featuring delicate garden roses, dahlias, ranunculus, and lush Italian ruscus designed to create an enchanted atmosphere.",
      services: ["Bridal Bouquets & Boutonnieres", "Ceremony Arch Floral Installations", "Low & Tall Centerpieces", "Aisle Petal Styling", "Floral Hairpieces"],
      packages: [
        { name: "Garden Romance Floral Package", price: 2600, desc: "Bridal bouquet, 4 bridesmaid bouquets, 6 boutonnieres, ceremony floral arch, 10 table centerpieces." },
        { name: "Luxe Botanical Enchantment", price: 4200, desc: "Full floral transformation including hanging ceiling installs, grand arch, 16 lush centerpieces." }
      ],
      reviews: [
        { user: "Rachel & Liam", rating: 5, date: "July 2026", comment: "The arch was even more breathtaking than my Pinterest board! The scent of the fresh roses filled the entire tent." }
      ],
      availability: "Available",
      booked: false
    },
    {
      id: "v5",
      name: "Seraphina Events & Wedding Planning",
      category: "planners",
      categoryLabel: "Wedding Planner",
      rating: 5.0,
      reviewCount: 76,
      priceTier: "$$$",
      priceRange: "$2,800 - $6,500",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      badge: "Couples' Choice 2026",
      bio: "Full-service and month-of coordination designed to let you relax and soak in every second of your engagement while our experienced team orchestrates flawless execution.",
      services: ["Full Wedding Design & Execution", "Month-Of Coordination", "Budget & Contract Management", "Day-Of Timeline Direction", "Vendor Sourcing"],
      packages: [
        { name: "Month-Of Peace of Mind", price: 2800, desc: "Starting 6 weeks prior: vendor handoff, master timeline creation, rehearsal coordination, 12 hours day-of." },
        { name: "Complete Diamond Planning", price: 5900, desc: "Full guidance from concept to clean-up, vendor selection, styling mockups, unlimited consultations." }
      ],
      reviews: [
        { user: "Victoria & Andrew", rating: 5, date: "October 2026", comment: "Seraphina is an absolute lifesaver. Not a single thing went wrong on our wedding day because of her." }
      ],
      availability: "Available",
      booked: false
    },
    {
      id: "v6",
      name: "Symphony Strings & Groove DJs",
      category: "music",
      categoryLabel: "Music & Entertainment",
      rating: 4.8,
      reviewCount: 61,
      priceTier: "$$",
      priceRange: "$1,800 - $3,500",
      location: "Sacramento & Bay Area, CA",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
      badge: "Crowd Favorite",
      bio: "From soulful live acoustic strings during your romantic vows to a high-energy packed dance floor all night long. Premium sound, custom mixes, and bilingual MCs.",
      services: ["Acoustic Duo / String Quartet", "Reception DJ & Host MC", "Wireless Microphones for Vows", "Dynamic Dancefloor Lighting", "Custom First Dance Edits"],
      packages: [
        { name: "Ceremony to Reception Combo", price: 2100, desc: "Acoustic strings for ceremony & cocktail hour + 5-hour pro DJ reception with dance lighting." },
        { name: "Platinum Nightclub Experience", price: 3200, desc: "Live saxophonist playing alongside DJ, cold spark machines, full uplighting package." }
      ],
      reviews: [
        { user: "Brianna & Sean", rating: 5, date: "September 2026", comment: "The string quartet played our favorite pop songs so elegantly, and the DJ had our grandparents and college friends dancing till midnight!" }
      ],
      availability: "Available",
      booked: false
    },
    {
      id: "v7",
      name: "Belle Époque Bridal Atelier",
      category: "attire",
      categoryLabel: "Bridal Attire & Glam",
      rating: 4.9,
      reviewCount: 38,
      priceTier: "$$$",
      priceRange: "$1,500 - $4,200",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80",
      badge: "Exclusive Designer",
      bio: "Curated designer bridal gowns, custom veil embroidery, and on-location bridal hair and makeup artistry focused on luminous, glowing skin and romantic soft updos.",
      services: ["Bridal Gown Styling", "Custom Alterations", "Bridal Hair & Makeup Trials", "Wedding Day On-Site Glam Squad", "Veil & Jewelry Styling"],
      packages: [
        { name: "Bridal Glam Essentials", price: 650, desc: "Hair & airbrush makeup trial + wedding day glam including luxury faux lashes and touch-up kit." },
        { name: "Bridal Party Deluxe Suite", price: 1750, desc: "Bride hair & makeup + 5 bridesmaids / mothers hair & makeup on location." }
      ],
      reviews: [
        { user: "Danielle M.", rating: 5, date: "August 2026", comment: "My makeup stayed fresh through tears, heat, and hours of dancing without a single smudge!" }
      ],
      availability: "Available",
      booked: false
    },
    {
      id: "v8",
      name: "Vanilla & Velveteen Artisan Bakery",
      category: "cakes",
      categoryLabel: "Cakes & Desserts",
      rating: 4.9,
      reviewCount: 47,
      priceTier: "$$",
      priceRange: "$500 - $1,400",
      location: "Sonoma, CA",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80",
      badge: "Handcrafted",
      bio: "Modern custom wedding cakes featuring delicate sugar florals, edible 24k gold leaf accents, and scrumptious flavor combinations like Lavender Earl Grey and Salted Caramel Dulce.",
      services: ["Custom 3-4 Tier Wedding Cakes", "Dessert Dessert Tables", "Macaron Towers", "Tasting Box Delivery", "Gluten-Free & Vegan Options"],
      packages: [
        { name: "Three-Tier Classic Elegance", price: 750, desc: "Serves 120 guests, 2 flavor combinations, textured buttercream finish with fresh flower styling." },
        { name: "Luxury Dessert Table Suite", price: 1200, desc: "3-tier focal cake + 120 dessert miniatures (french macarons, mini pavlovas, tartlets)." }
      ],
      reviews: [
        { user: "Samantha & Chris", rating: 5, date: "October 2026", comment: "Not only was it the prettiest cake I've ever seen, the Champagne Raspberry flavor was out of this world!" }
      ],
      availability: "Available",
      booked: false
    }
  ],

  budgetItems: [
    { id: "b1", category: "Venue", name: "Estate Rental & Ceremony Lawn", estimated: 9500, actual: 8500, paidStatus: "Paid", notes: "Contract signed, deposit and balance paid", dueDate: "2027-01-15" },
    { id: "b2", category: "Catering", name: "Farm-to-Table Plated Dinner (110 guests)", estimated: 9500, actual: 9200, paidStatus: "Deposit Paid", notes: "50% deposit paid, final count due 30 days prior", dueDate: "2027-05-15" },
    { id: "b3", category: "Photography", name: "Luminary Fine Art (8hr + 2 shooters)", estimated: 3600, actual: 3400, paidStatus: "Paid", notes: "Engagement shoot completed", dueDate: "2026-12-01" },
    { id: "b4", category: "Floral & Decor", name: "Ceremony Arch & Centerpieces", estimated: 3200, actual: 2800, paidStatus: "Pending", notes: "Awaiting final mock-up review", dueDate: "2027-04-01" },
    { id: "b5", category: "Music & DJ", name: "String Quartet & Reception DJ", estimated: 2400, actual: 2100, paidStatus: "Pending", notes: "Playlist questionnaire received", dueDate: "2027-04-10" },
    { id: "b6", category: "Attire & Beauty", name: "Bridal Gown & Alterations", estimated: 2500, actual: 2200, paidStatus: "Paid", notes: "First fitting scheduled for March", dueDate: "2026-11-20" },
    { id: "b7", category: "Attire & Beauty", name: "Groom Custom Tuxedo & Shoes", estimated: 900, actual: 850, paidStatus: "Paid", notes: "Fitted and ordered", dueDate: "2027-02-10" },
    { id: "b8", category: "Cake & Sweets", name: "3-Tier Floral Buttercream Cake", estimated: 800, actual: 750, paidStatus: "Pending", notes: "Tasting scheduled next Saturday", dueDate: "2027-04-20" },
    { id: "b9", category: "Stationery", name: "Save-the-Dates & Gold Foil Invites", estimated: 750, actual: 680, paidStatus: "Paid", notes: "Sent to all guests with wax seal", dueDate: "2027-01-10" },
    { id: "b10", category: "Favors & Gifts", name: "Artisanal Olive Oil Bottles for Guests", estimated: 600, actual: 520, paidStatus: "Pending", notes: "Sourced locally in Napa", dueDate: "2027-05-10" },
    { id: "b11", category: "Officiant & Marriage License", name: "Legal Documentation & Officiant Fee", estimated: 500, actual: 450, paidStatus: "Pending", notes: "Apply at county clerk 60 days before", dueDate: "2027-04-30" },
    { id: "b12", category: "Wedding Rings", name: "Bespoke Rose Gold & Platinum Bands", estimated: 1800, actual: 1650, paidStatus: "Paid", notes: "Engraved with our coordinates", dueDate: "2027-02-28" }
  ],

  guests: [
    { id: "g1", name: "Eleanor Vance", email: "eleanor.vance@gmail.com", phone: "+1 (555) 234-5678", side: "Bride", rsvpStatus: "Attending", plusOne: true, plusOneName: "Julian Vance", dietary: "Vegetarian", tableId: "t1" },
    { id: "g2", name: "David Sterling", email: "d.sterling@yahoo.com", phone: "+1 (555) 345-6789", side: "Groom", rsvpStatus: "Attending", plusOne: false, plusOneName: "", dietary: "None", tableId: "t1" },
    { id: "g3", name: "Amelia Thorne", email: "amelia.thorne@outlook.com", phone: "+1 (555) 456-7890", side: "Bride", rsvpStatus: "Attending", plusOne: true, plusOneName: "Lucas Grey", dietary: "Gluten-Free", tableId: "t2" },
    { id: "g4", name: "Marcus Chen", email: "marcus.chen@techcorp.io", phone: "+1 (555) 567-8901", side: "Groom", rsvpStatus: "Attending", plusOne: true, plusOneName: "Chloe Kim", dietary: "None", tableId: "t2" },
    { id: "g5", name: "Grace Montgomery", email: "grace.montgomery@artmail.com", phone: "+1 (555) 678-9012", side: "Bride", rsvpStatus: "Attending", plusOne: false, plusOneName: "", dietary: "Vegan", tableId: "t2" },
    { id: "g6", name: "Robert Wright (Uncle Bob)", email: "bob.wright@homemail.com", phone: "+1 (555) 789-0123", side: "Groom", rsvpStatus: "Attending", plusOne: true, plusOneName: "Helen Wright", dietary: "None", tableId: "t3" },
    { id: "g7", name: "Catherine Bennett (Aunt Cathy)", email: "cathy.b@floridafun.net", phone: "+1 (555) 890-1234", side: "Bride", rsvpStatus: "Attending", plusOne: true, plusOneName: "Thomas Bennett", dietary: "None", tableId: "t3" },
    { id: "g8", name: "Siddharth Patel", email: "sid.patel@designhub.co", phone: "+1 (555) 901-2345", side: "Mutual", rsvpStatus: "Pending", plusOne: true, plusOneName: "Priya Patel", dietary: "Vegetarian", tableId: "t3" },
    { id: "g9", name: "Olivia Hayes", email: "olivia.hayes@medcenter.org", phone: "+1 (555) 012-3456", side: "Bride", rsvpStatus: "Attending", plusOne: false, plusOneName: "", dietary: "None", tableId: "t4" },
    { id: "g10", name: "Liam O'Connor", email: "liam.oconnor@dublinconsult.com", phone: "+1 (555) 123-7890", side: "Groom", rsvpStatus: "Declined", plusOne: false, plusOneName: "", dietary: "None", tableId: null },
    { id: "g11", name: "Zoe Kravitz-Miller", email: "zoe.km@musicbox.com", phone: "+1 (555) 234-8901", side: "Mutual", rsvpStatus: "Attending", plusOne: true, plusOneName: "Jordan Miller", dietary: "Halal", tableId: "t4" },
    { id: "g12", name: "Harrison Ford-Davis", email: "harrison.fd@lawgroup.com", phone: "+1 (555) 345-9012", side: "Groom", rsvpStatus: "Pending", plusOne: false, plusOneName: "", dietary: "None", tableId: null },
    { id: "g13", name: "Penelope Featherington", email: "penelope.f@novels.co.uk", phone: "+1 (555) 456-0123", side: "Bride", rsvpStatus: "Declined", plusOne: false, plusOneName: "", dietary: "None", tableId: null },
    { id: "g14", name: "Sebastian Blake", email: "seb.blake@soundwave.fm", phone: "+1 (555) 567-1234", side: "Mutual", rsvpStatus: "Attending", plusOne: true, plusOneName: "Clara Blake", dietary: "None", tableId: "t4" }
  ],

  tables: [
    { id: "t1", name: "Table 1: Sweetheart & Bridal VIP", shape: "round", capacity: 8 },
    { id: "t2", name: "Table 2: Golden Peony", shape: "round", capacity: 8 },
    { id: "t3", name: "Table 3: Heritage Family Terrace", shape: "rectangular", capacity: 10 },
    { id: "t4", name: "Table 4: College & Travel Friends", shape: "round", capacity: 8 },
    { id: "t5", name: "Table 5: Rose Arbor", shape: "round", capacity: 8 }
  ],

  tasks: [
    { id: "tk1", title: "Book Wedding Venue & Set Date", timeframe: "12+ Months", category: "Venue", priority: "High", completed: true, dueDate: "2026-06-15", notes: "St. Clair Vineyards booked with deposit" },
    { id: "tk2", title: "Determine Overall Budget & Contribution", timeframe: "12+ Months", category: "Budget", priority: "High", completed: true, dueDate: "2026-06-30", notes: "Set target at $35,000" },
    { id: "tk3", title: "Hire Wedding Photographer & Videographer", timeframe: "9-11 Months", category: "Vendor", priority: "High", completed: true, dueDate: "2026-08-20", notes: "Luminary Fine Art contract signed" },
    { id: "tk4", title: "Curate Preliminary Guest Count", timeframe: "9-11 Months", category: "Guests", priority: "Medium", completed: true, dueDate: "2026-09-10", notes: "Estimated 100-120 guests" },
    { id: "tk5", title: "Shop & Purchase Wedding Gown", timeframe: "9-11 Months", category: "Attire", priority: "High", completed: true, dueDate: "2026-10-15", notes: "Dress ordered at Belle Époque Atelier" },
    { id: "tk6", title: "Select & Reserve Catering Menu", timeframe: "6-8 Months", category: "Catering", priority: "High", completed: true, dueDate: "2026-11-15", notes: "Farm-to-table tasting completed" },
    { id: "tk7", title: "Mail Save-the-Date Cards", timeframe: "6-8 Months", category: "Stationery", priority: "Medium", completed: true, dueDate: "2026-12-05", notes: "Mailed out to all 120 guests" },
    { id: "tk8", title: "Book Ceremony Music & Reception DJ", timeframe: "6-8 Months", category: "Music", priority: "Medium", completed: false, dueDate: "2027-02-15", notes: "Compare Symphony Strings quotes" },
    { id: "tk9", title: "Design & Order Formal Wedding Invitations", timeframe: "3-5 Months", category: "Stationery", priority: "High", completed: false, dueDate: "2027-03-01", notes: "Rose gold foil letterpress" },
    { id: "tk10", title: "Schedule Hair & Makeup Trial Session", timeframe: "3-5 Months", category: "Attire", priority: "Medium", completed: false, dueDate: "2027-03-20", notes: "Bring veil and hair accessories" },
    { id: "tk11", title: "Finalize Floral Decor & Centerpieces", timeframe: "3-5 Months", category: "Floral", priority: "Medium", completed: false, dueDate: "2027-04-05", notes: "Confirm peony and eucalyptus count" },
    { id: "tk12", title: "Purchase Wedding Bands & Engravings", timeframe: "3-5 Months", category: "Jewelry", priority: "Medium", completed: true, dueDate: "2027-03-10", notes: "Engraved with 'Forever & Always'" },
    { id: "tk13", title: "Apply for County Marriage License", timeframe: "1-2 Months", category: "Legal", priority: "High", completed: false, dueDate: "2027-05-05", notes: "Valid for 90 days from Napa clerk" },
    { id: "tk14", title: "Finalize Seating Chart & Place Cards", timeframe: "1-2 Months", category: "Guests", priority: "High", completed: false, dueDate: "2027-05-18", notes: "Group by family and mutual friends" },
    { id: "tk15", title: "Confirm Final Headcount with Caterer", timeframe: "1-2 Months", category: "Catering", priority: "High", completed: false, dueDate: "2027-05-25", notes: "Include all vendor meals" },
    { id: "tk16", title: "Prepare Final Payments & Vendor Gratuities", timeframe: "Week Of", category: "Budget", priority: "High", completed: false, dueDate: "2027-06-12", notes: "Put tips in labeled envelopes" },
    { id: "tk17", title: "Rehearsal Walkthrough & Rehearsal Dinner", timeframe: "Week Of", category: "Events", priority: "Medium", completed: false, dueDate: "2027-06-17", notes: "5:00 PM at Vineyard lawn" },
    { id: "tk18", title: "Pack Emergency Kit (pins, mints, tape)", timeframe: "Day Of", category: "Personal", priority: "Low", completed: false, dueDate: "2027-06-18", notes: "Give to Maid of Honor" }
  ],

  timelineEvents: [
    { id: "tm1", time: "08:30 AM", title: "Bridal Suite Opens & Breakfast Mimosas", category: "Preparation", location: "Estate Villa Suite", notes: "Light pastries, fruit, and hair stylist arrival" },
    { id: "tm2", time: "09:30 AM", title: "Hair & Makeup Begins for Bridal Party", category: "Preparation", location: "Estate Villa Suite", notes: "Belle Époque glam squad begins with bridesmaids" },
    { id: "tm3", time: "12:00 PM", title: "Groom & Groomsmen Get Ready", category: "Preparation", location: "The Cellar Lounge", notes: "Tuxedo dressing and boutonniere pinning" },
    { id: "tm4", time: "01:30 PM", title: "First Look & Couple Portraits", category: "Photos", location: "Olive Grove & Cypress Alley", notes: "Luminary Fine Art lead shooter will coordinate" },
    { id: "tm5", time: "02:45 PM", title: "Bridal Party & Immediate Family Photos", category: "Photos", location: "Vineyard Terrace", notes: "All family members to be gathered promptly" },
    { id: "tm6", time: "03:30 PM", title: "Guests Arrive & Welcome Champagne", category: "Ceremony", location: "Courtyard Pergola", notes: "Acoustic strings quartet begins prelude music" },
    { id: "tm7", time: "04:00 PM", title: "Wedding Ceremony Begins", category: "Ceremony", location: "Rose Lawn overlooking Vineyards", notes: "Processional, vows, ring exchange, and first kiss!" },
    { id: "tm8", time: "04:45 PM", title: "Cocktail Hour & Passed Canapés", category: "Reception", location: "Wine Cave & Stone Terrace", notes: "Signature cocktails: French 75 and Bourbon Bramble" },
    { id: "tm9", time: "06:00 PM", title: "Grand Entrance & Welcome Speeches", category: "Reception", location: "Grand Pavilion Ballroom", notes: "Welcome toast by Father of the Bride & Groom" },
    { id: "tm10", time: "06:30 PM", title: "Farm-to-Table Plated Dinner Service", category: "Reception", location: "Grand Pavilion Ballroom", notes: "Artisan Feast 3-course dinner with wine pairings" },
    { id: "tm11", time: "08:00 PM", title: "First Dance & Parent Dances", category: "Reception", location: "Dance Floor", notes: "Song: 'Can't Take My Eyes Off You' (Acoustic to upbeat)" },
    { id: "tm12", time: "09:15 PM", title: "Cake Cutting & Late Night Snacks", category: "Reception", location: "Grand Pavilion", notes: "Sparkling toast & truffle sliders served" },
    { id: "tm13", time: "11:00 PM", title: "Sparkler Grand Exit & Farewell", category: "Send-Off", location: "Courtyard Gates", notes: "Guests line up with 36-inch gold sparklers" }
  ],

  gallery: [
    { id: "gal1", title: "Vineyard Sunset Vows", category: "Venues", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80", caption: "Golden hour ceremony overlooking the rolling vine hills" },
    { id: "gal2", title: "Ethereal Lace Gown", category: "Dresses", url: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1000&q=80", caption: "Handmade botanical lace detailing with delicate cathedral veil" },
    { id: "gal3", title: "Romantic Table Setting", category: "Decor", url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80", caption: "Taper candles, gold chargers, and blush velvet napkins" },
    { id: "gal4", title: "Lush Peony & Rose Bouquet", category: "Florals", url: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80", caption: "English garden roses, peach ranunculus, and olive branch greens" },
    { id: "gal5", title: "Botanical 3-Tier Cake", category: "Cakes", url: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=80", caption: "Textured buttercream accented with fresh flowers and gold foil" },
    { id: "gal6", title: "First Look Embrace", category: "Moments", url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80", caption: "Emotional first look in the shaded olive orchard" },
    { id: "gal7", title: "Candelit Wine Cave", category: "Venues", url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80", caption: "Warm romantic amber glow inside the rustic stone wine cellar" },
    { id: "gal8", title: "Groom Tuxedo Detail", category: "Dresses", url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80", caption: "Midnight navy shawl lapel tuxedo with white ranunculus boutonniere" }
  ],

  messages: [
    {
      id: "msg1",
      channelId: "vendors",
      senderName: "Julian @ Luminary Photography",
      senderRole: "Vendor (Photographer)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      text: "Hi Sophia & Alexander! We just scouted the vineyard grounds yesterday. The light at 6:15 PM behind the olive grove is unbelievable. We will definitely get those golden glow portraits!",
      timestamp: "Today at 10:14 AM"
    },
    {
      id: "msg2",
      channelId: "vendors",
      senderName: "Chef Margot @ Artisan Feast",
      senderRole: "Vendor (Catering)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      text: "Confirmed! We've noted Eleanor's vegan meal and Amelia's celiac dietary requirements. We also added the late-night churro station request to your invoice draft.",
      timestamp: "Yesterday at 4:32 PM"
    },
    {
      id: "msg3",
      channelId: "party",
      senderName: "Amelia Thorne (Maid of Honor)",
      senderRole: "Bridal Party",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      text: "Dresses arrived for all 4 bridesmaids and they fit like a dream! We are planning the bridal shower brunch for April 12th. Can't wait!",
      timestamp: "2 days ago"
    },
    {
      id: "msg4",
      channelId: "general",
      senderName: "Sophia Bennett",
      senderRole: "Bride",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      text: "Welcome to our WedPlan portal! We'll keep everyone updated on travel arrangements, timeline changes, and rehearsal details right here.",
      timestamp: "3 days ago"
    }
  ],

  bookings: [
    {
      id: "bk1",
      vendorId: "v1",
      vendorName: "St. Clair Vineyards & Estate",
      category: "venues",
      eventDate: "2027-06-18",
      guestCount: 120,
      status: "Confirmed",
      packageSelected: "Grand Estate Celebration",
      inquiryDate: "2026-06-12",
      totalQuote: 12500
    },
    {
      id: "bk2",
      vendorId: "v2",
      vendorName: "Luminary Fine Art Photography",
      category: "photographers",
      eventDate: "2027-06-18",
      guestCount: 120,
      status: "Confirmed",
      packageSelected: "Heirloom Master Collection",
      inquiryDate: "2026-08-18",
      totalQuote: 4800
    }
  ]
};

// Export to window for simple browser execution
if (typeof window !== "undefined") {
  window.WedPlanDefaultData = defaultWeddingData;
}
