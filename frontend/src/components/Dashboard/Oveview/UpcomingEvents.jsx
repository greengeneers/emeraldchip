import { FaLocationDot, FaRegClock } from 'react-icons/fa6';
import { addRsvp, removeRsvp } from '../../../adapters/rsvp-adapter.js';

const UpcomingEvents = ({ events }) => {
  const handleAddRsvp = async (eventId) => {
    await addRsvp(eventId);
  };
  const handleRemoveRsvp = async (eventId) => {
    await removeRsvp(eventId);
  };

  return (
    <div id="upcoming-events" className="donations-events">
      <div className="donations-events-heading">
        <h1 className="donations-events-title">Upcoming Events</h1>
        <button className="donations-events-view-all">View All</button>
      </div>

      <ul className="donations-events-list">
        {events.map((event) => (
          <li className="event-item">
            <div className="event-day-data-container">
              <div className="event-item-day">
                {new Date(event['start_date']).getDate()}
              </div>
              <div className="event-data-container">
                <div className="event-data-title">
                  <div className="event-data-date">
                    {new Date(event['start_date'])
                      .toLocaleDateString('default', {
                        month: 'long',
                        year: 'numeric',
                      })
                      .toUpperCase()}
                  </div>
                  <div className="event-data-time">
                    <span>
                      {new Date(event['start_date']).toLocaleString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span> - </span>
                    <span>
                      {new Date(event['end_date']).toLocaleString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <div className="event-address-container">
                  <FaLocationDot />
                  <p className="event-address">{event.address}</p>
                </div>

                <div className="event-last-updated-container">
                  <FaRegClock />
                  <p className="event-last-updated">
                    Updated at {new Date(event['updated_at']).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {event['is_user_registered'] ? (
              <button
                className="event-calendar-button danger"
                onClick={() => removeRsvp(event.id)}
              >
                Remove From Calendar
              </button>
            ) : (
              <button
                className="event-calendar-button success"
                onClick={() => addRsvp(event.id)}
              >
                Add to Calendar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
