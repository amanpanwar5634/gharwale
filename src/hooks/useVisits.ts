
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VisitData {
  pg_id: number;
  visitor_name: string;
  visitor_email: string;
  visitor_phone: string;
  visit_date: string;
  visit_time: string;
}

export const useScheduleVisit = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (visitData: VisitData) => {
      const { data, error } = await supabase
        .from('visits')
        .insert([visitData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] });
      toast({
        title: "Visit Scheduled!",
        description: "Your visit has been scheduled successfully. We'll send you a confirmation shortly.",
      });
    },
    onError: (error) => {
      console.error('Visit scheduling error:', error);
      toast({
        title: "Scheduling Failed",
        description: "There was an error scheduling your visit. Please try again.",
        variant: "destructive",
      });
    },
  });
};
