
import { Search, User, Calendar, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <Home className="w-8 h-8" />
          Gharpayy
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/marketplace" className="nav-link">Boys PG</Link>
          <Link to="/marketplace" className="nav-link">Girls PG</Link>
          <Link to="/marketplace" className="nav-link">Co-ed PG</Link>
          <Link to="/marketplace" className="nav-link">Flats</Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:text-blue-600 transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 hover:text-blue-600 transition-colors">
            <Calendar size={20} />
          </button>
          <button className="p-2 hover:text-blue-600 transition-colors">
            <User size={20} />
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            List Your PG
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
