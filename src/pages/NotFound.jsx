import { Link } from 'react-router-dom'
import { FileQuestion, Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4">
      <div className="glass-card max-w-md p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
          <FileQuestion className="h-8 w-8 text-gray-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <h2 className="mt-2 text-lg font-semibold text-gray-700">Page Not Found</h2>
        <p className="mt-2 text-sm text-gray-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn-primary mt-6 inline-flex">
          <Home className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
