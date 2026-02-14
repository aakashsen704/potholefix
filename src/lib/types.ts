export type Severity = 'minor' | 'moderate' | 'severe'
export type Status = 'reported' | 'in_progress' | 'resolved'

export interface PotholeReport {
  id: string
  created_at: string
  updated_at: string
  latitude: number
  longitude: number
  severity: Severity
  status: Status
  description?: string
  reporter_name?: string
  reporter_email?: string
  image_urls: string[]
}

export interface ReportFormData {
  latitude: number
  longitude: number
  severity: Severity
  description: string
  reporter_name: string
  reporter_email: string
  images: File[]
}

export interface MapLocation {
  lat: number
  lng: number
}
