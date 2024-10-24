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
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [editedUserData, setEditedUserData] = useState(userData); // State for editable data
  const [password, setPassword] = useState(''); // Password input state

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      fetchUserData();
    }
  }, [isLoggedIn, userId, router]);

  const fetchUserData = async () => {
    if (!userId) return;

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

      setEditedUserData({
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

  // Handle input change when in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value
    });
  };

  // Toggle between edit and save mode
  const toggleEdit = async () => {
    if (isEditing) {
      // Perform save (this is where you'd send the edited data to the backend)
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...editedUserData, password }), // Include password if changed
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Once saved, update the main userData state
        setUserData(editedUserData);
        console.log('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }

    setIsEditing(!isEditing); // Toggle between editing and view mode
  };

  // Cancel button logic to discard changes
  const handleCancel = () => {
    setEditedUserData(userData); // Revert edited data back to the original userData
    setPassword(''); // Clear password input
    setIsEditing(false); // Exit edit mode
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <div className="card bg-gray-100 shadow-md p-6 rounded-lg">
        <div>
          <p><strong>Username:</strong> {isEditing ? (
            <input
              type="text"
              name="username"
              value={editedUserData.username}
              onChange={handleChange}
              className="border border-gray-300 p-1 rounded"
            />
          ) : (
            userData.username
          )}</p>

          <p><strong>Email:</strong> {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedUserData.email}
              onChange={handleChange}
              className="border border-gray-300 p-1 rounded"
            />
          ) : (
            userData.email
          )}</p>

          <p><strong>First Name:</strong> {isEditing ? (
            <input
              type="text"
              name="firstname"
              value={editedUserData.firstname}
              onChange={handleChange}
              className="border border-gray-300 p-1 rounded"
            />
          ) : (
            userData.firstname
          )}</p>

          <p><strong>Last Name:</strong> {isEditing ? (
            <input
              type="text"
              name="lastname"
              value={editedUserData.lastname}
              onChange={handleChange}
              className="border border-gray-300 p-1 rounded"
            />
          ) : (
            userData.lastname
          )}</p>

          {/* Password Field: Only visible when editing */}
          {isEditing && (
            <p>
              <strong>New password:</strong>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-1 rounded"
              />
            </p>
          )}
        </div>

        {/* Edit/Save button */}
        <button
          onClick={toggleEdit}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>

        {/* Cancel button: Only visible in edit mode */}
        {isEditing && (
          <button
            onClick={handleCancel}
            className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
