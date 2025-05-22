import { FaBox, FaCalendar, FaRecycle } from 'react-icons/fa6';
import { PiPlant } from 'react-icons/pi';

const Details = ({ data }) => {
  return (
    <div className="overview-details-container">
      <div className="overview-details">
        <FaBox />
        <h1>{data.donationsCount ?? 0}</h1>
        <p>Devices Donated</p>
      </div>

      <div className="overview-details">
        <FaCalendar />
        <h1>{data.pastEventsCount ?? 0}</h1>
        <p>Events Attended</p>
      </div>

      <div className="overview-details">
        <PiPlant />
        <h1>{(data.totalCO2Saved ?? 0).toFixed(1)} kg</h1>
        <p>CO₂ Saved</p>
      </div>

      <div className="overview-details">
        <FaRecycle />
        <h1>{(data.totalWasteReduced ?? 0).toFixed(1)} lbs</h1>
        <p>Waste Reduced</p>
      </div>
    </div>
  );
};

export default Details;
