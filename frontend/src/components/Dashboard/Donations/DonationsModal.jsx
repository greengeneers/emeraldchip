import React, { useState } from 'react';

const DonationModal = ({ donation = {}, onSave, onClose }) => {


  const [formData, setFormData] = useState({
    id: donation.id || '',
    title: donation.title || '',
    imageUrl: donation.image_url || '',
    description: donation.description || '',
    status: donation.status || 'Pending',
    weightLbs: donation.weightLbs || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData); 
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
            Image URL:
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
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
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>In Process</option>
              <option>Recycled</option>
            </select>
          </label>
          <button type="submit">Save</button>
          <button type="button" className="modal-cancel-button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationModal;