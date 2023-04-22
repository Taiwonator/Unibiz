import moment from 'moment';

export const retrieveDays = (timestamp: string): string => {
  const date = moment(Number(timestamp));
  const today = moment().startOf('day');
  const diffInDays = date.diff(today, 'days');

  if (diffInDays === 0) {
    return 'Today';
  }

  const daysString =
    diffInDays > 0 ? `${diffInDays} days to go` : `${-diffInDays} days ago`;
  return daysString;
};

// import moment from 'moment';

// export const retrieveDays = (timestamp: string): string => {
//   const date = moment(Number(timestamp));
//   const today = moment().endOf('day');
//   const diffInHours = today.diff(date, 'hours');
//   const diffInDays = today.diff(date, 'days');
//   const diffInWeeks = today.diff(date, 'weeks');
//   const diffInMonths = today.diff(date, 'months');
//   const diffInYears = today.diff(date, 'years');

//   if (diffInHours < 24) {
//     return `Today`;
//   } else if (diffInDays < 7) {
//     return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
//   } else if (diffInWeeks < 4) {
//     const weeksString =
//       diffInWeeks > 0
//         ? `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} to go`
//         : `${-diffInWeeks} ${-diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
//     return weeksString;
//   } else if (diffInMonths < 12) {
//     const monthsString =
//       diffInMonths > 0
//         ? `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} to go`
//         : `${-diffInMonths} ${-diffInMonths === 1 ? 'month' : 'months'} ago`;
//     return monthsString;
//   } else {
//     const yearsString =
//       diffInYears > 0
//         ? `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} to go`
//         : `${-diffInYears} ${-diffInYears === 1 ? 'year' : 'years'} ago`;
//     return yearsString;
//   }
// };
