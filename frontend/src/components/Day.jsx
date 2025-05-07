export default function Day({ props }) {
  const { dailyEvents, index } = props;
  return (<>
    <li className='date-li'>
      <div className='date-box'>
        <p>{ index }</p>
        {
          dailyEvents && (
            dailyEvents.map((event) => {
              return <>
                <p>{ event.name }</p>
                <p>{ event.address }</p>
              </>
            })
          )
        }
      </div>
    </li>
  </>)
}
