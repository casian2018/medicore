import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    router.push('/pages/login');
                } else {
                    console.error('Failed to logout');
                }
            } catch (error) {
                console.error('An error occurred during logout:', error);
            }
        };

        logout();
    }, [router]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;