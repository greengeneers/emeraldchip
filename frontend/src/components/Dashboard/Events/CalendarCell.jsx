
export default function CalendarCell({ currentMonth, date, dailyEvents, openEventModal }) {
  // console.log('date', date);
  // console.log('dailyEvents', dailyEvents);
  const dateObj = new Date(date.year, date.month, date.day);
  const today = new Date();
  const isToday =
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear();

  const formattedMonth = dateObj.toLocaleString('default', { month: 'long' })
  return (<>
    <div className='calendar-cell'>
      <div className={`calendar-cell-header ${currentMonth === dateObj.getMonth() ? '' : 'not-current-month'}`}>
        <div className={`calendar-cell-header-text-container ${isToday ? 'today' : ''}`}>
          <span className='calendar-cell-header-text'>
            {
              (date.day === 1)
              ? `${formattedMonth} ${date.day}`
              : date.day
            }
          </span>
        </div>
      </div>
      <div className={`calendar-cell-body ${currentMonth === dateObj.getMonth() ? '' : 'not-current-month'}`}>
      {
        dailyEvents &&
          <ol className='calendar-cell-events'>
            {
              dailyEvents.map((event, eventIndex) => {

                return (
                  <li
                    key={event.name}
                    className='calendar-cell-events-li'
                    data-event-index={eventIndex}
                  >
                    <button
                      className='calendar-cell-events-button'
                      onClick={openEventModal}
                    >
                      <div className='calendar-cell-events-title'>{event.name}</div>
                    </button>
                  </li>
                )
              })
            }
          </ol>
      }
      </div>
    </div>
  </>);
}
