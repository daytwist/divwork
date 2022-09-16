import { Stack, Typography } from "@mui/material";

type Props = {
  subtitle: string;
  body: string;
};

export const TasksContentStack = (props: Props) => {
  const { subtitle, body } = props;

  return (
    <Stack direction="row" alignItems="center">
      <Typography
        variant="subtitle1"
        component="div"
        color="text.secondary"
        sx={{ textAlign: "end", width: 85, mr: 1 }}
      >
        {subtitle}
      </Typography>
      <Typography variant="body1" component="div">
        {body}
      </Typography>
    </Stack>
  );
};
