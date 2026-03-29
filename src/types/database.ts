export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bakery_items: {
        Row: {
          id: string;
          name: string;
          description: string;
          main_image_url: string;
          additional_image_urls: string[] | null;
          ingredients: string[] | null;
          allergens: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          main_image_url: string;
          additional_image_urls?: string[] | null;
          ingredients?: string[] | null;
          allergens?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          main_image_url?: string;
          additional_image_urls?: string[] | null;
          ingredients?: string[] | null;
          allergens?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type BakeryItemRow = Database["public"]["Tables"]["bakery_items"]["Row"];
