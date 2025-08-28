export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      analytics: {
        Row: {
          created_at: string | null
          entity_id: string
          entity_type: string
          event_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          entity_id: string
          entity_type: string
          event_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          event_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_fee: number | null
          cancellation_reason: string | null
          cancelled_at: string | null
          check_in_date: string | null
          check_out_date: string | null
          created_at: string | null
          duration_months: number
          guest_email: string
          guest_name: string
          guest_phone: string
          id: number
          move_in_date: string
          payment_id: string | null
          pg_id: number | null
          room_number: string | null
          special_requests: string | null
          status: string | null
          total_amount: number
          user_id: string | null
        }
        Insert: {
          booking_fee?: number | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          check_in_date?: string | null
          check_out_date?: string | null
          created_at?: string | null
          duration_months: number
          guest_email: string
          guest_name: string
          guest_phone: string
          id?: number
          move_in_date: string
          payment_id?: string | null
          pg_id?: number | null
          room_number?: string | null
          special_requests?: string | null
          status?: string | null
          total_amount: number
          user_id?: string | null
        }
        Update: {
          booking_fee?: number | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          check_in_date?: string | null
          check_out_date?: string | null
          created_at?: string | null
          duration_months?: number
          guest_email?: string
          guest_name?: string
          guest_phone?: string
          id?: number
          move_in_date?: string
          payment_id?: string | null
          pg_id?: number | null
          room_number?: string | null
          special_requests?: string | null
          status?: string | null
          total_amount?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_pg_id_fkey"
            columns: ["pg_id"]
            isOneToOne: false
            referencedRelation: "pgs"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      owners: {
        Row: {
          address: string | null
          business_name: string
          commission_rate: number | null
          contact_person: string
          created_at: string | null
          email: string
          gstin: string | null
          id: string
          kyc_verified: boolean | null
          pan_number: string | null
          phone: string
          status: string | null
          total_bookings: number | null
          total_properties: number | null
          total_revenue: number | null
          trust_score: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          commission_rate?: number | null
          contact_person: string
          created_at?: string | null
          email: string
          gstin?: string | null
          id?: string
          kyc_verified?: boolean | null
          pan_number?: string | null
          phone: string
          status?: string | null
          total_bookings?: number | null
          total_properties?: number | null
          total_revenue?: number | null
          trust_score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          commission_rate?: number | null
          contact_person?: string
          created_at?: string | null
          email?: string
          gstin?: string | null
          id?: string
          kyc_verified?: boolean | null
          pan_number?: string | null
          phone?: string
          status?: string | null
          total_bookings?: number | null
          total_properties?: number | null
          total_revenue?: number | null
          trust_score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: number | null
          commission_amount: number | null
          created_at: string | null
          currency: string | null
          failure_reason: string | null
          id: string
          owner_id: string | null
          owner_payout_amount: number | null
          payment_method: string | null
          payout_date: string | null
          processed_at: string | null
          status: string | null
          stripe_payment_intent_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          booking_id?: number | null
          commission_amount?: number | null
          created_at?: string | null
          currency?: string | null
          failure_reason?: string | null
          id?: string
          owner_id?: string | null
          owner_payout_amount?: number | null
          payment_method?: string | null
          payout_date?: string | null
          processed_at?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: number | null
          commission_amount?: number | null
          created_at?: string | null
          currency?: string | null
          failure_reason?: string | null
          id?: string
          owner_id?: string | null
          owner_payout_amount?: number | null
          payment_method?: string | null
          payout_date?: string | null
          processed_at?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
        ]
      }
      pgs: {
        Row: {
          amenities: string[] | null
          available: boolean | null
          balcony_count: number | null
          bathroom_count: number | null
          bus_distance: number | null
          cleaning_service: boolean | null
          created_at: string | null
          description: string | null
          featured: boolean | null
          furnishing_status: string | null
          gender: string
          hospital_distance: number | null
          id: number
          images: string[] | null
          laundry_service: boolean | null
          location: string
          maintenance_fee: number | null
          mall_distance: number | null
          meal_service: boolean | null
          metro_distance: number | null
          name: string
          nearby_places: string[] | null
          owner_id: string | null
          parking_available: boolean | null
          pg_rules: string[] | null
          property_age: number | null
          property_type: string | null
          rating: number | null
          rent: number
          review_count: number | null
          room_type: string
          security_deposit: number | null
          status: string | null
          total_floors: number | null
          updated_at: string | null
          verified: boolean | null
          video_url: string | null
          virtual_tour_url: string | null
        }
        Insert: {
          amenities?: string[] | null
          available?: boolean | null
          balcony_count?: number | null
          bathroom_count?: number | null
          bus_distance?: number | null
          cleaning_service?: boolean | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          furnishing_status?: string | null
          gender: string
          hospital_distance?: number | null
          id?: number
          images?: string[] | null
          laundry_service?: boolean | null
          location: string
          maintenance_fee?: number | null
          mall_distance?: number | null
          meal_service?: boolean | null
          metro_distance?: number | null
          name: string
          nearby_places?: string[] | null
          owner_id?: string | null
          parking_available?: boolean | null
          pg_rules?: string[] | null
          property_age?: number | null
          property_type?: string | null
          rating?: number | null
          rent: number
          review_count?: number | null
          room_type: string
          security_deposit?: number | null
          status?: string | null
          total_floors?: number | null
          updated_at?: string | null
          verified?: boolean | null
          video_url?: string | null
          virtual_tour_url?: string | null
        }
        Update: {
          amenities?: string[] | null
          available?: boolean | null
          balcony_count?: number | null
          bathroom_count?: number | null
          bus_distance?: number | null
          cleaning_service?: boolean | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          furnishing_status?: string | null
          gender?: string
          hospital_distance?: number | null
          id?: number
          images?: string[] | null
          laundry_service?: boolean | null
          location?: string
          maintenance_fee?: number | null
          mall_distance?: number | null
          meal_service?: boolean | null
          metro_distance?: number | null
          name?: string
          nearby_places?: string[] | null
          owner_id?: string | null
          parking_available?: boolean | null
          pg_rules?: string[] | null
          property_age?: number | null
          property_type?: string | null
          rating?: number | null
          rent?: number
          review_count?: number | null
          room_type?: string
          security_deposit?: number | null
          status?: string | null
          total_floors?: number | null
          updated_at?: string | null
          verified?: boolean | null
          video_url?: string | null
          virtual_tour_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pgs_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email_verified: boolean | null
          full_name: string | null
          id: string
          phone: string | null
          phone_verified: boolean | null
          trust_score: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email_verified?: boolean | null
          full_name?: string | null
          id: string
          phone?: string | null
          phone_verified?: boolean | null
          trust_score?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          phone?: string | null
          phone_verified?: boolean | null
          trust_score?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      property_verifications: {
        Row: {
          created_at: string | null
          documents: string[] | null
          id: string
          notes: string | null
          pg_id: number | null
          status: string | null
          verification_type: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          documents?: string[] | null
          id?: string
          notes?: string | null
          pg_id?: number | null
          status?: string | null
          verification_type: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          documents?: string[] | null
          id?: string
          notes?: string | null
          pg_id?: number | null
          status?: string | null
          verification_type?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_verifications_pg_id_fkey"
            columns: ["pg_id"]
            isOneToOne: false
            referencedRelation: "pgs"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          cleanliness_rating: number | null
          comment: string | null
          created_at: string | null
          food_rating: number | null
          helpful_count: number | null
          id: number
          location_rating: number | null
          pg_id: number | null
          photos: string[] | null
          rating: number
          reviewer_email: string
          reviewer_name: string
          room_type: string | null
          safety_rating: number | null
          stay_duration: number | null
          user_id: string | null
          value_rating: number | null
          verified_stay: boolean | null
        }
        Insert: {
          cleanliness_rating?: number | null
          comment?: string | null
          created_at?: string | null
          food_rating?: number | null
          helpful_count?: number | null
          id?: number
          location_rating?: number | null
          pg_id?: number | null
          photos?: string[] | null
          rating: number
          reviewer_email: string
          reviewer_name: string
          room_type?: string | null
          safety_rating?: number | null
          stay_duration?: number | null
          user_id?: string | null
          value_rating?: number | null
          verified_stay?: boolean | null
        }
        Update: {
          cleanliness_rating?: number | null
          comment?: string | null
          created_at?: string | null
          food_rating?: number | null
          helpful_count?: number | null
          id?: number
          location_rating?: number | null
          pg_id?: number | null
          photos?: string[] | null
          rating?: number
          reviewer_email?: string
          reviewer_name?: string
          room_type?: string | null
          safety_rating?: number | null
          stay_duration?: number | null
          user_id?: string | null
          value_rating?: number | null
          verified_stay?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_pg_id_fkey"
            columns: ["pg_id"]
            isOneToOne: false
            referencedRelation: "pgs"
            referencedColumns: ["id"]
          },
        ]
      }
      visits: {
        Row: {
          created_at: string | null
          id: number
          pg_id: number | null
          status: string | null
          visit_date: string
          visit_time: string
          visitor_email: string
          visitor_name: string
          visitor_phone: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          pg_id?: number | null
          status?: string | null
          visit_date: string
          visit_time: string
          visitor_email: string
          visitor_name: string
          visitor_phone: string
        }
        Update: {
          created_at?: string | null
          id?: number
          pg_id?: number | null
          status?: string | null
          visit_date?: string
          visit_time?: string
          visitor_email?: string
          visitor_name?: string
          visitor_phone?: string
        }
        Relationships: [
          {
            foreignKeyName: "visits_pg_id_fkey"
            columns: ["pg_id"]
            isOneToOne: false
            referencedRelation: "pgs"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlists: {
        Row: {
          created_at: string | null
          id: string
          pg_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          pg_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          pg_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_pg_id_fkey"
            columns: ["pg_id"]
            isOneToOne: false
            referencedRelation: "pgs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
