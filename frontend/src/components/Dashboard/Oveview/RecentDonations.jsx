const statusColor = {
  Recycled: '#3DA733',
  'In Process': '#BABA30',
  Pending: '#EE4B2B	',
};

const RecentDonations = ({ donations }) => {
  return (
    <div id="recent-donations">
      <div className="recent-donations-heading">
        <h1 className="recent-donations-title">Recent Donations</h1>
        <button className="recent-donations-view-all">View All</button>
      </div>
      <ul className="recent-donations-list">
        {donations.map((donation) => (
          <li className="recent-donation" key={donation.id}>
            <img
              src={donation['image_url']}
              className="recent-donation-image"
            />
            <div className="recent-donation-content">
              <h2 className="recent-donation-title">{donation.title}</h2>
              <p className="recent-donation-date">
                Donated on {new Date(donation['created_at']).toDateString()}
              </p>
              <p className="recent-donation-status">
                <span>Status: </span>
                <span style={{ color: statusColor[donation.status] }}>
                  {donation.status}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <button className="new-donation-button">Add New Donation</button>
    </div>
  );
};

export default RecentDonations;
