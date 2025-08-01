
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MessageSquare } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ReviewDialogProps {
  pgId: number;
  pgName: string;
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({ pgId, pgName }) => {
  const { user } = useAuth();
  const { createReview } = useReviews();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    reviewer_name: user?.user_metadata?.full_name || '',
    reviewer_email: user?.email || '',
    rating: 0,
    comment: '',
    cleanliness_rating: 0,
    food_rating: 0,
    safety_rating: 0,
    location_rating: 0,
    value_rating: 0,
    stay_duration: '',
    room_type: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post a review.",
        variant: "destructive",
      });
      return;
    }

    if (formData.rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide an overall rating.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createReview.mutateAsync({
        pg_id: pgId,
        reviewer_name: formData.reviewer_name,
        reviewer_email: formData.reviewer_email,
        rating: formData.rating,
        comment: formData.comment,
        cleanliness_rating: formData.cleanliness_rating || undefined,
        food_rating: formData.food_rating || undefined,
        safety_rating: formData.safety_rating || undefined,
        location_rating: formData.location_rating || undefined,
        value_rating: formData.value_rating || undefined,
        stay_duration: formData.stay_duration ? parseInt(formData.stay_duration) : undefined,
        room_type: formData.room_type || undefined
      });
      
      setOpen(false);
      setFormData({
        reviewer_name: user?.user_metadata?.full_name || '',
        reviewer_email: user?.email || '',
        rating: 0,
        comment: '',
        cleanliness_rating: 0,
        food_rating: 0,
        safety_rating: 0,
        location_rating: 0,
        value_rating: 0,
        stay_duration: '',
        room_type: ''
      });
    } catch (error) {
      // Error handled by mutation
    }
  };

  const StarRating = ({ value, onChange, label }: { value: number; onChange: (rating: number) => void; label: string }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="text-2xl hover:scale-110 transition-transform"
          >
            <Star
              className={`w-6 h-6 ${
                star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  if (!user) {
    return (
      <Button disabled className="w-full">
        <MessageSquare className="w-4 h-4 mr-2" />
        Sign in to Write Review
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-luxury-cognac to-luxury-amber hover:from-luxury-amber hover:to-luxury-cognac">
          <MessageSquare className="w-4 h-4 mr-2" />
          Write Review
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review {pgName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={formData.reviewer_name}
              onChange={(e) => setFormData({ ...formData, reviewer_name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.reviewer_email}
              onChange={(e) => setFormData({ ...formData, reviewer_email: e.target.value })}
              required
            />
          </div>

          <StarRating
            value={formData.rating}
            onChange={(rating) => setFormData({ ...formData, rating })}
            label="Overall Rating"
          />

          <div className="grid grid-cols-2 gap-4">
            <StarRating
              value={formData.cleanliness_rating}
              onChange={(rating) => setFormData({ ...formData, cleanliness_rating: rating })}
              label="Cleanliness"
            />
            <StarRating
              value={formData.food_rating}
              onChange={(rating) => setFormData({ ...formData, food_rating: rating })}
              label="Food"
            />
            <StarRating
              value={formData.safety_rating}
              onChange={(rating) => setFormData({ ...formData, safety_rating: rating })}
              label="Safety"
            />
            <StarRating
              value={formData.location_rating}
              onChange={(rating) => setFormData({ ...formData, location_rating: rating })}
              label="Location"
            />
          </div>

          <StarRating
            value={formData.value_rating}
            onChange={(rating) => setFormData({ ...formData, value_rating: rating })}
            label="Value for Money"
          />

          <div className="space-y-2">
            <Label htmlFor="room-type">Room Type</Label>
            <Select value={formData.room_type} onValueChange={(value) => setFormData({ ...formData, room_type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Sharing</SelectItem>
                <SelectItem value="double">Double Sharing</SelectItem>
                <SelectItem value="triple">Triple Sharing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Stay Duration (months)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.stay_duration}
              onChange={(e) => setFormData({ ...formData, stay_duration: e.target.value })}
              placeholder="How long did you stay?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Share your experience..."
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-luxury-cognac to-luxury-amber hover:from-luxury-amber hover:to-luxury-cognac"
            disabled={createReview.isPending}
          >
            {createReview.isPending ? "Posting..." : "Post Review"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
