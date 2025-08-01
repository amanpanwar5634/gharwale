
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Heart, LogOut } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || location.pathname !== '/' 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-luxury-cognac to-luxury-amber rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-luxury-cognac to-luxury-amber bg-clip-text text-transparent">
              Gharpayy
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-luxury-cognac' 
                  : scrolled || location.pathname !== '/' 
                    ? 'text-gray-700 hover:text-luxury-cognac' 
                    : 'text-white hover:text-luxury-champagne'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/marketplace" 
              className={`font-medium transition-colors ${
                location.pathname === '/marketplace' 
                  ? 'text-luxury-cognac' 
                  : scrolled || location.pathname !== '/' 
                    ? 'text-gray-700 hover:text-luxury-cognac' 
                    : 'text-white hover:text-luxury-champagne'
              }`}
            >
              Find PGs
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback className="bg-luxury-cognac text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/auth')}
                  className={`font-medium ${
                    scrolled || location.pathname !== '/' 
                      ? 'text-gray-700 hover:text-luxury-cognac hover:bg-luxury-blush' 
                      : 'text-white hover:text-luxury-champagne hover:bg-white/10'
                  }`}
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-luxury-cognac to-luxury-amber hover:from-luxury-amber hover:to-luxury-cognac text-white px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={scrolled || location.pathname !== '/' ? 'text-gray-700' : 'text-white'}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-luxury-cognac font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/marketplace" 
                className="text-gray-700 hover:text-luxury-cognac font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Find PGs
              </Link>
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-luxury-cognac font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="justify-start text-gray-700 hover:text-luxury-cognac"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate('/auth');
                      setIsOpen(false);
                    }}
                    className="justify-start text-gray-700 hover:text-luxury-cognac"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/auth');
                      setIsOpen(false);
                    }}
                    className="bg-gradient-to-r from-luxury-cognac to-luxury-amber hover:from-luxury-amber hover:to-luxury-cognac text-white rounded-full font-bold"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
