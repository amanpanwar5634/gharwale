import { useState } from "react";
import PGCard from "./PGCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedPGs = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All PGs" },
    { id: "boys", label: "Boys PG" },
    { id: "girls", label: "Girls PG" },
    { id: "co-ed", label: "Co-ed PG" }
  ];

  const featuredPGs = [
    {
      id: 1,
      name: "Premium Boys PG Koramangala",
      rent: "₹12,000/month",
      image: "https://images.unsplash.com/photo-1555854877-bab0e460b513?auto=format&fit=crop&w=600&q=80",
      rating: 5,
      reviews: 12,
      location: "Koramangala, Bangalore",
      roomType: "Single",
      gender: "Boys"
    },
    {
      id: 2,
      name: "Girls PG Near Whitefield Tech Park",
      rent: "₹10,500/month",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
      rating: 4,
      reviews: 8,
      location: "Whitefield, Bangalore",
      roomType: "Double",
      gender: "Girls"
    },
    {
      id: 3,
      name: "Modern Co-ed PG HSR Layout",
      rent: "₹11,000/month",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
      rating: 5,
      reviews: 15,
      location: "HSR Layout, Bangalore",
      roomType: "Single",
      gender: "Co-ed"
    },
    {
      id: 4,
      name: "Budget Friendly Boys PG Electronic City",
      rent: "₹8,500/month",
      image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=600&q=80",
      rating: 4,
      reviews: 10,
      location: "Electronic City, Bangalore",
      roomType: "Triple",
      gender: "Boys"
    },
    {
      id: 5,
      name: "Luxury Girls PG Indiranagar",
      rent: "₹15,000/month",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
      rating: 5,
      reviews: 25,
      location: "Indiranagar, Bangalore",
      roomType: "Single",
      gender: "Girls"
    },
    {
      id: 6,
      name: "Affordable Co-ed PG Marathahalli",
      rent: "₹9,500/month",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
      rating: 4,
      reviews: 18,
      location: "Marathahalli, Bangalore",
      roomType: "Double",
      gender: "Co-ed"
    }
  ];

  const filteredPGs = activeFilter === "all" 
    ? featuredPGs 
    : featuredPGs.filter(pg => pg.gender.toLowerCase() === activeFilter);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="heading-lg">
              Ready to Prebook <span className="gradient-text">PGs</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
              Instant prebooking available - secure your room today
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`px-6 py-2 rounded-full transition-all font-bold ${
                  activeFilter === filter.id 
                    ? "bg-gradient-to-r from-luxury-cognac to-luxury-amber hover:from-luxury-amber hover:to-luxury-cognac text-white shadow-lg" 
                    : "hover:bg-luxury-blush hover:border-luxury-cognac/30 hover:text-luxury-cognac"
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <Filter className="w-4 h-4 mr-2" />
                {filter.label}
              </Button>
            ))}
          </div>

          {/* PG Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {filteredPGs.slice(0, 8).map((pg) => (
              <div key={pg.id} className="transform hover:scale-[1.02] transition-all duration-300">
                <PGCard {...pg} />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button 
              size="lg"
              className="group bg-gradient-to-r from-luxury-cognac to-luxury-amber hover:from-luxury-amber hover:to-luxury-cognac text-white px-8 py-6 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate('/marketplace')}
            >
              Prebook More PGs
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPGs;
