export default function Testimoniale() {
    const testimonials = [
      [
        {
          name: 'Dr. Michael Carter',
          role: 'Doctor',
          testimonial: 'MediCore has transformed the way I interact with my patients. The platform allows for seamless communication and quick diagnosis, improving patient care significantly. Highly recommended for any healthcare professional!',
        },
        {
          name: 'Sarah Thompson',
          role: 'Patient',
          testimonial: 'I was able to receive a medical consultation within hours through MediCore. The doctors were professional, and the advice I received was extremely helpful. This platform makes healthcare more accessible!',
        },
        {
          name: 'Nurse Olivia Martinez',
          role: 'Nurse',
          testimonial: 'As a nurse, I appreciate the community aspect of MediCore. Sharing experiences and learning from other professionals has been invaluable to my growth. It’s a great tool for collaboration!',
        }
      ,
      
        {
          name: 'David Johnson',
          role: 'Patient',
          testimonial: 'I was unsure about online medical consultations, but MediCore proved me wrong. The doctors provided detailed insights, and I felt heard and cared for. It’s a game-changer for those needing quick, reliable medical advice.',
        },
        {
          name: 'Dr. Emily Roberts',
          role: 'Doctor',
          testimonial: 'MediCore has given me a platform to discuss challenging cases with other doctors. The ability to share knowledge and collaborate in real-time has significantly improved my practice.',
        },
        {
          name: 'Sophia Williams',
          role: 'Healthcare Worker',
          testimonial: 'The forum on MediCore is one of my favorite features. It allows healthcare workers to exchange knowledge and stay updated on the latest medical trends. I learn something new every day!',
        }
      ]
    ];
  
    return (
      <main id="testimonials" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            What Our Users Say
          </h1>
  
          <div className="space-y-8 lg:space-y-12">
            {testimonials.map((column, colIndex) => (
              <div key={colIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {column.map((user, index) => (
                  <div
                    key={`${colIndex}-${index}`}
                    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src="https://via.placeholder.com/50"
                        alt="Profile"
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                        <p className="text-sm text-gray-500">{user.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{user.testimonial}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }