
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PaymentIntentData {
  amount: number;
  currency?: string;
  booking_id: number;
  user_id: string;
}

export const usePayments = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createPaymentIntent = useMutation({
    mutationFn: async (data: PaymentIntentData) => {
      const { data: paymentIntent, error } = await supabase.functions.invoke('create-payment-intent', {
        body: data
      });

      if (error) throw error;
      return paymentIntent;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
    onError: (error) => {
      console.error('Payment intent creation error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const simulatePaymentSuccess = useMutation({
    mutationFn: async ({ bookingId, paymentIntentId }: { bookingId: number; paymentIntentId: string }) => {
      // Update booking status
      const { error: bookingError } = await supabase
        .from('bookings')
        .update({ status: 'confirmed' })
        .eq('id', bookingId);

      if (bookingError) throw bookingError;

      // Update payment status
      const { error: paymentError } = await supabase
        .from('payments')
        .update({ 
          status: 'succeeded',
          processed_at: new Date().toISOString()
        })
        .eq('stripe_payment_intent_id', paymentIntentId);

      if (paymentError) throw paymentError;

      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed. You'll receive a confirmation email shortly.",
      });
    },
    onError: (error) => {
      console.error('Payment confirmation error:', error);
      toast({
        title: "Payment Error",
        description: "There was an error confirming your payment. Please contact support.",
        variant: "destructive",
      });
    },
  });

  return {
    createPaymentIntent,
    simulatePaymentSuccess
  };
};
