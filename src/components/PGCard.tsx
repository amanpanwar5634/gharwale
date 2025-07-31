
import { Star, MapPin, Users, Wifi, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
        return 'bg-blue-100 text-blue-700';
      case 'girls':
        return 'bg-pink-100 text-pink-700';
      case 'co-ed':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border"
      onClick={() => navigate(`/pg/${id}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getGenderColor(gender)}`}>
            {gender}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
            VERIFIED
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">{name}</h3>
        
        <div className="flex items-center gap-1 mb-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{roomType} Sharing</span>
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
            <span className="text-xs text-gray-500 ml-1">({reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Wifi className="w-4 h-4 text-green-600" />
          <Car className="w-4 h-4 text-green-600" />
          <span className="text-xs text-gray-500">+ 5 amenities</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-blue-600">{rent}</p>
            <p className="text-xs text-gray-500">+ maintenance</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Schedule Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PGCard;
