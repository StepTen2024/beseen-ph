-- ============================================================================
-- BE SEEN.PH - DUMMY DATA SEED
-- Phase 3 & 4: Content Site + Directory Engine
-- 
-- Run this after schema.sql to populate with demonstration data
-- ============================================================================

-- ============================================================================
-- DIRECTORY LISTINGS - ANGELES CITY
-- ============================================================================

-- RESTAURANTS IN ANGELES CITY
INSERT INTO directory_listings (
  name, slug, description, address, city, province, phone, email,
  category, amenities, services, average_rating, review_count,
  is_featured, is_verified, status, listing_tier, view_count, keywords
) VALUES 
(
  'Mang Inasal Angeles',
  'mang-inasal-angeles',
  'Authentic Filipino BBQ restaurant serving the famous chicken inasal with unlimited rice. A local favorite for family dining and casual meals.',
  'MacArthur Highway, Balibago',
  'Angeles City',
  'Pampanga',
  '0917 123 4567',
  'angeles@manginasal.com',
  'restaurant',
  ARRAY['Air Conditioning', 'Parking', 'WiFi', 'Family Friendly'],
  ARRAY['Dine-in', 'Takeout', 'Delivery', 'Unlimited Rice'],
  4.5,
  328,
  true,
  true,
  'active',
  'premium',
  4520,
  ARRAY['chicken inasal', 'filipino food', 'unli rice', 'angeles city restaurant']
),
(
  'Toll House Restaurant',
  'toll-house-restaurant',
  'Home-style Filipino and American comfort food served in a cozy, nostalgic setting. Famous for their fried chicken and pancakes.',
  'Fil-Am Friendship Highway, Clarkview',
  'Angeles City',
  'Pampanga',
  '(045) 625 1234',
  'info@tollhouse.ph',
  'restaurant',
  ARRAY['Air Conditioning', 'Parking', 'WiFi', 'Outdoor Seating'],
  ARRAY['Dine-in', 'Takeout', 'Catering', 'Breakfast', 'Brunch'],
  4.3,
  256,
  true,
  true,
  'active',
  'premium',
  3890,
  ARRAY['breakfast', 'fried chicken', 'pancakes', 'comfort food']
),
(
  'Cafe Fleur',
  'cafe-fleur',
  'Modern Filipino fusion cuisine in an elegant garden setting. Perfect for date nights and special celebrations.',
  'L-463B Miranda Street, Sto. Rosario',
  'Angeles City',
  'Pampanga',
  '0919 876 5432',
  'hello@cafefleur.ph',
  'restaurant',
  ARRAY['Air Conditioning', 'Parking', 'Outdoor Seating', 'Private Rooms', 'Full Bar'],
  ARRAY['Dine-in', 'Reservations', 'Private Dining', 'Wine Selection'],
  4.7,
  189,
  true,
  true,
  'active',
  'premium',
  3240,
  ARRAY['fine dining', 'filipino fusion', 'date night', 'special occasion']
),
(
  'Matam-ih Authentic Kapampangan Cuisine',
  'matam-ih-kapampangan',
  'Experience authentic Kapampangan flavors with traditional dishes like sisig, tocino, and kare-kare prepared using family recipes.',
  'G/F Marlim Mansion, Diamond St.',
  'Angeles City',
  'Pampanga',
  '(045) 304 1234',
  'matamih@email.com',
  'restaurant',
  ARRAY['Air Conditioning', 'Parking', 'Function Rooms'],
  ARRAY['Dine-in', 'Takeout', 'Catering', 'Buffet'],
  4.4,
  412,
  false,
  true,
  'active',
  'basic',
  2890,
  ARRAY['kapampangan food', 'sisig', 'traditional', 'buffet']
),
(
  'Peking House Restaurant',
  'peking-house-chinese',
  'Serving authentic Chinese cuisine for over 30 years. Famous for their dim sum, Peking duck, and hot pot.',
  '1234 Fields Avenue, Balibago',
  'Angeles City',
  'Pampanga',
  '(045) 322 5678',
  'pekinghouse@email.com',
  'restaurant',
  ARRAY['Air Conditioning', 'Parking', 'Private Rooms', 'Function Hall'],
  ARRAY['Dine-in', 'Takeout', 'Delivery', 'Hot Pot', 'Dim Sum'],
  4.2,
  178,
  false,
  false,
  'active',
  'free',
  1650,
  ARRAY['chinese food', 'dim sum', 'peking duck', 'hot pot']
);

