
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import PGCard from "../components/PGCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Filter, Search } from "lucide-react";

const pgs = [
  {
    id: 1,
    name: "Premium Boys PG Koramangala",
    rent: "₹12,000/month",
    rating: 5,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1555854877-bab0e460b513",
    location: "Koramangala, Bangalore",
    roomType: "Single",
    gender: "Boys"
  },
  {
    id: 2,
    name: "Girls PG Near Whitefield Tech Park",
    rent: "₹10,500/month",
    rating: 4,
    reviews: 8,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    location: "Whitefield, Bangalore",
    roomType: "Double",
    gender: "Girls"
  },
  {
    id: 3,
    name: "Modern Co-ed PG HSR Layout",
    rent: "₹11,000/month",
    rating: 5,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    location: "HSR Layout, Bangalore",
    roomType: "Single",
    gender: "Co-ed"
  },
  {
    id: 4,
    name: "Budget Friendly Boys PG Electronic City",
    rent: "₹8,500/month",
    rating: 4,
    reviews: 10,
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
    location: "Electronic City, Bangalore",
    roomType: "Triple",
    gender: "Boys"
  },
  {
    id: 5,
    name: "Luxury Girls PG Indiranagar",
    rent: "₹15,000/month",
    rating: 5,
    reviews: 25,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    location: "Indiranagar, Bangalore",
    roomType: "Single",
    gender: "Girls"
  },
  {
    id: 6,
    name: "Affordable Co-ed PG Marathahalli",
    rent: "₹9,500/month",
    rating: 4,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    location: "Marathahalli, Bangalore",
    roomType: "Double",
    gender: "Co-ed"
  }
];

const Marketplace = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("newest");
  const [genderFilter, setGenderFilter] = useState("all");
  const [roomTypeFilter, setRoomTypeFilter] = useState("all");
  const [searchLocation, setSearchLocation] = useState("");

  const handlePGClick = (pgId: number) => {
    navigate(`/pg/${pgId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect PG</h1>
          <p className="text-gray-600">
            Discover verified PGs with world-class amenities, zero brokerage, and flexible stays
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Enter area, landmark, or PG name..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender Preference
              </label>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Gender Types</SelectItem>
                  <SelectItem value="boys">Boys Only</SelectItem>
                  <SelectItem value="girls">Girls Only</SelectItem>
                  <SelectItem value="co-ed">Co-ed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Type
              </label>
              <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Room Types</SelectItem>
                  <SelectItem value="single">Single Sharing</SelectItem>
                  <SelectItem value="double">Double Sharing</SelectItem>
                  <SelectItem value="triple">Triple Sharing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rent-low">Rent: Low to High</SelectItem>
                  <SelectItem value="rent-high">Rent: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Search PGs
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold">{pgs.length}</span> PGs in Bangalore
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>Verified PGs Only</span>
          </div>
        </div>

        {/* PG Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pgs.map((pg) => (
            <PGCard key={pg.id} {...pg} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            Load More PGs
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
