
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PG {
  id: number;
  name: string;
  description: string | null;
  location: string;
  rent: number;
  room_type: string;
  gender: string;
  rating: number;
  review_count: number;
  images: string[];
  amenities: string[];
  nearby_places: string[];
  pg_rules: string[];
  maintenance_fee: number;
  security_deposit: number;
  verified: boolean;
  available: boolean;
  created_at: string;
  updated_at: string;
  // New fields added in migration
  owner_id?: string | null;
  status?: string;
  featured?: boolean;
  virtual_tour_url?: string | null;
  video_url?: string | null;
  property_age?: number | null;
  total_floors?: number | null;
  property_type?: string | null;
  furnishing_status?: string | null;
  balcony_count?: number;
  bathroom_count?: number;
  parking_available?: boolean;
  meal_service?: boolean;
  laundry_service?: boolean;
  cleaning_service?: boolean;
  metro_distance?: number | null;
  bus_distance?: number | null;
  hospital_distance?: number | null;
  mall_distance?: number | null;
}

export const usePGs = () => {
  return useQuery({
    queryKey: ['pgs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pgs')
        .select('*')
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as PG[];
    },
  });
};

export const usePG = (id: number) => {
  return useQuery({
    queryKey: ['pg', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pgs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as PG;
    },
    enabled: !!id,
  });
};
