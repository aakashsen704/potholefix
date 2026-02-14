import { Filter } from 'lucide-react'

interface MapFiltersProps {
  filters: {
    severity: string
    status: string
  }
  onChange: (filters: { severity: string; status: string }) => void
  reportCount: number
}

export default function MapFilters({ filters, onChange, reportCount }: MapFiltersProps) {
  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white p-4 rounded-lg shadow-lg max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold">Filters</h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Severity</label>
          <select 
            value={filters.severity}
            onChange={(e) => onChange({ ...filters, severity: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Severities</option>
            <option value="minor">Minor</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="reported">Reported</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-gray-600">
          Showing <strong>{reportCount}</strong> report{reportCount !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}
