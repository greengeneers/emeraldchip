import { IoClose } from "react-icons/io5";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { useEffect, useCallback, useState, useRef } from "react";
import { addRsvp, checkRsvp, removeRsvp } from "../../../adapters/rsvp-adapter";

export default function EventModal({ eventData, closeEventModal, position }) {
  const [rsvp, setRsvp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCheckRsvp = useCallback(async () => {
    setLoading(true);
    const [data, error] = await checkRsvp(eventData.id);
    if (error) {
      setError(error);
      return;
    }
    if (data.exists) setRsvp(true);
    else setRsvp(false);
    setLoading(false);
  }, [eventData]);

  const fetchPatchRsvp = useCallback(
    async (rsvp) => {
      let data, error;
      console.log(rsvp);
      if (!rsvp) [data, error] = await addRsvp(eventData.id);
      else [data, error] = await removeRsvp(eventData.id);
      if (error) {
        setError(error);
        return;
      }
      setRsvp(() => !rsvp);
    },
    [eventData],
  );

  useEffect(() => {
    fetchCheckRsvp();
  }, []);

  const handleRsvp = (e) => {
    e.preventDefault();
    fetchPatchRsvp(rsvp);
  };

  if (loading) return null;

  return (
    <>
      {error && <span className="error-span">error</span>}
      <div className="event-modal-header">
        <h2 className="event-modal-title">{eventData.name}</h2>
        <button onClick={closeEventModal} className="event-modal-exit">
          <IoClose />
        </button>
      </div>
      <div className="event-modal-content">
        <a href={eventData.eventUrl} rel="noreferrer noopener" target="_blank">
          Event Link
        </a>
        <div className="event-modal-address-container">
          <FaLocationDot />
          <span>{eventData.address}</span>
        </div>
        <div className="event-modal-time">
          <FaRegClock />
          <span>
            {new Date(eventData.startDate).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span>-</span>
          <span>
            {new Date(eventData.endDate).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
      <div className="event-modal-rsvp-container">
        <button
          className={`rsvp-button ${rsvp ? "danger" : "success"}`}
          onClick={handleRsvp}
        >
          {rsvp ? "Remove From Calendar" : "Add to Calendar"}
        </button>
      </div>
    </>
  );
}
