
-- Create owners table for property owners
CREATE TABLE public.owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  pan_number TEXT,
  gstin TEXT,
  address TEXT,
  kyc_verified BOOLEAN DEFAULT false,
  trust_score INTEGER DEFAULT 0,
  total_properties INTEGER DEFAULT 0,
  total_bookings INTEGER DEFAULT 0,
  total_revenue DECIMAL DEFAULT 0,
  commission_rate DECIMAL DEFAULT 0.10,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create profiles table for users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT false,
  trust_score INTEGER DEFAULT 0,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Update PGs table with owner relationship and enhanced fields
ALTER TABLE public.pgs 
ADD COLUMN owner_id UUID REFERENCES public.owners(id),
ADD COLUMN status TEXT DEFAULT 'active',
ADD COLUMN featured BOOLEAN DEFAULT false,
ADD COLUMN virtual_tour_url TEXT,
ADD COLUMN video_url TEXT,
ADD COLUMN property_age INTEGER,
ADD COLUMN total_floors INTEGER,
ADD COLUMN property_type TEXT DEFAULT 'independent',
ADD COLUMN furnishing_status TEXT DEFAULT 'semi-furnished',
ADD COLUMN balcony_count INTEGER DEFAULT 0,
ADD COLUMN bathroom_count INTEGER DEFAULT 1,
ADD COLUMN parking_available BOOLEAN DEFAULT false,
ADD COLUMN meal_service BOOLEAN DEFAULT false,
ADD COLUMN laundry_service BOOLEAN DEFAULT false,
ADD COLUMN cleaning_service BOOLEAN DEFAULT false,
ADD COLUMN metro_distance INTEGER,
ADD COLUMN bus_distance INTEGER,
ADD COLUMN hospital_distance INTEGER,
ADD COLUMN mall_distance INTEGER;

-- Create wishlist table
CREATE TABLE public.wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  pg_id BIGINT REFERENCES public.pgs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, pg_id)
);

-- Update reviews table with enhanced fields
ALTER TABLE public.reviews 
ADD COLUMN user_id UUID REFERENCES auth.users(id),
ADD COLUMN cleanliness_rating INTEGER,
ADD COLUMN food_rating INTEGER,
ADD COLUMN safety_rating INTEGER,
ADD COLUMN location_rating INTEGER,
ADD COLUMN value_rating INTEGER,
ADD COLUMN photos TEXT[] DEFAULT '{}',
ADD COLUMN helpful_count INTEGER DEFAULT 0,
ADD COLUMN verified_stay BOOLEAN DEFAULT false,
ADD COLUMN stay_duration INTEGER,
ADD COLUMN room_type TEXT;

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id BIGINT REFERENCES public.bookings(id),
  user_id UUID REFERENCES auth.users(id),
  owner_id UUID REFERENCES public.owners(id),
  stripe_payment_intent_id TEXT,
  amount DECIMAL NOT NULL,
  commission_amount DECIMAL,
  owner_payout_amount DECIMAL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  failure_reason TEXT,
  processed_at TIMESTAMPTZ,
  payout_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create analytics table for tracking
CREATE TABLE public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL, -- 'pg', 'booking', 'user', 'owner'
  entity_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'view', 'contact', 'booking', 'payment'
  metadata JSONB,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create property verifications table
CREATE TABLE public.property_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pg_id BIGINT REFERENCES public.pgs(id) ON DELETE CASCADE,
  verification_type TEXT NOT NULL, -- 'document', 'physical', 'photos'
  status TEXT DEFAULT 'pending',
  verified_by TEXT,
  notes TEXT,
  documents TEXT[] DEFAULT '{}',
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Update bookings table with enhanced fields
ALTER TABLE public.bookings 
ADD COLUMN user_id UUID REFERENCES auth.users(id),
ADD COLUMN payment_id UUID REFERENCES public.payments(id),
ADD COLUMN room_number TEXT,
ADD COLUMN special_requests TEXT,
ADD COLUMN check_in_date DATE,
ADD COLUMN check_out_date DATE,
ADD COLUMN cancelled_at TIMESTAMPTZ,
ADD COLUMN cancellation_reason TEXT;

-- Enable RLS on all new tables
ALTER TABLE public.owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_verifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for owners
CREATE POLICY "Owners can view their own data" ON public.owners FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Owners can update their own data" ON public.owners FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Anyone can create owner profile" ON public.owners FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view basic owner info" ON public.owners FOR SELECT USING (status = 'active');

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Auto-create profile on signup" ON public.profiles FOR INSERT WITH CHECK (id = auth.uid());

-- Create RLS policies for wishlists
CREATE POLICY "Users can manage their wishlist" ON public.wishlists FOR ALL USING (user_id = auth.uid());

-- Create RLS policies for payments
CREATE POLICY "Users can view their payments" ON public.payments FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Owners can view their payments" ON public.payments FOR SELECT USING (owner_id IN (SELECT id FROM public.owners WHERE user_id = auth.uid()));

-- Create RLS policies for notifications
CREATE POLICY "Users can view their notifications" ON public.notifications FOR ALL USING (user_id = auth.uid());

-- Create RLS policies for analytics (admin only for now)
CREATE POLICY "Public insert for analytics" ON public.analytics FOR INSERT WITH CHECK (true);

-- Create function to auto-create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_pgs_owner_id ON public.pgs(owner_id);
CREATE INDEX idx_pgs_location ON public.pgs(location);
CREATE INDEX idx_pgs_rent ON public.pgs(rent);
CREATE INDEX idx_pgs_rating ON public.pgs(rating);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_pg_id ON public.bookings(pg_id);
CREATE INDEX idx_payments_booking_id ON public.payments(booking_id);
CREATE INDEX idx_analytics_entity ON public.analytics(entity_type, entity_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_wishlists_user_id ON public.wishlists(user_id);
