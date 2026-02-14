import type { Severity } from '@/lib/types'
import { AlertCircle } from 'lucide-react'

interface SeveritySelectorProps {
  value: Severity
  onChange: (severity: Severity) => void
}

export default function SeveritySelector({ value, onChange }: SeveritySelectorProps) {
  const severities: { value: Severity; label: string; color: string; description: string }[] = [
    {
      value: 'minor',
      label: 'Minor',
      color: 'bg-green-100 border-green-500 text-green-800',
      description: 'Small crack or surface damage'
    },
    {
      value: 'moderate',
      label: 'Moderate',
      color: 'bg-orange-100 border-orange-500 text-orange-800',
      description: 'Noticeable hole, may cause vehicle damage'
    },
    {
      value: 'severe',
      label: 'Severe',
      color: 'bg-red-100 border-red-500 text-red-800',
      description: 'Deep hole, immediate safety hazard'
    }
  ]

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Severity Level <span className="text-red-500">*</span>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {severities.map((severity) => (
          <button
            key={severity.value}
            type="button"
            onClick={() => onChange(severity.value)}
            className={`
              p-4 rounded-lg border-2 text-left transition-all
              ${value === severity.value 
                ? severity.color + ' shadow-md' 
                : 'bg-white border-gray-300 hover:border-gray-400'
              }
            `}
          >
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">{severity.label}</span>
            </div>
            <p className="text-sm opacity-80">{severity.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
