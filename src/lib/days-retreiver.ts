import moment from 'moment';

export const retrieveDays = (timestamp: string): string => {
  const date = moment(Number(timestamp));
  const today = moment().startOf('day');
  const diffInDays = date.diff(today, 'days', true);
  const diffInWeeks = date.diff(today, 'weeks', true);
  const diffInMonths = date.diff(today, 'months', true);

  if (diffInDays <= 1 && diffInDays >= 0) {
    return 'Today';
  }

  console.log(diffInDays);

  const absDiffInDays = Math.abs(Math.floor(diffInDays));
  const absDiffInWeeks = Math.abs(Math.floor(diffInWeeks));
  const absDiffInMonths = Math.abs(Math.floor(diffInMonths));

  if (diffInDays < 0) {
    if (absDiffInDays < 7) {
      return `${absDiffInDays} ${absDiffInDays <= 1 ? 'day' : 'days'} ago`;
    } else if (absDiffInDays < 31) {
      return `${absDiffInWeeks} ${absDiffInWeeks <= 1 ? 'week' : 'weeks'} ago`;
    } else {
      return `${absDiffInMonths} ${
        absDiffInMonths <= 1 ? 'month' : 'months'
      } ago`;
    }
  } else {
    if (diffInDays < 7) {
      return `${Math.floor(diffInDays)} ${
        Math.floor(diffInDays) <= 1 ? 'day' : 'days'
      } to go`;
    } else if (diffInDays < 31) {
      return `${Math.floor(diffInWeeks)} ${
        Math.floor(diffInWeeks) <= 1 ? 'week' : 'weeks'
      } to go`;
    } else {
      return `${Math.floor(diffInMonths)} ${
        Math.floor(diffInMonths) <= 1 ? 'month' : 'months'
      } to go`;
    }
  }
};
