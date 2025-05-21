import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from './current-user-context';
import DonationsContext from './donation-context';

export const DonationsProvider = ({ children }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [donations, setDonations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      fetch(`/api/donations?donor_id=${currentUser.id}`)
        .then((res) => res.json())
        .then((data) => setDonations(data))
        .catch(console.error);
    }
  }, [currentUser]);

  const openDonationModal = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const addDonation = () => {
    setSelectedDonation({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
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

  const onViewAllDonations = () => {
    setShowAll(true);
  };

  return (
    <DonationsContext.Provider
      value={{
        donations,
        isModalOpen,
        selectedDonation,
        openDonationModal,
        addDonation,
        closeModal,
        saveDonation,
        createDonation,
        onViewAllDonations,
        showAll,
        setShowAll,
      }}
    >
      {children}
    </DonationsContext.Provider>
  );
};

export default DonationsProvider;
