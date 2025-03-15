import Nav from '@/components/nav'
import Footer from '@/components/footer'

export default function AboutUs() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Nav />
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-100">
          <header className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Transforming Healthcare Through{" "}
              <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                Intelligent Medicine
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Bridging cutting-edge AI with human expertise to deliver accessible, accurate healthcare solutions
            </p>
          </header>

          <div className="space-y-20">
            <section>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                  <p className="text-gray-600 leading-relaxed">
                    At Medicore, we're redefining healthcare accessibility by merging advanced machine learning 
                    with clinical expertise. Our platform delivers instant preliminary assessments while maintaining 
                    the crucial human connection in medical care.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-xl border border-gray-100">
                  <img src="/Health321.jpg" alt="AI in healthcare" className="rounded-lg" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Platform</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'AI Diagnosis Engine',
                    icon: 'cpu',
                    text: 'Deep learning models trained on millions of medical cases',
                    stats: '95% Accuracy'
                  },
                  {
                    title: 'Expert Network',
                    icon: 'users',
                    text: '500+ certified specialists across 30+ specialties',
                    stats: '24/7 Availability'
                  },
                  {
                    title: 'Secure Infrastructure',
                    icon: 'lock',
                    text: 'HIPAA-compliant platform with end-to-end encryption',
                    stats: '100% Private'
                  }
                ].map((feature, index) => (
                  <div key={index} className="group bg-white p-8 rounded-xl border border-gray-100 hover:border-red-100 transition-all">
                    <svg 
                      className="h-12 w-12 text-red-600 mb-6"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      {feature.icon === 'cpu' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM15 9l-3 3m0 0l-3 3m3-3V9" />
                      )}
                      {feature.icon === 'users' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      )}
                      {feature.icon === 'lock' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      )}
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.text}</p>
                    <div className="text-red-600 font-medium">{feature.stats}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white">
                <div className="max-w-4xl mx-auto text-center">
                  <svg 
                    className="h-12 w-12 mx-auto mb-6 text-red-200"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h2 className="text-3xl font-bold mb-6">Proven Results</h2>
                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {[
                      { number: '500K+', label: 'Assessments Completed' },
                      { number: '98%', label: 'User Satisfaction' },
                      { number: '2M+', label: 'Data Points Analyzed' }
                    ].map((stat, index) => (
                      <div key={index} className="space-y-2">
                        <div className="text-4xl font-bold">{stat.number}</div>
                        <div className="text-red-200 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

         

            <section>
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Our Team</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-50 rounded-lg">
                        <svg 
                          className="h-6 w-6 text-red-600"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Medical Support</h3>
                        <p className="text-gray-600">+1 (800) MED-AI24</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-50 rounded-lg">
                        <svg 
                          className="h-6 w-6 text-red-600"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">General Inquiries</h3>
                        <p className="text-gray-600">hello@medicore.ai</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-4">Visit Us</h3>
                    <p className="text-gray-600">
                      Medicore Headquarters<br />
                      Timisoara Tech Park<br />
                      Timisoara, Romania 300594
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}