-- CAFES IN ANGELES CITY
INSERT INTO directory_listings (
  name, slug, description, address, city, province, phone,
  category, amenities, services, average_rating, review_count,
  is_featured, status, listing_tier, view_count, keywords
) VALUES 
(
  'Coffee Project Clark',
  'coffee-project-clark',
  'Instagram-worthy cafe with stunning floral interiors. Perfect spot for work, study, or catching up with friends over specialty coffee.',
  'Clark Freeport Zone, Manuel A. Roxas Highway',
  'Angeles City',
  'Pampanga',
  '0917 555 7890',
  'cafe',
  ARRAY['Air Conditioning', 'WiFi', 'Power Outlets', 'Study Area', 'Instagrammable'],
  ARRAY['Dine-in', 'Takeout', 'Coffee Beans', 'Pastries'],
  4.6,
  234,
  true,
  'active',
  'premium',
  4560,
  ARRAY['specialty coffee', 'instagram worthy', 'study spot', 'clark']
),
(
  '18 Days Coffee Co.',
  '18-days-coffee',
  'Artisan coffee shop serving single-origin beans from Benguet. Minimalist industrial design with excellent pour-over coffee.',
  '1872 Fil-Am Friendship Highway, Angeles City',
  'Angeles City',
  'Pampanga',
  '0927 333 4444',
  'cafe',
  ARRAY['Air Conditioning', 'WiFi', 'Power Outlets', 'Outdoor Seating'],
  ARRAY['Dine-in', 'Takeout', 'Pour Over', 'Cold Brew'],
  4.5,
  156,
  false,
  'active',
  'basic',
  1890,
  ARRAY['specialty coffee', 'single origin', 'pour over', 'benguet coffee']
),
(
  'SProcessed withCanvas',
  'spro-canvas',
  'Cozy neighborhood cafe with locally sourced beans and homemade pastries. Known for their latte art and friendly baristas.',
  '263 Miranda Street, Sto. Rosario',
  'Angeles City',
  'Pampanga',
  '0918 444 5555',
  'cafe',
  ARRAY['Air Conditioning', 'WiFi', 'Power Outlets', 'Parking'],
  ARRAY['Dine-in', 'Takeout', 'Pastries', 'Breakfast'],
  4.4,
  98,
  false,
  'active',
  'free',
  1120,
  ARRAY['coffee', 'pastries', 'latte art', 'neighborhood cafe']
);

