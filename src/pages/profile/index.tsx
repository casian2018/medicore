import { useEffect, useState } from 'react';

interface User {
    email: string;
    name: string;
    surname: string;
    username: string;
    dateOfBirth: string;
    dateCreated: string;
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
        <div className="flex flex-col justify-center items-center h-[100vh] bg-gray-100 dark:bg-navy-900">
            <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-6">
                <div className="mt-2 mb-8 w-full">
                    <h4 className="px-2 text-xl font-bold text-red-600 dark:text-red-400">
                        General Information
                    </h4>
                    <p className="mt-2 px-2 text-base text-gray-600 dark:text-gray-300">
                        Medicine is the science and practice of caring for a patient, managing the diagnosis, prognosis, prevention, treatment, and palliation of their injury or disease. It encompasses a variety of health care practices evolved to maintain and restore health by the prevention and treatment of illness.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 px-2 w-full">
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-300">Email</p>
                        <p className="text-base font-medium text-red-600 dark:text-red-400">
                            {user.email}
                        </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-300">Name</p>
                        <p className="text-base font-medium text-red-600 dark:text-red-400">
                            {user.name}
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-300">Surname</p>
                        <p className="text-base font-medium text-red-600 dark:text-red-400">
                            {user.surname}
                        </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-300">Username</p>
                        <p className="text-base font-medium text-red-600 dark:text-red-400">
                            {user.username}
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-300">Date of Birth</p>
                        <p className="text-base font-medium text-red-600 dark:text-red-400">
                            {user.dateOfBirth}
                        </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-300">Date Created</p>
                        <p className="text-base font-medium text-red-600 dark:text-red-400">
                            {user.dateCreated}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}