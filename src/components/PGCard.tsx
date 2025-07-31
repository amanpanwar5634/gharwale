
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
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'girls':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'co-ed':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleCardClick = () => {
    navigate(`/pg/${id}`);
  };

  const handleScheduleVisit = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle schedule visit
  };

  return (
    <div 
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border hover:border-blue-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
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
          <Badge className={`px-3 py-1 text-xs font-semibold border ${getGenderColor(gender)}`}>
            {gender}
          </Badge>
          <Badge className="bg-green-500 text-white px-3 py-1 text-xs font-semibold border-0">
            ✓ VERIFIED
          </Badge>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-primary line-clamp-2 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
        
        {/* Location */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>
        
        {/* Features Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{roomType} Sharing</span>
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
            <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <Wifi className="w-4 h-4 text-green-600" />
            <Car className="w-4 h-4 text-green-600" />
            <Shield className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-xs text-muted-foreground">+ 5 amenities</span>
        </div>
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <p className="text-xl font-bold text-blue-600">{rent}</p>
            <p className="text-xs text-muted-foreground">+ maintenance</p>
          </div>
          <Button 
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all"
            onClick={handleScheduleVisit}
          >
            Schedule Visit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PGCard;