-- SALONS IN ANGELES CITY
INSERT INTO directory_listings (
  name, slug, description, address, city, province, phone,
  category, amenities, services, average_rating, review_count,
  is_featured, status, listing_tier, view_count, keywords
) VALUES 
(
  'David''s Salon Angeles',
  'davids-salon-angeles',
  'Premium hair salon offering the latest hair trends, color techniques, and treatments. Professional stylists trained in Manila.',
  'SM City Clark, Manuel A. Roxas Highway',
  'Angeles City',
  'Pampanga',
  '(045) 599 1234',
  'salon',
  ARRAY['Air Conditioning', 'WiFi', 'TV', 'Refreshments'],
  ARRAY['Haircut', 'Hair Color', 'Rebond', 'Perm', 'Treatment', 'Hair Spa'],
  4.3,
  267,
  true,
  'active',
  'premium',
  3240,
  ARRAY['hair salon', 'hair color', 'rebond', 'hair treatment']
),
(
  'Bench Fix Salon',
  'bench-fix-clark',
  'Trendy and affordable hair salon chain. Great for quick cuts, styling, and hair treatments while shopping.',
  'SM City Clark, Upper Ground Floor',
  'Angeles City',
  'Pampanga',
  '(045) 599 5678',
  'salon',
  ARRAY['Air Conditioning', 'WiFi'],
  ARRAY['Haircut', 'Hair Color', 'Treatment', 'Styling'],
  4.0,
  189,
  false,
  'active',
  'basic',
  2450,
  ARRAY['haircut', 'affordable', 'quick service']
),
(
  'Nail Tropics Spa & Cafe',
  'nail-tropics-spa',
  'Unique nail spa with cafe concept. Get your nails done while enjoying coffee and light snacks.',
  'McArthur Highway, Balibago',
  'Angeles City',
  'Pampanga',
  '0917 888 9999',
  'salon',
  ARRAY['Air Conditioning', 'WiFi', 'Cafe', 'Parking'],
  ARRAY['Manicure', 'Pedicure', 'Nail Art', 'Gel Nails', 'Spa'],
  4.5,
  134,
  true,
  'active',
  'premium',
  2890,
  ARRAY['nail spa', 'nail art', 'mani pedi', 'gel nails']
);

-- SPAS IN ANGELES CITY
INSERT INTO directory_listings (
  name, slug, description, address, city, province, phone,
  category, amenities, services, average_rating, review_count,
  is_featured, status, listing_tier, view_count, keywords
) VALUES 
(
  'The Spa at Clark',
  'the-spa-clark',
  'Luxury spa experience with professional therapists and premium products. Full range of massage and wellness treatments.',
  'Widus Hotel, Clark Freeport Zone',
  'Angeles City',
  'Pampanga',
  '(045) 288 1234',
  'spa',
  ARRAY['Air Conditioning', 'Private Rooms', 'Shower', 'Sauna', 'Jacuzzi', 'Parking'],
  ARRAY['Full Body Massage', 'Swedish', 'Shiatsu', 'Hot Stone', 'Body Scrub', 'Facial'],
  4.7,
  198,
  true,
  'active',
  'premium',
  3670,
  ARRAY['luxury spa', 'massage', 'wellness', 'hotel spa']
),
(
  'Nuat Thai Foot & Body Massage',
  'nuat-thai-angeles',
  'Authentic Thai massage at affordable prices. Clean facilities and skilled therapists trained in Thailand.',
  'Don Juico Avenue, Malabanias',
  'Angeles City',
  'Pampanga',
  '(045) 436 7890',
  'spa',
  ARRAY['Air Conditioning', 'Private Rooms'],
  ARRAY['Thai Massage', 'Foot Massage', 'Body Massage', 'Oil Massage'],
  4.4,
  312,
  false,
  'active',
  'basic',
  2890,
  ARRAY['thai massage', 'foot massage', 'affordable']
);

-- DENTAL CLINICS IN ANGELES CITY
INSERT INTO directory_listings (
  name, slug, description, address, city, province, phone,
  category, amenities, services, average_rating, review_count,
  is_featured, status, listing_tier, view_count, keywords
) VALUES 
(
  'Gerochi Dental Clinic',
  'gerochi-dental-angeles',
  'Modern dental clinic with state-of-the-art equipment. Experienced dentists providing comprehensive dental care.',
  '2nd Floor, Jenra Mall, Dau',
  'Angeles City',
  'Pampanga',
  '(045) 322 9999',
  'dental',
  ARRAY['Air Conditioning', 'Modern Equipment', 'Parking', 'Wheelchair Accessible'],
  ARRAY['Dental Cleaning', 'Tooth Extraction', 'Fillings', 'Braces', 'Root Canal', 'Teeth Whitening'],
  4.6,
  145,
  true,
  'active',
  'premium',
  2340,
  ARRAY['dentist', 'braces', 'dental cleaning', 'root canal']
),
(
  'Smile City Dental',
  'smile-city-dental',
  'Family-friendly dental clinic with gentle dentists specializing in pediatric dentistry and orthodontics.',
  'McArthur Highway, Balibago',
  'Angeles City',
  'Pampanga',
  '0917 777 8888',
  'dental',
  ARRAY['Air Conditioning', 'TV', 'Kids Area', 'Parking'],
  ARRAY['Pediatric Dentistry', 'Braces', 'Dental Cleaning', 'Fillings', 'Fluoride Treatment'],
  4.5,
  89,
  false,
  'active',
  'basic',
  1450,
  ARRAY['pediatric dentist', 'kids dentist', 'family dentist', 'braces']
);

