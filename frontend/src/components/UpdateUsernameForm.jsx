import React, { useState, useEffect } from 'react';
import { patchRequest } from '../utils/fetchingUtils';

const ProfileModal = ({ userId, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    zipCode: '',
  });
  const [zipCodeWarning, setZipCodeWarning] = useState(''); // warning message state

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/test-modal`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
        setFormData({
          username: data.username || '',
          name: data.name || '',
          email: data.email || '',
          zipCode: data.zipCode || '',
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Sync formData with user state whenever user changes
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        name: user.name || '',
        email: user.email || '',
        zipCode: user.zipCode || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'zipCode') {
      if (!/^\d*$/.test(value)) {
        setZipCodeWarning('ZIP code must contain only numbers');
      } else if (value.length !== 5) {
        setZipCodeWarning('ZIP code must be exactly 5 characters long');
      } else {
        setZipCodeWarning('');
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const body = {
        username: formData.username,
        email: formData.email,
        name: formData.name,
        zip_code: formData.zipCode,
      };
      const [data, error] = await patchRequest(`/api/test-modal`, body);

      if (error) {
        console.error('Server error details:', error);
        throw new Error('Failed to update user data');
      }

      // Update the user state with the new data
      setUser(data);

      // Exit editing mode
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Profile</h1>
        {isEditing ? (
          <form onSubmit={handleSave}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="zipCode">Zip Code:</label>
            <input
              id="zipCode"
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
            {zipCodeWarning && <p style={{ color: 'red' }}>{zipCodeWarning}</p>}
            <button type="submit" disabled={zipCodeWarning !== ''}>
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  username: user.username || '',
                  name: user.name || '',
                  email: user.email || '',
                  zipCode: user.zipCode || '',
                });
                setZipCodeWarning('');
              }}
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <p>Username: {user.username}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Zip Code: {user.zipCode}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProfileModal;