import { Link } from 'react-router-dom'
import { ShieldX, ArrowLeft } from 'lucide-react'

const Unauthorized = () => {
  return (
    <div className="glass-card p-8 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
        <ShieldX className="h-8 w-8 text-red-500" />
      </div>
      <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
      <p className="mt-2 text-sm text-gray-500">
        You do not have permission to access this page.
      </p>
      <Link to="/dashboard" className="btn-primary mt-6 inline-flex">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>
    </div>
  )
}

export default Unauthorized
