import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { User } from "../types";

type Props = {
  user: User;
  maxCount: number;
};

export const TasksBar = (props: Props) => {
  const { user, maxCount } = props;

  const data = [
    {
      name: user.name,
      high: user.unfinished_tasks_count[0],
      medium: user.unfinished_tasks_count[1],
      low: user.unfinished_tasks_count[2],
    },
  ];

  return (
    <BarChart
      width={500}
      height={50}
      barSize={16}
      layout="vertical"
      data={data}
    >
      <XAxis type="number" hide domain={[0, maxCount]} />
      <YAxis dataKey="name" type="category" hide />
      <Tooltip />
      <Bar dataKey="high" stackId="a" fill="#ef5350" />
      <Bar dataKey="medium" stackId="a" fill="#ff9800" />
      <Bar dataKey="low" stackId="a" fill="#4caf50" />
    </BarChart>
  );
};
