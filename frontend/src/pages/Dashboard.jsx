import { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import Sidebar from '../components/Dashboard/Sidebar.jsx';
import Content from '../components/Dashboard/Content.jsx';
import ProfileModal from '../components/ProfileModal.jsx';
import DonationModal from '../components/Dashboard/Donations/DonationsModal.jsx';
import { links } from '../components/Dashboard/constants.js';
import CurrentUserContext from '../contexts/current-user-context';
import DonationsContext from '../contexts/donation-context.js';
import { logUserOut } from '../adapters/auth-adapter';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(links[0]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const {
    isModalOpen,
    selectedDonation,
    closeModal,
    saveDonation,
    createDonation,
    donations,
  } = useContext(DonationsContext);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setIsProfileModalOpen(false);
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
        setIsModalOpen={setIsProfileModalOpen}
        onLogout={handleLogout}
      />

      <Content currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {isProfileModalOpen && (
        <ProfileModal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}

      {isModalOpen && selectedDonation && (
        <DonationModal
          donation={selectedDonation}
          onSave={selectedDonation.id ? saveDonation : createDonation}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
