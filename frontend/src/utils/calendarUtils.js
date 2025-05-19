
export const buildMonthMatrix = (currentYear, currentMonth) => {
  // set up for curr month:
  // 1. # days in curr month
  // 2. previous month padding required
  // 3. start date for current month
  const daysInMonth = (() => new Date(currentYear, currentMonth+1, 0).getDate())();
  const padding = new Date(currentYear, currentMonth, 1).getDay();
  let currMonthDate = 1;

  // set up for next month:
  // 1. year corresponding to next month
  // 2. month bound to 0-11
  // 3. start date for next month
  const nextAdjustedYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
  const nextMonth = (currentMonth+1 > 11) ? 0 : currentMonth+1;
  let nextMonthDay = 1;

  // 6 weeks per month in this view
  return [...Array(6)].map((_, index) => {
    // days for this week
    const buildRow = [];
    // build the previous month padding, if this is the first week
    if (index === 0) {
      const prevAdjustedYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
      const prevMonth = (currentMonth-1 < 0) ? 11 : currentMonth-1;
      const daysInPrevMonth = (() => new Date(prevAdjustedYear, prevMonth+1, 0).getDate())();
      let prevMonthDay = daysInPrevMonth - padding + 1;
      for (let i = 0; i < padding; i++) {
        buildRow.push({
          year: prevAdjustedYear,
          month: prevMonth,
          day: prevMonthDay++
        });
      }
    }

    // build the current month dates
    while (buildRow.length < 7) {
      if (currMonthDate <= daysInMonth) {
        buildRow.push({
          year: currentYear,
          month: currentMonth,
          day: currMonthDate++
        });
      } else { // padding!
        buildRow.push({
          year: nextAdjustedYear,
          month: nextMonth,
          day: nextMonthDay++
        });
      }
    }

    // return the week
    return buildRow;
  })
};


export const getWeekNumber = (date) => {
  // copy date (need to change later in computing week #)
  const target = new Date(date.valueOf());

  // iso week starts on monday, so adjust the day number. set to first day of the week.
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);

  // get the first thursday, and calculate the number of weeks from the base day onto it
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const weekNr = 1 + Math.ceil((target - firstThursday) / (7 * 24 * 60 * 60 * 1000));
  return weekNr;
};
