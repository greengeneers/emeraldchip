import { useContext } from 'react';
import CurrentUserContext from '../../contexts/current-user-context.js';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import Logo from '../Logo.jsx';
import { links, profile } from './constants.js';
import ThemeContext from '../../contexts/theme-context.js';
import { FaMoon, FaSun } from 'react-icons/fa6';
import '../../styles/Dashboard/Sidebar.css';

const Sidebar = ({ currentTab, setCurrentTab, setIsModalOpen, onLogout }) => {
  const { currentUser } = useContext(CurrentUserContext); // Access current user context
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="dashboard-sidebar">
      <div className="sidebar-logo-container">
        <Logo />
      </div>
      <nav className="sidebar-navigation">
        <ul className="sidebar-links">
          {links.map((link) => (
            <button
              className={`sidebar-button ${
                currentTab.state === link.state ? 'sidebar-active-button' : ''
              }`}
              onClick={() => setCurrentTab(link)}
              key={link.state}
            >
              <span>{<link.icon />}</span>
              {link.title}
            </button>
          ))}
        </ul>
      </nav>
      <div className="sidebar-profile-container">
        <button
          className="sidebar-button profile-button"
          onClick={() => setIsModalOpen(true)}
        >
          {currentUser.pfp ? (
            <img src={currentUser.pfp} className="sidebar-user-pfp" />
          ) : (
            <profile.icon />
          )}
          {currentUser.name.split(' ')[0]}
        </button>
        <button className="sidebar-button logout-button" onClick={onLogout}>
          <RiLogoutBoxRLine />
        </button>
        <button onClick={toggleTheme} className="sidebar-button theme-button">
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
