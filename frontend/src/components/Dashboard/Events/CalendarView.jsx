import Day from './Day.jsx';
import EventModal from './EventModal.jsx';
import CalendarCell from './CalendarCell.jsx';

import {
  useState
} from 'react';

const weekdaysNum = {
  'Sunday': 0,
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6
}

export default function CalendarView({ props }) {
  const { currentYear, currentMonth, currentWeek, currentDay, viewMode, events } = props;
  const [today, setToday] = useState(null);
  const [todayEvents, setTodayEvents] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);

  // testing
  console.log('events', events);

  const openEventModal = (event) => {
    event.preventDefault();
    const eventIndex = event.target.closest('li').dataset.eventIndex;
    // render this
    setExpandedEvent(eventIndex);
  }

  // could be a handler on a click anywhere outside the rendered modal
  const closeEventModal = (event) => {
    event.preventDefault();
  }

  // IIFE to get days in month
  const daysInMonth = (() => new Date(currentYear, currentMonth, 0).getDate())();

  const rows = [];
  // for the first row...
  // determine what the first day is
  const firstWeekDay = (() => new Date(currentYear, currentMonth, 1).getDay())();
  const padding = weekdaysNum[firstWeekDay];
  while (padding > 0) {
    rows.append()
  }

  while (daysInMonth > 0) {

  }



  return (<>
    {
      expandedEvent &&
      <EventModal
        eventData={todayEvents[expandedEvent]}
        closeEventModal={closeEventModal}
      />
    }
    <div className='weekdays-container'>
      <div className='weekday-heading'>
        <p>SUN</p>
      </div>
      <div className='weekday-heading'>
        <p>MON</p>
      </div>
      <div className='weekday-heading'>
        <p>TUE</p>
      </div>
      <div className='weekday-heading'>
        <p>WED</p>
      </div>
      <div className='weekday-heading'>
        <p>THU</p>
      </div>
      <div className='weekday-heading'>
        <p>FRI</p>
      </div>
      <div className='weekday-heading'>
        <p>SAT</p>
      </div>
    </div>
    <div className='main-grid'>
    </div>
    {/* <ol className='date-list'>
      {
        // need to update this later
        [...Array(31)].map((v,i) => {
          let dailyEvents = null;
          const index = i + 1;
          if (events && events[i+1]) {
            dailyEvents = events[i+1];
          }
          // the key here should be year/month/day
          return <Day
            key={index}
            props={{
              dailyEvents,
              index,
              openEventModal,
              closeEventModal
            }}
          />
        })
      }
    </ol> */}
  </>)
}