-- PET STORES IN ANGELES CITY
INSERT INTO directory_listings (
  name, slug, description, address, city, province, phone,
  category, amenities, services, average_rating, review_count,
  is_featured, status, listing_tier, view_count, keywords
) VALUES 
(
  'Pet Express Clark',
  'pet-express-clark',
  'One-stop shop for all pet needs. Wide selection of premium pet food, accessories, and grooming services.',
  'SM City Clark, Lower Ground Floor',
  'Angeles City',
  'Pampanga',
  '(045) 599 4567',
  'pet-store',
  ARRAY['Air Conditioning', 'Parking'],
  ARRAY['Pet Food', 'Pet Supplies', 'Grooming', 'Pet Accessories', 'Veterinary Products'],
  4.3,
  178,
  true,
  'active',
  'premium',
  2890,
  ARRAY['pet store', 'pet food', 'dog food', 'cat food', 'pet grooming']
),
(
  'Pet Buddy Grooming Salon',
  'pet-buddy-grooming',
  'Professional pet grooming with experienced groomers. Gentle care for dogs and cats of all sizes.',
  'Fil-Am Friendship Highway, Clarkview',
  'Angeles City',
  'Pampanga',
  '0918 222 3333',
  'pet-store',
  ARRAY['Air Conditioning', 'Grooming Area', 'Parking'],
  ARRAY['Pet Grooming', 'Full Groom', 'Bath & Dry', 'Nail Trim', 'Ear Cleaning'],
  4.6,
  234,
  false,
  'active',
  'basic',
  1980,
  ARRAY['pet grooming', 'dog grooming', 'cat grooming']
);

-- ============================================================================
-- DIRECTORY LISTINGS - SAN FERNANDO
-- ============================================================================

-- RESTAURANTS IN SAN FERNANDO
INSERT INTO directory_listings (
  name, slug, description, address, city, province, phone,
  category, amenities, services, average_rating, review_count,
  is_featured, status, listing_tier, view_count, keywords
) VALUES 
(
  'Everybody''s Cafe',
  'everybodys-cafe-san-fernando',
  'Historic Kapampangan restaurant since 1950s. Famous for authentic Pampanga dishes like bringhe, morcon, and tidtad.',
  '1034 Miranda Street, Sto. Rosario',
  'San Fernando',
  'Pampanga',
  '(045) 961 1234',
  'restaurant',
  ARRAY['Air Conditioning', 'Parking', 'Function Rooms'],
  ARRAY['Dine-in', 'Takeout', 'Catering', 'Buffet', 'Private Events'],
  4.5,
  423,
  true,
  'active',
  'premium',
  4560,
  ARRAY['kapampangan food', 'historic', 'pampanga cuisine', 'bringhe']
),
(
  'Apag Marangle',
  'apag-marangle-san-fernando',
  'Farm-to-table Kapampangan restaurant set in a garden. Fresh ingredients and traditional cooking methods.',
  'Villa Gloria, Barangay Telabastagan',
  'San Fernando',
  'Pampanga',
  '(045) 436 5678',
  'restaurant',
  ARRAY['Air Conditioning', 'Outdoor Seating', 'Garden Setting', 'Parking'],
  ARRAY['Dine-in', 'Private Dining', 'Farm to Table', 'Traditional'],
  4.7,
  289,
  true,
  'active',
  'premium',
  3780,
  ARRAY['farm to table', 'garden restaurant', 'kapampangan', 'traditional']
),
(
  'Cafe de Bonifacio',
  'cafe-de-bonifacio',
  'Charming cafe serving Filipino-Spanish fusion cuisine. Beautiful heritage house setting perfect for intimate dining.',
  'V. Tiomico Street, Sto. Rosario',
  'San Fernando',
  'Pampanga',
  '0917 444 5555',
  'cafe',
  ARRAY['Air Conditioning', 'Parking', 'Heritage House', 'Private Rooms'],
  ARRAY['Dine-in', 'Reservations', 'Coffee', 'Desserts', 'Wine'],
  4.4,
  156,
  false,
  'active',
  'basic',
  1670,
  ARRAY['heritage cafe', 'spanish filipino', 'intimate dining', 'coffee']
);

