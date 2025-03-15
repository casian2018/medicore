import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

interface AuthFormProps {
  variant: 'login' | 'signup'
}

export default function AuthForm({ variant }: AuthFormProps) {
  const isLogin = variant === 'login'
  const title = isLogin ? 'Login' : 'Create an Account'
  const actionText = isLogin ? 'Login' : 'Sign Up'
  const alternativeText = isLogin 
    ? "Don't have an account?" 
    : "Already have an account?"
  const alternativeLink = isLogin ? '/pages/signup' : '/pages/login'
  const alternativeLinkText = isLogin ? 'Sign Up' : 'Login'
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    if (!isLogin && data.password !== data.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await fetch(isLogin ? '/api/auth/login' : '/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong')
      }

      if (isLogin) {
        router.push('/profile')
      } else {
        router.push('/pages/login')
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-red-50">
      <h2 className="text-3xl font-bold mb-8 text-center text-black">{title}</h2>
      {error && <p className="text-black text-center mb-4">{error}</p>}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black">
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
            <div>
              <label htmlFor="surname" className="block text-sm font-medium text-black">
                Surname
              </label>
              <input
                id="surname"
                name="surname"
                type="text"
                required
                className="mt-1 block w-full rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 py-2 px-4 transition-all"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-black">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 py-2 px-4 transition-all"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-black">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                className="mt-1 block w-full rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 py-2 px-4 transition-all"
              />
            </div>
          </>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-black">
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
          <label htmlFor="password" className="block text-sm font-medium text-black">
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
          <>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
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

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Account Type
              </label>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="patient"
                    name="type"
                    value="patient"
                    required
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-red-200"
                  />
                  <label htmlFor="patient" className="ml-2 text-black">
                    Patient
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="doctor"
                    name="type"
                    value="doctor"
                    required
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-red-200"
                  />
                  <label htmlFor="doctor" className="ml-2 text-black">
                    Doctor
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
        >
          {actionText}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-black">
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