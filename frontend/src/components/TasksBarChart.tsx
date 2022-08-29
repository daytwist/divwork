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

  return (
    <BarChart
      width={600}
      height={500}
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
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="high" stackId="a" fill="red" />
      <Bar dataKey="medium" stackId="a" fill="orange" />
      <Bar dataKey="low" stackId="a" fill="green" />
    </BarChart>
  );
};
