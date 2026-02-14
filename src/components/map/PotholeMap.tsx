import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { supabase } from '@/lib/supabase'
import type { PotholeReport } from '@/lib/types'
import MapFilters from './MapFilters'
import LoadingSpinner from '../common/LoadingSpinner'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

export default function PotholeMap() {
  const [reports, setReports] = useState<PotholeReport[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    severity: 'all',
    status: 'all'
  })

  useEffect(() => {
    fetchReports()
  }, [filters])

  const fetchReports = async () => {
    setLoading(true)
    try {
      let query = supabase.from('pothole_reports').select('*')
      
      if (filters.severity !== 'all') {
        query = query.eq('severity', filters.severity)
      }
      if (filters.status !== 'all') {
        query = query.eq('status', filters.status)
      }

      const { data, error } = await query.order('created_at', { ascending: false })
      
      if (!error && data) {
        setReports(data)
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'text-red-600'
      case 'moderate': return 'text-orange-600'
      case 'minor': return 'text-green-600'
      default: return 'text-blue-600'
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      reported: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800'
    }
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="relative h-screen w-full">
      {/* Filters */}
      <MapFilters filters={filters} onChange={setFilters} reportCount={reports.length} />

      {/* Map */}
      <MapContainer 
        center={[40.7128, -74.0060]}
        zoom={12} 
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {reports.map((report) => (
          <Marker 
            key={report.id}
            position={[report.latitude, report.longitude]}
          >
            <Popup maxWidth={300}>
              <div className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-bold ${getSeverityColor(report.severity)}`}>
                    {report.severity.toUpperCase()} Pothole
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(report.status)}`}>
                    {report.status.replace('_', ' ')}
                  </span>
                </div>
                
                {report.image_urls && report.image_urls.length > 0 && (
                  <img 
                    src={report.image_urls[0]} 
                    alt="Pothole" 
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
                
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Reported:</strong> {new Date(report.created_at).toLocaleDateString()}
                </p>
                
                {report.description && (
                  <p className="text-sm mt-2 text-gray-700">{report.description}</p>
                )}
                
                {report.reporter_name && (
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Reported by:</strong> {report.reporter_name}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
