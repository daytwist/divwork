import { format } from "date-fns";

export const DeadlineFormat = (date: Date | undefined) => {
  if (date) {
    return <div>{format(new Date(date), "yyyy/MM/dd HH:mm")}</div>;
  }

  return <div> </div>;
};
