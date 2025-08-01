
-- Create tables for PGs, bookings, and reviews
CREATE TABLE pgs (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  rent INTEGER NOT NULL,
  room_type TEXT NOT NULL CHECK (room_type IN ('Single', 'Double', 'Triple')),
  gender TEXT NOT NULL CHECK (gender IN ('Boys', 'Girls', 'Co-ed')),
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  nearby_places TEXT[] DEFAULT '{}',
  pg_rules TEXT[] DEFAULT '{}',
  maintenance_fee INTEGER DEFAULT 0,
  security_deposit INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table (without user authentication for now)
CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  pg_id BIGINT REFERENCES pgs(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  move_in_date DATE NOT NULL,
  duration_months INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  booking_fee INTEGER DEFAULT 999,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create visits table for scheduling
CREATE TABLE visits (
  id BIGSERIAL PRIMARY KEY,
  pg_id BIGINT REFERENCES pgs(id) ON DELETE CASCADE,
  visitor_name TEXT NOT NULL,
  visitor_email TEXT NOT NULL,
  visitor_phone TEXT NOT NULL,
  visit_date DATE NOT NULL,
  visit_time TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  pg_id BIGINT REFERENCES pgs(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO pgs (name, description, location, rent, room_type, gender, rating, review_count, images, amenities, nearby_places, pg_rules, maintenance_fee, security_deposit, verified) VALUES 
(
  'Premium Boys PG Koramangala',
  'Experience luxury living in the heart of Koramangala with our premium PG accommodation. Perfect for working professionals and students.',
  'Koramangala, Bangalore',
  12000,
  'Single',
  'Boys',
  5.0,
  12,
  ARRAY['https://images.unsplash.com/photo-1555854877-bab0e460b513', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'],
  ARRAY['High-Speed WiFi', 'Parking', '24/7 Security', 'Meals Included', 'Power Backup'],
  ARRAY['Forum Mall - 0.5 km', 'Koramangala Metro Station - 0.8 km', 'Total Mall - 1.2 km', 'Manipal Hospital - 1.5 km'],
  ARRAY['No smoking inside rooms', 'Visitors allowed till 10 PM', 'Monthly rent due by 5th', '1 month notice for leaving'],
  2000,
  12000,
  true
),
(
  'Girls PG Near Whitefield Tech Park',
  'Safe and comfortable accommodation for working women near major tech parks.',
  'Whitefield, Bangalore',
  10500,
  'Double',
  'Girls',
  4.0,
  8,
  ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c045efd7', 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc'],
  ARRAY['High-Speed WiFi', '24/7 Security', 'Meals Included', 'Laundry Service'],
  ARRAY['ITPL - 1.2 km', 'Forum Shantiniketan - 0.8 km', 'Phoenix MarketCity - 2 km'],
  ARRAY['No male visitors after 8 PM', 'Rent due by 5th of every month', 'ID proof mandatory'],
  2000,
  10500,
  true
),
(
  'Modern Co-ed PG HSR Layout',
  'Contemporary living spaces with modern amenities in the heart of HSR Layout.',
  'HSR Layout, Bangalore',
  11000,
  'Single',
  'Co-ed',
  5.0,
  15,
  ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
  ARRAY['High-Speed WiFi', 'Gym', 'Power Backup', 'Housekeeping', 'Common Area'],
  ARRAY['HSR BDA Complex - 0.3 km', 'Central Mall - 1 km', 'Agara Lake - 1.5 km'],
  ARRAY['Visitors allowed till 10 PM', 'No parties or loud music', 'Advance notice for extended stays'],
  2500,
  11000,
  true
),
(
  'Budget Friendly Boys PG Electronic City',
  'Affordable accommodation with essential amenities for students and professionals.',
  'Electronic City, Bangalore',
  8500,
  'Triple',
  'Boys',
  4.0,
  10,
  ARRAY['https://images.unsplash.com/photo-1560448204-603b3fc33ddc', 'https://images.unsplash.com/photo-1555854877-bab0e460b513'],
  ARRAY['WiFi', 'Security', 'Basic Meals', 'Parking'],
  ARRAY['Electronic City Metro - 0.5 km', 'Infosys Campus - 1 km', 'Forum Mall - 2 km'],
  ARRAY['No smoking', 'Visitors till 9 PM', 'Monthly rent advance'],
  1500,
  8500,
  true
),
(
  'Luxury Girls PG Indiranagar',
  'Premium accommodation with high-end amenities in vibrant Indiranagar.',
  'Indiranagar, Bangalore',
  15000,
  'Single',
  'Girls',
  5.0,
  25,
  ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'],
  ARRAY['High-Speed WiFi', 'Gym', 'Swimming Pool', 'Housekeeping', 'Security', 'Parking'],
  ARRAY['Indiranagar Metro - 0.3 km', '100 Feet Road - 0.2 km', 'CMH Road - 0.5 km'],
  ARRAY['Professional guests only', 'No overnight guests', 'Advance booking required'],
  3000,
  15000,
  true
),
(
  'Affordable Co-ed PG Marathahalli',
  'Budget-friendly option with good connectivity to IT corridor.',
  'Marathahalli, Bangalore',
  9500,
  'Double',
  'Co-ed',
  4.0,
  18,
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'],
  ARRAY['WiFi', 'Security', 'Meals', 'Laundry', 'Common Room'],
  ARRAY['Marathahalli Bridge - 0.8 km', 'Brookefield Mall - 1.5 km', 'Whitefield - 3 km'],
  ARRAY['Quiet hours after 10 PM', 'Guest register mandatory', 'Monthly cleaning charge'],
  2000,
  9500,
  true
);

-- Enable Row Level Security (RLS) for future use
ALTER TABLE pgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access for now
CREATE POLICY "Allow public read access to pgs" ON pgs FOR SELECT USING (true);
CREATE POLICY "Allow public insert to bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to visits" ON visits FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read access to reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert to reviews" ON reviews FOR INSERT WITH CHECK (true);
