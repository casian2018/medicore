export default function Testimoniale() {
    return (
    <main id="main" className="flex">
    <div className="container mx-auto py-8">
    <h1 className="text-4xl font-bold text-center mb-8 mt-2">
        What Our Users Say
    </h1>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
        {
            name: 'John Doe',
            role: 'Doctor',
            testimonial:
            'MediCore has been an invaluable platform for me to connect with patients and other professionals. Highly recommended!',
        },
        {
            name: 'Jane Smith',
            role: 'Patient',
            testimonial:
            'I received quick and helpful medical advice through MediCore. The community is supportive and responsive.',
        },
        {
            name: 'Emily Johnson',
            role: 'Nurse',
            testimonial:
            'A great platform for healthcare workers to collaborate and share their experiences. I learn something new every day!',
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
            name: 'John Doe',
            role: 'Doctor',
            testimonial:
            'MediCore has been an invaluable platform for me to connect with patients and other professionals. Highly recommended!',
        },
        {
            name: 'Jane Smith',
            role: 'Patient',
            testimonial:
            'I received quick and helpful medical advice through MediCore. The community is supportive and responsive.',
        },
        {
            name: 'Emily Johnson',
            role: 'Nurse',
            testimonial:
            'A great platform for healthcare workers to collaborate and share their experiences. I learn something new every day!',
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