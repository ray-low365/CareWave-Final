export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string
          date: string
          department: string | null
          doctor: string | null
          id: string
          notes: string | null
          patient_id: string
          status: string
          time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          department?: string | null
          doctor?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          status: string
          time: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          department?: string | null
          doctor?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          status?: string
          time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      billing: {
        Row: {
          amount: number
          created_at: string
          date: string
          id: string
          insurance_details: string | null
          invoice_number: string | null
          patient_id: string | null
          payment_status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          date: string
          id?: string
          insurance_details?: string | null
          invoice_number?: string | null
          patient_id?: string | null
          payment_status: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          date?: string
          id?: string
          insurance_details?: string | null
          invoice_number?: string | null
          patient_id?: string | null
          payment_status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "billing_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_services: {
        Row: {
          billing_id: string | null
          created_at: string
          id: string
          service_name: string
        }
        Insert: {
          billing_id?: string | null
          created_at?: string
          id?: string
          service_name: string
        }
        Update: {
          billing_id?: string | null
          created_at?: string
          id?: string
          service_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "billing_services_billing_id_fkey"
            columns: ["billing_id"]
            isOneToOne: false
            referencedRelation: "billing"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory: {
        Row: {
          category: string | null
          created_at: string
          expiry_date: string | null
          id: string
          last_restocked: string | null
          name: string
          price: number | null
          quantity: number
          reorder_level: number
          supplier: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          expiry_date?: string | null
          id?: string
          last_restocked?: string | null
          name: string
          price?: number | null
          quantity: number
          reorder_level: number
          supplier?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          expiry_date?: string | null
          id?: string
          last_restocked?: string | null
          name?: string
          price?: number | null
          quantity?: number
          reorder_level?: number
          supplier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      patients: {
        Row: {
          address: string
          appointment_history: string | null
          contact_info: string
          created_at: string
          date_of_birth: string | null
          gender: string | null
          id: string
          insurance_number: string | null
          insurance_provider: string | null
          medical_history: string | null
          name: string
          updated_at: string
        }
        Insert: {
          address: string
          appointment_history?: string | null
          contact_info: string
          created_at?: string
          date_of_birth?: string | null
          gender?: string | null
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          medical_history?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          address?: string
          appointment_history?: string | null
          contact_info?: string
          created_at?: string
          date_of_birth?: string | null
          gender?: string | null
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          medical_history?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      staff: {
        Row: {
          created_at: string
          department: string
          email: string | null
          id: string
          joining_date: string | null
          name: string | null
          phone: string | null
          role: string
          specialty: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          department: string
          email?: string | null
          id?: string
          joining_date?: string | null
          name?: string | null
          phone?: string | null
          role: string
          specialty?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string
          email?: string | null
          id?: string
          joining_date?: string | null
          name?: string | null
          phone?: string | null
          role?: string
          specialty?: string | null
          updated_at?: string
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
