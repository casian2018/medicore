import { useState } from 'react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [charCount, setCharCount] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields')
      return
    }

    const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_LINK;
    if (!webhookUrl) {
      setError('Webhook URL is not defined. Please contact support.');
      return;
    }
    const payload = {
      content: `**Name:** ${formData.name}\n**Email:** ${formData.email}\n**Subject:** ${formData.subject}\n**Message:** ${formData.message}`
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setSuccess('Your message has been sent successfully!')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setCharCount(0)
      } else {
        setError('Failed to send message. Please try again later.')
      }
    } catch (error) {
      setError('An error occurred. Please try again later.')
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-red-50/30 to-white">
      <Nav />
      <div className="flex-1 max-w-4xl mx-auto px-4 py-12 lg:py-16 mt-10">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-red-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-red-600 mb-4">
                Get in Touch
              </h1>
              <p className="text-gray-600 text-lg">
                Have questions or need assistance? We're here to help!
              </p>
              <div className="mt-4 h-1 w-24 bg-red-500 mx-auto rounded-full" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {(error || success) && (
                <div className={`p-4 rounded-lg ${
                  error ? 'bg-red-50' : 'bg-green-50'
                } flex items-center gap-3`}>
                 
                  <p className={`font-medium ${
                    error ? 'text-red-800' : 'text-green-800'
                  }`}>
                    {error || success}
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Subject
                </label>
                <input
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-gray-700 font-medium">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <span className="text-sm text-gray-500">
                    {charCount}/1000
                  </span>
                </div>
                <textarea
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({...formData, message: e.target.value})
                    setCharCount(e.target.value.length)
                  }}
                  className="w-full px-4 py-3 h-48 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all placeholder-gray-400 resize-none"
                  maxLength={1000}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}