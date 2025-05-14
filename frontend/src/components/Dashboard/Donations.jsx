import { useCallback, useEffect, useRef, useState } from 'react';
import { listDonations } from '../../adapters/donation-adapter.js';
import Donation from './Donations/Donation.jsx';

const Donations = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const donationsContainerRef = useRef(null);

  const handleFetchDonations = useCallback(async () => {
    !loading && setLoading(true);

    const [results, error] = await listDonations();

    if (error) {
      console.error('Error fetching donations');
      return;
    }

    setData(results);
    setLoading(false);
  }, []);

  useEffect(() => {
    handleFetchDonations();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div id="donations">
      <h1 className="tab-title">Donations</h1>
      <div className="donations-container" ref={donationsContainerRef}>
        {data.map((donation) => (
          <Donation data={donation} key={donation.title} />
        ))}
      </div>
    </div>
  );
};

export default Donations;
