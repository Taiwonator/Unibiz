import moment from 'moment';

export function formatTimestamp(timestamp: string) {
  const date = moment(Number(timestamp));
  const day = date.format('Do');
  const dateString = `${day} ${date.format('MMM')} @ ${date.format('h:mmA')}`;
  return dateString;
}

export function formatDateAndTime(timestamp: string) {
  const dateTime = moment(Number(timestamp));
  const date = dateTime.format('YYYY-MM-DD');
  const time = dateTime.format('HH:mm');
  return [date, time];
}
