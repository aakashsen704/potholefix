import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Camera, MapPin, Bell } from 'lucide-react'

export default function Hero() {
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    inProgress: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { count: totalCount } = await supabase
        .from('pothole_reports')
        .select('*', { count: 'exact', head: true })

      const { count: resolvedCount } = await supabase
        .from('pothole_reports')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'resolved')

      const { count: inProgressCount } = await supabase
        .from('pothole_reports')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'in_progress')

      setStats({
        total: totalCount || 0,
        resolved: resolvedCount || 0,
        inProgress: inProgressCount || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Help Fix Your City's Roads
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Report potholes in seconds. Upload a photo, pin the location, and 
            municipal officials are automatically notified. Together, we make 
            our roads safer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/report" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold 
                         hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Report a Pothole
            </Link>
            <Link 
              to="/map" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold 
                         border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              View Map
            </Link>
          </div>
        </div>

        {/* Live Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-md text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {stats.total}
            </div>
            <div className="text-gray-600 font-medium">Total Reports</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {stats.inProgress}
            </div>
            <div className="text-gray-600 font-medium">In Progress</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {stats.resolved}
            </div>
            <div className="text-gray-600 font-medium">Resolved</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Capture</h3>
              <p className="text-gray-600">
                Take a photo of the pothole using your phone camera
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Locate</h3>
              <p className="text-gray-600">
                Pin the exact location on an interactive map
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Notify</h3>
              <p className="text-gray-600">
                Officials are automatically notified and can take action
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            See a pothole? Report it now.
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Every report helps make our roads safer for everyone.
          </p>
          <Link 
            to="/report" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold 
                       hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
