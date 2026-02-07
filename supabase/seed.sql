-- ============================================================================
-- BE SEEN.PH - SEED DATA
-- Sample data for testing
-- ============================================================================

-- Note: Run this after migrations
-- This seed creates sample businesses matching the mock data

-- Sample businesses
INSERT INTO business_profiles (
    id, name, slug, description, category, city, address,
    latitude, longitude, phone, email, status, verification_status,
    primary_color, secondary_color, hours, amenities, services
) VALUES 
-- Angeles City
(
    '11111111-1111-1111-1111-111111111111',
    'Casa Casanova',
    'casa-casanova',
    'A hidden gem offering the best sisig in Angeles City. Family-owned since 1985, serving authentic Kapampangan cuisine with modern twists.',
    'Restaurants',
    'Angeles City',
    '123 Fields Avenue, Balibago',
    15.1682, 120.5869,
    '+63 45 123 4567',
    'info@casacasanova.ph',
    'active', 'verified',
    '#d946ef', '#06b6d4',
    '{"monday": {"open": "10:00", "close": "22:00"}, "tuesday": {"open": "10:00", "close": "22:00"}, "wednesday": {"open": "10:00", "close": "22:00"}, "thursday": {"open": "10:00", "close": "22:00"}, "friday": {"open": "10:00", "close": "23:00"}, "saturday": {"open": "10:00", "close": "23:00"}, "sunday": {"open": "10:00", "close": "21:00"}}',
    ARRAY['WiFi', 'Air Conditioning', 'Outdoor Seating', 'Private Rooms'],
    ARRAY['Sisig', 'Kare-Kare', 'Crispy Pata', 'Catering', 'Private Events']
),
(
    '22222222-2222-2222-2222-222222222222',
    'Bayanihan Digital',
    'bayanihan-digital',
    'Modern web design and digital marketing agency helping Filipino businesses grow online. Specializing in SEO, social media, and e-commerce.',
    'Services',
    'Angeles City',
    '456 MacArthur Highway, San Nicolas',
    15.1473, 120.5887,
    '+63 45 987 6543',
    'hello@bayanihandigital.com',
    'active', 'unclaimed',
    '#06b6d4', '#d946ef',
    '{"monday": {"open": "09:00", "close": "18:00"}, "tuesday": {"open": "09:00", "close": "18:00"}, "wednesday": {"open": "09:00", "close": "18:00"}, "thursday": {"open": "09:00", "close": "18:00"}, "friday": {"open": "09:00", "close": "18:00"}, "saturday": {"closed": true}, "sunday": {"closed": true}}',
    ARRAY['Free Consultation', 'Online Support', 'Payment Plans'],
    ARRAY['Web Design', 'SEO', 'Social Media Marketing', 'E-commerce', 'Branding']
),
(
    '33333333-3333-3333-3333-333333333333',
    'Wild Wings Republic',
    'wild-wings-republic',
    'The ultimate destination for wing lovers! 20+ flavors from mild to wild. Perfect for sports viewing, parties, or just satisfying that wing craving.',
    'Restaurants',
    'Angeles City',
    '789 Friendship Highway, Clarkview',
    15.1856, 120.5601,
    '+63 45 456 7890',
    'wings@wildwings.ph',
    'active', 'verified',
    '#d946ef', '#f59e0b',
    '{"monday": {"open": "11:00", "close": "23:00"}, "tuesday": {"open": "11:00", "close": "23:00"}, "wednesday": {"open": "11:00", "close": "23:00"}, "thursday": {"open": "11:00", "close": "23:00"}, "friday": {"open": "11:00", "close": "02:00"}, "saturday": {"open": "11:00", "close": "02:00"}, "sunday": {"open": "11:00", "close": "23:00"}}',
    ARRAY['Multiple Screens', 'Full Bar', 'Outdoor Patio', 'Delivery'],
    ARRAY['Wings', 'Burgers', 'Craft Beer', 'Cocktails', 'Group Packages']
),

