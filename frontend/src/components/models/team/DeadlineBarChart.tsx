import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { User } from "../../../types/userTypes";

type Props = {
  user: User;
  maxCount: number;
};

export const DeadlineBarChart = (props: Props) => {
  const { user, maxCount } = props;

  const data = [
    {
      name: user.name,
      "3日以内": user.unfinished_tasks_deadline_count[2],
      "4日〜7日以内": user.unfinished_tasks_deadline_count[1],
      "8日以上": user.unfinished_tasks_deadline_count[0],
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={70}>
      <BarChart barSize={16} layout="vertical" data={data}>
        <XAxis type="number" hide domain={[0, maxCount]} />
        <YAxis dataKey="name" type="category" hide />
        <Tooltip wrapperStyle={{ zIndex: 10, fontFamily: "roboto" }} />
        <Bar dataKey="3日以内" stackId="a" fill="#ff5252">
          <LabelList
            dataKey="3日以内"
            position="top"
            style={{ fontFamily: "roboto" }}
          />
        </Bar>
        <Bar dataKey="4日〜7日以内" stackId="a" fill="#ffd600">
          <LabelList
            dataKey="4日〜7日以内"
            position="top"
            style={{ fontFamily: "roboto" }}
          />
        </Bar>
        <Bar dataKey="8日以上" stackId="a" fill="#00c853">
          <LabelList
            dataKey="8日以上"
            position="top"
            style={{ fontFamily: "roboto" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
