import '../../styles/Dashboard/Facilities.css';

const Facilities = ({}) => {
  return (
    <div id="facilities">
      <h1 className="tab-title">Facilities</h1>
      <iframe
        src="https://www.google.com/maps/d/embed?mid=18KGJL53IQb7VdWHtUvE8vTr9Do0&ehbc=2E312F"
        id="facilities-map"
      ></iframe>
    </div>
  );
};

export default Facilities;
