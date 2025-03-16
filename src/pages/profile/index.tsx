import { useEffect, useState } from 'react';
import Nav from '@/components/nav';
import Footer from '@/components/footer';

interface User {
    email: string;
    name: string;
    surname: string;
    username: string;
    dateOfBirth: string;
    dateCreated: string;
    type: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('/api/profile/user');
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <>
            <Nav />
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 py-10">
                <div className="relative flex flex-col items-center rounded-2xl w-full max-w-4xl mx-auto bg-white bg-clip-border shadow-lg p-8">
                    <div className="w-full mb-8">
                        <h4 className="text-2xl font-bold text-red-600 mt-8">
                            General Information
                        </h4>
                        <p className="text-base text-gray-600">
                            Medicine is the science and practice of caring for a patient, managing the diagnosis, prognosis, prevention, treatment, and palliation of their injury or disease. It encompasses a variety of health care practices evolved to maintain and restore health by the prevention and treatment of illness.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {[
                            { label: 'Email', value: user.email },
                            { label: 'Name', value: user.name },
                            { label: 'Surname', value: user.surname },
                            { label: 'Username', value: user.username },
                            { label: 'Date of Birth', value: user.dateOfBirth },
                            { label: 'Date Created', value: user.dateCreated },
                            { label: 'Type', value: user.type },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-4 py-6 shadow-md">
                                <p className="text-sm text-gray-600">{item.label}</p>
                                <p className="text-base font-medium text-red-600">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                    {user.type === 'doctor' && (
                        <button 
                            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
                            onClick={() => window.location.href = '/talk/video'}
                        >
                            Answer some calls
                        </button>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}