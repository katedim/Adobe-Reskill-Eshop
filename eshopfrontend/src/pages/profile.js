import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
    const { isLoggedIn, userId } = useAuth();
    const router = useRouter();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        } else {
            fetchUserData();
        }
    }, [isLoggedIn, userId, router]);

    const fetchUserData = async () => {
        if (!userId) return; // Don't fetch if userId is not available

        try {
            const response = await fetch(`http://localhost:8080/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUserData({
                username: data.username,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="profile-container">
            <h1 className="text-2xl font-bold">User Profile</h1>
            <div className="card bg-gray-100 shadow-md p-6 rounded-lg">
                {/* Display user profile data inside a card */}
                <div>
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>First Name:</strong> {userData.firstname}</p>
                    <p><strong>Last Name:</strong> {userData.lastname}</p>
                </div>
            </div>
        </div>
    );
}
