import Link from 'next/link'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export default function ErrorPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-red-50">
            <div className="text-6xl font-bold text-red-600 mb-4">404</div>
            <h1 className="text-2xl font-bold text-black mb-4">
              Page Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
              href="/"
              className="inline-block py-2 px-6 rounded-lg shadow-sm text-sm font-semibold 
                text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}