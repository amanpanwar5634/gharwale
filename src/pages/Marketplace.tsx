
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import PGCard from "../components/PGCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Filter, Search } from "lucide-react";
import { usePGs } from "@/hooks/usePGs";
import { Skeleton } from "@/components/ui/skeleton";

const Marketplace = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("newest");
  const [genderFilter, setGenderFilter] = useState("all");
  const [roomTypeFilter, setRoomTypeFilter] = useState("all");
  const [searchLocation, setSearchLocation] = useState("");
  
  const { data: pgs = [], isLoading, error } = usePGs();

  // Filter and sort PGs
  const filteredAndSortedPGs = React.useMemo(() => {
    let filtered = pgs;

    // Filter by location search
    if (searchLocation) {
      filtered = filtered.filter(pg => 
        pg.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
        pg.name.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    // Filter by gender
    if (genderFilter !== "all") {
      filtered = filtered.filter(pg => pg.gender.toLowerCase() === genderFilter);
    }

    // Filter by room type
    if (roomTypeFilter !== "all") {
      filtered = filtered.filter(pg => pg.room_type.toLowerCase() === roomTypeFilter);
    }

    // Sort
    switch (sortOrder) {
      case "rent-low":
        filtered.sort((a, b) => a.rent - b.rent);
        break;
      case "rent-high":
        filtered.sort((a, b) => b.rent - a.rent);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return filtered;
  }, [pgs, searchLocation, genderFilter, roomTypeFilter, sortOrder]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-16">
          <div className="text-center">
            <p className="text-red-500">Failed to load PGs. Please try again later.</p>
          </div>
        </main>
      </div>
    );
  }

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
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold">{filteredAndSortedPGs.length}</span> PGs in Bangalore
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>Verified PGs Only</span>
          </div>
        </div>

        {/* PG Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-4 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))
          ) : (
            filteredAndSortedPGs.map((pg) => (
              <PGCard 
                key={pg.id} 
                id={pg.id}
                name={pg.name}
                rent={`₹${pg.rent.toLocaleString()}/month`}
                image={pg.images[0] || "https://images.unsplash.com/photo-1555854877-bab0e460b513"}
                rating={pg.rating}
                reviews={pg.review_count}
                location={pg.location}
                roomType={pg.room_type}
                gender={pg.gender}
              />
            ))
          )}
        </div>

        {/* No results message */}
        {!isLoading && filteredAndSortedPGs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No PGs found matching your criteria.</p>
            <p className="text-gray-400">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
