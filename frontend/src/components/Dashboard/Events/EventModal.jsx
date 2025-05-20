export default function EventModal({ eventData, closeEventModal, position }) {
  return (
    <>
      <div className="event-modal-overlay">
        <div className="event-modal-container">
          <div className="event-modal-header">
            <h2 className="event-modal-title">{eventData.name}</h2>
            <button onClick={closeEventModal} className="event-modal-exit">
              x
            </button>
          </div>
          <div className="event-modal-content">
            <p>{eventData.eventUrl}</p>
            <p>{eventData.address}</p>
            <p>{eventData.startDate.toString()}</p>
            <p>{eventData.endDate.toString()}</p>
          </div>
        </div>
      </div>
    </>
  );
}
