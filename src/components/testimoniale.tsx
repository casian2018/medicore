export default function Testimoniale() {
  const testimonials = [
    [
      {
        name: "Dr. Michael Carter",
        role: "Doctor",
        testimonial:
          "MediCore has transformed the way I interact with my patients. The platform allows for seamless communication and quick diagnosis, improving patient care significantly. Highly recommended for any healthcare professional!",
        photo: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with actual images
      },
      {
        name: "Sarah Thompson",
        role: "Patient",
        testimonial:
          "I was able to receive a medical consultation within hours through MediCore. The doctors were professional, and the advice I received was extremely helpful. This platform makes healthcare more accessible!",
        photo: "https://randomuser.me/api/portraits/women/45.jpg",
      },
      {
        name: "Nurse Olivia Martinez",
        role: "Nurse",
        testimonial:
          "As a nurse, I appreciate the community aspect of MediCore. Sharing experiences and learning from other professionals has been invaluable to my growth. It’s a great tool for collaboration!",
        photo: "https://randomuser.me/api/portraits/women/30.jpg",
      },
      {
        name: "David Johnson",
        role: "Patient",
        testimonial:
          "I was unsure about online medical consultations, but MediCore proved me wrong. The doctors provided detailed insights, and I felt heard and cared for. It’s a game-changer for those needing quick, reliable medical advice.",
        photo: "https://randomuser.me/api/portraits/men/41.jpg",
      },
      {
        name: "Dr. Emily Roberts",
        role: "Doctor",
        testimonial:
          "MediCore has given me a platform to discuss challenging cases with other doctors. The ability to share knowledge and collaborate in real-time has significantly improved my practice.",
        photo: "https://randomuser.me/api/portraits/women/50.jpg",
      },
      {
        name: "Sophia Williams",
        role: "Healthcare Worker",
        testimonial:
          "The forum on MediCore is one of my favorite features. It allows healthcare workers to exchange knowledge and stay updated on the latest medical trends. I learn something new every day!",
        photo: "https://randomuser.me/api/portraits/women/35.jpg",
      },
    ],
  ];

  return (
    <main id="testimonials" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          What Our Users Say
        </h1>

        <div className="space-y-8 lg:space-y-12">
          {testimonials.map((column, colIndex) => (
            <div
              key={colIndex}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {column.map((user, index) => (
                <div
                  key={`${colIndex}-${index}`}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {user.name}
                      </h2>
                      <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {user.testimonial}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
