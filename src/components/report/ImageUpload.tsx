import { useRef } from 'react'
import { Camera, X } from 'lucide-react'

interface ImageUploadProps {
  images: File[]
  onChange: (images: File[]) => void
}

export default function ImageUpload({ images, onChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      onChange([...images, ...newFiles])
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Photos <span className="text-red-500">*</span>
      </label>

      <div className="space-y-4">
        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 
                     hover:border-blue-500 hover:bg-blue-50 transition-colors
                     flex flex-col items-center gap-2"
        >
          <Camera className="w-12 h-12 text-gray-400" />
          <span className="text-gray-600">Click to upload photos</span>
          <span className="text-sm text-gray-500">JPG, PNG (max 5MB each)</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Image Previews */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1
                           opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm text-gray-600">
          {images.length > 0 
            ? `${images.length} image${images.length > 1 ? 's' : ''} selected`
            : 'No images selected'
          }
        </p>
      </div>
    </div>
  )
}
