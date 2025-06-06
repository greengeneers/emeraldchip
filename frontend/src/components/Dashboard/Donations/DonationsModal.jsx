import React, { useState } from 'react';
import handleUpload from '../../../utils/s3';

const DonationModal = ({ donation = {}, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: donation.id || '',
    title: donation.title || '',
    imageUrl: donation.image_url || '',
    description: donation.description || '',
    status: donation.status || 'Pending',
    weightLbs: donation.weight_lbs || 0,
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    setUploading(true);
    const imageUrl = await handleUpload(e);

    if (imageUrl) {
      setFormData((prev) => ({ ...prev, imageUrl }));
    }

    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{formData.id ? 'Edit Donation' : 'Add New Donation'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Image:
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Donation"
                style={{ maxWidth: '100%', marginBottom: '10px' }}
              />
            )}
            <input
              type="file"
              name="imageUrl"
              onChange={handleImageUpload}
              accept="image/*"
            />
            {uploading && <p>Uploading image...</p>}
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Weight (lbs):
            <input
              type="number"
              name="weightLbs"
              value={formData.weightLbs}
              onChange={handleChange}
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>In Transit</option>
              <option>Donated</option>
            </select>
          </label>
          <button type="submit" disabled={uploading}>
            Save
          </button>
          <button
            type="button"
            className="modal-cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationModal;