-- Manila
(
    '44444444-4444-4444-4444-444444444444',
    'Manila Creative Studio',
    'manila-creative-studio',
    'Award-winning creative agency specializing in brand identity, motion graphics, and immersive digital experiences for global brands.',
    'Services',
    'Manila',
    '101 BGC High Street, Taguig',
    14.5547, 121.0484,
    '+63 2 8123 4567',
    'hello@manilacreative.ph',
    'active', 'verified',
    '#8b5cf6', '#06b6d4',
    '{"monday": {"open": "09:00", "close": "18:00"}, "tuesday": {"open": "09:00", "close": "18:00"}, "wednesday": {"open": "09:00", "close": "18:00"}, "thursday": {"open": "09:00", "close": "18:00"}, "friday": {"open": "09:00", "close": "17:00"}, "saturday": {"closed": true}, "sunday": {"closed": true}}',
    ARRAY['Free Parking', 'Meeting Rooms', 'Coffee Bar', 'Showroom'],
    ARRAY['Brand Strategy', 'Motion Design', 'AR/VR Experiences', 'Campaign Development']
),
(
    '55555555-5555-5555-5555-555555555555',
    'Calle Luna Café',
    'calle-luna-cafe',
    'Artisan coffee shop in the heart of Manila. Single-origin Philippine beans, house-made pastries, and a cozy atmosphere for remote work.',
    'Restaurants',
    'Manila',
    '202 Escolta Street, Binondo',
    14.5987, 120.9812,
    '+63 2 8987 6543',
    'brew@calleluna.ph',
    'active', 'unclaimed',
    '#f59e0b', '#10b981',
    '{"monday": {"open": "07:00", "close": "21:00"}, "tuesday": {"open": "07:00", "close": "21:00"}, "wednesday": {"open": "07:00", "close": "21:00"}, "thursday": {"open": "07:00", "close": "21:00"}, "friday": {"open": "07:00", "close": "22:00"}, "saturday": {"open": "08:00", "close": "22:00"}, "sunday": {"open": "08:00", "close": "20:00"}}',
    ARRAY['WiFi', 'Power Outlets', 'Outdoor Seating', 'Pet Friendly'],
    ARRAY['Espresso Bar', 'Pour Over', 'Pastries', 'Sandwiches', 'Retail Beans']
),

-- Cebu City
(
    '66666666-6666-6666-6666-666666666666',
    'Cebu Dive Center',
    'cebu-dive-center',
    'PADI 5-Star Dive Center offering courses, fun dives, and dive trips around Cebu best spots. Expert instructors and modern equipment.',
    'Services',
    'Cebu City',
    '303 Mactan Road, Lapu-Lapu',
    10.3157, 123.9664,
    '+63 32 340 1234',
    'dive@cebudive.ph',
    'active', 'verified',
    '#06b6d4', '#10b981',
    '{"monday": {"open": "06:00", "close": "20:00"}, "tuesday": {"open": "06:00", "close": "20:00"}, "wednesday": {"open": "06:00", "close": "20:00"}, "thursday": {"open": "06:00", "close": "20:00"}, "friday": {"open": "06:00", "close": "20:00"}, "saturday": {"open": "06:00", "close": "20:00"}, "sunday": {"open": "06:00", "close": "18:00"}}',
    ARRAY['Equipment Rental', 'Locker Rooms', 'Shower Facilities', 'Beach Access'],
    ARRAY['PADI Courses', 'Fun Dives', 'Dive Trips', 'Equipment Sales', 'Underwater Photography']
),
(
    '77777777-7777-7777-7777-777777777777',
    'Sugbo Mercado',
    'sugbo-mercado',
    'Authentic Cebuano street food market featuring local vendors and traditional dishes. Experience the true flavors of Cebu in one vibrant location.',
    'Restaurants',
    'Cebu City',
    '404 Carbon Market, Cebu City Proper',
    10.2934, 123.9012,
    '+63 32 255 7890',
    'info@sugbomercado.ph',
    'active', 'pending',
    '#f59e0b', '#ef4444',
    '{"monday": {"open": "17:00", "close": "23:00"}, "tuesday": {"open": "17:00", "close": "23:00"}, "wednesday": {"open": "17:00", "close": "23:00"}, "thursday": {"open": "17:00", "close": "23:00"}, "friday": {"open": "17:00", "close": "24:00"}, "saturday": {"open": "17:00", "close": "24:00"}, "sunday": {"open": "17:00", "close": "23:00"}}',
    ARRAY['Live Music', 'Family Friendly', 'Al Fresco', 'Cashless Payment'],
    ARRAY['Lechon', 'Ngohiong', 'Puso Rice', 'BBQ', 'Tuslob Buwa', 'Street Desserts']
);

