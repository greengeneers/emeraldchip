import { useState } from 'react';
import { updateUser } from '../adapters/user-adapter';
import { useContext } from 'react';
import UserContext from '../contexts/user-context';
import ErrorPage from '../pages/ErrorPage';
import handleUpload from '../utils/s3.js';

const ProfileModal = ({ onClose }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    name: currentUser.name,
    zipCode: currentUser.zipCode,
    pfp: currentUser.pfp,
  });

  const [zipCodeWarning, setZipCodeWarning] = useState('');
  const [error, setError] = useState(null);

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
    const body = {
      username: formData.username,
      email: formData.email,
      name: formData.name,
      zipCode: formData.zipCode,
      pfp: formData.pfp,
    };

    // TODO: maybe add a loading here? for now can just skip
    const [data, error] = await updateUser(currentUser.id, body);

    if (error) {
      console.error('Server error details:', error);
      setError(error);
      return;
    }

    // happy path
    setCurrentUser(data);
    setIsEditing(false);
  };

  if (error) {
    return <ErrorPage error={error} />;
  }

  const handlePfpUpload = async (e) => {
    const imageUrl = await handleUpload(e);

    if (imageUrl) {
      setFormData({ ...formData, pfp: imageUrl });
    }
  };

  // TODO: MAYBE add loading here to match line 45 above

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ position: 'relative' }}>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#555',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>

        <h1>Profile</h1>
        {isEditing ? (
          <form onSubmit={handleSave}>
            <div className="modal-form-group">
              <label htmlFor="pfp-input">Profile Picture:</label>
              <div className="pfp-input-container">
                {formData.pfp && (
                  <img
                    src={formData.pfp}
                    alt="Profile Picture"
                    className="modal-form-pfp"
                  />
                )}
                <input
                  type="file"
                  name="pfp"
                  id="pfp-input"
                  className="modal-input"
                  onChange={(e) => handlePfpUpload(e)}
                />
              </div>
            </div>
            <div className="modal-form-group">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="modal-input"
              />
            </div>
            <div className="modal-form-group">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="modal-input"
              />
            </div>
            <div className="modal-form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="modal-input"
              />
            </div>
            <div className="modal-form-group">
              <label htmlFor="zipCode">Zip Code:</label>
              <input
                id="zipCode"
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="modal-input"
              />
              {zipCodeWarning && (
                <p style={{ color: 'red' }}>{zipCodeWarning}</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                disabled={zipCodeWarning !== ''}
                className="modal-save"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    username: currentUser.username || '',
                    name: currentUser.name || '',
                    email: currentUser.email || '',
                    zipCode: currentUser.zipCode || '',
                  });
                  setZipCodeWarning('');
                }}
                className="modal-edit"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-modal">
            <div className="profile-details-container">
              {currentUser.pfp && (
                <img src={currentUser.pfp} className="modal-form-pfp" />
              )}

              <div className="profile-details">
                <p>{currentUser.name}</p>
                <p>@{currentUser.username}</p>
                <p>
                  Email: <span>{currentUser.email}</span>
                </p>
                <p>
                  Zip Code:
                  <span> {currentUser.zipCode}</span>
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setIsEditing(true)} className="modal-edit">
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
