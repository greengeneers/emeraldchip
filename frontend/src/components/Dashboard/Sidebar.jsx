import Logo from '../Logo.jsx';
import { links } from './constants.js';

const Sidebar = ({ currentTab, setCurrentTab }) => {
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
                currentTab.state === link.state ? 'sidebar-active-button' : null
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
    </div>
  );
};

export default Sidebar;
