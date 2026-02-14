import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { PotholeReport } from '@/lib/types'
import { Calendar, MapPin, AlertCircle, RefreshCw } from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'

export default function AdminDashboard() {
  const [reports, setReports] = useState<PotholeReport[]>([])
  const [filter, setFilter] = useState<'all' | 'reported' | 'in_progress' | 'resolved'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'severity'>('date')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReports()
  }, [filter, sortBy])

  const fetchReports = async () => {
    setLoading(true)
    try {
      let query = supabase.from('pothole_reports').select('*')

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const sortColumn = sortBy === 'date' ? 'created_at' : 'severity'
      query = query.order(sortColumn, { ascending: false })

      const { data, error } = await query

      if (!error && data) {
        setReports(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    const { error} = await supabase
      .from('pothole_reports')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (!error) {
      fetchReports()
    }
  }

  const getSeverityColor = (severity: string) => {
    const colors = {
      severe: 'bg-red-100 text-red-800',
      moderate: 'bg-orange-100 text-orange-800',
      minor: 'bg-green-100 text-green-800'
    }
    return colors[severity as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status: string) => {
    const colors = {
      resolved: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800',
      reported: 'bg-yellow-100 text-yellow-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage and track pothole reports</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Status Filter</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Reports</option>
              <option value="reported">Reported</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="date">Date</option>
              <option value="severity">Severity</option>
            </select>
          </div>

          <div className="ml-auto flex items-end">
            <button
              onClick={fetchReports}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Severity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Reporter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {new Date(report.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <a
                        href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                      </a>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)}`}>
                      {report.severity}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <select
                      value={report.status}
                      onChange={(e) => updateStatus(report.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(report.status)}`}
                    >
                      <option value="reported">Reported</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {report.reporter_name || 'Anonymous'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {reports.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No reports found</p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-gray-900">{reports.length}</div>
          <div className="text-sm text-gray-600 mt-1">Total ({filter === 'all' ? 'All' : filter})</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-red-600">
            {reports.filter(r => r.severity === 'severe').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Severe</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-orange-600">
            {reports.filter(r => r.severity === 'moderate').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Moderate</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-green-600">
            {reports.filter(r => r.severity === 'minor').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Minor</div>
        </div>
      </div>
    </div>
  )
}
