
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const useWishlist = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ['wishlist', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('wishlists')
        .select(`
          *,
          pgs (
            id, name, location, rent, images, rating, review_count, room_type, gender
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const addToWishlist = useMutation({
    mutationFn: async (pgId: number) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('wishlists')
        .insert([{ user_id: user.id, pg_id: pgId }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: "Added to Wishlist",
        description: "PG has been added to your wishlist.",
      });
    },
    onError: (error) => {
      console.error('Wishlist add error:', error);
      toast({
        title: "Failed to Add",
        description: "Could not add PG to wishlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeFromWishlist = useMutation({
    mutationFn: async (pgId: number) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('pg_id', pgId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: "Removed from Wishlist",
        description: "PG has been removed from your wishlist.",
      });
    },
    onError: (error) => {
      console.error('Wishlist remove error:', error);
      toast({
        title: "Failed to Remove",
        description: "Could not remove PG from wishlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const isInWishlist = (pgId: number) => {
    return wishlistItems.some(item => item.pg_id === pgId);
  };

  return {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };
};
