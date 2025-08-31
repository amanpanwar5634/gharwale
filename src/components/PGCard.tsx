import React, { useEffect, useRef } from 'react';
import { Star, Heart, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "@/hooks/useWishlist";
import { useCarouselSync } from "@/contexts/CarouselSyncContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface PGCardProps {
  id?: number;
  name: string;
  rent: number;
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

  const toggleWishlist = (id: number) => {
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

  const isWishlisted = (id: number) => isInWishlist(id);

  // Use images array if available, otherwise fallback to single image
  const displayImages = images && images.length > 0 ? images : [image];

  const swiperRef = useRef<any>(null);
  const { tick } = useCarouselSync();

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || displayImages.length === 0) return;
    const targetIndex = tick % displayImages.length;
    if (swiper.realIndex !== targetIndex) {
      swiper.slideTo(targetIndex, 600);
    }
  }, [tick, displayImages.length]);

  return (
    <div 
      className="group bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer relative"
      onClick={handleCardClick}
    >
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          loop
          spaceBetween={0}
          slidesPerView={1}
          speed={600}
          className="h-full w-full"
        >
          {displayImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`${name} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Navigation Buttons */}
        <div className="swiper-button-prev !text-white !w-8 !h-8 !mt-0 !top-1/2 !left-2 !bg-black/30 !rounded-full after:!text-xs after:!font-bold"></div>
        <div className="swiper-button-next !text-white !w-8 !h-8 !mt-0 !top-1/2 !right-2 !bg-black/30 !rounded-full after:!text-xs after:!font-bold"></div>
        
        {/* Wishlist heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(id);
          }}
          className="absolute top-3 right-3 z-10 p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted(id)
                ? "fill-red-500 text-red-500"
                : "text-white"
            }`}
          />
        </button>

        {/* Bottom-left tag */}
        <div className="absolute bottom-0 left-0 bg-orange-500 text-white px-3 py-1 text-sm font-medium">
          {gender === 'Boys' ? 'Boys PG' : gender === 'Girls' ? 'Girls PG' : 'Co-ed PG'}
        </div>
      </div>

      {/* Blue Bar - Full width, no gap */}
      <div className="bg-blue-600 h-1 w-full"></div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-blue-600">₹{rent.toLocaleString()}</span>
            <span className="text-sm text-gray-500 ml-1">/month</span>
          </div>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
            {roomType}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">({reviews} reviews)</span>
        </div>

        <div className="flex gap-2">
          <WhatsAppButton 
            phone="+919876543210" 
            pgName={name}
            message={`Hi! I'm interested in ${name} located at ${location}. Can you provide more details about the ${roomType} accommodation?`}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/pg/${id}`);
            }}
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PGCard;
