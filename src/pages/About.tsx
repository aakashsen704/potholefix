import { Target, Users, Zap } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">About PotholeFix</h1>
          <p className="text-xl text-gray-700 mb-12 leading-relaxed">
            PotholeFix is a civic engagement platform that empowers citizens to report 
            road damage while showcasing advanced AI technology for infrastructure monitoring.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-gray-600">
                Make road maintenance transparent and efficient through citizen participation
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community First</h3>
              <p className="text-gray-600">
                Built by the community, for the community, to improve our shared infrastructure
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
              <p className="text-gray-600">
                Leveraging machine learning to automate pothole detection and reporting
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Citizens can report potholes by simply uploading a photo and pinning the location on a map. 
                No account required - we believe in making civic participation as frictionless as possible.
              </p>
              <p>
                Once submitted, municipal officials are automatically notified via email. They can track, 
                prioritize, and update the status of each report through our admin dashboard.
              </p>
              <p>
                The platform also showcases a YOLOv4-tiny machine learning model trained to automatically 
                detect potholes from video feeds, demonstrating the potential for autonomous infrastructure 
                monitoring.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Frontend:</strong> React with TypeScript, Tailwind CSS, React Leaflet</li>
              <li><strong>Backend:</strong> Supabase (PostgreSQL database, storage, authentication)</li>
              <li><strong>ML Model:</strong> YOLOv4-tiny with OpenCV DNN</li>
              <li><strong>Notifications:</strong> Resend API for email delivery</li>
              <li><strong>Deployment:</strong> Lovable platform</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
