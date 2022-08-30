import { Bar, BarChart, LabelList, Tooltip, XAxis, YAxis } from "recharts";
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
      高: user.unfinished_tasks_count[0],
      中: user.unfinished_tasks_count[1],
      低: user.unfinished_tasks_count[2],
    },
  ];

  return (
    <BarChart
      width={500}
      height={70}
      barSize={16}
      layout="vertical"
      data={data}
    >
      <XAxis type="number" hide domain={[0, maxCount]} />
      <YAxis dataKey="name" type="category" hide />
      <Tooltip />
      <Bar dataKey="高" stackId="a" fill="#ff0000">
        <LabelList dataKey="高" position="top" />
      </Bar>
      <Bar dataKey="中" stackId="a" fill="#FFF500">
        <LabelList dataKey="中" position="top" />
      </Bar>
      <Bar dataKey="低" stackId="a" fill="#05FF00">
        <LabelList dataKey="低" position="top" />
      </Bar>
    </BarChart>
  );
};
