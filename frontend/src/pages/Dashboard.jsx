import { useState } from 'react';
import '../styles/Dashboard.css';
import Sidebar from '../components/Dashboard/Sidebar.jsx';
import Content from '../components/Dashboard/Content.jsx';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('overview');

  return (
    <div className="dashboard">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Content currentTab={currentTab} />
    </div>
  );
};

export default Dashboard;
