import moment, { Moment } from 'moment';

function setTimeOnDate(dateObj: Moment, timeStr: string) {
  const [hour, minute] = timeStr.split(':');
  return moment(dateObj)
    .set({ hour: Number(hour), minute: Number(minute) })
    .toDate();
}

export default setTimeOnDate;
