export type Database = {
  public: {
    Tables: {
      pothole_reports: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          latitude: number
          longitude: number
          severity: 'minor' | 'moderate' | 'severe'
          status: 'reported' | 'in_progress' | 'resolved'
          description: string | null
          reporter_name: string | null
          reporter_email: string | null
          image_urls: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          latitude: number
          longitude: number
          severity: 'minor' | 'moderate' | 'severe'
          status?: 'reported' | 'in_progress' | 'resolved'
          description?: string | null
          reporter_name?: string | null
          reporter_email?: string | null
          image_urls?: string[]
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          latitude?: number
          longitude?: number
          severity?: 'minor' | 'moderate' | 'severe'
          status?: 'reported' | 'in_progress' | 'resolved'
          description?: string | null
          reporter_name?: string | null
          reporter_email?: string | null
          image_urls?: string[]
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
    }
  }
}
