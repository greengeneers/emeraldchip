import { IoClose } from "react-icons/io5";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { useEffect, useCallback, useState, useRef } from "react";
import { addRsvp, checkRsvp, removeRsvp } from "../../../adapters/rsvp-adapter";
import { RiUserSettingsFill } from "react-icons/ri";

export default function EventModal({ eventData, closeEventModal, position }) {
  const rsvpRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCheckRsvp = useCallback(async () => {
    setLoading(true);
    const [data, error] = await checkRsvp(eventData.id);
    if (error) {
      setError(error);
      return;
    }
    if (data.exists) rsvpRef.current = true;
    else rsvpRef.current = false;
    setLoading(false);
  }, [eventData]);

  const fetchPatchRsvp = useCallback(
    async (rsvp) => {
      let error;
      if (!rsvp) [_, error] = await addRsvp(eventData.id);
      else [_, error] = await removeRsvp(eventData.id);
      if (error) {
        setError(error);
        return;
      }
      rsvpRef.current = !rsvpRef.current;
    },
    [eventData],
  );

  useEffect(() => {
    fetchCheckRsvp();
  }, []);

  const handleRsvp = (e) => {
    e.preventDefault();
    fetchPatchRsvp(rsvpRef.current);
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
          className={`rsvp-button ${rsvpRef.current ? "danger" : "success"}`}
          onClick={handleRsvp}
        >
          {rsvpRef.current ? "Remove From Calendar" : "Add to Calendar"}
        </button>
      </div>
    </>
  );
}
