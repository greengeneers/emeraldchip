import { useState, useEffect, useContext, useCallback } from 'react';
import CurrentUserContext from './current-user-context';
import DonationsContext from './donation-context';
import { getOverview } from '../adapters/dashboard-adapter.js';

export const DonationsProvider = ({ children }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [donations, setDonations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.id) {
      fetch(`/api/donations`)
        .then((res) => res.json())
        .then((data) => setDonations(data))
        .catch(console.error);
    }
  }, [currentUser]);

  const handleGetOverview = useCallback(async () => {
    const [overview, error] = await getOverview();

    if (error) {
      console.error('Error fetching overview');
      return;
    }

    setOverviewData(overview);
    setLoading(false);
  });

  useEffect(() => {
    handleGetOverview();
  }, []);

  const openDonationModal = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const closeModal = (callback) => {
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  const saveDonation = async (updatedDonation) => {
    try {
      const response = await fetch(`/api/donations/${updatedDonation.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDonation),
      });

      if (!response.ok) throw new Error('Failed to update donation');

      const savedDonation = await response.json();
      setDonations((prev) =>
        prev.map((d) => (d.id === savedDonation.id ? savedDonation : d))
      );

      await handleGetOverview();

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const createDonation = async (newDonation) => {
    try {
      const response = await fetch(`/api/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newDonation, donor_id: currentUser.id }),
      });

      if (!response.ok) throw new Error('Failed to create donation');

      const createdDonation = await response.json();
      setDonations((prev) => [createdDonation, ...prev]);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DonationsContext.Provider
      value={{
        donations,
        isModalOpen,
        selectedDonation,
        openDonationModal,
        closeModal,
        saveDonation,
        createDonation,
        overviewData,
        handleGetOverview,
        loading,
      }}
    >
      {children}
    </DonationsContext.Provider>
  );
};

export default DonationsProvider;
