import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import type { MapLocation } from '@/lib/types'
import { MapPin } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface MapPickerProps {
  location: MapLocation | null
  onChange: (location: MapLocation) => void
}

function LocationMarker({ location, onChange }: MapPickerProps) {
  useMapEvents({
    click(e) {
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
  })

  return location ? <Marker position={[location.lat, location.lng]} /> : null
}

export default function MapPicker({ location, onChange }: MapPickerProps) {
  const mapRef = useRef<L.Map>(null)

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          onChange(newLocation)
          if (mapRef.current) {
            mapRef.current.setView([newLocation.lat, newLocation.lng], 16)
          }
        },
        (error) => {
          console.error('Error getting location:', error)
          alert('Unable to get your location. Please click on the map to set location.')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser')
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Location <span className="text-red-500">*</span>
      </label>
      
      <div className="mb-2">
        <button
          type="button"
          onClick={getCurrentLocation}
          className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Use My Current Location
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
        <MapContainer
          center={[40.7128, -74.0060]} // Default to NYC
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker location={location} onChange={onChange} />
        </MapContainer>
      </div>

      <p className="text-sm text-gray-600 mt-2">
        {location 
          ? `Selected: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
          : 'Click on the map or use your current location to set the pothole location'
        }
      </p>
    </div>
  )
}
