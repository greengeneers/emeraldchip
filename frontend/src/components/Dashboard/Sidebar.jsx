import Logo from '../Logo.jsx';

const links = [
  {
    title: 'Overview',
    state: 'overview',
  },
  {
    title: 'My Donations',
    state: 'donations',
  },
  {
    title: 'Events',
    state: 'events',
  },
  {
    title: 'My Impact',
    state: 'impact',
  },
];

const Sidebar = ({ currentTab, setCurrentTab }) => {
  return (
    <header className="dashboard-sidebar">
      <div className="sidebar-logo-container">
        <Logo />
      </div>
      <nav className="sidebar-navigation">
        <ul className="sidebar-links">
          {links.map((link) => (
            <button
              className={`sidebar-button ${
                currentTab === link.state ? 'sidebar-active-button' : null
              }`}
              onClick={() => setCurrentTab(link.state)}
              key={link.state}
            >
              {link.title}
            </button>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Sidebar;
