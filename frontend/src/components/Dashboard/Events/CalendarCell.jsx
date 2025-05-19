
export default function CalendarCell({ date, dailyEvents, openEventModal }) {
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
      <div className={`calendar-cell-header`}>
        <span className={(isToday) ? 'today' : ''}>
          {
            (date.day === 1)
            ? `${formattedMonth} ${date.day}`
            : date.day
          }
        </span>
      </div>
      <div className='calendar-cell-body'>
      {
        dailyEvents &&
          <>
              <ol className='calendar-cell-events'>
                {
                  dailyEvents.map((event, eventIndex) => {
                    const key = `${event.name}_${event.startDate.getFullYear()}_${event.startDate.getMonth()+1}_${event.startDate.getDate()}_${event.startDate.getHours()}_${event.startDate.getMinutes()}_${event.startDate.getSeconds()}`;

                    return (
                      <li
                        key={key}
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
          </>
      }
      </div>
    </div>
  </>);
}
