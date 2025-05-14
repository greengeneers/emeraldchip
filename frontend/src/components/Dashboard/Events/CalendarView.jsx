import Day from './Day.jsx';
import EventModal from './EventModal.jsx';
import CalendarCell from './CalendarCell.jsx';

import {
  useState
} from 'react';

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
  console.log('days in may', daysInMonth);

  // for the first row...
  // determine what the first day is
  const padding = new Date(currentYear, currentMonth-1, 1).getDay();
  const rowCount = Math.ceil((padding + daysInMonth) / 7);
  let date = 1;
  const rows = [...Array(rowCount)].map((row, index, rows) => {
    const buildRow = [];
    if (index === 0) {
      console.log('first row');
      const prevMonth = (currentMonth === 1) ? 12 : currentMonth - 1;
      const adjustedYear = (currentMonth === 1) ? currentYear - 1 : currentYear;
      const daysInPrevMonth = (() => new Date(adjustedYear, prevMonth-1, 0).getDate())();
      let startFrom = daysInPrevMonth - padding;
      console.log('pre', prevMonth, adjustedYear, daysInPrevMonth, startFrom);
      for (let i = 0; i < padding; i++) {
        console.log('padding first row');
        buildRow.push(startFrom++);
      }
    }
    while (buildRow.length < 7 && date <= daysInMonth) {
      buildRow.push(date++);
    }
    if (!rows[index+1]) {
      let startFrom = 1;
      while (buildRow.length < 7) {
        buildRow.push(startFrom++)
      }
    }
    return buildRow;
  })

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
      {
        rows.map((cells) => {
          cells.map((cell) => {

          })
        })
      }
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
