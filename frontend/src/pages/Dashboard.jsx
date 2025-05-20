import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import Sidebar from "../components/Dashboard/Sidebar.jsx";
import Content from "../components/Dashboard/Content.jsx";
import ProfileModal from "../components/ProfileModal.jsx";
import { links } from "../components/Dashboard/constants.js";
import CurrentUserContext from "../contexts/current-user-context";
import { logUserOut } from "../adapters/auth-adapter";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(links[3]); // Default to the first tab
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext); // Access current user context

  // Function to handle tab changes for modal
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    if (tab.state === "profile") {
      setIsModalOpen(true); // Open modal for "My Profile"
    } else {
      setIsModalOpen(false); // Close modal for other tabs
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="dashboard">
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        setIsModalOpen={setIsModalOpen}
        onLogout={handleLogout}
      />

      <Content currentTab={currentTab} />

      {/* Modal for profile update */}
      {isModalOpen && (
        <ProfileModal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
