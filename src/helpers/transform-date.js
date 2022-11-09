import { format } from 'date-fns';

const transformDate = (date) => {
  if (!date) return '';
  return format(new Date(date), 'd LLLL y');
};

export default transformDate;
