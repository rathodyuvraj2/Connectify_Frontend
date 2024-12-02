import { format } from 'date-fns';

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

export const getMessageDate = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return format(date, 'MMM dd, yyyy');
  }
};

export const groupMessagesByDate = (messages) => {
  const grouped = {};
  messages.forEach(message => {
    const date = getMessageDate(message.timestamp);
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(message);
  });
  return grouped;
};