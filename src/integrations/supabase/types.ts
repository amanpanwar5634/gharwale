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
      bookings: {
        Row: {
          booking_fee: number | null
          created_at: string | null
          duration_months: number
          guest_email: string
          guest_name: string
          guest_phone: string
          id: number
          move_in_date: string
          pg_id: number | null
          status: string | null
          total_amount: number
        }
        Insert: {
          booking_fee?: number | null
          created_at?: string | null
          duration_months: number
          guest_email: string
          guest_name: string
          guest_phone: string
          id?: number
          move_in_date: string
          pg_id?: number | null
          status?: string | null
          total_amount: number
        }
        Update: {
          booking_fee?: number | null
          created_at?: string | null
          duration_months?: number
          guest_email?: string
          guest_name?: string
          guest_phone?: string
          id?: number
          move_in_date?: string
          pg_id?: number | null
          status?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_pg_id_fkey"
            columns: ["pg_id"]
            isOneToOne: false
            referencedRelation: "pgs"
            referencedColumns: ["id"]
          },
        ]
      }
      pgs: {
        Row: {
          amenities: string[] | null
          available: boolean | null
          created_at: string | null
          description: string | null
          gender: string
          id: number
          images: string[] | null
          location: string
          maintenance_fee: number | null
          name: string
          nearby_places: string[] | null
          pg_rules: string[] | null
          rating: number | null
          rent: number
          review_count: number | null
          room_type: string
          security_deposit: number | null
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          amenities?: string[] | null
          available?: boolean | null
          created_at?: string | null
          description?: string | null
          gender: string
          id?: number
          images?: string[] | null
          location: string
          maintenance_fee?: number | null
          name: string
          nearby_places?: string[] | null
          pg_rules?: string[] | null
          rating?: number | null
          rent: number
          review_count?: number | null
          room_type: string
          security_deposit?: number | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          amenities?: string[] | null
          available?: boolean | null
          created_at?: string | null
          description?: string | null
          gender?: string
          id?: number
          images?: string[] | null
          location?: string
          maintenance_fee?: number | null
          name?: string
          nearby_places?: string[] | null
          pg_rules?: string[] | null
          rating?: number | null
          rent?: number
          review_count?: number | null
          room_type?: string
          security_deposit?: number | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: number
          pg_id: number | null
          rating: number
          reviewer_email: string
          reviewer_name: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: number
          pg_id?: number | null
          rating: number
          reviewer_email: string
          reviewer_name: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: number
          pg_id?: number | null
          rating?: number
          reviewer_email?: string
          reviewer_name?: string
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
