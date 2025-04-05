import { format, formatDistanceToNow } from 'date-fns';

export const formatDateTime = (date: Date) => {
  try {
    return format(new Date(date), 'MMMM D, yyyy - hh:mm a');
  } catch {
    return date;
  }
};

export const formatDate = (date: string) => {
  try {
    return format(new Date(date), 'dd/MM/yyyy');
  } catch {
    return date;
  }
};

export const formatTime = (date: Date) => {
  try {
    return format(new Date(date), 'hh:mm a');
  } catch {
    return date;
  }
};

export const timeAgo = (date: Date) => {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch {
    return date;
  }
};
