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
      } else {
        setError('Failed to send message. Please try again later.')
      }
    } catch (error) {
      setError('An error occurred. Please try again later.')
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 max-w-4xl mx-auto p-6 mt-10">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-50">
          <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
            Contact Us
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-600 text-center">{error}</p>}
            {success && <p className="text-green-600 text-center">{success}</p>}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                  Name 
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 py-2 px-4 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                  Email 
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 py-2 px-4 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-black mb-2">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 py-2 px-4 transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                Message 
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full h-32 rounded-lg border-red-200 bg-red-50/20 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 py-2 px-4 transition-all resize-y"
                maxLength={1000}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="py-2 px-6 rounded-lg shadow-sm text-sm font-semibold 
                  text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  )
}