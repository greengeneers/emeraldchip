import Day from './Day.jsx'

export default function CalendarView({ props }) {
  const { events } = props;
  return (<>
    <ol className='date-list'>
      {
        [...Array(31)].map((v,i) => {
          let dailyEvents = null;
          const index = i + 1;
          if (events && events[i+1]) {
            dailyEvents = events[i+1];
          }
          return <Day key={crypto.randomUUID()} props={{ dailyEvents, index }}/>
        })
      }
    </ol>
  </>)
}
