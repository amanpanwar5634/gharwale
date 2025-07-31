
import { useState } from "react";
import { Search, User, Calendar, Sparkles, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/marketplace", label: "Boys PG", filter: "boys" },
    { to: "/marketplace", label: "Girls PG", filter: "girls" },
    { to: "/marketplace", label: "Co-ed PG", filter: "co-ed" },
    { to: "/marketplace", label: "Flats", filter: "flats" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Lovable style */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-luxury-cognac to-luxury-amber flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-luxury-cognac/30 to-luxury-amber/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-luxury-cognac to-luxury-amber bg-clip-text text-transparent">
              Gharpayy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="relative px-4 py-2 text-accent hover:text-luxury-cognac transition-colors group font-bold"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-luxury-blush rounded-lg scale-0 group-hover:scale-100 transition-transform origin-center"></div>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="hover:bg-luxury-blush">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-luxury-blush">
              <Calendar size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-luxury-blush">
              <User size={20} />
            </Button>
            <Button className="bg-gradient-to-r from-luxury-cognac to-luxury-amber hover:from-luxury-amber hover:to-luxury-cognac text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all font-bold">
              List Your PG
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white/95 backdrop-blur-lg">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="block px-4 py-3 text-accent hover:text-luxury-cognac hover:bg-luxury-blush rounded-lg transition-colors font-bold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="pt-4 border-t space-y-3">
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="flex-1">
                    <Search size={20} />
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <Calendar size={20} />
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <User size={20} />
                  </Button>
                </div>
                <Button className="w-full bg-gradient-to-r from-luxury-cognac to-luxury-amber hover:from-luxury-amber hover:to-luxury-cognac text-white py-3 rounded-full font-bold">
                  List Your PG
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
