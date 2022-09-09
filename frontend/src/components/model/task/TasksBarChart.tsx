import { Box } from "@mui/material";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { User } from "../../../types";

type Props = {
  user: User;
  maxCount: number;
};

export const TasksBarChart = (props: Props) => {
  const { user, maxCount } = props;

  const data = [
    {
      name: user.name,
      高: user.unfinished_tasks_count[2],
      中: user.unfinished_tasks_count[1],
      低: user.unfinished_tasks_count[0],
    },
  ];

  return (
    <Box sx={{ width: { xs: 200, sm: 350, md: 500, lg: 600 } }}>
      <ResponsiveContainer width="100%" height={70}>
        <BarChart barSize={16} layout="vertical" data={data}>
          <XAxis type="number" hide domain={[0, maxCount]} />
          <YAxis dataKey="name" type="category" hide />
          <Tooltip wrapperStyle={{ zIndex: 10, fontFamily: "roboto" }} />
          <Bar dataKey="高" stackId="a" fill="#ff5252">
            <LabelList
              dataKey="高"
              position="top"
              style={{ fontFamily: "roboto" }}
            />
          </Bar>
          <Bar dataKey="中" stackId="a" fill="#ffd600">
            <LabelList
              dataKey="中"
              position="top"
              style={{ fontFamily: "roboto" }}
            />
          </Bar>
          <Bar dataKey="低" stackId="a" fill="#00c853">
            <LabelList
              dataKey="低"
              position="top"
              style={{ fontFamily: "roboto" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
