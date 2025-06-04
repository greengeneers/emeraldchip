import { FaRegQuestionCircle } from 'react-icons/fa';
import { FaBox, FaCalendar, FaRecycle } from 'react-icons/fa6';
import { PiPlant } from 'react-icons/pi';

const Details = ({ data }) => {
  return (
    <div className="overview-details-container">
      <div className="overview-details">
        <FaBox />
        <h2>{data.donationsCount ?? 0}</h2>
        <p>Donations</p>
      </div>

      <div className="overview-details">
        <FaCalendar />
        <h2>{data.pastEventsCount ?? 0}</h2>
        <p>Events Attended</p>
      </div>

      <div className="overview-details">
        <div className='co2-hint-container'>
          {/* <button className='co2-show-hint'>
            <FaRegQuestionCircle size={30} />
          </button> */}
        </div>
        <PiPlant />
        <h2>{(data.totalCO2Saved ?? 0).toFixed(1)} kg</h2>
        <p>CO₂ Saved</p>
      </div>

      <div className="overview-details">
        <FaRecycle />
        <h2>{(data.totalWasteReduced ?? 0).toFixed(1)} lbs</h2>
        <p>Waste Reduced</p>
      </div>
    </div>
  );
};

export default Details;
