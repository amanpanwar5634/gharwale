
import { Bed, Utensils, Home, Sparkles, Wifi, Video, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/contexts/AuthContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface PGCardProps {
  id?: number;
  name: string;
  rent: string;
  image: string;
  images?: string[];
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
  images = [], 
  rating, 
  reviews, 
  location, 
  roomType, 
  gender 
}: PGCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const handleCardClick = () => {
    navigate(`/pg/${id}`);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open('https://wa.me/918307396042', '_blank');
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      navigate('/auth');
      return;
    }

    if (isInWishlist(id)) {
      removeFromWishlist.mutate(id);
    } else {
      addToWishlist.mutate(id);
    }
  };

  // Use images array if available, otherwise fallback to single image
  const displayImages = images.length > 0 ? images : [image];

  return (
    <div 
      className="w-full max-w-[1100px] mx-auto my-5 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200"
      onClick={handleCardClick}
      style={{ minHeight: '750px' }}
    >
      {/* Image Slider */}
      <div className="swiper-container relative w-full h-[400px] overflow-hidden">
        <div className="swiper-wrapper flex">
          {displayImages.map((img, index) => (
            <div key={index} className="swiper-slide">
              <img
                src={img}
                alt={`${name} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* GharPayy Classics Tag */}
        <span className="absolute bottom-0 left-0 bg-black text-yellow-400 text-lg font-bold py-2 px-3 rounded-tr-2xl z-10">
          GharPayy Classics
        </span>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow">
        {/* Place Name with Blue Background */}
        <h2 className="text-white bg-blue-700 text-xl font-bold py-2 px-3 mb-0 w-full">
          {name}
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 mt-2 mb-0 px-3">
          Affordable stays with all essentials in {location}.
        </p>
        
        {/* Feature List with Icons */}
        <ul className="list-none p-0 mt-4 px-3 flex-grow">
          <li className="flex items-center text-base my-3">
            <Bed className="text-blue-500 mr-3 w-5 h-5" />
            Comfort & Convenience
          </li>
          <li className="flex items-center text-base my-3">
            <Utensils className="text-blue-500 mr-3 w-5 h-5" />
            Good Food
          </li>
          <li className="flex items-center text-base my-3">
            <Home className="text-blue-500 mr-3 w-5 h-5" />
            Private/Shared Stay
          </li>
          <li className="flex items-center text-base my-3">
            <Sparkles className="text-blue-500 mr-3 w-5 h-5" />
            Professional Housekeeping
          </li>
          <li className="flex items-center text-base my-3">
            <Wifi className="text-blue-500 mr-3 w-5 h-5" />
            High-Speed WiFi
          </li>
          <li className="flex items-center text-base my-3">
            <Video className="text-blue-500 mr-3 w-5 h-5" />
            CCTV Surveillance
          </li>
        </ul>
        
        {/* Prebooking Offer */}
        <p className="text-red-600 font-bold my-4 px-3">
          SAVE EXTRA 1K OFF ON PREBOOKING
        </p>
        
        {/* WhatsApp Button */}
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-5 rounded-lg text-base font-medium mx-3 mb-4 transition-colors flex items-center justify-center gap-2"
          onClick={handleWhatsAppClick}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          Chat on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default PGCard;
