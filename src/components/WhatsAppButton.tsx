
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phone: string;
  pgName: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phone, 
  pgName, 
  message = `Hi! I'm interested in ${pgName}. Can you provide more details?` 
}) => {
  const handleWhatsAppClick = () => {
    // Clean phone number (remove spaces, dashes, etc.)
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    
    // Track analytics
    console.log('WhatsApp contact initiated:', { pgName, phone });
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
    >
      <MessageCircle className="w-4 h-4" />
      WhatsApp
    </Button>
  );
};

export default WhatsAppButton;
