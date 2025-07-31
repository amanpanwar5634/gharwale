
import { ChevronRight } from "lucide-react";

const categories = [
  { name: "Boys PG", icon: "👨", description: "Male-only accommodations" },
  { name: "Girls PG", icon: "👩", description: "Female-only accommodations" },
  { name: "Co-ed PG", icon: "🏠", description: "Mixed gender accommodations" },
  { name: "Studio Flats", icon: "🏢", description: "Independent living spaces" },
  { name: "1BHK", icon: "🛏️", description: "One bedroom apartments" },
  { name: "Shared Flats", icon: "👥", description: "Shared apartment living" },
];

const CategoryNav = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
      {categories.map((category) => (
        <button
          key={category.name}
          className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center space-y-3 border hover:border-blue-200"
        >
          <span className="text-3xl">{category.icon}</span>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <span className="text-sm font-semibold">{category.name}</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-1">{category.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategoryNav;
