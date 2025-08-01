
import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Star, MapPin, Users, Wifi, Car, Shield, Utensils, Zap, Calendar, Phone, CreditCard } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePG } from "@/hooks/usePGs";
import { useCreateBooking } from "@/hooks/useBookings";
import { useScheduleVisit } from "@/hooks/useVisits";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isBookingMode = searchParams.get('action') === 'book';
  
  // Visit form state
  const [visitForm, setVisitForm] = useState({
    visitor_name: "",
    visitor_email: "",
    visitor_phone: "",
    visit_date: "",
    visit_time: "10:00 AM"
  });

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    move_in_date: "",
    duration_months: 1
  });

  const { data: pg, isLoading, error } = usePG(parseInt(id || '0'));
  const createBooking = useCreateBooking();
  const scheduleVisit = useScheduleVisit();

  const availableTimes = [
    "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const durations = [
    { value: 1, label: "1 Month" },
    { value: 3, label: "3 Months" },
    { value: 6, label: "6 Months" },
    { value: 12, label: "12 Months" }
  ];

  const handleScheduleVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitForm.visitor_name || !visitForm.visitor_email || !visitForm.visit_date) {
      alert("Please fill in all required fields");
      return;
    }

    scheduleVisit.mutate({
      pg_id: parseInt(id!),
      ...visitForm
    });
  };

  const handleBookRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.guest_name || !bookingForm.guest_email || !bookingForm.move_in_date) {
      alert("Please fill in all required fields");
      return;
    }

    if (!pg) return;

    const totalAmount = (bookingForm.duration_months * pg.rent) + pg.security_deposit + 999;

    createBooking.mutate({
      pg_id: parseInt(id!),
      ...bookingForm,
      total_amount: totalAmount
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !pg) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-16">
          <div className="text-center">
            <p className="text-red-500">PG not found or failed to load.</p>
          </div>
        </main>
      </div>
    );
  }

  const amenityIcons: { [key: string]: any } = {
    "High-Speed WiFi": Wifi,
    "WiFi": Wifi,
    "Parking": Car,
    "24/7 Security": Shield,
    "Security": Shield,
    "Meals Included": Utensils,
    "Basic Meals": Utensils,
    "Power Backup": Zap,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PG Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={pg.images[0] || "https://images.unsplash.com/photo-1555854877-bab0e460b513"}
                  alt={pg.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {pg.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {pg.images.slice(1, 4).map((image, index) => (
                    <div key={index} className="aspect-square rounded-md overflow-hidden">
                      <img
                        src={image}
                        alt={`${pg.name} ${index + 2}`}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-75"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PG Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{pg.name}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{pg.location}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < pg.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {pg.rating} ({pg.review_count} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  {pg.verified ? "VERIFIED" : "UNVERIFIED"}
                </Badge>
              </div>

              <div className="flex gap-4">
                <Badge variant="outline">{pg.gender}</Badge>
                <Badge variant="outline">{pg.room_type} Sharing</Badge>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {pg.amenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity] || Shield;
                  return (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Expandable Sections */}
            <Accordion type="single" collapsible className="w-full">
              {pg.description && (
                <AccordionItem value="description">
                  <AccordionTrigger>Description</AccordionTrigger>
                  <AccordionContent>
                    {pg.description}
                  </AccordionContent>
                </AccordionItem>
              )}

              {pg.nearby_places.length > 0 && (
                <AccordionItem value="nearby">
                  <AccordionTrigger>Nearby Places</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {pg.nearby_places.map((place, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{place}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              {pg.pg_rules.length > 0 && (
                <AccordionItem value="rules">
                  <AccordionTrigger>PG Rules</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {pg.pg_rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border shadow-sm p-6 sticky top-32">
              <div className="mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">₹{pg.rent.toLocaleString()}/month</div>
                <div className="text-sm text-gray-600">+ ₹{pg.maintenance_fee.toLocaleString()} maintenance</div>
              </div>

              {!isBookingMode ? (
                <>
                  <form onSubmit={handleScheduleVisit} className="space-y-4 mb-6">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      Schedule a Free Visit
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="visitor_name">Your Name *</Label>
                        <Input
                          id="visitor_name"
                          type="text"
                          value={visitForm.visitor_name}
                          onChange={(e) => setVisitForm({...visitForm, visitor_name: e.target.value})}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="visitor_email">Email *</Label>
                        <Input
                          id="visitor_email"
                          type="email"
                          value={visitForm.visitor_email}
                          onChange={(e) => setVisitForm({...visitForm, visitor_email: e.target.value})}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="visitor_phone">Phone</Label>
                        <Input
                          id="visitor_phone"
                          type="tel"
                          value={visitForm.visitor_phone}
                          onChange={(e) => setVisitForm({...visitForm, visitor_phone: e.target.value})}
                        />
                      </div>

                      <div>
                        <Label htmlFor="visit_date">Visit Date *</Label>
                        <Input
                          id="visit_date"
                          type="date"
                          value={visitForm.visit_date}
                          onChange={(e) => setVisitForm({...visitForm, visit_date: e.target.value})}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="visit_time">Preferred Time</Label>
                        <select 
                          id="visit_time"
                          className="w-full p-2 border rounded-md"
                          value={visitForm.visit_time}
                          onChange={(e) => setVisitForm({...visitForm, visit_time: e.target.value})}
                        >
                          {availableTimes.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={scheduleVisit.isPending}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {scheduleVisit.isPending ? 'Scheduling...' : 'Schedule Free Visit'}
                    </Button>
                  </form>

                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Owner
                    </Button>

                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => window.location.search = '?action=book'}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Prebook Room Now
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <form onSubmit={handleBookRoom} className="space-y-4 mb-6">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-green-600" />
                      Prebook Your Room
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="guest_name">Your Name *</Label>
                        <Input
                          id="guest_name"
                          type="text"
                          value={bookingForm.guest_name}
                          onChange={(e) => setBookingForm({...bookingForm, guest_name: e.target.value})}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="guest_email">Email *</Label>
                        <Input
                          id="guest_email"
                          type="email"
                          value={bookingForm.guest_email}
                          onChange={(e) => setBookingForm({...bookingForm, guest_email: e.target.value})}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="guest_phone">Phone</Label>
                        <Input
                          id="guest_phone"
                          type="tel"
                          value={bookingForm.guest_phone}
                          onChange={(e) => setBookingForm({...bookingForm, guest_phone: e.target.value})}
                        />
                      </div>

                      <div>
                        <Label htmlFor="move_in_date">Move-in Date *</Label>
                        <Input
                          id="move_in_date"
                          type="date"
                          value={bookingForm.move_in_date}
                          onChange={(e) => setBookingForm({...bookingForm, move_in_date: e.target.value})}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <select 
                          id="duration"
                          className="w-full p-2 border rounded-md"
                          value={bookingForm.duration_months}
                          onChange={(e) => setBookingForm({...bookingForm, duration_months: parseInt(e.target.value)})}
                        >
                          {durations.map(dur => (
                            <option key={dur.value} value={dur.value}>
                              {dur.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-md">
                        <div className="text-sm text-blue-800">
                          <div className="flex justify-between">
                            <span>Rent ({bookingForm.duration_months} month{bookingForm.duration_months !== 1 ? "s" : ""})</span>
                            <span>₹{(bookingForm.duration_months * pg.rent).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Security Deposit</span>
                            <span>₹{pg.security_deposit.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Booking Fee</span>
                            <span>₹999</span>
                          </div>
                          <hr className="my-2 border-blue-200" />
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₹{((bookingForm.duration_months * pg.rent) + pg.security_deposit + 999).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={createBooking.isPending}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      {createBooking.isPending ? 'Processing...' : 'Confirm Booking'}
                    </Button>
                  </form>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.search = ''}
                  >
                    Back to Visit Scheduling
                  </Button>
                </>
              )}

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-green-600 font-semibold">✓ Verified</div>
                    <div className="text-xs text-gray-600">100% Authentic</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-blue-600 font-semibold">Zero Brokerage</div>
                    <div className="text-xs text-gray-600">Direct Owner</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-purple-600 font-semibold">Instant Booking</div>
                    <div className="text-xs text-gray-600">Prebook Online</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-orange-600 font-semibold">Easy Move-in</div>
                    <div className="text-xs text-gray-600">Hassle Free</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
