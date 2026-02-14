import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Severity, MapLocation } from '@/lib/types'
import MapPicker from './MapPicker'
import ImageUpload from './ImageUpload'
import SeveritySelector from './SeveritySelector'
import { Loader2 } from 'lucide-react'

export default function ReportForm() {
  const [location, setLocation] = useState<MapLocation | null>(null)
  const [severity, setSeverity] = useState<Severity>('moderate')
  const [images, setImages] = useState<File[]>([])
  const [description, setDescription] = useState('')
  const [reporterName, setReporterName] = useState('')
  const [reporterEmail, setReporterEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!location || images.length === 0) {
      alert('Please select a location and upload at least one image')
      return
    }

    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      // 1. Upload images to Supabase Storage
      const imageUrls: string[] = []
      for (const image of images) {
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${image.name}`
        const { data, error } = await supabase.storage
          .from('pothole-images')
          .upload(fileName, image)
        
        if (error) throw error
        
        const { data: { publicUrl } } = supabase.storage
          .from('pothole-images')
          .getPublicUrl(fileName)
        
        imageUrls.push(publicUrl)
      }

      // 2. Insert report into database
      const { data: report, error: dbError } = await supabase
        .from('pothole_reports')
        .insert({
          latitude: location.lat,
          longitude: location.lng,
          severity,
          description: description || null,
          reporter_name: reporterName || null,
          reporter_email: reporterEmail || null,
          image_urls: imageUrls,
        })
        .select()
        .single()

      if (dbError) throw dbError

      // 3. Trigger email notification via Edge Function (optional)
      try {
        await supabase.functions.invoke('send-report-email', {
          body: { reportId: report.id }
        })
      } catch (emailError) {
        console.error('Email notification failed:', emailError)
        // Don't fail the whole operation if email fails
      }

      // Success! Reset form
      setSubmitSuccess(true)
      setLocation(null)
      setImages([])
      setDescription('')
      setReporterName('')
      setReporterEmail('')
      setSeverity('moderate')
      
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
      
    } catch (error) {
      console.error('Error submitting report:', error)
      alert('Failed to submit report. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {submitSuccess && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <strong>Success!</strong> Pothole reported. Officials have been notified.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Report a Pothole</h2>
          <p className="text-gray-600">Help improve your city's roads by reporting potholes</p>
        </div>
        
        <MapPicker location={location} onChange={setLocation} />
        
        <ImageUpload images={images} onChange={setImages} />
        
        <SeveritySelector value={severity} onChange={setSeverity} />
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Any additional details about the pothole..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              value={reporterEmail}
              onChange={(e) => setReporterEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!location || images.length === 0 || isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold 
                     hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2 transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Report'
          )}
        </button>
      </form>
    </div>
  )
}
