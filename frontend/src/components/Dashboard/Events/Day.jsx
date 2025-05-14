import EventModal from './EventModal.jsx';
import {
  useState
} from 'react';

export default function Day({ props }) {
  const { dailyEvents, index, openEventModal } = props;


  return (<>
    <li className='date-li'>
      <div className='date-box'>
        <p>{ index }</p>
        <ol className='date-events-ol'>
          {
            dailyEvents && (
              dailyEvents.map((event, eventIndex) => {
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
                      <p>{ event.name }</p>
                    </button>
                  </li>
                </>
              })
            )
          }
        </ol>
      </div>
    </li>
  </>)
}
