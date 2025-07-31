
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Star, MapPin, Users, Wifi, Car, Shield, Utensils, Zap, Calendar, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  
  // In a real app, you would fetch the PG details using the id
  const pg = {
    name: "Premium Boys PG Koramangala",
    rent: "₹12,000/month",
    rating: 5,
    reviews: 12,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e460b513",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
    ],
    location: "Koramangala, Bangalore",
    roomType: "Single",
    gender: "Boys",
    description: "Experience luxury living in the heart of Koramangala with our premium PG accommodation. Perfect for working professionals and students.",
    amenities: [
      { name: "High-Speed WiFi", icon: Wifi },
      { name: "Parking", icon: Car },
      { name: "24/7 Security", icon: Shield },
      { name: "Meals Included", icon: Utensils },
      { name: "Power Backup", icon: Zap },
    ],
    nearbyPlaces: [
      "Forum Mall - 0.5 km",
      "Koramangala Metro Station - 0.8 km",
      "Total Mall - 1.2 km",
      "Manipal Hospital - 1.5 km"
    ],
    pgRules: [
      "No smoking inside rooms",
      "Visitors allowed till 10 PM",
      "Monthly rent due by 5th",
      "1 month notice for leaving"
    ]
  };

  const availableDates = [
    "2024-08-01",
    "2024-08-02", 
    "2024-08-03",
    "2024-08-05"
  ];

  const availableTimes = [
    "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleScheduleVisit = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time for your visit");
      return;
    }
    alert(`Visit scheduled for ${selectedDate} at ${selectedTime}`);
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
                  src={pg.images[0]}
                  alt={pg.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {pg.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square rounded-md overflow-hidden">
                    <img
                      src={image}
                      alt={`${pg.name} ${index + 2}`}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-75"
                    />
                  </div>
                ))}
              </div>
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
                        {pg.rating} ({pg.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">VERIFIED</Badge>
              </div>

              <div className="flex gap-4">
                <Badge variant="outline">{pg.gender}</Badge>
                <Badge variant="outline">{pg.roomType} Sharing</Badge>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {pg.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <amenity.icon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expandable Sections */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  {pg.description}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="nearby">
                <AccordionTrigger>Nearby Places</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {pg.nearbyPlaces.map((place, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{place}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rules">
                <AccordionTrigger>PG Rules</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {pg.pgRules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border shadow-sm p-6 sticky top-32">
              <div className="mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">{pg.rent}</div>
                <div className="text-sm text-gray-600">+ ₹2,000 maintenance</div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Schedule a Free Visit
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option value="">Choose date</option>
                    {availableDates.map(date => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-IN')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="">Choose time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleScheduleVisit}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Free Visit
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Owner
                </Button>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Book Room Now
                </Button>
              </div>

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
                    <div className="text-purple-600 font-semibold">24/7 Support</div>
                    <div className="text-xs text-gray-600">Always Available</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-orange-600 font-semibold">Easy Move-in</div>
                    <div className="text-xs text-gray-600">Instant Booking</div>
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
