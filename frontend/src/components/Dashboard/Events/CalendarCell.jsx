
export default function CalendarCell({ props }) {
  const { date, events, openEventModal } = props;
  const hasEvents = (events) ? true : false;
  return (<>
    <div className='calendar-cell'>
      <div className='calendar-cell-header'>
        <p>{date}</p>
      </div>
      <div className='calendar-cell-body'>
      {
        hasEvents &&
          <>
              <ol className='calendar-cell-events'>
                {
                  events.map((event, eventIndex) => {
                    const key = `${event.name}_${event.startDate.getFullYear()}_${event.startDate.getMonth()+1}_${event.startDate.getDate()}_${event.startDate.getHours()}_${event.startDate.getMinutes()}_${event.startDate.getSeconds()}`;

                    console.log('key', key);
                    return <>
                      <li
                        key={key}
                        className='date-events-li'
                        data-event-index={eventIndex}
                      >
                        <button
                          className='date-events-button'
                          onClick={openEventModal}
                        >
                          <p>{event.name}</p>
                        </button>
                      </li>
                    </>
                  })
                }
              </ol>
          </>
      }
      </div>
    </div>
  </>);
}
