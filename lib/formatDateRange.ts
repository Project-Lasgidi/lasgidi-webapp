import { parseISO, format, isSameMonth, isSameYear } from 'date-fns';

export const formatDateRange = (startDateStr: string, endDateStr: string) => {
  const startDate = parseISO(startDateStr);
  const endDate = parseISO(endDateStr);

  if (isSameYear(startDate, endDate) && isSameMonth(startDate, endDate)) {
    const startDay = format(startDate, 'd');
    const endDay = format(endDate, 'd');
    return `${format(startDate, 'MMM')} ${startDay}-${endDay}, ${format(startDate, 'yyyy')}`;
  } else {
    const startFormat = format(startDate, 'MMM d, yyyy');
    const endFormat = format(endDate, 'MMM d, yyyy');
    return `${startFormat} - ${endFormat}`;
  }
};
