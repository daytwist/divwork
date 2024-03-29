import { format } from "date-fns";

export const DatetimeFormat = (date: Date | undefined) => {
  if (date) {
    return format(new Date(date), "yyyy/MM/dd HH:mm");
  }
  return null;
};
