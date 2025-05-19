
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
  const targetDate = new Date(date.valueOf());
  const startOfYear = new Date(targetDate.getFullYear(), 0, 1);
  const endOfYear = new Date(targetDate.getFullYear(), 11, 31);

  // on border-weeks (last week of dec, first week of jan)
  const isDecemberEnd = targetDate.getMonth() === 11 && targetDate.getDate() >= 29;
  if (isDecemberEnd) {
    // check if this week extends into the next year
    // if it does, this is week 1 of the next year
    const dayOfWeek = targetDate.getDay();
    const daysUntilEndOfYear = endOfYear.getDate() - targetDate.getDate();
    if (daysUntilEndOfYear < (6 - dayOfWeek)) {
      return {
        week: 1,
        year: targetDate.getFullYear() + 1
      };
    }
  }

  // on non border-weeks, calc the week number since the start of the year / 7 (round up)
  const daysSinceStartOfYear = Math.floor((targetDate - startOfYear) / (24 * 60 * 60 * 1000));
  const firstDayOfWeek = startOfYear.getDay() || 7;
  const weekNumber = Math.floor((daysSinceStartOfYear + firstDayOfWeek + 1) / 7) + 1;

  return {
    week: weekNumber,
    year: targetDate.getFullYear()
  };
};
