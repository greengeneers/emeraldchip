import { useRef, useState, useContext } from 'react';
import '../styles/Dashboard.css';
import Sidebar from '../components/Dashboard/Sidebar.jsx';
import Content from '../components/Dashboard/Content.jsx';
import ProfileModal from '../components/UpdateUsernameForm.jsx';
import { links } from '../components/Dashboard/constants.js';
import CurrentUserContext from '../contexts/current-user-context';
import { logUserOut } from '../adapters/auth-adapter';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState(links[2]); // Default to the first tab
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext); // Access current user context

  // Function to handle tab changes for modal
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    if (tab.state === 'profile') {
      setIsModalOpen(true); // Open modal for "My Profile"
    } else {
      setIsModalOpen(false); // Close modal for other tabs
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    logUserOut();
    setCurrentUser(null);
    setIsModalOpen(false); // Close the modal after logging out
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="dashboard">
      <Sidebar currentTab={currentTab} setCurrentTab={handleTabChange} setIsModalOpen={setIsModalOpen} />
      <Content currentTab={currentTab} />

      {/* Modal for profile update */}
      {isModalOpen && (
        <ProfileModal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          onClose={handleCloseModal}
          onLogout={handleLogout} // Pass logout logic
        />
      )}
    </div>
  );
};

export default Dashboard;
