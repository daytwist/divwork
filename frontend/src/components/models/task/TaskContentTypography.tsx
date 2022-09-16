import { Typography } from "@mui/material";

type Props = {
  subtitle: string;
  body: string | null;
};

export const TaskContentTypography = (props: Props) => {
  const { subtitle, body } = props;

  return (
    <div>
      <Typography variant="subtitle1" component="div" color="text.secondary">
        {subtitle}
      </Typography>
      <Typography variant="body1" component="div" sx={{ mb: 2 }}>
        {body}
      </Typography>
    </div>
  );
};
