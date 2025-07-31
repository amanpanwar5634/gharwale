
import { Star, MapPin, Users, Wifi, Car, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PGCardProps {
  id?: number;
  name: string;
  rent: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  roomType: string;
  gender: string;
}

const PGCard = ({ 
  id = 1, 
  name, 
  rent, 
  image, 
  rating, 
  reviews, 
  location, 
  roomType, 
  gender 
}: PGCardProps) => {
  const navigate = useNavigate();

  const getGenderColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'boys':
        return 'bg-luxury-yellow/10 text-luxury-yellow border-luxury-yellow/20';
      case 'girls':
        return 'bg-luxury-pink/10 text-luxury-pink border-luxury-pink/20';
      case 'co-ed':
        return 'bg-luxury-rose/10 text-luxury-rose border-luxury-rose/20';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleCardClick = () => {
    navigate(`/pg/${id}`);
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/pg/${id}?action=book`);
  };

  return (
    <div 
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border hover:border-luxury-pink/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge className={`px-3 py-1 text-xs font-bold border ${getGenderColor(gender)}`}>
            {gender}
          </Badge>
          <Badge className="bg-green-500 text-white px-3 py-1 text-xs font-bold border-0">
            ✓ VERIFIED
          </Badge>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-bold text-primary line-clamp-2 group-hover:text-luxury-pink transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">{location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">{roomType} Sharing</span>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1 font-medium">({reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <Wifi className="w-4 h-4 text-green-600" />
            <Car className="w-4 h-4 text-green-600" />
            <Shield className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">+ 5 amenities</span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <p className="text-xl font-black text-luxury-pink">{rent}</p>
            <p className="text-xs text-muted-foreground font-medium">+ maintenance</p>
          </div>
          <Button 
            size="sm"
            className="bg-gradient-to-r from-luxury-pink to-luxury-rose hover:from-luxury-rose hover:to-luxury-pink text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all"
            onClick={handleBookNow}
          >
            Prebook Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PGCard;
