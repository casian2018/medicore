import Link from 'next/link'

interface AuthFormProps {
  variant: 'login' | 'signup'
}

export default function AuthForm({ variant }: AuthFormProps) {
  const isLogin = variant === 'login'
  const title = isLogin ? 'Login to Medicore' : 'Create an Account'
  const actionText = isLogin ? 'Login' : 'Sign Up'
  const alternativeText = isLogin 
    ? "Don't have an account?" 
    : "Already have an account?"
  const alternativeLink = isLogin ? '/signup' : '/login'
  const alternativeLinkText = isLogin ? 'Sign Up' : 'Login'

  async function handleSubmit(formData: FormData) {
    'use server'
    // Add your authentication logic here
    console.log(Object.fromEntries(formData))
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-red-50">
      <h2 className="text-3xl font-bold mb-8 text-center text-red-600">{title}</h2>
      <form className="space-y-6" action={handleSubmit}>
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-red-800">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 py-2 px-4 transition-all"
            />
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-red-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 block w-full rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 py-2 px-4 transition-all"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-red-800">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            required
            className="mt-1 block w-full rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 py-2 px-4 transition-all"
          />
        </div>

        {!isLogin && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-red-800">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="mt-1 block w-full rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 py-2 px-4 transition-all"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
        >
          {actionText}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-red-700">
        {alternativeText}{' '}
        <Link
          href={alternativeLink}
          className="font-semibold text-red-600 hover:text-red-700 underline underline-offset-4"
        >
          {alternativeLinkText}
        </Link>
      </p>
    </div>
  )
}