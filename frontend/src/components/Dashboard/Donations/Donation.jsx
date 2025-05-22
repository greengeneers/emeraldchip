import { statusColor } from '../constants.js';
import '../../../styles/Dashboard/Donation.css';

const Donation = ({ data, onClick }) => {
  return (
    <div className="donation" onClick={onClick} style={{ cursor: 'pointer' }}>
      <img
        src={data['image_url']}
        className="donation-image"
        alt={`Image of ${data.title}`}
      />

      <div className="donation-data">
        <h2 className="donation-title">{data.title}</h2>
        <p className="donation-status">
          <span>Status: </span>
          <span style={{ color: statusColor[data.status] }}>{data.status}</span>
        </p>
      </div>
    </div>
  );
};

export default Donation;
