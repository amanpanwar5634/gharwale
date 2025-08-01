
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Shield, 
  Users, 
  Calendar as CalendarIcon, 
  Phone,
  Mail,
  Home,
  Bath,
  Utensils,
  Shirt,
  Heart,
  ArrowLeft
} from "lucide-react";
import { usePG } from "@/hooks/usePGs";
import { useCreateBooking } from "@/hooks/useBookings";
import { useScheduleVisit } from "@/hooks/useVisits";
import { useReviews } from "@/hooks/useReviews";
import { useWishlist } from "@/hooks/useWishlist";
import { usePayments } from "@/hooks/usePayments";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import PhotoGallery from "@/components/PhotoGallery";
import WhatsAppButton from "@/components/WhatsAppButton";
import ReviewDialog from "@/components/ReviewDialog";

const ProductDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const action = searchParams.get('action');
  
  const [showBookingDialog, setShowBookingDialog] = useState(action === 'book');
  const [showVisitDialog, setShowVisitDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<any>(null);

  const { data: pg, isLoading, error } = usePG(Number(id));
  const { reviews } = useReviews(Number(id));
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const createBooking = useCreateBooking();
  const scheduleVisit = useScheduleVisit();
  const { createPaymentIntent, simulatePaymentSuccess } = usePayments();

  const bookingForm = useForm({
    defaultValues: {
      guest_name: user?.user_metadata?.full_name || '',
      guest_email: user?.email || '',
      guest_phone: user?.user_metadata?.phone || '',
      move_in_date: '',
      duration_months: '',
      special_requests: ''
    }
  });

  const visitForm = useForm({
    defaultValues: {
      visitor_name: user?.user_metadata?.full_name || '',
      visitor_email: user?.email || '',
      visitor_phone: user?.user_metadata?.phone || '',
      visit_date: '',
      visit_time: ''
    }
  });

  useEffect(() => {
    if (action === 'book' && !user) {
      navigate('/auth');
    }
  }, [action, user, navigate]);

  const handleWishlistToggle = () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!pg) return;

    if (isInWishlist(pg.id)) {
      removeFromWishlist.mutate(pg.id);
    } else {
      addToWishlist.mutate(pg.id);
    }
  };

  const onBookingSubmit = async (data: any) => {
    if (!pg) return;

    const totalAmount = pg.rent + (pg.maintenance_fee || 0) + (pg.security_deposit || 0);
    
    try {
      const bookingData = {
        pg_id: pg.id,
        guest_name: data.guest_name,
        guest_email: data.guest_email,
        guest_phone: data.guest_phone,
        move_in_date: data.move_in_date,
        duration_months: parseInt(data.duration_months),
        total_amount: totalAmount,
        special_requests: data.special_requests,
        user_id: user?.id
      };

      const booking = await createBooking.mutateAsync(bookingData);
      setCurrentBooking({ ...booking, total_amount: totalAmount });
      setShowBookingDialog(false);
      setShowPaymentDialog(true);
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  const onVisitSubmit = async (data: any) => {
    if (!pg) return;

    try {
      await scheduleVisit.mutateAsync({
        pg_id: pg.id,
        visitor_name: data.visitor_name,
        visitor_email: data.visitor_email,
        visitor_phone: data.visitor_phone,
        visit_date: data.visit_date,
        visit_time: data.visit_time
      });
      setShowVisitDialog(false);
      visitForm.reset();
    } catch (error) {
      console.error('Visit scheduling error:', error);
    }
  };

  const handlePayment = async () => {
    if (!currentBooking || !user) return;

    try {
      const paymentIntent = await createPaymentIntent.mutateAsync({
        amount: currentBooking.total_amount,
        booking_id: currentBooking.id,
        user_id: user.id
      });

      // Simulate payment success (in real app, integrate with payment gateway)
      setTimeout(async () => {
        await simulatePaymentSuccess.mutateAsync({
          bookingId: currentBooking.id,
          paymentIntentId: paymentIntent.id
        });
        setShowPaymentDialog(false);
        setCurrentBooking(null);
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-16">
          <div className="animate-pulse space-y-6">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !pg) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-16">
          <div className="text-center">
            <p className="text-red-500">PG not found or failed to load.</p>
            <Button onClick={() => navigate('/marketplace')} className="mt-4">
              Back to Marketplace
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 text-luxury-cognac hover:text-luxury-amber"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Image Gallery */}
          <div className="relative aspect-[2/1] overflow-hidden rounded-2xl mb-8">
            <img
              src={pg.images?.[0] || "https://images.unsplash.com/photo-1555854877-bab0e460b513"}
              alt={pg.name}
              className="w-full h-full object-cover"
            />
            <PhotoGallery images={pg.images || []} pgName={pg.name} />
            
            <Button
              onClick={handleWishlistToggle}
              variant="ghost"
              size="sm"
              className="absolute bottom-4 left-4 bg-white/90 hover:bg-white"
            >
              <Heart 
                className={`w-4 h-4 mr-2 ${
                  user && isInWishlist(pg.id) 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-gray-600'
                }`} 
              />
              {user && isInWishlist(pg.id) ? 'Saved' : 'Save'}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{pg.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{pg.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-green-500 text-white">✓ VERIFIED</Badge>
                    <Badge variant="secondary">{pg.gender}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < pg.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-medium">{pg.rating}</span>
                    <span className="text-muted-foreground">({pg.review_count} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{pg.room_type} Sharing</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {pg.description && (
                <Card>
                  <CardHeader>
                    <CardTitle>About this PG</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{pg.description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Amenities */}
              {pg.amenities && pg.amenities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Amenities & Facilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {pg.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {amenity.toLowerCase().includes('wifi') && <Wifi className="w-4 h-4 text-green-600" />}
                          {amenity.toLowerCase().includes('parking') && <Car className="w-4 h-4 text-green-600" />}
                          {amenity.toLowerCase().includes('security') && <Shield className="w-4 h-4 text-green-600" />}
                          {amenity.toLowerCase().includes('food') && <Utensils className="w-4 h-4 text-green-600" />}
                          {amenity.toLowerCase().includes('laundry') && <Shirt className="w-4 h-4 text-green-600" />}
                          {!['wifi', 'parking', 'security', 'food', 'laundry'].some(k => amenity.toLowerCase().includes(k)) && 
                           <Shield className="w-4 h-4 text-green-600" />}
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Property Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {pg.property_type && (
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Property Type</p>
                          <p className="font-medium capitalize">{pg.property_type}</p>
                        </div>
                      </div>
                    )}
                    {pg.bathroom_count && (
                      <div className="flex items-center gap-2">
                        <Bath className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Bathrooms</p>
                          <p className="font-medium">{pg.bathroom_count}</p>
                        </div>
                      </div>
                    )}
                    {pg.furnishing_status && (
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Furnishing</p>
                          <p className="font-medium capitalize">{pg.furnishing_status.replace('-', ' ')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Reviews ({reviews.length})</CardTitle>
                    <ReviewDialog pgId={pg.id} pgName={pg.name} />
                  </div>
                </CardHeader>
                <CardContent>
                  {reviews.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No reviews yet. Be the first to review!</p>
                  ) : (
                    <div className="space-y-6">
                      {reviews.slice(0, 3).map((review, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium">{review.reviewer_name}</p>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            {review.verified_stay && (
                              <Badge variant="secondary" className="text-xs">Verified Stay</Badge>
                            )}
                          </div>
                          {review.comment && (
                            <p className="text-muted-foreground text-sm">{review.comment}</p>
                          )}
                          {review.stay_duration && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Stayed for {review.stay_duration} months
                            </p>
                          )}
                        </div>
                      ))}
                      {reviews.length > 3 && (
                        <Button variant="outline" className="w-full">
                          View All Reviews ({reviews.length})
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking Card */}
            <div className="space-y-6">
              <Card className="sticky top-32">
                <CardHeader>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-luxury-cognac">
                        ₹{pg.rent.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    {pg.maintenance_fee && (
                      <p className="text-sm text-muted-foreground">
                        + ₹{pg.maintenance_fee.toLocaleString()} maintenance
                      </p>
                    )}
                    {pg.security_deposit && (
                      <p className="text-sm text-muted-foreground">
                        Security deposit: ₹{pg.security_deposit.toLocaleString()}
                      </p>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => setShowBookingDialog(true)}
                      className="bg-gradient-to-r from-luxury-cognac to-luxury-amber hover:from-luxury-amber hover:to-luxury-cognac"
                    >
                      Book Now
                    </Button>
                    <Button
                      onClick={() => setShowVisitDialog(true)}
                      variant="outline"
                    >
                      Schedule Visit
                    </Button>
                  </div>
                  <WhatsAppButton 
                    phone="9876543210" 
                    pgName={pg.name}
                    message={`Hi! I'm interested in ${pg.name} located in ${pg.location}. Can you provide more details about availability and booking process?`}
                  />
                  <Separator />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Zero brokerage • Verified property</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Booking Dialog */}
        <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Book {pg.name}</DialogTitle>
              <DialogDescription>
                Fill in your details to complete the booking
              </DialogDescription>
            </DialogHeader>
            <Form {...bookingForm}>
              <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-4">
                <FormField
                  control={bookingForm.control}
                  name="guest_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={bookingForm.control}
                  name="guest_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={bookingForm.control}
                  name="guest_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={bookingForm.control}
                  name="move_in_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Move-in Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={bookingForm.control}
                  name="duration_months"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (months)</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => i + 1).map((month) => (
                              <SelectItem key={month} value={month.toString()}>
                                {month} {month === 1 ? 'month' : 'months'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={bookingForm.control}
                  name="special_requests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requests (Optional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Any special requirements..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Booking Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Monthly rent</span>
                      <span>₹{pg.rent.toLocaleString()}</span>
                    </div>
                    {pg.maintenance_fee && (
                      <div className="flex justify-between">
                        <span>Maintenance</span>
                        <span>₹{pg.maintenance_fee.toLocaleString()}</span>
                      </div>
                    )}
                    {pg.security_deposit && (
                      <div className="flex justify-between">
                        <span>Security deposit</span>
                        <span>₹{pg.security_deposit.toLocaleString()}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total Amount</span>
                      <span>₹{(pg.rent + (pg.maintenance_fee || 0) + (pg.security_deposit || 0)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-luxury-cognac to-luxury-amber hover:from-luxury-amber hover:to-luxury-cognac"
                  disabled={createBooking.isPending}
                >
                  {createBooking.isPending ? "Processing..." : "Proceed to Payment"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Visit Dialog */}
        <Dialog open={showVisitDialog} onOpenChange={setShowVisitDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule a Visit</DialogTitle>
              <DialogDescription>
                Plan a visit to see the property in person
              </DialogDescription>
            </DialogHeader>
            <Form {...visitForm}>
              <form onSubmit={visitForm.handleSubmit(onVisitSubmit)} className="space-y-4">
                <FormField
                  control={visitForm.control}
                  name="visitor_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={visitForm.control}
                  name="visitor_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={visitForm.control}
                  name="visitor_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={visitForm.control}
                  name="visit_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visit Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={visitForm.control}
                  name="visit_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Time</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="12:00">12:00 PM</SelectItem>
                            <SelectItem value="14:00">2:00 PM</SelectItem>
                            <SelectItem value="15:00">3:00 PM</SelectItem>
                            <SelectItem value="16:00">4:00 PM</SelectItem>
                            <SelectItem value="17:00">5:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-luxury-cognac to-luxury-amber hover:from-luxury-amber hover:to-luxury-cognac"
                  disabled={scheduleVisit.isPending}
                >
                  {scheduleVisit.isPending ? "Scheduling..." : "Schedule Visit"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Complete Payment</DialogTitle>
              <DialogDescription>
                Secure your booking with payment
              </DialogDescription>
            </DialogHeader>
            {currentBooking && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <h4 className="font-medium">Payment Summary</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Total Amount</span>
                      <span className="font-medium">₹{currentBooking.total_amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                  <p className="font-medium">Demo Mode</p>
                  <p>This is a demo payment. Click "Pay Now" to simulate successful payment.</p>
                </div>
                <Button 
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-luxury-cognac to-luxury-amber hover:from-luxury-amber hover:to-luxury-cognac"
                  disabled={createPaymentIntent.isPending || simulatePaymentSuccess.isPending}
                >
                  {createPaymentIntent.isPending || simulatePaymentSuccess.isPending 
                    ? "Processing..." 
                    : "Pay Now"}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default ProductDetails;
