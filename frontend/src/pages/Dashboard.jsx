import { useState } from 'react';
import '../styles/Dashboard.css';
import Sidebar from '../components/Dashboard/Sidebar.jsx';
import Content from '../components/Dashboard/Content.jsx';
import { links } from '../components/Dashboard/constants.js';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState(links[0]);

  return (
    <div className="dashboard">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Content currentTab={currentTab} />
    </div>
  );
};

export default Dashboard;
