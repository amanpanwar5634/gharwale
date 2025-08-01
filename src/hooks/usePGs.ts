
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
