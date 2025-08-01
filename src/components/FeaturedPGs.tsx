
import { useState } from "react";
import PGCard from "./PGCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePGs } from "@/hooks/usePGs";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedPGs = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const { data: pgs = [], isLoading, error } = usePGs();

  const filters = [
    { id: "all", label: "All PGs" },
    { id: "boys", label: "Boys PG" },
    { id: "girls", label: "Girls PG" },
    { id: "co-ed", label: "Co-ed PG" }
  ];

  const filteredPGs = activeFilter === "all" 
    ? pgs 
    : pgs.filter(pg => pg.gender.toLowerCase() === activeFilter);

  if (error) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">Failed to load PGs. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

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
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ))
            ) : (
              filteredPGs.slice(0, 8).map((pg) => (
                <div key={pg.id} className="transform hover:scale-[1.02] transition-all duration-300">
                  <PGCard
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
                </div>
              ))
            )}
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