-- Sample content articles
INSERT INTO content_articles (
    id, business_id, title, slug, content, excerpt, status, 
    featured_image_url, published_at, view_count
) VALUES 
(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    'The Secret History of Sisig: From Pampanga to Global Fame',
    'history-of-sisig',
    E'Every sizzling plate of sisig tells a story\u2014one of resilience, innovation, and the unbreakable spirit of Kapampangan cuisine. From humble beginnings in Pampanga rice fields to Michelin-starred restaurants worldwide, sisig has conquered the culinary world while remaining deeply rooted in Filipino tradition.\n\n## Origins in Pampanga\n\nThe story begins in the 1700s, when sisig was created as a way to use pig ears and cheeks that were discarded during meat processing. Lucia Cunanan, known as Aling Lucing, elevated the dish in the 1970s by grilling the meat and adding onions, chili peppers, and calamansi.\n\n## Evolution Through Generations\n\nToday, sisig comes in countless variations: pork, chicken, tuna, tofu, and even exotic options like crocodile. Yet the essence remains the same\u2014a perfect balance of savory, sour, and spicy flavors that awaken the palate.\n\n## Casa Casanova Secret Recipe\n\nAt Casa Casanova, we\'ve perfected our family recipe over three generations. Our secret? Premium pork belly, slow-grilled over charcoal, mixed with our proprietary blend of spices and served on a sizzling plate with a fresh egg on top.',
    'Discover the fascinating journey of sisig from Pampanga street food to global culinary phenomenon.',
    'published',
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
    NOW() - INTERVAL '2 days',
    342
),
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '11111111-1111-1111-1111-111111111111',
    'Clark Travel Guide: Best Restaurants Near the Airport',
    'clark-airport-dining-guide',
    E'Flying through Clark International Airport? Don\'t miss these culinary gems just minutes from the terminal. From quick bites to leisurely dinners, we\'ve curated the ultimate dining guide for travelers.\n\n## Quick Eats (Under 30 Minutes)\n\n- **Casa Casanova Express** - Our grab-and-go sisig rice bowls perfect for travelers\n- **Noypi Noodles** - Authentic pancit in 5 minutes flat\n- **Bayanihan Bakeshop** - Fresh pandesal and pastries\n\n## Sit-Down Restaurants\n\nFor those with more time, Fields Avenue offers an incredible variety of dining options representing cuisines from around the world.\n\n## Local Favorites\n\nDon\'t leave without trying:\n- Authentic Kapampangan sisig\n- Murcon (Filipino meatloaf)\n- Bringhe (local paella)\n- Tibok-tibok (coconut milk pudding)\n\n## Getting There\n\nMost restaurants are accessible via tricycle (PHP 50-100) or Grab from the airport terminal.',
    'Complete dining guide for travelers at Clark International Airport featuring the best local restaurants and quick eats.',
    'published',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    NOW() - INTERVAL '5 days',
    567
);

-- Sample social feed posts
INSERT INTO social_feed (
    id, business_id, author_id, content, post_type, 
    likes_count, created_at
) VALUES 
(
    'feed0001-feed-feed-feed-feed00000001',
    '11111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    E'\ud83d\udd25 NEW FLAVOR ALERT: Spicy Garlic Parmesan Wings are now available! Perfect for those who like it hot AND flavorful. Try them this weekend! #WildWings #NewFlavor #AngelesCity',
    'promo',
    24,
    NOW() - INTERVAL '2 hours'
),
(
    'feed0002-feed-feed-feed-feed00000002',
    '11111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    E'\ud83c\udfc6 We just hit 10,000 followers! Thank you to all our loyal customers. Here is to many more years of serving the best sisig in Pampanga! \ud83e\udd73',
    'milestone',
    156,
    NOW() - INTERVAL '1 day'
);

-- Sample reviews
INSERT INTO reviews (
    id, business_id, rating, title, content, 
    helpful_count, status, is_verified, created_at
) VALUES 
(
    'rev00001-rev0-rev0-rev0-rev00000001',
    '11111111-1111-1111-1111-111111111111',
    5,
    'Best Sisig I Have Ever Tasted!',
    E'I have been to many Filipino restaurants but Casa Casanova takes the crown. The sisig was perfectly crispy on the outside, tender inside, and the balance of flavors was incredible. The sizzling plate presentation with the fresh egg on top is pure theater! Will definitely be back.',
    12,
    'approved',
    true,
    NOW() - INTERVAL '3 days'
),
(
    'rev00002-rev0-rev0-rev0-rev00000002',
    '11111111-1111-1111-1111-111111111111',
    4,
    'Great Food, Long Wait',
    E'The food is absolutely worth the hype, but be prepared to wait especially on weekends. We waited 45 minutes for a table. Pro tip: come early or make a reservation!',
    8,
    'approved',
    true,
    NOW() - INTERVAL '1 week'
);
