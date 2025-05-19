import { statusColor } from '../constants.js';

const RecentDonations = ({
  donations,
  onViewAllDonations,
  onOpenDonationModal,
  onAddDonation,  
}) => {
  return (
    <div id="recent-donations" className="donations-events">
      <div className="donations-events-heading">
        <h1 className="donations-events-title">Recent Donations</h1>
        <button
          className="donations-events-view-all"
          onClick={onViewAllDonations}
        >
          View All
        </button>
      </div>

      <ul className="donations-events-list">
        {donations.map((donation) => (
          <li
            className="recent-donation"
            key={donation.id}
            onClick={() => onOpenDonationModal(donation)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={donation.imageUrl}
              className="recent-donation-image"
              alt={`${donation.title} thumbnail`}
            />
            <div className="recent-donation-content">
              <h2 className="recent-donation-title">{donation.title}</h2>
              <p className="recent-donation-date">
                Donated on {new Date(donation.created_at).toDateString()}
              </p>
              <p className="donation-status">
                <span>Status: </span>
                <span style={{ color: statusColor[donation.status] }}>
                  {donation.status}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <button className="new-donation-button" onClick={onAddDonation}>
        Add New Donation
      </button>
    </div>
  );
};

export default RecentDonations;
