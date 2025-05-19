import { useState } from 'react';

const DonationModal = ({ donation, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: donation.id || '',
    title: donation.title || '',
    imageUrl: donation['image_url'] || '',
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
    console.log('Form Data Submitted:', formData);
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Donation</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              className="modal-input"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>

          <label>
            Image URL:
            <input
              className="modal-input"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </label>

          <label>
            Status:
            <select
              className="modal-input"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>In Process</option>
              <option>Recycled</option>
            </select>
          </label>

          <button type="submit" className="modal-submit-button">
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