-- SALONS IN SAN FERNANDO
INSERT INTO directory_listings (
  name, slug, description, address, city, province, phone,
  category, amenities, services, average_rating, review_count,
  is_featured, status, listing_tier, view_count, keywords
) VALUES 
(
  'Toni & Guy San Fernando',
  'toni-guy-san-fernando',
  'International salon brand bringing London hair trends to Pampanga. Expert colorists and stylists.',
  'Robinsons Starmills, San Fernando',
  'San Fernando',
  'Pampanga',
  '(045) 458 1234',
  'salon',
  ARRAY['Air Conditioning', 'WiFi', 'TV', 'Premium Products'],
  ARRAY['Haircut', 'Color', 'Balayage', 'Treatment', 'Styling'],
  4.5,
  134,
  true,
  'active',
  'premium',
  2340,
  ARRAY['international salon', 'hair color', 'balayage', 'premium']
);

-- ============================================================================
-- DIRECTORY LISTINGS - CLARK
-- ============================================================================

INSERT INTO directory_listings (
  name, slug, description, address, city, province, phone,
  category, amenities, services, average_rating, review_count,
  is_featured, status, listing_tier, view_count, keywords
) VALUES 
(
  'Cafe地中海',
  'cafe-mediterranean-clark',
  'Authentic Mediterranean cuisine in the heart of Clark. Fresh hummus, kebabs, and falafel in a relaxed setting.',
  'Clark Freeport Zone, near Mimosa',
  'Clark',
  'Pampanga',
  '(045) 599 8765',
  'restaurant',
  ARRAY['Air Conditioning', 'Parking', 'Outdoor Seating', 'WiFi'],
  ARRAY['Dine-in', 'Takeout', 'Mediterranean', 'Halal Options'],
  4.4,
  123,
  false,
  'active',
  'basic',
  1560,
  ARRAY['mediterranean', 'hummus', 'kebab', 'halal']
),
(
  'Pubble Park Cafe',
  'pubble-park-clark',
  'Unique bubble tea and Korean snacks cafe. Perfect spot for students and young professionals.',
  'Clark Education City, Manuel A. Roxas Highway',
  'Clark',
  'Pampanga',
  '0919 333 4444',
  'cafe',
  ARRAY['Air Conditioning', 'WiFi', 'Study Area', 'Parking'],
  ARRAY['Bubble Tea', 'Korean Snacks', 'Coffee', 'Study Space'],
  4.3,
  89,
  false,
  'active',
  'free',
  980,
  ARRAY['bubble tea', 'korean snacks', 'study cafe', 'clark']
);

-- ============================================================================
-- ARTICLES - CONTENT SITE
-- ============================================================================

