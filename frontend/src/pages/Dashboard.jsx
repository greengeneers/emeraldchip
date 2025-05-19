import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import Sidebar from '../components/Dashboard/Sidebar.jsx';
import Content from '../components/Dashboard/Content.jsx';
import ProfileModal from '../components/ProfileModal.jsx';
import DonationModal from '../components/Dashboard/Donations/DonationsModal.jsx'; 
import { links } from '../components/Dashboard/constants.js';
import CurrentUserContext from '../contexts/current-user-context';
import { logUserOut } from '../adapters/auth-adapter';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(links[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [donations, setDonations] = useState([]); 
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      fetch(`/api/donations?donor_id=${currentUser.id}`)
        .then(res => res.json())
        .then(data => setDonations(data))
        .catch(console.error);
    }
  }, [currentUser]);

  const handleTabChange = (tab) => {
    console.log('Tab changed:', tab.state);
    setCurrentTab(tab);

    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  const handleViewAllDonations = () => {
    const donationsTab = links.find(link => link.state === 'donations');
    if (donationsTab) {
      setCurrentTab(donationsTab);
      setIsModalOpen(false);
      setSelectedDonation(null);
    }
  };

  const handleOpenDonationModal = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  const handleSaveDonation = async (updatedDonation) => {
    try {
      const response = await fetch(`/api/donations/${updatedDonation.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDonation),
      });

      if (!response.ok) throw new Error('Failed to update donation');

      const savedDonation = await response.json();

      setDonations((prevDonations) =>
        prevDonations.map((d) =>
          d.id === savedDonation.id ? savedDonation : d
        )
      );

      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <div className="dashboard">
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        setIsModalOpen={setIsModalOpen}
        onLogout={handleLogout}
      />

      <Content
        currentTab={currentTab}
        donations={donations}  
        onViewAllDonations={handleViewAllDonations}
        onOpenDonationModal={handleOpenDonationModal}
      />


      {isModalOpen && !selectedDonation && (
        <ProfileModal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          onClose={handleCloseModal}
        />
      )}

      {isModalOpen && selectedDonation && (
        <DonationModal
          donation={selectedDonation}
          onSave={handleSaveDonation}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
