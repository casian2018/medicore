import Link from 'next/link'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export default function AboutUs() {
  return (
    <main className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 max-w-4xl mx-auto p-6">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-50">
          <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
            Revolutionizing Healthcare with AI
          </h1>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Our Vision</h2>
              <p className="leading-relaxed">
                At Medicore, we combine advanced artificial intelligence with human medical expertise 
                to provide instant preliminary diagnoses and seamless connections to qualified doctors. 
                Our platform bridges the gap between patients and healthcare providers, making quality 
                medical care accessible to everyone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'AI-Powered Diagnosis',
                    icon: '🤖',
                    text: 'Our advanced AI analyzes symptoms using medical databases and case studies'
                  },
                  {
                    title: 'Doctor Matching',
                    icon: '👩⚕️',
                    text: 'Instant connection to specialists based on your condition'
                  },
                  {
                    title: 'Virtual Consultations',
                    icon: '💻',
                    text: 'Secure video calls with verified medical professionals'
                  }
                ].map((step, index) => (
                  <div key={index} className="text-center p-4 border border-red-100 rounded-lg">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="font-semibold text-black mb-2">{step.title}</h3>
                    <p className="text-sm">{step.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Why Choose Us</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-red-600 text-xl">⚡</div>
                  <div>
                    <h3 className="font-semibold text-black">24/7 Availability</h3>
                    <p className="text-sm">Get preliminary assessments anytime, anywhere</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-red-600 text-xl">🎯</div>
                  <div>
                    <h3 className="font-semibold text-black">95% Accuracy</h3>
                    <p className="text-sm">AI trained on millions of medical cases</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-red-600 text-xl">🏥</div>
                  <div>
                    <h3 className="font-semibold text-black">Verified Network</h3>
                    <p className="text-sm">500+ certified doctors across specialties</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Our Technology</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-black mb-2">Medical AI Engine</h3>
                  <p className="text-sm">
                    Combining deep learning with up-to-date medical research from trusted sources 
                    like WHO and CDC
                  </p>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-black mb-2">Secure Platform</h3>
                  <p className="text-sm">
                    HIPAA-compliant system with end-to-end encryption for all patient data
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Medical Leadership</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {['Medical Experts', 'AI Specialists'].map((team, index) => (
                  <div key={index} className="bg-red-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-black mb-4">{team}</h3>
                    <p className="text-sm">
                      {team === 'Medical Experts' 
                        ? 'Board-certified physicians overseeing diagnosis accuracy' 
                        : 'Machine learning experts maintaining our AI systems'}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Contact Our Team</h2>
              <div className="space-y-4">
                <p>📞 Medical Support: +1 (800) MED-AI24</p>
                <p>📧 Technical Support: support@medicore.ai</p>
                <p>📍 Headquarters: Timisoara, RO</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}