import { Typography } from "@mui/material";
import { DatetimeFormat } from "../../ui/DatetimeFormat";

type Props = {
  deadline: Date;
};

export const DeadlineTypography = (props: Props) => {
  const { deadline } = props;

  return (
    <div>
      <Typography variant="subtitle1" component="div" color="text.secondary">
        納期
      </Typography>
      <Typography
        variant="body1"
        component="div"
        color={new Date(deadline.toString()) < new Date() ? "red" : "inherit"}
      >
        {DatetimeFormat(deadline)}
      </Typography>
    </div>
  );
};
