
import { ChevronRight } from "lucide-react";

const categories = [
  { name: "Boys PG", icon: "👨", description: "Male-only accommodations", color: "from-luxury-amber to-luxury-cognac" },
  { name: "Girls PG", icon: "👩", description: "Female-only accommodations", color: "from-luxury-champagne to-luxury-cognac" },
  { name: "Co-ed PG", icon: "🏠", description: "Mixed gender accommodations", color: "from-luxury-emerald to-luxury-espresso" },
  { name: "Studio Flats", icon: "🏢", description: "Independent living spaces", color: "from-luxury-cognac to-luxury-dark" },
  { name: "1BHK", icon: "🛏️", description: "One bedroom apartments", color: "from-luxury-amber to-luxury-champagne" },
  { name: "Shared Flats", icon: "👥", description: "Shared apartment living", color: "from-luxury-espresso to-luxury-emerald" },
];

const CategoryNav = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4">
      {categories.map((category) => (
        <button
          key={category.name}
          className="group relative p-8 bg-card rounded-2xl shadow-sm hover:shadow-xl border hover:border-luxury-cognac/30 transition-all duration-300 transform hover:-translate-y-1"
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
          
          {/* Content */}
          <div className="relative flex flex-col items-center justify-center space-y-4">
            <div className="text-4xl transform group-hover:scale-110 transition-transform">
              {category.icon}
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm font-bold text-luxury-cognac">{category.name}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-luxury-amber transform group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategoryNav;
