export default function Testimoniale() {
    return (
    <main id="main" className="flex">
    <div className="container mx-auto py-1">
    <h1 className="text-4xl font-bold text-center mb-8 mt-2">
        What Our Users Say
    </h1>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
        {
            name: 'Dr. Michael Carter',
            role: 'Doctor',
            testimonial:
            'MediCore has transformed the way I interact with my patients. The platform allows for seamless communication and quick diagnosis, improving patient care significantly. Highly recommended for any healthcare professional!',
        },
        {
            name: 'Sarah Thompson',
            role: 'Patient',
            testimonial:
            ' was able to receive a medical consultation within hours through MediCore. The doctors were professional, and the advice I received was extremely helpful. This platform makes healthcare more accessible!',
        },
        {
            name: 'Nurse Olivia Martinez',
            role: 'Nurse',
            testimonial:
            'As a nurse, I appreciate the community aspect of MediCore. Sharing experiences and learning from other professionals has been invaluable to my growth. It’s a great tool for collaboration!',
        },
        ].map((user, index) => (
        <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md"
        >
            <div className="flex items-center mb-4">
            <img
                src="https://via.placeholder.com/50"
                alt="Profile Picture"
                className="w-12 h-12 rounded-full mr-4"
            />
            <div>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.role}</p>
            </div>
            </div>
            <p className="text-gray-700">{user.testimonial}</p>
        </div>
        ))}
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        {[
        {
            name: 'David Johnson',
            role: 'Patient',
            testimonial:
            'I was unsure about online medical consultations, but MediCore proved me wrong. The doctors provided detailed insights, and I felt heard and cared for. It’s a game-changer for those needing quick, reliable medical advice.',
        },
        {
            name: 'Dr. Emily Roberts',
            role: 'Doctor',
            testimonial:
            'MediCore has given me a platform to discuss challenging cases with other doctors. The ability to share knowledge and collaborate in real-time has significantly improved my practice.',
        },
        {
            name: 'Sophia Williams',
            role: 'Healthcare Worker',
            testimonial:
            'The forum on MediCore is one of my favorite features. It allows healthcare workers to exchange knowledge and stay updated on the latest medical trends. I learn something new every day!',
        },
        ].map((user, index) => (
        <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md"
        >
            <div className="flex items-center mb-4">
            <img
                src="https://via.placeholder.com/50"
                alt="Profile Picture"
                className="w-12 h-12 rounded-full mr-4"
            />
            <div>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.role}</p>
            </div>
            </div>
            <p className="text-gray-700">{user.testimonial}</p>
        </div>
        ))}
    </div>
    </div>
    
</main>
    );
}