INSERT INTO articles (
  slug, title, meta_description, keywords, excerpt, content, category, subcategory, tags, city, is_local_content, ai_generated, status, published_at, view_count, author
) VALUES 
(
  'best-sisig-angeles-city',
  'Where to Find the Best Sisig in Angeles City: A Local''s Guide',
  'Discover the top places to eat authentic Kapampangan sisig in Angeles City. From traditional to modern twists, find the best sisig spots.',
  ARRAY['sisig', 'angeles city', 'kapampangan food', 'best sisig', 'pampanga cuisine'],
  'Angeles City is the undisputed sisig capital of the Philippines. Here are the top spots where locals go for the perfect plate of sizzling sisig.',
  '<h2>The Origin of Sisig</h2><p>Sisig, the iconic Kapampangan dish made from pig''s face and ears, was born right here in Angeles City. Lucia Cunanan, fondly known as Aling Lucing, created this beloved dish in the 1970s, forever changing Filipino cuisine.</p><h2>Top Sisig Spots in Angeles City</h2><h3>1. Aling Lucing''s Sisig</h3><p>The original and still one of the best. Located on Glaciano Valdez Street, this unassuming spot serves the authentic sisig that started it all. The balance of crispy and tender bits, the perfect sourness from calamansi, and that signature sizzle make it a must-try.</p><h3>2. Mila''s Tokwa''t Baboy</h3><p>While famous for their tokwa''t baboy, Mila''s sisig is equally legendary. Located in San Angelo, their version has a unique texture that keeps locals coming back.</p><h3>3. Bobby''s Sisig</h3><p>A favorite among night owls, Bobby''s serves sisig until the early morning hours. Their spicy version is particularly popular among younger crowds.</p><h2>What Makes Great Sisig</h2><ul><li>Fresh ingredients from local markets</li><li>Perfect balance of crispy and chewy textures</li><li>Right amount of sourness from calamansi</li><li>Spice level that complements without overwhelming</li><li>Served sizzling hot on a metal plate</li></ul><p>Whether you''re a first-time visitor or a longtime resident, these sisig spots in Angeles City offer an authentic taste of Kapampangan culinary heritage.</p>',
  'food',
  'Restaurant Reviews',
  ARRAY['food', 'sisig', 'angeles city', 'pampanga', 'kapampangan'],
  'Angeles City',
  true,
  true,
  'published',
  NOW() - INTERVAL '2 days',
  1240,
  'Julie Santos'
),
(
  'top-things-to-do-clark-pampanga',
  'Top 10 Things to Do in Clark, Pampanga: 2024 Travel Guide',
  'Plan your perfect trip to Clark, Pampanga with our comprehensive guide to attractions, activities, and hidden gems.',
  ARRAY['clark pampanga', 'things to do', 'travel guide', 'clark attractions', 'pampanga tourism'],
  'From hot air balloon festivals to duty-free shopping, Clark offers something for everyone. Here are the top 10 experiences you shouldn''t miss.',
  '<h2>Why Visit Clark?</h2><p>Clark Freeport Zone has transformed from a former US military base into a thriving tourism and business hub. Its strategic location, world-class facilities, and proximity to Manila make it an ideal weekend getaway.</p><h2>Top Attractions</h2><h3>1. Clark International Hot Air Balloon Festival</h3><p>Held annually, this spectacular event features colorful hot air balloons from around the world. The 2024 festival promises to be bigger than ever with night glow shows and skydiving exhibitions.</p><h3>2. Dinosaur Island</h3><p>Perfect for families, this prehistoric-themed park features life-sized animatronic dinosaurs, fossil digs, and educational shows.</p><h3>3. Aqua Planet</h3><p>One of Asia''s newest and most modern water parks, featuring world-class slides, wave pools, and lazy rivers.</p><h3>4. Nayong Pilipino Clark</h3><p>A cultural park showcasing replicas of famous Philippine landmarks and traditional architecture from different regions.</p><h3>5. Zoocobia Fun Zoo</h3><p>An interactive zoo where visitors can feed animals, enjoy gravity car rides, and learn about wildlife conservation.</p><h2>Shopping and Dining</h2><p>Clark is home to SM City Clark, the largest shopping mall in Central Luzon, and numerous duty-free shops. The growing food scene offers everything from local Kapampangan cuisine to international fine dining.</p><h2>Where to Stay</h2><p>From luxury resorts like Hilton and Quest to budget-friendly options, Clark has accommodations for every traveler.</p>',
  'travel',
  'Destinations',
  ARRAY['travel', 'clark', 'pampanga', 'attractions', 'tourism'],
  'Clark',
  true,
  true,
  'published',
  NOW() - INTERVAL '5 days',
  2890,
  'Julie Santos'
),
(
  'ofw-remittance-guide-2024',
  'Complete OFW Remittance Guide 2024: Best Ways to Send Money to the Philippines',
  'Compare the best remittance options for OFWs. Find lowest fees, best exchange rates, and fastest transfer times.',
  ARRAY['ofw', 'remittance', 'send money philippines', 'money transfer', 'ofw tips'],
  'Sending money home shouldn''t cost a fortune. Our comprehensive guide compares all major remittance services to help you get the best deal.',
  '<h2>The Real Cost of Sending Money Home</h2><p>For millions of Overseas Filipino Workers (OFWs), remittances are a lifeline for families back home. But hidden fees and poor exchange rates can eat up a significant portion of hard-earned money.</p><h2>Best Remittance Options</h2><h3>1. Wise (formerly TransferWise)</h3><p>Known for transparent fees and real exchange rates. Great for bank-to-bank transfers with low markup.</p><h3>2. Remitly</h3><p>Offers both economy and express options. First-time users often get promotional rates.</p><h3>3. Western Union</h3><p>Still the most accessible with thousands of pickup locations across the Philippines. Best for recipients without bank accounts.</p><h3>4. GCash via Remittance Partners</h3><p>Direct to mobile wallet transfers. Convenient for tech-savvy families.</p><h2>What to Watch Out For</h2><ul><li>Hidden fees in exchange rate margins</li><li>Transfer limits and documentation requirements</li><li>Pickup location accessibility for your family</li><li>Processing times during holidays</li></ul><h2>Tips to Save on Remittances</h2><p>Compare rates regularly, send larger amounts less frequently to reduce fee impact, and consider digital wallets for faster, cheaper transfers.</p>',
  'ofw',
  'Remittance',
  ARRAY['ofw', 'remittance', 'money transfer', 'finance', 'tips'],
  null,
  false,
  true,
  'published',
  NOW() - INTERVAL '1 week',
  4560,
  'Pinky AI'
),
(
  'small-business-marketing-tips-philippines',
  '10 Proven Marketing Tips for Small Businesses in the Philippines',
  'Learn effective marketing strategies that work for Filipino small businesses. From social media to local SEO, grow your business today.',
  ARRAY['small business', 'marketing', 'philippines', 'business tips', 'social media marketing'],
  'Growing your small business doesn''t require a big budget. These proven marketing strategies have helped hundreds of Filipino entrepreneurs succeed.',
  '<h2>Why Traditional Marketing Doesn''t Work Anymore</h2><p>The Philippine market has changed. While soft launches with balloons and tarpaulins still happen, smart business owners are going digital. Here''s what actually works in 2024.</p><h2>10 Marketing Strategies That Work</h2><h3>1. Facebook is Still King</h3><p>With 90+ million Filipinos on Facebook, your business needs a professional page. Post consistently, engage with comments, and use Facebook Marketplace.</p><h3>2. Google Business Profile</h3><p>Claim your listing. When someone searches "restaurant near me" or "salon in [city]," you want to appear. It''s free and essential.</p><h3>3. TikTok for Business</h3><p>The fastest-growing platform in the Philippines. Even simple behind-the-scenes content can go viral and drive real customers.</p><h3>4. Partner with Micro-Influencers</h3><p>Instead of expensive celebrities, work with local influencers who have 1,000-10,000 engaged followers in your area.</p><h3>5. GCash Promotions</h3><p>Use GCash''s business features. QR codes, promotions, and cashback offers drive repeat customers.</p><h3>6. Local Facebook Groups</h3><p>Join community groups where your customers hang out. Share value, not just promotions.</p><h3>7. SMS Marketing</h3><p>Still incredibly effective in the Philippines. Collect numbers (with consent) and send personalized offers.</p><h3>8. Referral Programs</h3><p>Filipinos trust recommendations from friends. Reward customers who bring new business.</p><h3>9. Local SEO</h3><p>Optimize your website for "[service] in [city]" searches. Most Filipino businesses ignore this, so it''s easy to rank.</p><h3>10. Consistent Branding</h3><p>Professional photos, consistent colors, and clear messaging build trust. First impressions matter.</p><h2>Start Small, Scale Smart</h2><p>You don''t need to do everything at once. Pick 2-3 strategies that fit your business and do them well.</p>',
  'business',
  'Marketing',
  ARRAY['business', 'marketing', 'small business', 'tips', 'philippines'],
  null,
  false,
  true,
  'published',
  NOW() - INTERVAL '3 days',
  3120,
  'Pinky AI'
),
(
  'chicken-adobo-recipe-authentic',
  'Authentic Filipino Chicken Adobo Recipe: Lola''s Secret Method',
  'Learn how to cook authentic Filipino chicken adobo with this heirloom recipe passed down through generations.',
  ARRAY['chicken adobo recipe', 'filipino recipe', 'adobo', 'filipino food', 'cooking'],
  'The secret to perfect adobo isn''t just the ingredients—it''s the technique. Learn Lola''s time-tested method for the most flavorful chicken adobo.',
  '<h2>What Makes Perfect Adobo</h2><p>Every Filipino family has their own adobo recipe. Some like it saucy, others prefer it dry. Some add coconut milk, others keep it traditional. This recipe balances all the elements that make adobo the Philippines'' unofficial national dish.</p><h2>Ingredients</h2><ul><li>1 kg chicken (thighs and legs work best)</li><li>1/2 cup soy sauce</li><li>1/3 cup vinegar (cane or coconut)</li><li>1 head garlic, crushed</li><li>1 bay leaf</li><li>1 tsp whole peppercorns</li><li>1 cup water</li><li>2 tbsp cooking oil</li><li>1 tbsp brown sugar (optional)</li></ul><h2>Lola''s Secret Method</h2><h3>Step 1: The Marinade</h3><p>Marinate chicken in soy sauce, half the garlic, and peppercorns for at least 30 minutes. Overnight is better.</p><h3>Step 2: Brown the Chicken</h3><p>Heat oil in a heavy pot. Brown chicken pieces on all sides. This creates depth of flavor. Don''t skip this step!</p><h3>Step 3: The Simmer</h3><p>Add marinade, vinegar, water, and bay leaf. Do NOT stir after adding vinegar—let it boil first. This prevents a sour, uncooked vinegar taste.</p><h3>Step 4: Low and Slow</h3><p>Simmer covered for 30 minutes, then uncovered for 15 more to reduce the sauce. The chicken should be fork-tender.</p><h3>Step 5: The Finishing Touch</h3><p>Sauté remaining garlic in oil until golden. Pour over adobo before serving. This is the secret!</p><h2>Serving Suggestions</h2><p>Serve with steaming white rice and atchara. The sauce should be savory-sour with a hint of sweetness. Perfect for Sunday family lunches.</p>',
  'food',
  'Recipes',
  ARRAY['recipe', 'adobo', 'chicken', 'filipino food', 'cooking'],
  null,
  false,
  true,
  'published',
  NOW() - INTERVAL '4 days',
  6780,
  'Julie Santos'
);

-- ============================================================================
-- UPDATE VIEWS
-- ============================================================================

-- Refresh the analytics views
REFRESH MATERIALIZED VIEW daily_posting_summary;

-- ============================================================================
-- SEED COMPLETE
-- ============================================================================

SELECT 'Dummy data seeded successfully!' as status;
SELECT 
  (SELECT COUNT(*) FROM directory_listings) as directory_listings_count,
  (SELECT COUNT(*) FROM articles WHERE status = 'published') as published_articles_count;
