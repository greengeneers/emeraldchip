import UserContext from '../../contexts/current-user-context.js';
import { useContext } from 'react';
import Details from './Overview/Details.jsx';
import RecentDonations from './Overview/RecentDonations.jsx';
import UpcomingEvents from './Overview/UpcomingEvents.jsx';
import '../../styles/Dashboard/Overview.css';
import DonationsContext from '../../contexts/donation-context.js';

const Overview = ({ setCurrentTab }) => {
  const { currentUser } = useContext(UserContext);
  const { overviewData } = useContext(DonationsContext);

  if (!overviewData) {
    return null;
  }

  return (
    <div id="overview">
      <div className="greet-container">
        <h2 className="greet-title">
          Welcome back,{' '}
          <span className="greet-title-name">
            {currentUser.name.split(' ')[0]}!
          </span>
        </h2>
        <p className="greet-text">
          Your journey to a greener future continues. Here's your recycling
          impact so far.
        </p>
      </div>

      <Details data={overviewData} />

      <div className="donations-events-container">
        <RecentDonations
          donations={overviewData.recentDonations}
          setCurrentTab={setCurrentTab}
        />
        <UpcomingEvents
          events={overviewData.recentEvents}
          setCurrentTab={setCurrentTab}
        />
      </div>
    </div>
  );
};

export default Overview;
