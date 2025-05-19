import { useCallback, useEffect, useState } from 'react';
import {
  listDonations,
  updateDonation,
} from '../../adapters/donation-adapter.js';
import Donation from './Donations/Donation.jsx';
import DonationModal from './Donations/DonationsModal.jsx';
import '../../styles/Donations.css';

const Donations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const handleFetchDonations = useCallback(async () => {
    setLoading(true);
    const [results, error] = await listDonations();

    if (error) {
      console.error('Error fetching donations');
      setLoading(false);
      return;
    }

    setData(results);
    setLoading(false);
  }, []);

  useEffect(() => {
    handleFetchDonations();
  }, [handleFetchDonations]);

  const openModal = (donation) => setSelectedDonation(donation);
  const closeModal = () => setSelectedDonation(null);

  const handleSave = async (updatedDonation) => {
    const [result, error] = await updateDonation(
      updatedDonation.id,
      updatedDonation
    );

    if (error) {
      console.error('Failed to save donation', error);
      return;
    }

    setData((prevData) =>
      prevData.map((d) => (d.id === result.id ? result : d))
    );

    closeModal();
  };

  if (loading) return <p>Loading donations...</p>;

  return (
    <div id="donations">
      <h1 className="tab-title">Donations</h1>
      <div className="donations-container">
        {data.map((donation) => (
          <Donation
            data={donation}
            key={donation.id}
            onClick={() => openModal(donation)}
          />
        ))}
      </div>

      {selectedDonation && (
        <DonationModal
          donation={selectedDonation}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Donations;
