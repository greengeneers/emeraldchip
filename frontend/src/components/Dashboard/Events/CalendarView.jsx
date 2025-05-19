import Day from './Day.jsx';
import EventModal from './EventModal.jsx';
import CalendarCell from './CalendarCell.jsx';
import { weekdays } from '../constants.js'
import { buildMonthMatrix, getWeekNumber } from '../../../utils/calendarUtils.js';

import {
  useState
} from 'react';

export default function CalendarView({ props }) {
  const { currentYear, currentMonth, currentWeek, viewMode, events } = props;
  const [todayEvents, setTodayEvents] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);

  // testing
  // console.log('events', events);

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

  const monthMatrix = buildMonthMatrix(currentYear, currentMonth);
  const weekNumbers = monthMatrix.map((week) => getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));

  return (<>
    {
      expandedEvent &&
      <EventModal
        eventData={todayEvents[expandedEvent]}
        closeEventModal={closeEventModal}
      />
    }
    <div className='calendar-body'>
      <div className='calendar-side-label'>
        {
          viewMode === 'Monthly' ? (
            <>
              <div className='side-label-heading'>W</div>
              <ol className='side-label-content'>
                {
                  weekNumbers.map((number) => {
                    return <li key={number} className='side-label-item'>{number}</li>
                  })
                }
              </ol>
            </>
          ) : (
          <>
            <div className='side-label-heading'>H</div>
            <div className='side-label-content'>
            </div>
          </>
          )
        }
      </div>
      <div className='calendar-content'>
        <div className='weekdays-row'>
          {
            weekdays.map((day) => {
              return (
                <div key={day.short} className='weekday-heading'>
                  <p>{day.short}</p>
                </div>
              )
            })
          }
        </div>
        <div className='main-grid'>
          {
            monthMatrix.map((weeks, rowIndex) => {
              return <div key={rowIndex} className='grid-row'>
                {
                  weeks.map((date) => {
                    const dateString = `${date.year}_${date.month}_${date.day}`;
                    let dailyEvents = null;
                    if (events) dailyEvents = events[dateString];
                    return (
                      <CalendarCell key={dateString} date={date} dailyEvents={dailyEvents} openEventModal={openEventModal} />
                    )
                  })
                }
              </div>
            })
          }
        </div>
      </div>
    </div>
  </>)
}
