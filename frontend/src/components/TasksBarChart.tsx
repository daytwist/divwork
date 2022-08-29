import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { User } from "../types";

type Props = {
  users: User[] | undefined;
};

export const TasksBarChart = (props: Props) => {
  const { users } = props;

  const data = users?.map((user) => {
    return {
      name: user.name,
      high: user.unfinished_tasks_count[0],
      medium: user.unfinished_tasks_count[1],
      low: user.unfinished_tasks_count[2],
    };
  });

  const hight: number = users !== undefined ? users.length * 80 : 100;

  return (
    <BarChart
      width={800}
      height={hight}
      barSize={20}
      layout="vertical"
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" width={100} />
      <Tooltip />
      <Legend />
      <Bar dataKey="high" stackId="a" fill="#ef5350" />
      <Bar dataKey="medium" stackId="a" fill="#ff9800" />
      <Bar dataKey="low" stackId="a" fill="#4caf50" />
    </BarChart>
  );
};
