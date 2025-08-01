
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface ReviewData {
  pg_id: number;
  reviewer_name: string;
  reviewer_email: string;
  rating: number;
  comment?: string;
  cleanliness_rating?: number;
  food_rating?: number;
  safety_rating?: number;
  location_rating?: number;
  value_rating?: number;
  stay_duration?: number;
  room_type?: string;
  photos?: string[];
}

export const useReviews = (pgId?: number) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews', pgId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('pg_id', pgId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!pgId,
  });

  const createReview = useMutation({
    mutationFn: async (reviewData: ReviewData) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          ...reviewData,
          user_id: user?.id,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['pgs'] });
      toast({
        title: "Review Posted!",
        description: "Your review has been posted successfully.",
      });
    },
    onError: (error) => {
      console.error('Review creation error:', error);
      toast({
        title: "Review Failed",
        description: "There was an error posting your review. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    reviews,
    isLoading,
    createReview
  };
};
