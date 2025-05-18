import { getOverview } from '../../adapters/dashboard-adapter.js';
import UserContext from '../../contexts/user-context.jsx';
import { useContext, useEffect, useState } from 'react';
import Details from './Oveview/Details.jsx';
import RecentDonations from './Oveview/RecentDonations.jsx';
import UpcomingEvents from './Oveview/UpcomingEvents.jsx';

const Overview = () => {
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleGetOverview = async () => {
    const [overview, error] = await getOverview();

    if (error) {
      console.error('Error fetching overview');
      return;
    }

    setData(overview);
    setLoading(false);
  };

  useEffect(() => {
    handleGetOverview();
  }, []);

  if (loading) {
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
          Your journey to greener future continues. Here's your recycling impact
          so far.
        </p>
      </div>

      <Details data={data} />

      <div className="donations-events-container">
        <RecentDonations
          donations={data.recentDonations}
          handleGetOverview={handleGetOverview}
        />
        <UpcomingEvents
          events={data.recentEvents}
          handleGetOverview={handleGetOverview}
        />
      </div>
    </div>
  );
};

export default Overview;
